import RenderLevel from "@/components/RenderLevel";
import labelText from "@/assets/other/labelText.json";
import { Student } from "@/type/Student";

type Language = keyof typeof labelText;
type SPR = typeof labelText["english"]["SPR"];
type SPRStringKey =  {
  [K in keyof SPR]: SPR[K] extends string ? K : never
}[keyof SPR];

const text = (phrase: SPRStringKey, language: Language): string => labelText[language]["SPR"][phrase];

interface PlotCardsProps {
  levels: Student["levels"];
  language: Language;
}

const PlotCards: React.FC<PlotCardsProps> = ({ levels, language }) => {
  const finalValue = {
    vocabulary: levels.vocabulary.final,
    grammar: levels.grammar.final,
    pronunciation: levels.pronunciation.final,
    listening: levels.listening.final,
    conversation: levels.conversation.final,
  };

  const categories = Object.keys(finalValue) as Array<keyof typeof finalValue>;

  return (
    <>
      <div id="info-card" className="grid grid-col-1 gap-3">
        {categories.map((item) => {
          return(
            <div key={item} className="border border-slate-700">
              <div id="info-card-title" key={`${item}-title`}>
                <p className="bg-[rgb(0,161,173,1)] pl-2 py-[2px] text-white font-bold capitalize">
                  {text(item as SPRStringKey, language)}
                </p>
              </div>
              <div key={`${item}-description`} className="px-2 py-1">
              <RenderLevel
                category={item}
                studentLevel={finalValue[item]}
                language={language}
              />
              </div>
          </div>
          )  
        }
        )}
      </div>
    </>
  );
};

export default PlotCards;
