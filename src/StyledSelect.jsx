import React, { useState, useEffect, useRef } from 'react';

const getTextFromJSX = (jsx) => {
  if (typeof jsx === 'string') return jsx;
  if (Array.isArray(jsx)) return jsx.map(getTextFromJSX).join('');
  if (jsx?.props?.children) return getTextFromJSX(jsx.props.children);
  return '';
};

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
  const optionRefs = useRef([]);

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
    setHighlightedIndex(newIndex !== -1 ? newIndex : -1);
  }, [searchTerm, options, isSearchable, selected]);

  const defaultStyle = 'transition-colors duration-150 ease-in-out';
  const defaultHighlightStyle = 'bg-blue-400'; 
  const defaultSelectedHoverStyle = 'bg-blue-500 active:bg-blue-400'; 
  const defaultFocusStyle = 'bg-blue-200 active:bg-blue-300';

  const filteredOptions = isSearchable
    ? processedOptions.filter((opt) =>
        (typeof opt.label === 'string' ? opt.label : getTextFromJSX(opt.label))
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : processedOptions;

  useEffect(() => {
    optionRefs.current = filteredOptions.map((_, i) => optionRefs.current[i] || React.createRef());
  }, [filteredOptions]);
  
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && optionRefs.current[highlightedIndex]?.current) {
      optionRefs.current[highlightedIndex].current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [highlightedIndex, isOpen]);  

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

  const label = selected ? selected.label : placeholder;

  const getOptionClasses = (option, index) => {
    const baseClasses = `cursor-pointer py-2 px-4 flex items-center w-full ${defaultStyle}`;
    const optionStyle = option.style || '';
    const isSelected = selected?.value === option.value;
    const isHighlighted = highlightedIndex === index;
    
    const baseWithoutBg = optionStyle.replace(/bg-[a-z]+-\d+/, '');
    
    if (isSelected && isHighlighted) {
      
      if (option.highlightStyle) {
        const hoverClass = option.highlightStyle.match(/hover:([^\s]+)/);
        if (hoverClass && hoverClass[0]) {

          return `${baseClasses} ${baseWithoutBg} ${option.highlightStyle.replace(/hover:[^\s]+/, '')} ${hoverClass[0].replace('hover:', '')}`;
        }

        const bgMatch = option.highlightStyle.match(/bg-([a-z]+)-(\d+)/);
        if (bgMatch && bgMatch[1] && bgMatch[2]) {
          const color = bgMatch[1];
          const intensity = parseInt(bgMatch[2]);
          const darkerIntensity = Math.min(intensity + 100, 900); 
          return `${baseClasses} ${baseWithoutBg} bg-${color}-${darkerIntensity}`;
        }
      }
      return `${baseClasses} ${baseWithoutBg} ${defaultSelectedHoverStyle}`;
    }
    else if (isSelected) {
      return `${baseClasses} ${baseWithoutBg} ${option.highlightStyle || defaultHighlightStyle}`;
    }
    else if (isHighlighted) {
      return `${baseClasses} ${baseWithoutBg} ${option.focusStyle || defaultFocusStyle}`;
    }
    
    return `${baseClasses} ${optionStyle}`;
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative rounded-md ${className || 'h-full w-full'}`}
      tabIndex={isSearchable ? -1 : 0}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <div
        className={`${selected?.style || ''} px-4 py-2 border border-gray-300 rounded-md text-gray-800 flex items-center justify-between cursor-pointer focus-within:ring-2 focus-within:ring-blue-500`}
        onClick={handleClick}
      >
        {isSearchable ? (
          <div className="flex items-center gap-2 w-full relative">
            <div className="relative flex-1">
              {searchTerm === '' && (
                <div className="absolute inset-0 w-full flex items-center pointer-events-none">
                  <span className="w-full truncate">{label}</span>
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
          <div className="flex items-center gap-2">
            {label}
          </div>
        )}
        <img 
          src='./arrowDown.png' 
          alt='Arrow-Down' 
          style={{
            width: '16px',
            height: '16px',
            marginLeft: '8px',
            transition: 'transform 0.2s ease-in-out',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }}/>
      </div>

      {isOpen && (
        <ul
          className="absolute w-full border border-gray-300 bg-white mt-1 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto"
          onMouseLeave={() => setHighlightedIndex(-1)}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                ref={optionRefs.current[index]}
                className={getOptionClasses(option, index)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <div className="w-full flex items-center">
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