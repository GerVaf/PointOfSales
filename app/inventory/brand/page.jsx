"use client";
import React, { useState, useEffect } from "react";
import { get,del } from "@/app/Global/api/inventory";

const Brand = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    get("brand")
      .then((response) => {
        console.log(response);
        console.log("GET Response:",
        setData(response.data.data));
      }
      )
      .catch((error) => {
        console.error("GET Error:", error);
      });
  }, []);

  // for deletion
  const deleteHander = (id) => {
    // console.log(id);
    del(`brand/${id}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  };
  useEffect(() => {
    del()
  },[]);


  return (
    <div className="flex flex-wrap h-full justify-center gap-8 p-8 overflow-y-scroll scrollbar-thin scrollbar-thumb-violet-700">
    {data?.map((item) => (
      <div key={item?.id} className="  bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-2 text-blue-600">{item?.name}</h2>
        <p className="text-gray-600 mb-4"> {item?.company}</p>
        <p className="text-gray-600 mb-4">{item?.agent}</p>
        <p className="text-gray-600 mb-6"> {item?.phone_no}</p>
        <div className="flex justify-between">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Details</button>
          <button onClick={() => deleteHander(item?.id)} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
        </div>
      </div>
    ))}
  </div>
  );
};

export default Brand;
