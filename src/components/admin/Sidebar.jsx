import { Icon } from '@iconify/react';
import { useState } from 'react';
import Dashboard from '../admin/dashboard/Dashboard.jsx';
import Users from '../admin/dashboard/Users.jsx';
import DataKaryawan from './dashboard/DataKaryawan.jsx';
import TunjanganKaryawan from './dashboard/TunjanganKaryawan.jsx';
import Pinjaman from './dashboard/Pinjaman-karyawan/Pinjaman.jsx';
import Pembayaran from './dashboard/Pinjaman-karyawan/Pembayaran.jsx';
import React from 'react';
import Recruitment from './dashboard/Recruitmen.jsx';
import DetailKaryawan from './dashboard/DetailKaryawan.jsx';


const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const [activePage, setActivePage] = useState("Dashboard");
    const [openAccordion, setOpenAccordion] = useState(null); // Track which accordion is open
    const [detailView, setDetailView] = useState(null);

    const menus = [
        { title: "Dashboard", icon: "ion:home", component: Dashboard },
        { title: "Users", icon: "la:users-cog", component: Users },
        { title: "Data Karyawan", icon: "ic:baseline-people-alt", component: DataKaryawan },
        { title: "Tunjangan Karyawan", icon: "map:health", component: TunjanganKaryawan },
        {
            title: "Pinjaman Karyawan",
            icon: "rivet-icons:money",
            subMenus: [
                { title: "Pinjaman", icon: "solar:hand-money-outline", component: Pinjaman },
                { title: "Pembayaran", icon: "fluent:payment-32-filled", component: Pembayaran },
            ],
        },
        { title: "Laporan Penggajian", icon: "tabler:report" },
        { title: "Recruitmen", icon: "fluent-mdl2:recruitment-management", component: Recruitment },
    ];

    const activeMenu = menus.find(
        (menu) =>
            menu.title === activePage ||
            menu.subMenus?.some((sub) => sub.title === activePage)
    );

    const activeComponent =
        activeMenu?.subMenus?.find((sub) => sub.title === activePage)?.component || activeMenu?.component;


    return (
        <div className="flex">
            <div className={`${open ? "w-72" : "w-20"} duration-300 h-screen bg-[#A996C5] relative`}>
                <Icon
                    icon="ri:arrow-left-double-line"
                    className={`absolute cursor-pointer rounded-full right-1 mr-[-18px] top-9 bg-[#a3a3a3] text-white h-7 w-7 border ${
                        !open && "rotate-180"
                    }`}
                    onClick={() => setOpen(!open)}
                />
                <div>
                    <img
                        src="./img/vector-admin.png"
                        alt=""
                        className={`w-16 mx-auto duration-300 mt-8 ${!open && "pt-16 w-11"}`}
                    />
                    <div className={`${!open && "border border-white w-8 mx-6 mt-5"}`}></div>
                    <h1 className={`text-white text-center font-medium text-xl duration-300 mt-3 ${!open && "scale-0"}`}>
                        Admin Payroll
                    </h1>
                    <h6 className={`text-white text-center font-medium duration-300 ${!open && "scale-0"}`}>
                        Adminpayroll@gmail.com
                    </h6>
                </div>
                <ul className={`${!open && "mt-[-85px]"} mt-5 ms-4`}>
                    {menus.map((menu, index) => (
                        <li key={index}>
                            <div
                                className={`text-white text-sm flex items-center gap-x-4 cursor-pointer py-2 rounded-md px-3 mr-5 border-white ${
                                    menu.subMenus ? "" : activePage === menu.title ? "bg-[#87789E] border border-white" : ""
                                }`}
                                onClick={() => {
                                    if (menu.subMenus) {
                                        setOpenAccordion((prev) => (prev === menu.title ? null : menu.title)); // Toggle accordion
                                    } else {
                                        setActivePage(menu.title);
                                        setOpenAccordion(null); // Tutup accordion jika berpindah menu
                                    }
                                }}
                            >
                                <Icon icon={menu.icon} className="text-2xl" />
                                <span className={`${!open && "hidden"} origin-left duration-200`}>{menu.title}</span>
                                {menu.subMenus && (
                                    <Icon
                                        icon="mdi:chevron-down"
                                        className={`ml-auto duration-200 ${openAccordion === menu.title ? "rotate-180" : ""}`}
                                    />
                                )}
                            </div>
                            {/* Sub-menu */}
                            {menu.subMenus && openAccordion === menu.title && (
                                <div className="rounded-md mt-2 px-4 py-2">
                                    <ul className="space-y-1">
                                        {menu.subMenus.map((subMenu, subIndex) => (
                                            <li
                                                key={subIndex}
                                                className={`text-sm flex items-center gap-x-4 py-2 px-2 rounded-md cursor-pointer text-white ${
                                                    activePage === subMenu.title ? "bg-[#87789E] border border-white" : ""
                                                }`}
                                                onClick={() => setActivePage(subMenu.title)}
                                            >
                                                <Icon icon={subMenu.icon} className="text-2xl" />
                                                {subMenu.title}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="py-5 pr-5 text-2xl font-semibold flex-1 bg-[#A996C5] ">
                <div
                    className="bg-white rounded-2xl content ps-5 pt-5 pb-5 pr-4 overflow-y-hidden"
                    style={{ height: "calc(100vh - 40px)" }}
                >
                    {activeComponent ? (
                        React.createElement(activeComponent, { open }) // Render component dynamically
                    ) : (
                        <p className="text-center text-gray-500">Pilih menu untuk ditampilkan.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
