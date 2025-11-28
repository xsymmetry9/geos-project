import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ImportFromExcel from "@/components/ImportFromExcel";
import ExportToExcel from "@/components/ExportToExcel";

type NavigationProps = {
    setPage: (page: "view-spr" | "view-levelCheck") => void;
    setUserData: (value: any) => void;
    userData: any;
};

const Navigation = ({ setPage, userData, setUserData }: NavigationProps) => {
    const [dropDownSPR, setDropDownSPR] = useState<boolean>(false);
    const [dropDownLevelCheck, setDropDownLevelCheck] = useState<boolean>(false);

    const navRef = useRef<HTMLElement | null>(null);

    const handleChangePage = (id: "view-spr" | "view-levelCheck") => {
        setPage(id);
        setDropDownSPR(false);
        setDropDownLevelCheck(false);
    };

    const toggleSPR = () => {
        setDropDownSPR((prev) => !prev);
        setDropDownLevelCheck(false);
    };

    const toggleLevelCheck = () => {
        setDropDownLevelCheck((prev) => !prev);
        setDropDownSPR(false);
    };

    // Click outside to close dropdowns
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setDropDownSPR(false);
                setDropDownLevelCheck(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav ref={navRef} className="w-full border-b bg-white">
            <ul className="flex items-center justify-center gap-6 px-4 py-2 text-sm font-medium text-gray-700">
                {/* SPR Dropdown */}
                <li className="relative">
                    <button
                        type="button"
                        onClick={toggleSPR}
                        className="inline-flex items-center gap-1 text-gray-800 hover:text-emerald-700 focus:outline-none"
                    >
                        <span>SPR</span>
                        <span className="text-xs text-gray-400">▼</span>
                    </button>

                    {dropDownSPR && (
                        <div className="absolute left-0 z-20 mt-2 w-44 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black/5">
                            <div className="py-1 text-sm">
                                <Link
                                    to="/spr"
                                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-green-50 hover:text-emerald-800 focus:bg-green-50 focus:text-emerald-800 focus:outline-none"
                                >
                                    New Form
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => handleChangePage("view-spr")}
                                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-green-50 hover:text-emerald-800 focus:bg-green-50 focus:text-emerald-800 focus:outline-none"
                                >
                                    View Forms
                                </button>
                            </div>
                        </div>
                    )}
                </li>

                {/* Level Check Dropdown */}
                <li className="relative">
                    <button
                        type="button"
                        onClick={toggleLevelCheck}
                        className="inline-flex items-center gap-1 text-gray-800 hover:text-emerald-700 focus:outline-none"
                    >
                        <span>Level Check</span>
                        <span className="text-xs text-gray-400">▼</span>
                    </button>

                    {dropDownLevelCheck && (
                        <div className="absolute left-0 z-20 mt-2 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black/5">
                            <div className="py-1 text-sm">
                                <Link
                                    to="/levelCheck"
                                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-green-50 hover:text-emerald-800 focus:bg-green-50 focus:text-emerald-800 focus:outline-none"
                                >
                                    New Form
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => handleChangePage("view-levelCheck")}
                                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-green-50 hover:text-emerald-800 focus:bg-green-50 focus:text-emerald-800 focus:outline-none"
                                >
                                    View Forms
                                </button>
                            </div>
                        </div>
                    )}
                </li>

                {/* Export / Import (kept simple, not button-styled) */}
                <li>
                    <div className="inline-flex items-center text-gray-800 hover:text-emerald-700">
                        <ExportToExcel userData={userData} />
                    </div>
                </li>
                <li>
                    <div className="inline-flex items-center text-gray-800 hover:text-emerald-700">
                        <ImportFromExcel userData={userData} setUserData={setUserData} />
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
