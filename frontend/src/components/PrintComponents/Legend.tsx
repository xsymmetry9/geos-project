import legend from "../../assets/other/legend.json";

const Legend = () => {
    console.log(legend.english);

    return(
        <caption className="border-b border-slate-500 text-gray-800 text-[8px] mb-3">
            <div className="border-l border-t border-r border-slate-600 grid grid-cols-10 gap-5 justify-center items-center p-[2px]">
                {legend.english.map((item, index) => <div key={index} className="">{item.score}</div>)}           
            </div>
            {/* <div className="border-t border-slate-500 grid grid-cols-10 gap-5 justify-center items-center p-1">
                {legend.english.map((item, index) => <div key={index} className="">{item.name}</div>)}
            </div> */}
            <div className="border-t border-slate-500 grid grid-cols-10 gap-5 justify-center items-center">
                {legend.english.map((item, index) => <div key={index} className="">{item.description}</div>)}
            </div>
        </caption>
    )

}

export default Legend;