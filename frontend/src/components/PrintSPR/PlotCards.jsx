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
      <div className="cards-container">
        <div className="card">
          <div className="title">
            <strong>
              <p className="level-card-title uppercase">
                {text("vocabulary", language)}
              </p>
            </strong>
          </div>
          <div className="description">
            <RenderLevel
              category={"vocabulary"}
              studentLevel={finalValue.vocabulary}
              language={language}
            />
          </div>
        </div>
        <div className="card">
          <div className="title">
            <strong>
              <p className="level-card-title uppercase">
                {text("grammar", language)}
              </p>
            </strong>
          </div>
          <div className="description">
            <RenderLevel
              category={"grammar"}
              studentLevel={finalValue.grammar}
              language={language}
            />
          </div>
        </div>
        <div className="card">
          <div className="title">
            <strong>
              <p className="level-card-title uppercase">
                {text("pronunciation", language)}
              </p>
            </strong>
          </div>
          <div className="description">
            <RenderLevel
              category={"pronunciation"}
              studentLevel={finalValue.pronunciation}
              language={language}
            />
          </div>
        </div>
        <div className="card">
          <div className="title">
            <strong>
              <p className="level-card-title uppercase">
                {text("listening", language)}
              </p>
            </strong>
          </div>
          <div className="description">
            <RenderLevel
              category={"listening"}
              studentLevel={finalValue.listening}
              language={language}
            />
          </div>
        </div>
        <div className="card">
          <div className="title">
            <strong>
              <p className="level-card-title uppercase">
                {text("conversation", language)}
              </p>
            </strong>
          </div>
          <div className="description">
            <RenderLevel
              category={"conversation"}
              studentLevel={finalValue.conversation}
              language={language}
            />
          </div>
        </div>
      </div>
    </>
  );
};

PlotCards.propTypes = {
  levels: PropTypes.object,
  language: PropTypes.string,
};
export default PlotCards;
