import React from "react";

export function LevelCheckInputData({data, name, inputName, handleData}) {
    return(
        <>
            <label className="block" htmlFor={inputName}>
                <span className="text-gray-700 capitalize">{name}</span>
                <input
                type="text"
                className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb] focus:outline-0"
                name= {inputName}
                value={data[inputName]}
                onChange={handleData}
                />
            </label>
        </>
    )
}

export function LevelCheckInputAspectsData({data, name, inputName, handleData}) {
    return (
        <>
            <label className="block" htmlFor={inputName}>
                <span className="text-gray-700 capitalize">{name}</span>
                <input
                type="number"
                className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb] focus:outline-0"
                name= {inputName}
                value={data[inputName]}
                onChange={handleData}
                min={0}
                max={10}
                />
            </label>
        
        </>
    )
}