import { Icon } from '@iconify/react';
import { useState, Suspense, lazy } from 'react';

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const [activePage, setActivePage] = useState("Dashboard"); // State untuk halaman aktif

    const menus = [
        { title: "Dashboard", icon: "ion:home", component: lazy(() => import('../admin/dashboard/Dashboard.jsx')) },
        { title: "Users", icon: "la:users-cog"},
        { title: "Data Karyawan", icon: "ic:baseline-people-alt"},
        { title: "Tunjangan Karyawan", icon: "map:health"},
        { title: "Pinjaman Karyawan", icon: "rivet-icons:money"},
        { title: "Laporan Penggajian", icon: "tabler:report"},
        { title: "Recruitmen", icon: "fluent-mdl2:recruitment-management"},
    ];

    const activeMenu = menus.find(menu => menu.title === activePage);

    return (
        <div className="flex">
            <div className={`${open ? "w-72" : "w-20"} duration-300 h-screen bg-[#A996C5] relative`}>
                <Icon icon="ri:arrow-left-double-line" className={`absolute cursor-pointer rounded-full right-1 mr-[-18px] top-9 bg-[#a3a3a3] text-white h-7 w-7 border ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />
                <div>
                    <img src="./img/vector-admin.png" alt="" className={`w-16 mx-auto duration-300 mt-8 ${!open && "pt-16 w-11"}`} />
                    <div className={`${!open && "border border-white w-8 mx-6 mt-5"}`}></div>
                    <h1 className={`text-white text-center font-medium text-xl duration-300 mt-3 ${!open && "scale-0"}`}>Admin Payroll</h1>
                    <h6 className={`text-white text-center font-medium duration-300 ${!open && "scale-0"}`}>Adminpayroll@gmail.com</h6>
                </div>
                <ul className={`${!open && "mt-[-85px]"} mt-5 ms-4`}>
                    {menus.map((menu, index) => (
                        <li
                            key={index}
                            className={`text-white text-sm flex items-center gap-x-4 cursor-pointer py-2 active:hover:bg-[#87789E] rounded-md px-3 mr-5 border-white hover:border hover:border-white relative ${activePage === menu.title ? 'bg-[#87789E] border border-white' : ''}`}
                            onClick={() => setActivePage(menu.title)} // Update halaman aktif saat diklik
                        >
                            <Icon icon={menu.icon} className='text-2xl' />
                            <span className={`${!open && "hidden"} origin-left duration-200`}>{menu.title}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="py-5 pr-5 text-2xl font-semibold flex-1 bg-[#A996C5] ">
                <div className="bg-white rounded-2xl content p-5 overflow-y-hidden" style={{ height: "calc(100vh - 40px)" }}>
                    {/* Suspense digunakan untuk menampilkan fallback saat halaman sedang dimuat */}
                    <Suspense fallback={<div>Loading...</div>}>
                        {activeMenu && <activeMenu.component />} {/* Render komponen halaman aktif */}
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
