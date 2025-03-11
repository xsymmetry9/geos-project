import React from "react";
import data from "../../public/levelInformation.json";

const toBeSorted = [
  {"level": "1", "description": "Has the ability to use common, introductory words and phrases to express oneself."},
  {"level": "2", "description": "Has fundamental vocabulary of individual terms and phrases about specific, everyday situations."},
  {"level": "3", "description": "Possesses rudimentary vocabulary terms and phrases…onal information and fundamental practical needs."},
  {"level": "4", "description": "Demonstrates satisfactory vocabulary with fundamen… communication and essential survival situations."},
  {"level": "5", "description": "Possesses solid vocabulary for handling regular, everyday interactions about common subjects."},
  {"level": "6", "description": "Show a satisfactory vocabulary foundation to commu…avel and recent news with some rephrasing needed."},
  {"level": "7", "description": "Exhibits functional, practical vocabulary and can …topics and commonplace events with relative ease."},
  {"level": "8", "description": "Uses much of the specific and natural language acr…xpertise within the domain has been sought after."},
  {"level": "9", "description": "Maintains a strong grasp of key technical terms an… both specialized and general, everyday subjects."},
  {"level": "10", "description": "Exhibits a rich lexicon that enables speaking and …d utilizing language with precision and accuracy."},
  {"level": "1.5", "description": "Has a growing vocabulary of daily, common words an…ressions that can be used in everyday situations."},
  {"level": "2.5", "description": "Has a continuously expanding basic set of words and phrases for commonplace, everyday situations."},
  {"level": "3.5", "description": "Displays a foundational vocabulary for addressing …rds having sufficient knowledge in these aspects."},
  {"level": "4.5", "description": "Adequately addresses fundamental communication and…ntermediate interactions about familiar subjects."},
  {"level": "5.5", "description": "Has adequate vocabulary for dealing with familiar …lopment for a broader range of daily life topics."},
  {"level": "6.5", "description": "Is capable of handling regular, familiar  interact…ics with the aim of achieving greater competency."},
  {"level": "7.5", "description": "Has developed a broad vocabulary for familiar topi…l field and other specialized fields of interest."},
  {"level": "8.5", "description": "Demonstrates the ability to use much of the specif…other unfamiliar subjects, specialized and broad."},
  {"level": "9.5", "description": "Currently improving upon using less descriptive la… when using vocabulary across all subject matter."},
  {"level": "10+", "description": "Has a sophisticated lexical range and verbal arsen…atural language, colloquial expressions and slang"}
];

function Test() {

  const convertLevel = (level) => {
    if(level === "10+") return 10.5;
    return parseFloat(level);
  }
  const mergeSort = (arr) =>{
    if(arr.length <= 1) return arr;

    const mid = Math.floor(arr.length/2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
  }

  const merge = (left, right) =>{
    let sortedArray = [];
    let i = 0, j= 0;

    while(i<left.length && j<right.length){
      if(convertLevel(left[i].level) < convertLevel(right[j].level)){
        sortedArray.push(left[i]);
        i++;
      } else {
      sortedArray.push(right[j]);
      j++;
    }
  }

  while (i<left.length) sortedArray.push(left[i++]);
  while (j<right.length) sortedArray.push(right[j++]);

  return sortedArray;
  }
  return (
    <>
    <p>{`"vocabulary": [`}</p>
      {mergeSort(data.english.vocabulary).map((item, index) =>{
        return(
          <>
            <p>{`{"level":"${item.level}", "description": "${item.description}"}${index != 19 ? "," : ""}`}</p>
          </>
        )
      })}
      <p>{`],`}</p>
      <p>{`"grammar": [`}</p>
      {mergeSort(data.english.vocabulary).map((item, index) =>{
        return(
          <>
            <p>{`{"level":"${item.level}", "description": "${item.description}"}${index != 19 ? "," : ""}`}</p>
          </>
        )
      })}
      <p>{`],`}</p>
      <p>{`"pronunciation": [`}</p>
      {mergeSort(data.english.vocabulary).map((item, index) =>{
        return(
          <>
            <p>{`{"level":"${item.level}", "description": "${item.description}"}${index != 19 ? "," : ""}`}</p>
          </>
        )
      })}
      <p>{`],`}</p>
      <p>{`"listening": [`}</p>
      {mergeSort(data.english.vocabulary).map((item, index) =>{
        return(
          <>
            <p>{`{"level":"${item.level}", "description": "${item.description}"}${index != 19 ? "," : ""}`}</p>
          </>
        )
      })}
      <p>{`],`}</p>
      <p>{`"conversation": [`}</p>
      {mergeSort(data.english.vocabulary).map((item, index) =>{
        return(
          <>
            <p>{`{"level":"${item.level}", "description": "${item.description}"}${index != 19 ? "," : ""}`}</p>
          </>
        )
      })}
      <p>{`],`}</p>
      <p>{`}`}</p>
    </>
  );
}

export default Test;
