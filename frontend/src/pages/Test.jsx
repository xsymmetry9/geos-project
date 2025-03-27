import React, {useEffect, useState} from "react";

//Get all levels
function Test() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() =>{
    const getData = async() =>{
      try{
        const response = await fetch("http://localhost:4000/api/english");
        if(!response.ok) {
          throw new Error("Network response not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.log("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    }
    getData()
  },[])
  console.log(data.data[0]);

 return(
    <>
      <h1>Hello</h1>
      {loading ? <p>Loading ...</p> : (
        data.data.map((item) => <p>{item.description}</p>))}
    </>
  )
 
}

export default Test;
