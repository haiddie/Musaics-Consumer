
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState, } from "react";


interface Props {
    tab: string;
}
const SubHeader: React.FC<Props> = ({ tab }) => {
    const [showHeader, setShowHeader] = useState(true);
    const [y, setY] = useState(0);
    const pathname = usePathname();
    const router = useRouter(); // Move the useRouter hook inside the component

    const handleNavigation = useCallback(
        (e: any) => {
            const window = e.currentTarget;
            if (y > window!.scrollY && !pathname.includes('muzicard-prototype') && !pathname.includes('/i/') && !pathname.includes('/release') || !pathname.includes('scanned-releases')) {
                setShowHeader(true)
            } else if (y < window!.scrollY && (window!.scrollY > 150)) {
                setShowHeader(false)
            }
            setY(window!.scrollY);
        }, [y, pathname]
    );


    useEffect(() => {
        setY(window.scrollY);
        window.addEventListener("scroll", handleNavigation);

        return () => {
            window.removeEventListener("scroll", handleNavigation);
        };
    }, [handleNavigation]);

    const goToTab = (tab: any) => {
        router.push(`/${tab}`);
    }

    return (
        <div className="bg-black">
            <header className={`fixed pt-[80px] lg:pt-[90px]  z-20 w-full transition-transform duration-500 ease-out-circ bg-gray-900/10   }`} >
                <nav className="flex items-center justify-center p-4">
                    <div className="flex justify-center items-center w-[248px] md:w-[248px] bg-[#6F676D] rounded-[4px] h-[40px]">
                        <a className={` ${tab === 'merch-tools' ? "bg-gradient-to-r from-[#6960F5] to-[#757BF6] text-white" : "bg-[#6F676D] text-gray-200"}  rounded-[4px] h-full   w-[124px] flex justify-center items-center cursor-pointer`} onClick={() => goToTab('merch-tools')}>
                            <span className="text-[12px] font-[500]">Merch Tools</span>
                        </a>
                        <a className={` ${tab === 'marketing-tools' ? "bg-gradient-to-r from-[#6960F5] to-[#757BF6] text-white" : "bg-[#6F676D] text-gray-200"}  rounded-[4px] h-full   w-[124px] flex justify-center items-center cursor-pointer`} onClick={() => goToTab('marketing-tools')}>
                            <span className="text-[12px] font-[500]">Marketing Tools</span></a>


                    </div>
                </nav>
            </header>
        </div>
    )
}

export default SubHeader;
