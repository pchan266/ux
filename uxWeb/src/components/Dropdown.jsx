import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Dropdown({ options, selected, setSelected }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    const selectedOption = options.find(option => option.value === selected);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
                buttonRef.current && !buttonRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Get button position for portal positioning
    const getButtonPosition = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            return {
                top: rect.bottom + window.scrollY + 4,
                left: rect.left + window.scrollX,
                width: rect.width
            };
        }
        return { top: 0, left: 0, width: 280 };
    };

    return (
        <div className="dropdown-container" style={{ zIndex: 10000 }}>
            <button 
                ref={buttonRef}
                className={`dropdown-button ${isOpen ? 'dropdown-button-active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                <span className="dropdown-text">{selectedOption?.label || "Select Team"}</span>
                <svg 
                    className={`dropdown-arrow ${isOpen ? 'rotate-180' : ''}`}
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none"
                >
                    <path 
                        d="M6 9L12 15L18 9" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            
            {isOpen && createPortal(
                <div 
                    ref={dropdownRef}
                    className="dropdown-menu-portal" 
                    role="listbox"
                    style={{
                        position: 'absolute',
                        top: getButtonPosition().top,
                        left: getButtonPosition().left,
                        width: getButtonPosition().width,
                        zIndex: 99999
                    }}
                >
                    {options.map((option) => (
                        <button
                            key={option.value}
                            className={`dropdown-option ${selected === option.value ? 'dropdown-option-selected' : ''}`}
                            onClick={() => {
                                setSelected(option.value);
                                setIsOpen(false);
                            }}
                            role="option"
                            aria-selected={selected === option.value}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>,
                document.body
            )}
        </div>
    );
}
