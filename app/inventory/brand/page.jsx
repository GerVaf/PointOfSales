"use client";
import React, { useState, useEffect } from "react";
import { get, del, post,put } from "@/app/Global/api/inventory";
import Link from "next/link";

const Brand = () => {
  
  const [refresh, setRefresh] = useState(false);

// get brand
  const [data, setData] = useState([]);
  useEffect(() => {
    get("brand")
      .then((response) => {
        console.log(response);
        console.log("GET Response:", setData(response.data.data));
      })
      .catch((error) => {
        console.error("GET Error:", error);
      });
  }, [refresh]);


  // brand delete
  const deleteHandler = (id) => {
    del(`brand/${id}`)
      .then((response) => {
        console.log(response);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    del();
  }, []);

  
  

  // brand create logic
  const [newBrandData, setNewBrandData] = useState({
    name: "",
    company: "",
    agent: "",
    phone_no: "",
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBrandData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateFormSubmit = (event) => {
    event.preventDefault();

    post("brand", newBrandData)
      .then((response) => {
        console.log("Brand created:", response.data);
        closeModal();
        
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.error("Error creating brand:", error);
      });
  };

  // brand update

  const [updateBrandData, setUpdateBrandData] = useState({
    id: "",
    name: "",
    company: "",
    agent: "",
    phone_no: "",
  });

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  
  const openUpdateModal = (item) => {
    setUpdateBrandData({
      id: item.id,
      name: item.name,
      company: item.company,
      agent: item.agent,
      phone_no: item.phone_no,
    });
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  

  const handleUpdateFormSubmit = (event) => {
    event.preventDefault();

    put(`brand/${updateBrandData.id}`, updateBrandData)
      .then((response) => {
        console.log("Brand updated:", response.data);
        closeUpdateModal(); 
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.error("Error updating brand:", error);
      });
  };

  return (
    <div className="h-full">
      {/* brand create  */}
      <div className="flex justify-between">
        <div>Create Brand</div>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create Brand
        </button>
      </div>

      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white flex p-8 rounded-lg shadow-md animate__animated animate__fadeIn">
          <form onSubmit={handleCreateFormSubmit} className="w-full">
            <label className="block mb-2 text-gray-600">
              Name:
              <input
                type="text"
                name="name"
                value={newBrandData.name}
                onChange={handleInputChange}
                className="block w-full border rounded p-2 mt-1"
              />
            </label>
            <label className="block mb-2 text-gray-600">
              Company:
              <input
                type="text"
                name="company"
                value={newBrandData.company}
                onChange={handleInputChange}
                className="block w-full border rounded p-2 mt-1"
              />
            </label>
            <label className="block mb-2 text-gray-600">
              Agent:
              <input
                type="text"
                name="agent"
                value={newBrandData.agent}
                onChange={handleInputChange}
                className="block w-full border rounded p-2 mt-1"
              />
            </label>
            <label className="block mb-2 text-gray-600">
              Phone Number:
              <input
                type="text"
                name="phone_no"
                value={newBrandData.phone_no}
                onChange={handleInputChange}
                className="block w-full border rounded p-2 mt-1"
              />
            </label>
      
            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Create
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      
      )}
      {/* brand get */}
      <div className="flex flex-wrap h-full justify-center gap-8 p-8 overflow-y-scroll scrollbar-thin scrollbar-thumb-violet-700">
        {data?.map((item) => (
          <div
            key={item?.id}
            className="  bg-white p-8 rounded-lg shadow-md w-80"
          >
            <h2 className="text-2xl font-semibold mb-2 text-blue-600">
              {item?.name}
            </h2>
            <p className="text-gray-600 mb-4"> {item?.company}</p>
            <p className="text-gray-600 mb-4">{item?.agent}</p>
            <p className="text-gray-600 mb-6"> {item?.phone_no}</p>
            <div className="flex justify-between">
              <Link href="/inventory/brand/detailbrand/{$id}">
               
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Details
                </button>
              </Link>
              <button
                onClick={() => deleteHandler(item?.id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>

              <button
                onClick={() => openUpdateModal(item)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      {isUpdateModalOpen && (
         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate__animated animate__fadeIn">
         <div className="bg-white flex p-8 rounded-lg shadow-md animate__animated animate__fadeInUp">
           <form onSubmit={handleUpdateFormSubmit} className="w-full">
             <label className="block mb-2">
               Name:
               <input
                 type="text"
                 name="name"
                 value={updateBrandData.name}
                 onChange={(e) =>
                   setUpdateBrandData({
                     ...updateBrandData,
                     name: e.target.value,
                   })
                 }
                 className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:border-green-500"
               />
             </label>
             <label className="block mb-2">
               Company:
               <input
                 type="text"
                 name="company"
                 value={updateBrandData.company}
                 onChange={(e) =>
                   setUpdateBrandData({
                     ...updateBrandData,
                     company: e.target.value,
                   })
                 }
                 className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:border-green-500"
               />
             </label>
             <label className="block mb-2">
               Agent:
               <input
                 type="text"
                 name="agent"
                 value={updateBrandData.agent}
                 onChange={(e) =>
                   setUpdateBrandData({
                     ...updateBrandData,
                     agent: e.target.value,
                   })
                 }
                 className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:border-green-500"
               />
             </label>
             <label className="block mb-2">
               Phone Number:
               <input
                 type="text"
                 name="phone_no"
                 value={updateBrandData.phone_no}
                 onChange={(e) =>
                   setUpdateBrandData({
                     ...updateBrandData,
                     phone_no: e.target.value,
                   })
                 }
                 className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:border-green-500"
               />
             </label>
   
             <div className="flex justify-between mt-4">
               <button
                 type="submit"
                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
               >
                 Update
               </button>
               <button
                 onClick={closeUpdateModal}
                 className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
               >
                 Cancel
               </button>
             </div>
           </form>
         </div>
       </div>
      )}
    </div>
  );
};

export default Brand;
