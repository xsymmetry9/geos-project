import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

function Test() {

  const [data, setData] = useState([]);
  useEffect(() =>{ axiosInstance.get("/api")
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      console.error("Error fetching data:" , error);
    })

  },[])

  return(
    <>
      <h1>Data from backend:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>  
    </>
  )
 
}

export default Test;
