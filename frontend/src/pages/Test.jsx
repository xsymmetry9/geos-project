import React from "react";
import data from "@/assets/other/levelInformation.json";

// Play with sorting arrays
// const convertLevel = (level) => {
//   if(level === "10+") return 10.5;
//   return parseFloat(level);
// }
// const mergeSort = (arr) =>{
//   if(arr.length <= 1) return arr;

//   const mid = Math.floor(arr.length/2);
//   const left = mergeSort(arr.slice(0, mid));
//   const right = mergeSort(arr.slice(mid));

//   return merge(left, right);
// }

// const merge = (left, right) =>{
//   let sortedArray = [];
//   let i = 0, j= 0;

//   while(i<left.length && j<right.length){
//     if(convertLevel(left[i].level) < convertLevel(right[j].level)){
//       sortedArray.push(left[i]);
//       i++;
//     } else {
//     sortedArray.push(right[j]);
//     j++;
//   }
// }

// while (i<left.length) sortedArray.push(left[i++]);
// while (j<right.length) sortedArray.push(right[j++]);

// return sortedArray;
// }

// const PlotData = ({lang, cat}) => {
//   return(
//     <>
//        <p>{`"${cat}": [`}</p>
//         {mergeSort(data[`${lang}`][`${cat}`]).map((item, index) =>{
//           return(
//             <>
//             <p>{`{"level":"${item.level}", "description": "${item.description}"}${index != 19 ? "," : ""}`}</p>
//             </>
//           )
//         })}
//     <p>{`],`}</p>
//     </>
//   )
// }

// const PlotAll = ({arr, lang}) =>{
//   return (
//     <>
//     <p>{`"japanese":`}</p>
//       <p>{`{`}</p>
//       <PlotData lang={"japanese"} cat={"vocabulary"} />
//       <PlotData lang={"japanese"} cat={"grammar"} />
//       <PlotData lang={"japanese"} cat={"pronunciation"} />
//       <PlotData lang={"japanese"} cat={"listening"} />
//       <PlotData lang={"japanese"} cat={"conversation"} />
//       <p>{`},`}</p>
     
//     </>
//   );
// }
function Test() {

  const GetDescriptionByLevel = ({level, lang, cat}) => {
    const aspectOfLanguage = data[lang][cat]; // returns an array
    const results = aspectOfLanguage.filter((item) => item.level == level);
    const result = results[0];

    return (
    <>
      <p>{result.level}</p>
      <p>{result.description}</p>
    </>)
  }
  return(
    <>
      <GetDescriptionByLevel level = "7" lang = "english" cat ="vocabulary"/>
    </>
  )
 
}

export default Test;
