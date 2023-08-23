'use client'
import Body from "./SideBar/Body";
import Foot from "./SideBar/Foot";
import Head from "./SideBar/Head";

const SideBar = () => {
  return (
    <div className='flex flex-col h-full '>
      <div className='h-1/6'>
        <Head />
      </div>
      <div className='h-3/6'>
        <Body />
      </div>
      <div className='h-2/6 h'>
        <Foot />
      </div>
    </div>
  );
};

export default SideBar;
