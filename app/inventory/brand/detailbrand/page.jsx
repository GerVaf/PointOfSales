"use client";


// BrandDetail.js
import React, { useState, useEffect } from 'react';
import { get } from "@/app/Global/api/inventory";

const page = ({ brandId }) => {
  const [brandData, setBrandData] = useState({});

  useEffect(() => {
    get(`brand/${id}`)
      .then(response => {
        setBrandData(response.data);
      })
      .catch(error => {
        console.error('Error fetching brand details:', error);
      });
  }, [brandId]);

  return (
    <div>
      <h1>{brandData.name}</h1>
      <p>{brandData.description}</p>
      {/* Render other brand details */}
    </div>
  );
};

export default page;

