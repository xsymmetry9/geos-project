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

const Graph = ({ userData, language }) => {

  const options = {
    plugins: {
      layout: {
        padding: 0,
      },
      legend: {
        position: "bottom",
        align: "center",
        title: {
          position: "center",
        },
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          font: { size: 13 },
          color: "black",
          padding: 24,
        },
      },
      elements:{
        line: {
          backgroundColor: "blue",
        }
      }

    },

    scales: {
      r: {
        min: 0,
        max: 10,
        ticks: {
          stepSize: 2,
          color: "#9ca3af",
        },
        padding: 0,
        grid: {
          color: "#9ca3af",
        },
        angleLines: {
          color: "#9ca3af",
        },
        pointLabels: {
          color: "rgb(0,0,0)",
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
      text("conversation", language),
      text("listening", language),

    ],
    datasets: [
      {
        label: text("initial", language),
        data: [
          userData[0].initial, 
          userData[1].initial,
          userData[2].initial, 
          userData[3].initial,
          userData[4].initial,
        ],
        backgroundColor: "transparent",
        borderColor: "#155E95",
        borderWidth: 1.8,
        pointRadius: 1.8,
        pointBorderColor: "blue",
        pointBackgroundColor: "lightblue"
      },
      {
        label: text("final", language),
        data: [
          userData[0].final,
          userData[1].final,
          userData[2].final,
          userData[3].final,
          userData[4].final,
        ],
        backgroundColor: "transparent",
        borderColor: "#5B913B",
        borderWidth: 1.8,
        pointRadius: 1.8,
        pointBorderColor: "green",
        pointBackgroundColor: "lightgreen"
      },
      {
        label: text("target", language),
        data: [
          userData[0].target,
          userData[1].target,
          userData[2].target,
          userData[3].target,
          userData[4].target,
        ],
        backgroundColor: "transparent",
        borderColor: "#BE3144",
        borderWidth: 1.8,
        pointRadius: 1.8,
        pointBorderColor: "red",
        pointBackgroundColor: "rgb(238, 112, 112)"
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
