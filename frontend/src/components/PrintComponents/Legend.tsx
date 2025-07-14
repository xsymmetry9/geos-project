import legend from "../../assets/other/legend.json";

const Legend = () => {
    console.log(legend.english);

    return(
        <caption className="border-b border-t border-slate-500 text-gray-800 text-[9.5px] mb-3">
            <div className="border-l border-r border-slate-600 grid grid-cols-10 gap-5 justify-center items-center p-[2px] bg-orange-300">
                {legend.english.map((item, index) => <div key={index} className="">{item.score}</div>)}           
            </div>
            <div className="border-l border-r border-slate-600 grid grid-cols-10 gap-5 justify-center items-center p-1 bg-white">
                {legend.english.map((item, index) => <div key={index} className="">{item.name}</div>)}
            </div>
            <div className="border-l border-r border-slate-600 grid grid-cols-10 gap-5 justify-center items-center p-[2px] bg-orange-100">
                {legend.english.map((item, index) => <div key={index} className="">{item.description}</div>)}
            </div>
        </caption>
    )

}

export default Legend;