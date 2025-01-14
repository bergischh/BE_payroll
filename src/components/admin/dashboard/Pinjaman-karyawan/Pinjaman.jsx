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
    Card,
    CardBody,
} from "@material-tailwind/react";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import ButtonPagination from "../components/ButtonPagination.jsx";
import CardModal from "../components/CardModal.jsx";
import SearchTable from "../components/SearchTable.jsx";
import CardPinjam from "../components/CardPinjam.jsx";
import { fetchDataPinjaman } from "../../../../api/axios.js";

const Pinjaman = () => {
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

   // State for users, loading, and error
    const [dataPinjaman, setDataPinjaman] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);    
  
    // useEffect(() => {
    //     // Simulasi loading data selama 0.8 detik
    //     const timer = setTimeout(() => setLoading(false), 800);
    //     return () => clearTimeout(timer);
    // }, []);

     useEffect(() => {
            const getPinjaman = async () => {
                try {
                    setLoading(true);
                    const data = await fetchDataPinjaman();
                    console.log("Fetched Data Pinjaman:", data)
                    setDataPinjaman(Array.isArray(data)? data : [data]);
                } catch (error) {
                    console.error("Error fetching users:", error);
                    setError(error.message || "Failed to fetch users");
                } finally {
                    setLoading(false);
                }
            };
    
            getPinjaman();
        }, []);

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

    const TABLE_HEAD = ["No", "NIK", "Nama Karyawan", "Jumlah", "Tanggal", "Tenggat", "Action"];

    return (
        <>
        <div className="flex flex-col h-screen">
            <div className="overflow-y-auto mac-scrollbar mac-scrollbar-x mac-scrollbar-y mb-20 pr-4">
            <div className="flex items-center justify-between mb-3">
                <div className="">
                    <h1 className="text-gray-500 mb-12">Pinjaman Karyawan</h1>
                    <SearchTable /> 
                </div>
                
                <Card className="w-3/6 border border-gray-400 max-h-[223px]">
                    <CardBody className="px-3 py-4 overflow-auto">
                        <Typography variant="h6" color="blue-gray" className=" flex">
                        Approve Peminjaman
                        <Button
                            size="lg"
                            variant="outlined"
                            color="purple"
                            className="flex gap-1 ml-auto items-center rounded-full py-1 px-3 text-black relative overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-[#7E679F] opacity-40 rounded-full"></span>
                                <Icon icon="subway:admin" className="h-4 w-4 text-[#7D7D7D] relative z-10" />
                            <span className="relative z-10">4</span>
                        </Button>
                        </Typography>
                        <CardPinjam onClick={handleClose}/>
                        <CardPinjam onClick={handleClose}/>
                        <CardPinjam onClick={handleClose}/>
                    </CardBody>
                </Card>
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
                        {dataPinjaman.length > 0 ? (
                            dataPinjaman.map(({ id, karyawan_nik, karyawan_nama, jumlah_pinjaman, tanggal_pinjaman, tenggat_pinjaman  }, index) => (
                                <tr key={id}>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography variant="small" color="blue-gray" className="font-bold">
                                            {index + 1}
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {karyawan_nik}
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {karyawan_nama}
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {jumlah_pinjaman}
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {tanggal_pinjaman}
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {tenggat_pinjaman}
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Popover placement="bottom-end" open={selectedUser?.id === id} handler={() => handleOpen({ id, nama })}>
                                            <PopoverHandler>
                                                <IconButton variant="text" onClick={() => handleOpen({ id, nama })}>
                                                    <Icon icon="basil:other-1-outline" className="w-4 h-4"/>
                                                </IconButton>
                                            </PopoverHandler>
                                            <PopoverContent className="p-2" ref={popoverRef}>
                                                <div className="flex flex-col gap-2">
                                                    <CardModal
                                                        toptitle="Form Registrasi"
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

export default Pinjaman