"use client";

import { get } from "@/app/Global/api/inventory";
import Image from "next/image";
import { useEffect, useState } from "react";
import tea from "@/public/tea.jpg";

const Products = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    get("product")
      .then((response) => {
        console.log("GET Response:", setData(response.data.data));
      })
      .catch((error) => {
        console.error("GET Error:", error);
      });
  }, []);

  console.log(data);
  return (
    <div>
      {data?.map(() => {
        return (
          <div key={data?.name}>
            <Image alt="fakepng" src={tea} />
          </div>
        );
      })}
    </div>
  );
};

export default Products;
