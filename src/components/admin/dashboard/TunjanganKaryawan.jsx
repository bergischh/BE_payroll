import { useEffect, useState, useRef } from "react";
import { 
    Spinner,
    Button,
    Typography,
    CardFooter,
    Popover,
    PopoverHandler,
    PopoverContent,
    IconButton
 } from "@material-tailwind/react";
import SearchTable from "./components/SearchTable";
import CardModal from "./components/CardModal";
import { Icon } from "@iconify/react/dist/iconify.js";
import ButtonPagination from "./components/ButtonPagination";
import React from "react";
import { fetchDataTunjangan } from "../../../api/axios";

const TunjanganKaryawan = () => {
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
    const [dataTunjangan, setDataTunjangan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     // Simulasi loading data selama 0.8 detik
    //     const timer = setTimeout(() => setLoading(false), 800);
    //     return () => clearTimeout(timer);
    // }, []);

    useEffect(() => {
        const getTunjangan = async () => {
            try {
                setLoading(true);
                const data = await fetchDataTunjangan();
                console.log("Fetched Data Tunjangan:", data)
                setDataTunjangan(Array.isArray(data)? data : [data]);
            } catch (error) {
                console.error("Error fetching users:", error);
                setError(error.message || "Failed to fetch users");
            } finally {
                setLoading(false);
            }
        };

        getTunjangan();
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

    const TABLE_HEAD = ["No", "Nama Karyawan", "Jabatan", "Tunjangan Makan", "Tunjangan Kesehatan", "Tunjangan Jabatan", "THR", "Bonus", "Action"];

    return (
        <>
        <div className="flex flex-col h-screen"> 
            <div className="overflow-y-auto mac-scrollbar mac-scrollbar-x mac-scrollbar-y mb-20 pr-4">
                <h1 className="text-gray-500 mt-5 mb-16">Tunjangan Karyawan</h1>
                <div className="flex justify-between mb-3">
                    <SearchTable/>
                    <CardModal 
                            toptitle="Tambah akun User"
                            icon={<Icon icon="mdi:account" />}
                            iconbtn="iconamoon:folder-add-light"
                            namabtn="Tambah Tunjangan"
                            ukiconbtn="h-6 w-6 color-white mr-1"
                            backg="bg-[#7E679F]"
                            wbtn="flex items-center gap-3 p-2"
                            button={<Button color="blue" className="p-3">Reset</Button>}
                        />
                </div>
                <table className="w-full table-auto text-left max-w-[920px]">
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
                        {dataTunjangan.length > 0 ? (
                            dataTunjangan.map(({ id, karyawan_nama, karyawan_jabatan, tunjangan_makan, tunjangan_kesehatan, tunjangan_jabatan, THR, bonus }, index) => (
                                <tr key={id}>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography variant="small" color="blue-gray" className="font-bold">
                                            {index + 1}
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {karyawan_nama}
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {karyawan_jabatan}
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {tunjangan_makan}
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {tunjangan_kesehatan}
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {tunjangan_jabatan}
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {THR}
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {bonus}
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
                                                    <Button color="blue" size="sm" onClick={handleClose} fullWidth className="flex px-2">
                                                       <Icon icon="carbon:user-profile" className="h-4 w-4 mr-2" />
                                                        Detail
                                                    </Button>
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

export default TunjanganKaryawan