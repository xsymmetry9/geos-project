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

type SPR = (typeof labelText)["english"]["SPR"];
type SPRStringKey = {
  [K in keyof SPR]: SPR[K] extends string ? K : never;
}[keyof SPR];

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

const legendItems = [
  { key: "initial" as const, border: "#155E95", fill: "lightblue" },
  { key: "final" as const, border: "#5B913B", fill: "lightgreen" },
  { key: "target" as const, border: "#BE3144", fill: "rgb(238, 112, 112)" },
];

const Graph: React.FC<GraphProps> = ({ userData, language, onReady }) => {
  const readyOnce = React.useRef(false);

  const readyPlugin = React.useMemo(
    () => ({
      id: "ready-once",
      afterLayout: (chart: Chart) => {
        const canvas = chart.canvas as HTMLCanvasElement;
        if (!readyOnce.current && canvas.width > 0 && canvas.height > 0) {
          console.log("[Graph] afterLayout size:", canvas.width, canvas.height);
        }
      },
      afterRender: (chart: Chart) => {
        const canvas = chart.canvas as HTMLCanvasElement;
        if (!readyOnce.current && canvas.width > 0 && canvas.height > 0) {
          readyOnce.current = true;
          console.log("[Graph] afterRender size:", canvas.width, canvas.height);

          onReady?.();
        }
      },
    }),
    [onReady]
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    layout: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      elements: {
        line: {
          backgroundColor: "blue",
        },
      },
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
          padding: 2,
          font: {
            size: 11,
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
        pointBackgroundColor: "lightblue",
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
        pointBackgroundColor: "lightgreen",
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
        pointBackgroundColor: "rgb(238, 112, 112)",
      },
    ],
  };

  return (
    <div className="w-full">
      <div className="graph-container">
        <Radar data={graphData} options={options} plugins={[readyPlugin]} />
      </div>
      <div className="mt-0 flex flex-wrap items-center justify-center gap-x-4 gap-y-0.5 text-[12px] leading-tight text-black">
        {legendItems.map((item) => (
          <div key={item.key} className="inline-flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 shrink-0 rounded-full border"
              style={{ backgroundColor: item.fill, borderColor: item.border }}
              aria-hidden="true"
            />
            <span>{text(item.key, language)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Graph;
