import React, { useState, useEffect, useRef } from 'react'; 
import { ChevronDownIcon } from '@heroicons/react/solid';

/** TODO: Preguntar cómo quiere el highlight del elemento seleccionado */

/**
 * Función para extraer texto de elementos JSX, permitiendo manejar el caso de los iconos.
 * Si el JSX contiene un texto o un array de elementos, devuelve el texto concatenado.
 * Si el JSX contiene un componente, recursivamente extrae su texto.
 */
const getTextFromJSX = (jsx) => {
  if (typeof jsx === 'string') return jsx; // Si es un texto, simplemente lo devuelve
  if (Array.isArray(jsx)) return jsx.map(getTextFromJSX).join(''); // Si es un array de JSX, concatena los textos
  if (jsx?.props?.children) return getTextFromJSX(jsx.props.children); // Si es un componente, recursivamente extrae el texto
  return ''; // Si no hay texto, devuelve una cadena vacía
};

/**
 * Componente personalizado de selección con funcionalidad de búsqueda (si está habilitada) y opciones desplegables.
 * 
 * Props:
 * - `options`: Lista de opciones (array de objetos con `label`, `value` y opcionalmente `style`).
 * - `value`: El valor actualmente seleccionado.
 * - `onChange`: Función que se ejecuta cuando se selecciona una opción.
 * - `className`: Clase personalizada para agregar estilos.
 * - `isSearchable`: Booleano que activa o desactiva la funcionalidad de búsqueda dentro del dropdown.
 */
const StyledSelect = ({
  options = [], // Lista de opciones que se muestran en el dropdown
  value, // Valor seleccionado
  onChange, // Función que maneja el cambio de selección
  className = '', // Estilo personalizado
  isSearchable = false, // Controla si el input de búsqueda está habilitado
}) => {
  const [isOpen, setIsOpen] = useState(false); // Estado que controla si el dropdown está abierto o cerrado
  const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda para filtrar las opciones
  const [selected, setSelected] = useState(options[0] || null); // Opción seleccionada TODO: cambiar que no sea options[0], sino la opcion con el valor que se pasa por prop
  const [highlightedIndex, setHighlightedIndex] = useState(0); // Índice de la opción resaltada
  const inputRef = useRef(null); // Referencia al input de búsqueda
  const wrapperRef = useRef(null); // Referencia al contenedor del dropdown

  // Mapeamos las opciones para agregarles un índice de base de datos (databaseIndex)
  const processedOptions = options.map((option, index) => ({
    ...option,
    databaseIndex: index,
  }));

  useEffect(() => {
    // Filtrar las opciones según el término de búsqueda (si la búsqueda está habilitada)
    const filtered = isSearchable
      ? processedOptions.filter((opt) =>
          (typeof opt.label === 'string' ? opt.label : getTextFromJSX(opt.label))
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      : processedOptions;


    // Encontrar el índice de la opción seleccionada dentro de las opciones filtradas
    const newIndex = filtered.findIndex((opt) => opt.value === selected?.value);

    // Actualizamos el índice resaltado si la opción seleccionada está dentro de las opciones filtradas
    if (newIndex !== -1) {
      setHighlightedIndex(newIndex);
    } else {
      setHighlightedIndex(0); // Restablecemos el índice a 0 si no hay coincidencias
    }
  }, [searchTerm, options, isSearchable, selected]); // Dependencias: cada vez que cambian estas variables, se vuelve a ejecutar

  // Filtra las opciones en función del término de búsqueda
  const filteredOptions = isSearchable
    ? processedOptions.filter((opt) =>
        (typeof opt.label === 'string' ? opt.label : getTextFromJSX(opt.label))
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : processedOptions;

  // Maneja el evento de perder el foco
  const handleBlur = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.relatedTarget)) {
      setIsOpen(false); // Cierra el dropdown si el foco se mueve fuera del contenedor
      setSearchTerm('');
    }
  };

  // Maneja la navegación por teclado dentro del dropdown
  const handleKeyDown = (e) => {
    if (isOpen) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (isOpen) {
          const option = filteredOptions[highlightedIndex];
          if (option) {
            handleSelect(option); // Solo selecciona si existe
          }
        } else {
          setIsOpen(true); // Abre el dropdown si no está abierto
        }
      } else if (e.key === 'Escape') {
        setIsOpen(false); // Cierra el dropdown si se presiona Escape
        setSearchTerm('');
      } else if (e.key === 'Tab' && isOpen) {
        e.preventDefault();
        if (e.shiftKey) {
          // Shift+Tab → hacia arriba, cíclico
          setHighlightedIndex((prev) =>
            prev === 0 ? filteredOptions.length - 1 : prev - 1
          );
        } else {
          // Tab → hacia abajo, cíclico
          setHighlightedIndex((prev) =>
            prev === filteredOptions.length - 1 ? 0 : prev + 1
          );
        }
      }      
    } else if (e.key === 'Enter' || e.key === ' ') {
      // Si el dropdown no está abierto, abre al presionar Enter o Space
      e.preventDefault();
      setIsOpen(true);
    }
  };

  // Maneja la selección de una opción
  const handleSelect = (option) => {
    setSelected(option); // Actualiza la opción seleccionada
    onChange(option); // Llama a la función onChange con el valor de la opción seleccionada
    value = option.value;
    console.log(value);
    setSearchTerm(''); // Limpia el término de búsqueda
    setIsOpen(false); // Cierra el dropdown
    setHighlightedIndex(filteredOptions.findIndex((opt) => opt.value === option.value)); // Resalta la opción
  
    if (!isSearchable) {
      inputRef.current?.blur(); // Solo hace blur si no es searchable
    } else {
      // Reenfoca el input después de cerrar el dropdown
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };
  

  // Maneja el enfoque (cuando el input es enfocado)
  const handleFocus = () => {
    // Establece el índice de la opción seleccionada como resaltada al recibir el foco
    const selectedIndex = filteredOptions.findIndex((opt) => opt.value === selected?.value);
    setHighlightedIndex(selectedIndex !== -1 ? selectedIndex : 0); // Si no se encuentra la opción seleccionada, resalta la primera opción
  };
  

  // Maneja el clic en el contenedor del dropdown
  const handleClick = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      if (newState && isSearchable) {
        // Espera al siguiente ciclo para asegurarse de que el input ya esté renderizado
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      }
      return newState;
    });
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative h-full w-full ${className}`}
      
      tabIndex={isSearchable === true ? -1 : 0}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <div
        className={`w-full ${selected? selected.style : ''} px-4 py-2 h-full border border-gray-300 rounded-md text-gray-800 flex items-center justify-between cursor-pointer focus-within:ring-2 focus-within:ring-blue-500`}
        onClick={handleClick}
      >
        {/* Si es un campo de búsqueda, mostramos un input */}
        {isSearchable ? (
          <div className="flex items-center gap-2 w-full relative ">
            <div className="relative flex-1">
              {searchTerm === '' && selected && (
                <div className={`absolute inset-0 w-full flex items-center pointer-events-none text-gray-700`}>
                  <span className="w-full truncate">{selected?.label}</span>
                </div>
              )}
              <input
                ref={inputRef}
                type="text"
                className="w-full h-full outline-none bg-transparent"
                value={searchTerm}
                onFocus={handleFocus}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (!isOpen) setIsOpen(true);
                }}
              />
            </div>
          </div>
        ) : (
          <div className={`flex items-center gap-2 `}>
            {selected?.label || 'Selecciona una opción'}
          </div>
        )}
        <ChevronDownIcon className={`h-5 w-5 ml-2 text-gray-500 `} />
      </div>

      {isOpen && (
        <ul className="absolute w-full border bg-white  mt-1 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`cursor-pointer ${highlightedIndex === index ? option.highlightStyle || 'bg-blue-200' : ''} py-2 px-4 flex items-center w-full ${option.style || ''} `}
              >
                <div className={`w-full flex items-center`}>
                  {option.label}
                </div>
              </li>
            ))
          ) : (
            <li className="py-2 px-4">
              No se encontraron resultados
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default StyledSelect;
