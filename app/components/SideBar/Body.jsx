import Link from "next/link";
import { TiHome } from "react-icons/ti";
import { GiStoneBlock } from "react-icons/gi";
import { HiDocumentText } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { IoMdArrowDropright } from "react-icons/io";
import { LuLayoutTemplate } from "react-icons/lu";
import { BsMenuDown, BsFillTicketPerforatedFill } from "react-icons/bs";
import { TbBrandAirtable } from "react-icons/tb";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Body = () => {
  const sideBarItems = [
    {
      label: "Home",
      href: "/",
      icon: <TiHome />,
    },
    {
      label: "Inventory",
      href: "/inventory",
      icon: <GiStoneBlock />,
      navIcon: <IoMdArrowDropright />,
      additional: [
        {
          label: "Products",
          href: "/inventory/products",
          icon: <LuLayoutTemplate />,
        },
        {
          label: "Brand",
          href: "/inventory/brand",
          icon: <TbBrandAirtable />,
        },
        {
          label: "Stock",
          href: "/inventory/stock",
          icon: <BsMenuDown />,
        },
      ],
    },
    {
      label: "Voucher",
      href: "/voucher",
      icon: <BsFillTicketPerforatedFill />,
    },
    {
      label: "Documents",
      href: "/document",
      icon: <HiDocumentText />,
    },
  ];
  const pathname = usePathname();
  const [isActive, setIsActive] = useState("/");

  return (
    <div className="flex flex-col h-full  font-semibold text-zinc-500 gap-3 border-b">
      {sideBarItems.map((item) => (
        <Link
          key={item.label}
          onClick={() => setIsActive(item.href)}
          href={item.href}
        >
          <motion.button
            key={item.label}
            className={`${
              item.href === isActive && "text-purple-600  bg-purple-100"
            } ${
              pathname === item.href && " border-r-2 border-purple-500"
            } hover:text-purple-600 transition duration-300 hover:bg-purple-100 hover:border-r-2 hover:border-purple-500 flex items-center py-3 rounded-sm gap-3 text-lg w-full px-10 justify-between`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex items-center gap-2">
              {item.icon}
              {item.label}
            </div>
            <span
              className={`${
                isActive === "/inventory" && "rotate-90 text-purple-600 "
              } transition duration-300 text-2xl`}
            >
              {item?.navIcon}
            </span>
          </motion.button>
          <AnimatePresence>
            {isActive === item.href && (
              <motion.div
                className="flex flex-col bg-purple-100 text-purple-600"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {item?.additional?.map((subItem) => (
                  <Link key={subItem.label} href={subItem.href}>
                    <motion.div
                      key={subItem.label}
                      className={`flex py-3 hover:bg-purple-200 w-[100%] px-10 gap-2 items-center 
                      ${
                        pathname === subItem.href
                          ? "text-purple-600 bg-purple-100 border-r-2 border-purple-500"
                          : ""
                      }`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {subItem.icon}
                      {subItem.label}
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      ))}
    </div>
  );
};

export default Body;
