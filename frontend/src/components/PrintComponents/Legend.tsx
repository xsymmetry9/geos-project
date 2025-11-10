import legend from "@/assets/other/legend.json";
import cjkLegend from "@/assets/other/cjklegend.json";

import { Language } from "@/utils/common";
type Number = {
  min: number;
  max: number;
};

const textSize = (language: Language): string => {
  switch (language) {
  case "chinese":
    return "text-[11.5px]";
  case "japanese":
    return "text-[11.5px]";
  case "korean":
    return "text-[11.5px]";
  default:
    return "text-[9.5px]";
  }
};
export const formatNum = ({ min, max }: Number): string => {
  const formatMin = (min: any) => {
    if (min === 0) return min;

    if (min === 9.5) return min + 0.1;

    return min.toFixed(1);
  };

  const formatMax = (max: any) => {
    if (max === 9.5) return max.toFixed(1);
    return max.toFixed(1) - 0.1;
  };

  return `${formatMin(min)} - ${formatMax(max)}`;
};
const Legend = ({ language }: { language: Language }) => {
  const getLegend = () => {
    if(language === "english") {
      return legend;
    } else {
      return cjkLegend;
    }
  }

  const arr = getLegend();
  return (
    <caption
      className={`border-t border-b border-slate-500 text-gray-800 ${textSize(language)} mb-3`}
    >
      <div className="grid grid-cols-10 items-center justify-center gap-5 border-r border-l border-slate-600 bg-orange-100 p-[2px]">
        {arr[language].map((item, index) => (
          <div key={index} className="">
            {formatNum(item.score)}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-10 items-center justify-center gap-5 border-r border-l border-slate-600 bg-white p-1">
        {arr[language].map((item, index) => (
          <div key={index} className="">
            {item.name}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-10 items-center justify-center gap-5 border-r border-l border-slate-600 bg-orange-300 p-[2px]">
        {arr[language].map((item, index) => (
          <div key={index} className="">
            {item.description}
          </div>
        ))}
      </div>
    </caption>
  );
};

export default Legend;
