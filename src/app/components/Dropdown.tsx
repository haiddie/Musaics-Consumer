// components/Dropdown.js

import React, { useEffect, useRef, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useRouter } from 'next/navigation';
const Dropdown = ({ data }: any) => {
    const router = useRouter(); // Move the useRouter hook inside the component
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const dropdownRef = useRef<any>(null);

    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        // Attach the event listener when the component mounts
        document.addEventListener('mousedown', handleOutsideClick);

        // Detach the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);


    const openPage = (page: string) => {
        router.push(`/${page}`);
        toggleDropdown()
    }

    return (
        <div className="dropdown relative  xl:border-l-[3px] xl:border-white xl:pl-10" ref={dropdownRef}>
            <div className="flex justify-start xl:justify-center items-center cursor-pointer" onClick={toggleDropdown}>
                <span className='md:font-semibold text-[16px] text-lg xl:text-2xl font-cabin relative'>{data.parentName}</span>
                {isOpen ? (<KeyboardArrowUpIcon />) : (<KeyboardArrowDownIcon />)}
            </div>
            {isOpen && (
                <div className='dropdown-content xl:absolute z-10 mt-2 w-48 p-4 lg:bg-black rounded-md shadow-lg'>
                    <div className="links flex flex-col gap-y-4">
                        {data.links.map((link: any, index: any) => (
                            <>
                                <a key={index} onClick={() => { openPage(link.url) }} className='hidden lg:block cursor-pointer text-white transition-colors ease-in-out duration-150 hover:delay-0 hover:text-primary-100 hover:backdrop-blur-lg'>
                                    {link.text}
                                </a>

                                <a key={index} href={link.url} target='_self' className='block lg:hidden cursor-pointer text-white transition-colors ease-in-out duration-150 hover:delay-0 hover:text-primary-100 hover:backdrop-blur-lg'>
                                    {link.text}
                                </a></>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
