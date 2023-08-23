"use client";

import { get } from "@/app/Global/api/inventory";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import profile from "@/public/profi.png";
import food from "@/public/food.jpeg";
import Image from "next/image";

const GetDetail = () => {
  const voucherDetail = useSelector((state) => state.voucher.voucher);

  const [perData, setperData] = useState([]);

  useEffect(() => {
    get(`voucher/${voucherDetail?.id}`)
      .then((response) => {
        setperData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [voucherDetail?.id]);
  // console.log(voucherDetail);
  console.log(perData);

  return (
    <div>
      {voucherDetail === null ? (
        <p className="text-gray-700 font-bold h-[100vh] w-full flex justify-center items-center text-lg">
          Select Detail To Show Detal Data!
        </p>
      ) : (
        <div className="p-5 rounded-lg flex flex-col bg-white ">
          {/* profile and information  */}
          <div className="flex justify-around items-center">
            <Image
              className="w-16 h-16 rounded-full"
              alt="profile"
              src={profile}
            />
            <div className="font-semibold text-md flex flex-col gap-2">
              <p>{perData.customer_name}</p>
              <p>{perData.phone_number}</p>
            </div>
          </div>
          {/* product record */}
          <div className="flex flex-col gap-2">
            {perData?.records?.map((item) => {
              return (
                <div className="flex items-center justify-center" key={item.id}>
                  <Image alt="item" className="w-2/5" src={food} />
                  <div className="w-3/5 font-semibold text-start pl-5 h-full flex flex-col gap-2">
                    <p>name : {item?.product}</p>
                    <p>quantity : {item?.quantity}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {/* coast  */}
          <div className="flex flex-col gap-2 text-end">
            <p>total : {perData?.total} kyats</p>
            <p>tax : {perData?.tax} kyats</p>
            <p>coast : {perData?.net_total} kyats</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetDetail;
