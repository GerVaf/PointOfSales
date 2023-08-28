"use client";

import React, { useState, useEffect } from "react";
import { get, post,put } from "@/app/Global/api/inventory";

const Product = () => {
  const [refresh, setRefresh] = useState(false);
  // get product logic
  const [pdata, setPdata] = useState([]);
  useEffect(() => {
    get("product")
      .then((response) => {
        console.log(response);
        console.log("GET Response:", setPdata(response.data.data));
      })
      .catch((error) => {
        console.error("GET Error:", error);
      });
  }, [refresh]);

  // select logic
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleProductSelect = (event) => {
    const selectedValue = event.target.value;
    setSelectedProductId(selectedValue);
  };

  // get stock logic
  const [data, setData] = useState([]);
  useEffect(() => {
    get("stock")
      .then((response) => {
        console.log(response);
        console.log("GET Response:", setData(response.data.data));
      })
      .catch((error) => {
        console.error("GET Error:", error);
      });
  }, [refresh]);

  // stock create logic
  const [newBrandData, setNewBrandData] = useState({
    product_id: "",
    quantity: "",
    more_information: "",
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

  // Include the selected product's ID in the newBrandData object
  newBrandData.product_id = selectedProductId;

  const handleCreateFormSubmit = (event) => {
    event.preventDefault();

    post("stock", newBrandData)
      .then((response) => {
        console.log("Stock created:", response.data);
        closeModal();
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.error("Error creating brand:", error);
      });
  };

  // stock update
  const [updateBrandData, setUpdateBrandData] = useState({
    product_id : "",
    quantity : "",
    more_information : "",
   
  });

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  updateBrandData.product_id = selectedProductId;

  const openUpdateModal = (item) => {
    setSelectedProductId(item.product_id); // Set the selected product ID for the update modal
    setUpdateBrandData({
      id: item.id,
      product_id: item.product_id,
      quantity: item.quantity,
      more_information: item.more_information,
    });
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };


  const handleUpdateFormSubmit = (event) => {
    event.preventDefault();

    put(`stock/${updateBrandData.id}`, updateBrandData)
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
    <div>
      {/* create stock */}
      <div className="flex justify-between">
        <div>Create Brand</div>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create Stock
        </button>
      </div>
      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white flex p-8 rounded-lg shadow-md animate__animated animate__fadeIn">
            <form onSubmit={handleCreateFormSubmit} className="w-full">
              <label className="block mb-2 text-gray-600">
                <div>
                  <label className="block mb-2 text-gray-600">Product Id</label>
                  <select
                    className="mb-2"
                    onChange={handleProductSelect}
                    name="product_id"
                    value={selectedProductId}
                  >
                    <option value="" disabled>
                      Choose a Product
                    </option>
                    {pdata?.map((el) => (
                      <option key={el?.id} value={el?.id}>
                        {el?.name}
                      </option>
                    ))}
                  </select>
                  {selectedProductId && (
                    <p>
                      You have selected:{" "}
                      {
                        pdata.find(
                          (productg) => productg.id === selectedProductId
                        )?.name
                      }
                    </p>
                  )}
                </div>
              </label>
              <label className="block mb-2 text-gray-600">
                Quantity
                <input
                  type="text"
                  name="quantity"
                  value={newBrandData.quantity}
                  onChange={handleInputChange}
                  className="block w-full border rounded p-2 mt-1"
                />
              </label>
              <label className="block mb-2 text-gray-600">
                More Information
                <input
                  type="text"
                  name="more_information"
                  value={newBrandData.more_information}
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

      {/* get stock */}
      <div
        className="flex flex-wrap justify-center gap-8 p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-violet-700"
        style={{ maxHeight: "80vh" }}
      >
        {" "}
        {data?.map((item) => (
          <div
            key={item?.id}
            className="  bg-white p-8 rounded-lg shadow-md w-80"
          >
            <h2 className="text-2xl font-semibold mb-2 text-blue-600">
              {item?.product_name}
            </h2>
            <p className="text-gray-600 mb-4"> {item?.quantity}</p>
            <p className="text-gray-600 mb-4">{item?.more_information}</p>
            <div className="flex justify-between">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Details
              </button>

              <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                Delete
              </button>

              <button onClick={() => openUpdateModal(item)} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                Update
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* update stock */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate__animated animate__fadeIn">
          <div className="bg-white flex p-8 rounded-lg shadow-md animate__animated animate__fadeInUp">
            <form onSubmit={handleUpdateFormSubmit} className="w-full">
              
            <label className="block mb-2 text-gray-600">
                <div>
                  <label className="block mb-2 text-gray-600">Product Id</label>
                  <select
                    className="mb-2"
                    onChange={handleProductSelect}
                    name="product_id"
                    value={updateBrandData.selectedProductId}
                  >
                    <option value="" disabled>
                      Choose a Product
                    </option>
                    {pdata?.map((el) => (
                      <option key={el?.id} value={el?.id}>
                        {el?.name}
                      </option>
                    ))}
                  </select>
                  {selectedProductId && (
                    <p>
                      You have selected:{" "}
                      {
                        pdata.find(
                          (productg) => productg.id === selectedProductId
                        )?.name
                      }
                    </p>
                  )}
                </div>
              </label>
              <label className="block mb-2">
                Quantity
                <input
                  type="text"
                  name="quantity"
                  value={updateBrandData.quantity}
                  onChange={(e) =>
                    setUpdateBrandData({
                      ...updateBrandData,
                      quantity: e.target.value,
                    })
                  }
                  className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:border-green-500"
                />
              </label>
              <label className="block mb-2">
                More Information
                <input
                  type="text"
                  name="more_information"
                  value={updateBrandData.more_information}
                  onChange={(e) =>
                    setUpdateBrandData({
                      ...updateBrandData,
                      more_information: e.target.value,
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

export default Product;
