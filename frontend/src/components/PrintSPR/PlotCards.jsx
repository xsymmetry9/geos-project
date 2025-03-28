import React from "react";
import PropTypes from "prop-types";
import RenderLevel from "../RenderLevel";
import labelText from "../../assets/other/labelText.json";

const text = (phrase, language) => labelText[language]["SPR"][phrase];

const PlotCards = ({ levels, language }) => {
  const finalValue = {
    vocabulary: levels.vocabulary.final,
    grammar: levels.grammar.final,
    pronunciation: levels.grammar.final,
    listening: levels.listening.final,
    conversation: levels.conversation.final,
  };
  return (
    <>
      <div id="info-card" className="grid grid-col-1 gap-3">
        {Object.keys(finalValue).map((item) => {
          return(
            <div key={item} className="border border-slate-700">
              <div id="info-card-title" key={`${item}-title`}>
                <p className="bg-[rgb(0,161,173,1)] pl-2 py-[2px] text-white font-bold capitalize">
                  {text(item, language)}
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

PlotCards.propTypes = {
  levels: PropTypes.object,
  language: PropTypes.string,
};
export default PlotCards;
