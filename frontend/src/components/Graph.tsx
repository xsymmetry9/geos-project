import React from "react";
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

import type { Chart } from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

import labelText from "../assets/other/labelText.json";

type Language = keyof typeof labelText;

type SPR = typeof labelText["english"]["SPR"];
type SPRStringKey = {
  [K in keyof SPR]: SPR[K] extends string ? K : never
}[keyof SPR]

interface TransformedLevel {
  category: string;
  initial: number;
  target: number;
  final: number;
}

interface GraphProps {
  userData: TransformedLevel[];
  language: Language;
  onReady?: () => void;
}
const text = (phrase: SPRStringKey, language: Language) => labelText[language]["SPR"][phrase];

const Graph: React.FC<GraphProps> = ({ userData, language, onReady }) => {
  const readyOnce = React.useRef(false);

  const readyPlugin = React.useMemo(() => ({
    id: "ready-once",
    afterLayout: (chart: Chart) => {
      const canvas = chart.canvas as HTMLCanvasElement;
      if(!readyOnce.current && canvas.width > 0 && canvas.height > 0){
      console.log("[Graph] afterLayout size:", canvas.width, canvas.height);

      }
    },
    afterRender: (chart: Chart) => {
      const canvas = chart.canvas as HTMLCanvasElement;
      if(!readyOnce.current && canvas.width > 0 && canvas.height > 0){
        readyOnce.current = true;
        console.log("[Graph] afterRender size:", canvas.width, canvas.height);

        onReady?.();
      }
    }
  }),[onReady])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    plugins: {
      layout: {
        padding: 0,
      },
      legend: {
        position: "bottom" as const,
        align: "center" as const,
        title: {
          position: "center" as const,
        },
        labels: {
          usePointStyle: true,
          pointStyle: 'circle' as const,
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
          userData[0].initial, // vocabulary
          userData[2].initial, // grammar
          userData[1].initial, // pronunciation
          userData[4].initial, // conversation
          userData[3].initial, // listening
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
          userData[2].final,
          userData[1].final,
          userData[4].final,
          userData[3].final,
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
          userData[2].target,
          userData[1].target,
          userData[4].target,
          userData[3].target,
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
        <Radar data={graphData} options={options} plugins={[readyPlugin]}/>
      </div>
    </>
  );
};

export default Graph;
