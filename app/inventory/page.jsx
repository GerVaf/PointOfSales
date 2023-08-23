'use client'
import { useSelector } from "react-redux";

const Inventory = () => {
  const product = useSelector(state=>console.log(state))
  return (
    <div>
      I'm Inventory
    </div>
  )
};

export default Inventory;
