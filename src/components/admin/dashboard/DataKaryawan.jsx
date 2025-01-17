import SearchTable from "./components/SearchTable"
import CardModal from "./components/CardModal"
import { Icon } from "@iconify/react/dist/iconify.js"
import { Button } from "@material-tailwind/react"
import { useEffect, useState, useRef } from "react";
import {
    Typography,
    CardFooter,
    IconButton,
    Popover,
    PopoverHandler,
    PopoverContent,
    Spinner,
} from "@material-tailwind/react";
import React from "react";
import ButtonPagination from "./components/ButtonPagination";
import { Link } from "react-router-dom";
import { fetchDataKaryawan } from "../../../api/axios";
import DetailKaryawan from "./DetailKaryawan";


const DataKaryawan = ({ onAllowDetail }) => {
    const [selectedUser, setSelectedUser] = React.useState(null);
    const popoverRef = useRef(null); // Reference for popover content

    const handleOpen = (user) => {
        setSelectedUser(user);
    };

    const handleClose = () => {
        setSelectedUser(null);
    };
    

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click is outside the popover
            if (popoverRef.current && !popoverRef.current.contains(event.target)) {
                handleClose();
            }
        };

        if (selectedUser) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectedUser]);

    // State for dataKaryawan, loading, and error
    const [dataKaryawan, setDataKaryawan] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                setLoading(true);
                const data = await fetchDataKaryawan();
                console.log("Fetched users:", data); // Debug respons API
                setDataKaryawan(data); // Set users ke state
            } catch (error) {
                console.error("Error fetching users:", error);
                setError(error.message || "Failed to fetch users");
            } finally {
                setLoading(false);
            }
        };
    
        getUsers();
    }, []);

    // const [users] = useState([
    //     { id: 1, nama: "Innalillahi Aliyah", jabatan: "admin" },
    //     { id: 2, nama: "Innalillahi Mata kiri", jabatan: "manager" },
    //     { id: 3, nama: "Michael Jachkson", jabatan: "karyawan" },
    //     { id: 4, nama: "user4", jabatan: "cal-karyawan" },
    //     { id: 5, nama: "user5", jabatan: "admin" },
    // ]);
    const TABLE_HEAD = ["No", "Nama Karyawan", "Jabatan", "Action"];
    
    // loading
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Simulasi loading data selama 0.8 detik
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const [showDetail, setShowDetail] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const handleDetail = (id) => {
        setShowDetail(true);
        setSelectedId(id);
    };

    if (showDetail) {
        return <DetailKaryawan id={selectedId} />;
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner className="h-12 w-12" />
            </div>
        );  
    }

    if (error) {
        return <div className="text-center">{error}</div>;
    }

    return (
        <>
        <div className="flex flex-col h-screen">
            <div className="overflow-y-auto mac-scrollbar mac-scrollbar-x mac-scrollbar-y mb-20 pr-4">
            <h1 className="text-gray-500 mt-5 mb-16">Data Karyawan</h1>
            <div className="flex justify-between mb-3">
                <SearchTable/>
            </div>
            <table className="w-full min-w-max table-auto text-left">
                    <thead className="rounded-lg">
                        <tr className="bg-[#967DB8] rounded-lg">
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-y p-4">
                                    <Typography variant="small" color="white" className="font-normal leading-none">
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="my-4 drop-shadow-md">
                        {dataKaryawan.length > 0 ? (
                            dataKaryawan.map(({ id, nama_karyawan, jabatan,  }, index) => (
                                <tr key={id}>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography variant="small" color="blue-gray" className="font-bold">
                                            {index + 1}
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {nama_karyawan}
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {jabatan}
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Popover placement="bottom-end" open={selectedUser?.id === id} handler={() => handleOpen({ id, nama_karyawan })}>
                                            <PopoverHandler>
                                                <IconButton variant="text" onClick={() => handleOpen({ id, nama_karyawan })}>
                                                    <Icon icon="basil:other-1-outline" className="w-4 h-4"/>
                                                </IconButton>
                                            </PopoverHandler>
                                            <PopoverContent className="p-2" ref={popoverRef}>
                                                <div className="flex flex-col gap-2">
                                                    <Button color="blue" size="sm" onClick={() => {
                                                            handleClose();
                                                            handleDetail(id);
                                                        }} fullWidth className="flex px-2">
                                                       <Icon icon="carbon:user-profile" className="h-4 w-4 mr-2" />
                                                       <Link>Detail</Link>
                                                    </Button>
                                                    <CardModal
                                                        toptitle="Edit Data Karyawan"
                                                        icon={<Icon icon="mdi:account" />}
                                                        namabtn="Edit"
                                                        iconbtn="tabler:edit"
                                                        ukiconbtn="h-4 w-4 mr-2"
                                                        backg="bg-[#FFC107]"
                                                        wbtn="p-2"
                                                        onClick={handleClose}
                                                    />
                                                    <Button color="red" size="sm" onClick={handleClose} fullWidth className="flex px-2">
                                                        <Icon icon="material-symbols:delete-outline" className="h-4 w-4 mr-2" />
                                                        Delete
                                                    </Button>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={TABLE_HEAD.length} className="text-center p-4">
                                    <Typography variant="small" color="blue-gray">
                                        No users found.
                                    </Typography>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <CardFooter className="border-t border-blue-gray-50 p-4 w-full mx-auto">
                    <ButtonPagination />
                </CardFooter>
            </div>
        </div>
        </>
    )
}

export default DataKaryawan