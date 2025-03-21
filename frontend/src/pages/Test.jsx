import React, {useEffect, useState} from "react";

function Test() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() =>{
    const getData = async() =>{
      try{
        const response = await fetch("http://localhost:4000");
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

 return(
    <>
      <h1>Hello</h1>
      {loading ? <p>Loading ...</p> : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </>
  )
 
}

export default Test;
