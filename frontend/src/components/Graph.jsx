import React from "react";
import PropTypes from "prop-types";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

import labelText from "../assets/other/labelText.json";

const text = (phrase, language) => labelText[language]["SPR"][phrase];

const Graph = ({ data, language }) => {
  const { levels } = data;

  const options = {
    plugins: {
      layout: {
        padding: 0,
      },
      tooltip: false,

      legend: {
        position: "bottom",
        align: "center",
        title: {
          position: "center",
        },
        labels: {
          font: { size: 13 },
          color: "black",
        },
      },
    },

    scales: {
      r: {
        min: 1,
        max: 10,
        ticks: {
          stepSize: 2,
          color: "gray",
        },
        padding: 0,
        grid: {
          color: "gray",
        },
        angleLines: {
          color: "gray",
        },
        pointLabels: {
          color: "gray",
          font: {
            size: 12,
          },
        },
      },
    },
  };
  const graphData = {
    labels: [
      text("vocabulary", language),
      text("grammar", language),
      text("pronunciation", language),
      text("listening", language),
      text("conversation", language),
    ],
    datasets: [
      {
        label: text("initial", language),
        data: [
          levels.vocabulary.initial,
          levels.grammar.initial,
          levels.pronunciation.initial,
          levels.listening.initial,
          levels.conversation.initial,
        ],
        backgroundColor: "transparent",
        borderColor: "rgb(0, 0, 250)",
        borderWidth: 1.5,
      },
      {
        label: text("final", language),
        data: [
          levels.vocabulary.final,
          levels.grammar.final,
          levels.pronunciation.final,
          levels.listening.final,
          levels.conversation.final,
        ],
        backgroundColor: "transparent",
        borderColor: "rgb(0, 250, 0)",
        borderWidth: 1.5,
      },
      {
        label: text("target", language),
        data: [
          levels.vocabulary.target,
          levels.vocabulary.target,
          levels.grammar.target,
          levels.pronunciation.target,
          levels.conversation.target,
        ],
        backgroundColor: "transparent",
        borderColor: "rgb(250, 0, 0)",
        borderWidth: 1.5,
      },
    ],
  };

  return (
    <>
      <div className="graph-container">
        <Radar data={graphData} options={options} />
      </div>
    </>
  );
};

Graph.propTypes = {
  data: PropTypes.object,
  language: PropTypes.string,
};

export default Graph;
