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
import ButtonPagination from "./components/ButtonPagination";
import { fetchUsers } from "../../../api/axios"
import { deleteUser } from "../../../api/axios";
import { 
  InputEmail,
  InputUsername,
  InputPassword,
  KonfirPass,
  InputRole,
} from "./components/Inputan";

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

    // State for users, loading, and error
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRoles, setSelectedRoles] = useState([]);

    const handleRoleFilterChange = (role) => {
        setSelectedRoles((prevRoles) =>
            prevRoles.includes(role)
                ? prevRoles.filter((r) => r !== role) // Hapus jika sudah ada
                : [...prevRoles, role] // Tambahkan jika belum ada
        );
    };

    const filteredUsers = selectedRoles.length
    ? users.filter((user) => selectedRoles.includes(user.role))
    : users;

    // Fetch Users
    useEffect(() => {
        const getUsers = async () => {
            try {
                setLoading(true);
                const data = await fetchUsers();
                console.log("Fetched users:", data);
                setUsers(Array.isArray(data) ? data : [data]); // Membungkus data dalam array jika bukan array
            } catch (error) {
                console.error("Error fetching users:", error);
                setError(error.message || "Failed to fetch users");
            } finally {
                setLoading(false);
            }
        };
    
        getUsers();
    }, []);

    // Delete Users
    const handleDeleteUser = async (id) => {
        try {
          console.log("Deleting user ID:", id);
          await deleteUser(id); // Panggil fungsi dari axios.js
          // Refresh data setelah delete
          const data = await fetchUsers();
          setUsers(Array.isArray(data) ? data : [data]); // Perbarui daftar user
          alert("User successfully deleted.");
        } catch (error) {
          console.error("Error delete users:", error);
          alert("User failed to delete.");
        }
      };

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

    const TABLE_HEAD = ["No", "Username", "Role", "Email", "Action"];

    return (
        <>
            <div className="flex flex-col h-screen">
                <div className="overflow-y-auto mac-scrollbar mac-scrollbar-x mac-scrollbar-y mb-20 pr-4">
                    <div className="w-full">
                        <SearchTable posisi="mx-auto" />
                    </div>
                    <h1 className="text-gray-500 mt-5">Users</h1>
                    <div className="flex justify-between pt-6 mb-2">
                        <div className="flex">
                            <Menu dismiss={{ itemPress: false }}>
                                <MenuHandler>
                                    <Button className="flex items-center px-3 py-1 text-black bg-white border">
                                        Filter
                                        <Icon icon="gridicons:dropdown" className="h-6 w-6 ms-2" />
                                    </Button>
                                </MenuHandler>
                                <MenuList>
                                    {["admin", "manager", "karyawan", "calon_karyawan"].map((role, index) => (
                                        <MenuItem key={role} className="p-0">
                                            <label htmlFor={`role-${index}`} className="flex cursor-pointer items-center gap-2 p-2">
                                                <Checkbox
                                                    ripple={false}
                                                    id={`role-${index}`}
                                                    containerProps={{ className: "p-0" }}
                                                    className="hover:before:content-none"
                                                    checked={selectedRoles.includes(role)}
                                                    onChange={() => handleRoleFilterChange(role)}
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
                            icon={<Icon icon="mdi:account" className="w-8 h-8"/>}
                            namabtn="Tambah User"
                            iconbtn="iconamoon:folder-add-light"
                            ukiconbtn="h-6 w-6 color-white mr-1"
                            backg="bg-[#7E679F]"
                            wbtn="flex items-center gap-3 p-2"
                            input1 = {<InputUsername />}
                            input2 = {<InputEmail />}
                            input3 = {<InputRole />}
                            input4 = {<InputPassword />}  
                            input5 = {<KonfirPass />}
                            button={<Button color="blue" className="p-3" type="reset">Reset</Button>}
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
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map(({ id, username, role, email }, index) => (
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
                                                        <Icon icon="basil:other-1-outline" className="w-4 h-4" />
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
                                                        <Button color="red" size="sm" onClick={() => handleDeleteUser(id)} fullWidth className="flex px-2">
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
    );
};

export default Users;
