import React, { useState, useEffect, useRef } from 'react'; 
import { ChevronDownIcon } from '@heroicons/react/solid';

/**
 * Function to extract text from JSX elements, handling the case of icons.
 * If JSX contains text or an array of elements, returns the concatenated text.
 * If JSX contains a component, recursively extracts its text.
 */
const getTextFromJSX = (jsx) => {
  if (typeof jsx === 'string') return jsx; 
  if (Array.isArray(jsx)) return jsx.map(getTextFromJSX).join(''); 
  if (jsx?.props?.children) return getTextFromJSX(jsx.props.children); 
  return ''; 
};

/**
 * Custom select component with search functionality (if enabled) and dropdown options.
 * 
 * Props:
 * - `options`: List of options (array of objects with `label`, `value`, and optionally `style`).
 * - `value`: The currently selected value.
 * - `onChange`: Function to be called when an option is selected.
 * - `className`: Custom class for styling.
 * - `isSearchable`: Boolean that enables or disables search functionality inside the dropdown.
 */
const StyledSelect = ({
  options = [], 
  value, 
  onChange, 
  className = '', 
  isSearchable = false, 
  placeholder = '',
}) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [selected, setSelected] = useState(() => {
    const initialSelected = options.find(opt => opt.value === value);
    return initialSelected || null;
  }); 
  const [highlightedIndex, setHighlightedIndex] = useState(0); 
  const inputRef = useRef(null); 
  const wrapperRef = useRef(null); 

  const processedOptions = options.map((option, index) => ({
    ...option,
    databaseIndex: index,
  }));

  useEffect(() => {
    const filtered = isSearchable
      ? processedOptions.filter((opt) =>
          (typeof opt.label === 'string' ? opt.label : getTextFromJSX(opt.label))
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      : processedOptions;

    const newIndex = filtered.findIndex((opt) => opt.value === selected?.value);

    if (newIndex !== -1) {
      setHighlightedIndex(newIndex);
    } else {
      setHighlightedIndex(-1);
    }
  }, [searchTerm, options, isSearchable, selected]); 

  const filteredOptions = isSearchable
    ? processedOptions.filter((opt) =>
        (typeof opt.label === 'string' ? opt.label : getTextFromJSX(opt.label))
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : processedOptions;

  const handleBlur = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.relatedTarget)) {
      setIsOpen(false); 
      setSearchTerm('');
    }
  };

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
            handleSelect(option); 
          }
        } else {
          setIsOpen(true); 
        }
      } else if (e.key === 'Escape') {
        setIsOpen(false); 
        setSearchTerm('');
      } else if (e.key === 'Tab' && isOpen) {
        e.preventDefault();
        if (e.shiftKey) {
          setHighlightedIndex((prev) =>
            prev === 0 ? filteredOptions.length - 1 : prev - 1
          );
        } else {
          setHighlightedIndex((prev) =>
            prev === filteredOptions.length - 1 ? 0 : prev + 1
          );
        }
      }      
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  const handleSelect = (option) => {
    setSelected(option); 
    onChange(option); 
    value = option.value;
    setSearchTerm(''); 
    setIsOpen(false); 
    setHighlightedIndex(filteredOptions.findIndex((opt) => opt.value === option.value)); 
  
    if (!isSearchable) {
      inputRef.current?.blur(); 
    } else {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const handleFocus = () => {
    const selectedIndex = filteredOptions.findIndex((opt) => opt.value === selected?.value);
    setHighlightedIndex(selectedIndex !== -1 ? selectedIndex : -1); 
  };

  const handleClick = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      if (newState && isSearchable) {
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
      className={`relative h-full w-full`}
      tabIndex={isSearchable === true ? -1 : 0}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <div
        className={`w-full ${selected ? selected.style : className} px-4 py-2 h-full border border-gray-300 rounded-md text-gray-800 flex items-center justify-between cursor-pointer focus-within:ring-2 focus-within:ring-blue-500`}
        onClick={handleClick}
      >
        {isSearchable ? (
          <div className="flex items-center gap-2 w-full relative">
            <div className="relative flex-1">
              {searchTerm === '' && (
                <div className={`absolute inset-0 w-full flex items-center pointer-events-none text-gray-700`}>
                  <span className="w-full truncate">{selected?.label || placeholder}</span>
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
            {selected?.label || placeholder}
          </div>
        )}
        <ChevronDownIcon className={`h-5 w-5 ml-2 text-gray-500`} />
      </div>

      {isOpen && (
        <ul className="absolute w-full border bg-white  mt-1 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`cursor-pointer py-2 px-4 flex items-center w-full ${option.style || ''} 
                  ${selected?.value === option.value ? (option.highlightStyle || 'bg-blue-500') : ''} 
                  ${highlightedIndex === index && selected?.value !== option.value ? option.focusStyle : ''}
                `}
                onMouseEnter={(e) => {
                  const listItem = e.target.closest('li');
                  setHighlightedIndex(index);
                  if (highlightedIndex !== index) {
                    if (option.focusStyle && selected?.value !== option.value) {
                      listItem.classList.add(...option.focusStyle.split(' ')); // Añadir focusStyle cuando el ratón pasa
                    }
                  }
                }}
                onMouseLeave={(e) => {
                  const listItem = e.target.closest('li');
                  if (highlightedIndex !== index && option.focusStyle && selected?.value !== option.value) {
                    listItem.classList.remove(...option.focusStyle.split(' ')); // Eliminar focusStyle cuando el ratón sale
                  }
                }}
              >
                <div className={`w-full flex items-center`}>
                  {option.label}
                </div>
              </li>
            ))
          ) : (
            <li className="py-2 px-4">
              No results found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default StyledSelect;
