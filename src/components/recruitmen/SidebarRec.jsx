import { useState } from "react";
import { Icon } from "@iconify/react";
import React from "react";
import Biodata from "./RecCompo/Biodata";
import Formulir from "./RecCompo/Formulir"; // Tambahkan impor untuk Formulir

const SidebarRec = () => {
  const [activePage, setActivePage] = useState("Biodata");

  const menus = [
    { title: "Biodata", icon: "gg:profile", component: Biodata },
    { title: "Formulir", icon: "material-symbols:lab-profile-outline-rounded", component: Formulir },
  ];

  const activeComponent = menus.find((menu) => menu.title === activePage)?.component;

  return (
    <>
      <div className="flex absolute w-full items-center">
        {/* Sidebar */}
        <div className="bg-white/60 w-16 flex flex-col items-center ms-6 h-96 pt-6 rounded-[15px]">
          {/* Logo */}
          <div className="mb-4">
            <img src="/img/logo.png" alt="Logo" className="w-12 h-12" />
          </div>
          {/* Menu */}
          <ul className="flex flex-col space-y-4">
            {menus.map((menu, index) => (
              <li key={index}>
                <div
                  className={`flex justify-center items-center w-12 h-12 rounded-[15px] cursor-pointer ${
                    activePage === menu.title ? "bg-[#B298D6]" : ""
                  }`}
                  onClick={() => setActivePage(menu.title)}
                >
                  <Icon icon={menu.icon} className="text-4xl font-thin" />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-10 pt-10">
          <div
            className="bg-white rounded-2xl ps-5 pt-5 pb-5 pr-4 overflow-y-hidden"
            style={{ height: "calc(100vh - 80px)" }}
          >
            {activeComponent ? (
              React.createElement(activeComponent) // Render the selected component
            ) : (
              <p className="text-center text-gray-500">Pilih menu untuk ditampilkan.</p>
            )}
          </div>
        </div>
      </div>
      <img src="/img/latarRec.png" alt="" className="w-full h-screen" />
    </>
  );
};

export default SidebarRec;
