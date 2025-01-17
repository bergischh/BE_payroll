import { useState, useEffect } from "react";
import {
    Spinner,
    Card,
    Typography,
    Checkbox,
} from "@material-tailwind/react";
import SearchTable from "./components/SearchTable";

const PermissionRole = () => {
    const TABLE_ROWS = [
        { group: "User", action: "Data User" },
        { group: "User", action: "Tambah User" },
        { group: "User", action: "Edit User" },
        { group: "User", action: "Delete User" },

        { group: "Data Karyawan", action: "Detail Data Karyawan" },
        { group: "Data Karyawan", action: "Edit Data Karyawan" },
        { group: "Data Karyawan", action: "Delete Data Karyawan" },

        { group: "Tunjangan", action: "Data Tunjangan" },
        { group: "Tunjangan", action: "Tambah Data Tunjangan" },
        { group: "Tunjangan", action: "Edit Data Tunjangan" },
        { group: "Tunjangan", action: "Delete Data Tunjangan" },

        { group: "Pinjaman", action: "Data Pinjaman" },
        { group: "Pinjaman", action: "Data Permintaan Pinjaman" },
        { group: "Pinjaman", action: "Penerimaan Permintaan Pinjaman" },
        { group: "Pinjaman", action: "Edit Data Pinjaman" },
        { group: "Pinjaman", action: "Hapus Data Pinjaman" },

        { group: "Pembayaran", action: "Data / History Pembayaran" },

        { group: "Recruitmen", action: "Data Calon Karyawan + Jawaban Interview" },
        { group: "Recruitmen", action: "Pengisian Biodata" },
        { group: "Recruitmen", action: "Pengisian Soal Recruitmen" },
        { group: "Recruitmen", action: "Dashboard Recruitmen" },

        { group: "Periode Penggajian", action: "Data Periode Penggajian" },
        { group: "Periode Penggajian", action: "Tambah Data Periode" },
        { group: "Periode Penggajian", action: "Pencetakan Slip Gaji" },

        { group: "Penggajian", action: "Data Penggajian" },
        { group: "Penggajian", action: "Status Penggajian" },

        { group: "Kehadiran", action: "Data Kehadiran Karyawan" },
        { group: "Kehadiran", action: "Tambah Data Kehadiran" },
        { group: "Kehadiran", action: "Edit Data Kehadiran" },
    ];

    // loading
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner className="h-12 w-12" />
            </div>
        );
    }

    // Grouping logic
    let currentGroup = "";

    return (
        <div className="flex flex-col h-screen">
            <div className="overflow-y-auto mac-scrollbar mac-scrollbar-x mac-scrollbar-y mb-20 pr-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-gray-500 mt-5 mb-8">Permission Role</h1>
                    <SearchTable />
                </div>
                <div className="bg-white w-full h-8 flex">
                    <p className="text-xs text-gray-500 w-1/2 font-normal my-auto ms-4">Actions</p>
                    <p className="text-xs text-gray-500 w-1/2 font-normal my-auto">Roles</p>
                </div>
                <table className="w-full min-w-max table-auto text-left">
                    <thead className="w-full h-12 flex justify-end items-center gap-[54px] pr-8 bg-[#F8F7F7]">
                        <th className="text-sm text-gray-500 font-normal">Admin</th>
                        <th className="text-sm text-gray-500 font-normal">Manager</th>
                        <th className="text-sm text-gray-500 font-normal">Karyawan</th>
                        <th className="text-sm text-gray-500 font-normal">Calon Karyawan</th>
                    </thead>
                    <Card className="h-full w-full overflow-scroll rounded-none">
                        <tbody>
                            {TABLE_ROWS.map(({ group, action }, index) => {
                                const showGroup = group !== currentGroup;
                                if (showGroup) currentGroup = group;

                                return (
                                    <>
                                        {showGroup && (
                                            <tr key={`group-${index}`} className="">
                                                <td colSpan={5} className="px-4 pb-0 pt-4 text-xs font-normal text-gray-500">
                                                    {group}
                                                </td>
                                            </tr>
                                        )}
                                        <tr key={action} className="flex">
                                            <div className="w-1/2">
                                                <td className="p-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {action}
                                                    </Typography>
                                                </td>
                                            </div>
                                            <div className="w-1/2 flex">
                                                <td className="mx-2">
                                                    <Checkbox color="green" />
                                                </td>
                                                <td className="mx-12">
                                                    <Checkbox color="green" />
                                                </td>
                                                <td className="mx-6">
                                                    <Checkbox color="green" />
                                                </td>
                                                <td className="mx-16">
                                                    <Checkbox color="green" />
                                                </td>
                                            </div>
                                        </tr>
                                    </>
                                );
                            })}
                        </tbody>
                    </Card>
                </table>
            </div>
        </div>
    );
};

export default PermissionRole;
