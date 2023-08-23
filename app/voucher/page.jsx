"use client";
import { useEffect, useState } from "react";
import { del, get } from "../Global/api/inventory";
import GetDetail from "./components/GetDetail";
import { useDispatch } from "react-redux";
import { addvoucher } from "../Global/Slice/voucherSlice";

const Voucher = () => {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    get("/voucher")
      .then((response) => {
        console.log(setData(response.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // console.log(data);

  // for deletion
  const deleteHander = (id) => {
    // console.log(id);
    del(`voucher/${id}`)
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
    <div className=" flex h-[100vh] ">
      {/* for voucher layout  */}
      <div className="flex w-8/12 flex-wrap overflow-y-scroll scrollbar-thin scrollbar-thumb-violet-700 pb-16">
        {data?.map((vou) => {
          return (
            <div key={vou?.id} className="w-6/12 px-10 py-5">
              <div className=" flex flex-col bg-gradient-to-r from-purple-500 to-purple-600 w-full text-gray-100 rounded-lg p-5 text-xl">
                {/* name and amount  */}
                <div className="flex ">
                  {/* name and phone  */}
                  <div className="w-7/12 flex flex-col gap-5">
                    <h1>{vou?.customer_name}</h1>
                    <p>{vou?.phone_number}</p>
                  </div>
                  {/* amount  */}
                  <div className="w-5/12 flex flex-col gap-5 justify-center text-center  ">
                    <p className="text-sm font-semibold">Amount</p>
                    <span className="font-bold">{vou?.net_total} kyats</span>
                  </div>
                </div>
                {/* for beauty  */}
                <div className="my-5 flex items-center relative  ">
                  <div className=" w-12 h-12 bg-purple-200 rounded-full absolute  right-[-50px]"></div>
                  <div className="w-full border-b-2 border-dashed border-white"></div>
                  <div className=" w-12 h-12 bg-purple-200 rounded-full absolute  left-[-50px]"></div>
                </div>
                {/* product count and detail btn  */}
                <div className="flex">
                  <div className="w-6/12 font-semibold flex flex-col text-sm">
                    <span>Product Count - {vou?.count}</span>
                    <p>To view detail product</p>
                  </div>
                  <div className="w-6/12 flex justify-around">
                    <button
                      onClick={() => dispatch(addvoucher(vou))}
                      className=" rounded-lg text-lg font-bold  bg-white text-purple-600 hover:text-white hover:bg-purple-700 transition duration-200 px-3 py-2 "
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => deleteHander(vou?.id)}
                      className=" rounded-lg text-lg font-bold  bg-white text-red-600 hover:text-white hover:bg-red-500 transition duration-200 px-3 py-2 "
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* for detail voucher  */}
      <div className="w-4/12 overflow-hidden bg-purple-100 p-5">
        <GetDetail />
      </div>
    </div>
  );
};

export default Voucher;
