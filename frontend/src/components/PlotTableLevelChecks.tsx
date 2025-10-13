import React, { useMemo, useState, FC } from "react";
import chineseLevelCheck from "@/assets/other/chinese/levelCheck.json";
import englishLevelCheck from "@/assets/other/english/levelCheck.json";
import japaneseLevelCheck from "@/assets/other/japanese/levelCheck.json";
import koreanLevelCheck from "@/assets/other/korean/levelCheck.json";

type LangKey = "english" | "chinese" | "japanese" | "korean";

type LevelEntry = {
    strength?: string[];
    weakness?: string[];
    weaknesses?: string[]; // some files use this key
    [k: string]: any;
};

type CategoryData = Record<string, LevelEntry>;

type Props = {
    language?: LangKey | string;
};

const languageMap: Record<string, any> = {
    english: englishLevelCheck,
    chinese: chineseLevelCheck,
    japanese: japaneseLevelCheck,
    korean: koreanLevelCheck,
};

const AVAILABLE_CATEGORIES = [
    "speaking",
    "confidence",
    "vocabulary",
    "grammar",
    "listening",
    "conversation",
    "pronunciation",
];

const BandRow: FC<{ band: string; entry: LevelEntry }> = ({ band, entry }) => {
    const strengths = entry?.strength ?? [];
    const weaknesses = entry?.weakness ?? entry?.weaknesses ?? [];

    return (
        <tr className="border-b border-gray-200 odd:bg-white even:bg-teal-50 hover:bg-slate-100 transition-colors duration-150">
            <td className="p-3 text-center h-[40px] text-sm font-medium">{band}</td>
            <td className="p-3 text-left h-[40px] align-top max-w-[320px] break-words">
                {strengths.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {strengths.map((s: string, i: number) => (
                            <li key={i}>{s}</li>
                        ))}
                    </ul>
                ) : (
                    <span className="text-gray-500">—</span>
                )}
            </td>
            <td className="p-3 text-left h-[40px] align-top max-w-[320px] break-words">
                {weaknesses.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {weaknesses.map((w: string, i: number) => (
                            <li key={i}>{w}</li>
                        ))}
                    </ul>
                ) : (
                    <span className="text-gray-500">—</span>
                )}
            </td>
        </tr>
    );
};

const PlotTableLevelChecks: FC<Props> = ({ language = "english" }) => {
    const [category, setCategory] = useState<string>("vocabulary");

    const data = useMemo(() => {
        return (languageMap[language as string] ?? englishLevelCheck) as Record<string, any>;
    }, [language]);

    const categoryData = useMemo<CategoryData>(() => (data?.[category] ?? {}) as CategoryData, [data, category]);
    const bands = useMemo(() => Object.keys(categoryData), [categoryData]);

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <div className="flex gap-4 items-center">
                <label htmlFor="category_nav" className="text-sm font-medium">
                    Category:
                </label>

                <select
                    id="category_nav"
                    className="border rounded px-2 py-1 capitalize"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {AVAILABLE_CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            </div>

            <div className="w-full overflow-auto mt-4">
                <table className="w-full max-w-[900px] mx-auto border-l border-r border-slate-50" role="table">
                    <colgroup>
                        <col style={{ width: "100px" }} />
                        <col style={{ width: "50%" }} />
                        <col style={{ width: "50%" }} />
                    </colgroup>

                    <thead>
                        <tr className="bg-dark-green text-white font-semibold">
                            <th className="p-3 text-center text-sm uppercase tracking-wide">Level</th>
                            <th className="p-3 text-center text-sm uppercase tracking-wide">Strength</th>
                            <th className="p-3 text-center w-[120px] text-sm uppercase tracking-wide">Weakness</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bands.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="p-3 text-gray-500">
                                    No data for category "{category}".
                                </td>
                            </tr>
                        ) : (
                            bands.map((band) => <BandRow key={band} band={band} entry={categoryData[band] ?? {}} />)
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlotTableLevelChecks;