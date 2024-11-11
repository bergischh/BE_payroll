import { useEffect, useState, useRef } from "react";
import {
    Typography,
    Button,
    CardFooter,
    IconButton,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Checkbox,
    Spinner,
    Popover,
    PopoverHandler,
    PopoverContent,
} from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import SearchTable from "./components/SearchTable";
import React from "react";
import CardModal from "./components/CardModal";

const Users = () => {
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

    const [users, setUsers] = useState([
        { id: 1, username: "user1", role: "admin", email: "user1@example.com" },
        { id: 2, username: "user2", role: "manager", email: "user2@example.com" },
        { id: 3, username: "user3", role: "karyawan", email: "user3@example.com" },
        { id: 4, username: "user4", role: "cal-karyawan", email: "user4@example.com" },
        { id: 5, username: "user5", role: "admin", email: "user5@example.com" },
    ]);
    const [loading, setLoading] = useState(false);
    const TABLE_HEAD = ["No", "Username", "Role", "Email", "Action"];

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner className="h-12 w-12" />
            </div>
        );
    }

    return (
        <>
        <div className="flex flex-col h-screen">
            <div className="overflow-y-auto mac-scrollbar mac-scrollbar-x mac-scrollbar-y mb-20 pr-4">
                <div className="w-full">
                    <SearchTable posisi="mx-auto"/>
                </div>
                <h1 className="text-gray-500 mt-5">Users</h1>
                <div className="flex justify-between pt-6 mb-2">
                    <div className="flex">
                        <Menu dismiss={{ itemPress: false }}>
                            <MenuHandler>
                                <Button className="flex items-center px-3 py-1 text-black bg-white border">
                                    Filter
                                    <Icon icon="gridicons:dropdown" className="h-6 w-6 ms-2"/>
                                </Button>
                            </MenuHandler>
                            <MenuList>
                                {["admin", "manager", "karyawan", "cal-karyawan"].map((role, index) => (
                                    <MenuItem key={role} className="p-0">
                                        <label htmlFor={`role-${index}`} className="flex cursor-pointer items-center gap-2 p-2">
                                            <Checkbox
                                                ripple={false}
                                                id={`role-${index}`}
                                                containerProps={{ className: "p-0" }}
                                                className="hover:before:content-none"
                                            />
                                            {role}
                                        </label>
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </Menu>
                    </div>
                    <CardModal
                        toptitle="Tambah akun User"
                        icon={<Icon icon="mdi:account" />}
                        namabtn="Tambah User"
                        iconbtn="iconamoon:folder-add-light"
                        ukiconbtn="h-6 w-6 color-white"
                        backg="bg-[#7E679F]"
                        wbtn="flex items-center gap-3 p-2"
                        button={<Button color="blue" className="p-3">Reset</Button>}
                    />
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
                        {users.length > 0 ? (
                            users.map(({ id, username, role, email }, index) => (
                                <tr key={id}>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography variant="small" color="blue-gray" className="font-bold">
                                            {index + 1}
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {username}
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {role}
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {email}
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Popover placement="bottom-end" open={selectedUser?.id === id} handler={() => handleOpen({ id, username })}>
                                            <PopoverHandler>
                                                <IconButton variant="text" onClick={() => handleOpen({ id, username })}>
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
                                                        button={<Button color="amber" className="p-0">Edit</Button>}
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
                    <div className="flex gap-2 justify-center pagination">
                        <Button variant="outlined" size="sm" className="p-1">
                            <Icon icon="ic:round-arrow-left" className="h-6 w-6" />
                        </Button>
                        {[1, 2, "...", 9, 10].map((page) => (
                            <IconButton key={page} variant={page === 1 ? "outlined" : "text"} size="sm">
                                {page}
                            </IconButton>
                        ))}
                        <Button variant="outlined" size="sm" className="p-1">
                            <Icon icon="ic:round-arrow-right" className="h-6 w-6" />
                        </Button>
                    </div>
                </CardFooter>
            </div>
        </div>
        </>
    );
};

export default Users;
