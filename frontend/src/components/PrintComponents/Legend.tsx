import legend from "@/assets/other/legend.json";
import { Language } from "@/utils/common";
type Number = {
    min: number,
    max: number
}

const textSize = (language: Language): string => {
    switch(language) {
        case "chinese":
            return "text-[11.5px]";
        case "japanese":
            return "text-[11.5px]";
        case "korean":
            return "text-[11.5px]";
        default:
            return "text-[9.5px]";
    }
}   
export const formatNum = ({min, max}: Number): string => {

        const formatMin = (min : any) => {
            if(min === 0) return min;

            if(min === 9.5) return min + .1

            return min.toFixed(1);
        }

        const formatMax = (max : any) => {
            if(max === 9.5)
                return max.toFixed(1);
            return max.toFixed(1) - .1;
        }

        return `${formatMin(min)} - ${formatMax(max)}`;
    }
const Legend = ({language}: {language: Language}) => {

    console.log(language);

    console.log("SPR legend:", language);
    return(
        <caption className={`border-b border-t border-slate-500 text-gray-800 ${textSize(language)} mb-3`}>
            <div className="border-l border-r border-slate-600 grid grid-cols-10 gap-5 justify-center items-center p-[2px] bg-orange-100">
                {legend[language].map((item, index) => <div key={index} className="">{formatNum(item.score)}</div>)}           
            </div>
            <div className="border-l border-r border-slate-600 grid grid-cols-10 gap-5 justify-center items-center p-1 bg-white">
                {legend[language].map((item, index) => <div key={index} className="">{item.name}</div>)}
            </div>
            <div className="border-l border-r border-slate-600 grid grid-cols-10 gap-5 justify-center items-center p-[2px] bg-orange-300">
                {legend[language].map((item, index) => <div key={index} className="">{item.description}</div>)}
            </div>
        </caption>
    )

}

export default Legend;