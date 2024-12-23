import React from "react";
import {Radar} from "react-chartjs-2";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const Graph = (data) =>{
    const options = {
        plugins:{
            layout:{
                padding: 0
            },
            tooltip: false,

            legend:{
                position: "bottom",
                align: "center",
                title: {
                    position: "center",
                },
                labels:{
                    font: {size: 12},
                    color: "black"
                },
            },
        },

        scales: {
            r: {
                min: 1,
                max: 10,
                ticks: {
                    stepSize: 2,
                    color: "gray"
                },
                padding: 0,
                grid:{
                    color: "gray",
                },
                angleLines:{
                    color: "gray",
                },
                pointLabels:{
                    color: "gray",
                    font: {
                        size: 11,
                    },
                }
             
            }
        },
        
    };
    const graphData = {
        labels: ["Vocabulary", "Grammar", "Pronunciation", "Listening", "Conversation"],
        datasets:[
            {
                label: "Initial",
                data: [data.levels[0].initial, data.levels[1].initial, data.levels[2].initial, data.levels[3].initial, data.levels[4].initial],
                backgroundColor: "transparent",
                borderColor: 'rgb(0, 0, 250)',
                borderWidth: 1.5,
            },
            {
                label: "Final",
                data: [data.levels[0].final, data.levels[1].final, data.levels[2].final, data.levels[3].final, data.levels[4].final],
                backgroundColor: "transparent",
                borderColor: 'rgb(0, 250, 0)',
                borderWidth: 1.5,
            },
            {
                label: "Target",
                data: [data.levels[0].target, data.levels[1].target, data.levels[2].target, data.levels[3].target, data.levels[4].target],
                backgroundColor: "transparent",
                borderColor: 'rgb(250, 0, 0)',
                borderWidth: 1.5,
            }

        ]
    }
    
    return(
        <>
            <div className="graph-container">
                <Radar
                    data = {graphData}
                    options = {options}
                />
            </div>
        
        </>
    )
}

export default Graph;