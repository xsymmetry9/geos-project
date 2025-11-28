import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ImportFromExcel from '@/components/ImportFromExcel';
import ExportToExcel from '@/components/ExportToExcel';

type NavigationProps = {
    setPage: () => void;
    setUserData: () => void;
    userData: {};
}
const Navigation = ({ setPage, userData, setUserData }): NavigationProps => {
    const [dropDownSPR, setDropDownSPR] = useState<boolean>(false);
    const [dropDownLevelCheck, setDropDownLevelCheck] = useState<boolean>(false);

    const toggleLevelCheckSPR = (e: React.MouseEvent<HTMLButtonElement>) => {
        const id = (e.currentTarget as HTMLButtonElement).id;
        setPage(id as "view-spr" | "view-levelCheck");
        setDropDownLevelCheck(false);
        setDropDownSPR(false);
    };
    // 1. Create a "ref" to track the navigation element
    const navRef = useRef<HTMLElement>(null);

    // 2. Helper to toggle SPR
    const toggleSPR = () => {
        setDropDownSPR((prev) => !prev);
        setDropDownLevelCheck(false);
    };

    // 3. Helper to toggle Level Check
    const toggleLevelCheck = () => {
        setDropDownLevelCheck((prev) => !prev);
        setDropDownSPR(false);
    };

    // 4. The "Click Outside" Logic
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Check if the nav exists AND if the clicked element is NOT inside the nav
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setDropDownSPR(false);
                setDropDownLevelCheck(false);
            }
        };

        // Add the listener when the component loads
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup: Remove the listener when the component goes away (prevents memory leaks)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        // 5. Attach the ref to the main <nav> tag
        <nav ref={navRef} className="w-full bg-white border-b">
            <ul className="flex gap-8 justify-center items-center font-medium text-gray-700">

                {/* --- SPR Dropdown --- */}
                <li className="relative">
                    <button
                        id="spr"
                        onClick={toggleSPR}
                        className="cursor-pointer flex items-center gap-1 p-4 hover:text-dark-green hover:bg-green-50 focus:outline-none"
                    >
                        SPR
                        <span className="text-xs">▼</span>
                    </button>

                    <ul className={`${dropDownSPR ? "block" : "hidden"} absolute top-full left-0 mt-2 w-40 bg-white border rounded shadow-lg z-10`}>
                        <li className="text-left w-full px-4 py-2 hover:text-dark-green hover:bg-green-50 cursor-pointer"><Link to="/spr/">New Form</Link></li>
                        <li className="text-left w-full px-4 py-2 hover:text-dark-green hover:bg-green-50 cursor-pointer"><button className="cursor-pointer" id="view-spr" onClick={toggleLevelCheckSPR}>View Forms</button></li>
                    </ul>
                </li>

                {/* --- Level Check Dropdown --- */}
                <li className="relative">
                    <button
                        onClick={toggleLevelCheck}
                        className="cursor-pointer flex items-center gap-1 p-4 hover:text-dark-green hover:bg-green-50 focus:outline-none"
                    >
                        Level Check
                        <span className="text-xs">▼</span>
                    </button>

                    <ul className={`${dropDownLevelCheck ? "block" : "hidden"} absolute top-full left-0 mt-2 w-40 bg-white border rounded shadow-lg z-10`}>
                        <li className="text-left w-full px-4 py-2 hover:text-dark-green hover:bg-green-50 cursor-pointer"><Link to="/levelCheck">New Form</Link></li>
                        <li className="text-left w-full px-4 py-2 hover:text-dark-green hover:bg-green-50 cursor-pointer"><button className="cursor-pointer" id="view-levelCheck" onClick={toggleLevelCheckSPR}>View Forms</button></li>
                    </ul>
                </li>

                <li className="cursor-pointer flex items-center gap-1 p-4 hover:text-dark-green hover:bg-green-50 focus:outline-none"><ExportToExcel userData={userData} /></li>
                <li className="cursor-pointer flex items-center gap-1 p-4 hover:text-dark-green hover:bg-green-50 focus:outline-none"><ImportFromExcel userData={userData} setUserData={setUserData} /></li>
            </ul >
        </nav >
    );
}

export default Navigation;