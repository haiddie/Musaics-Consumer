import { useEffect, useRef, useState } from "react";

const SearchableDropdown = ({
    options,
    label,
    id,
    selectedVal,
    handleChange
}: any) => {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        document.addEventListener("click", toggle);
        return () => document.removeEventListener("click", toggle);
    }, []);

    const selectOption = (option: any) => {
        setQuery(() => "");
        handleChange(option);
        setIsOpen((isOpen) => !isOpen);
    };

    function toggle(e: any) {
        setIsOpen(e && e.target === inputRef.current);
    }

    const getDisplayValue = () => {
        if (query) return query;
        if (selectedVal) return selectedVal;
        return "";
    };


    const filter = (options: any) => {
        return options?.filter(
            (option: any) => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
        );
    };

    return (
        <div className="relative sm:w-[300px] w-full cursor-pointer">
            <div className="relative">
                {/* <input
                    ref={inputRef}
                    type="text"
                    value={getDisplayValue()}
                    name="searchTerm"
                    onChange={(e) => {
                        setQuery(e.target.value);
                        handleChange(null);
                    }}
                    onClick={toggle}
                    className="block w-full py-2 pl-5 pr-12 text-white bg-gray-900 border border-gray-900 rounded-md cursor-pointer focus:outline-none focus:border-gray-700 transition duration-200"
                /> */}
                <span ref={inputRef} onClick={toggle} className="block w-full py-2 pl-5 pr-12 text-white bg-gray-900 border border-gray-900 rounded-md cursor-pointer focus:outline-none focus:border-gray-700 transition duration-200">
                    {getDisplayValue()}
                </span>
                <div className={`absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none ${isOpen ? "text-gray-300" : "text-gray-400"}`}>
                    <svg className="w-4 h-4 transform transition-transform duration-200" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                </div>
            </div>

            <div className={`absolute z-10 w-full mt-1 bg-gray-900 border border-gray-900 rounded-md shadow-lg max-h-56 overflow-auto ${isOpen ? "block" : "hidden"}`}>
                {filter(options)?.map((option: any, index: any) => (
                    <div
                        onClick={() => selectOption(option)}
                        className={`py-2 pl-3 pr-9 text-white cursor-pointer hover:bg-gray-700 ${option[label] === selectedVal ? "bg-gray-700" : ""}`}
                        key={`${id}-${index}`}
                    >
                        {option[label]}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchableDropdown;
