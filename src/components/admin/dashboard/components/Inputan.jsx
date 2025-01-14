import { 
    Typography,
    Input,
    IconButton,
    Select,
    Option,
} from "@material-tailwind/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

// Rename the component to follow camelCase convention
export const InputNama = () => {
    return (
        <div className="w-full">
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                Nama Lengkap
            </Typography>
            <Input
                color="gray"
                size="lg"
                placeholder="Gabbie xx"
                name="nama"
                autoComplete="off"
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                containerProps={{ className: "!min-w-full" }}
                labelProps={{ className: "hidden" }}
            />
        </div>
    );
};

export const InputEmail = () => {
    return (
        <div className="w-full">
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                Email
            </Typography>
            <Input
                color="gray"
                size="lg"
                placeholder="gabie@gmail.com"
                name="email"
                autoComplete="off"
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                containerProps={{ className: "!min-w-full" }}
                labelProps={{ className: "hidden" }}
            />
        </div>
    );
};

export const InputUsername = () => {
    return (
        <div className="w-full">
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                Username
            </Typography>
            <Input
                color="gray"
                size="lg"
                placeholder="Karyawan gabie"
                name="username"
                autoComplete="off"
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                containerProps={{ className: "!min-w-full" }}
                labelProps={{ className: "hidden" }}
            />
        </div>
    );
};

export const InputPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className="w-full relative">
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                Password
            </Typography>
            <Input
                type={showPassword ? "text" : "password"}
                color="gray"
                size="lg"
                placeholder="....."
                name="password"
                autoComplete="off"
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                containerProps={{ className: "!min-w-full" }}
                labelProps={{ className: "hidden" }}
            />
            <IconButton variant="text" color="blue-gray" onClick={togglePasswordVisibility} className="!absolute right-2 top-8">
                <Icon icon={showPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"} className="h-5 w-5" />
            </IconButton>
        </div>
    );
};

export const KonfirPass = () => {
    const [showKonPassword, setShowKonPassword] = useState(false);
    const toggleKonPasswordVisibility = () => setShowKonPassword(!showKonPassword);

    return (
        <div className="w-full relative">
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                Konfirmasi Password
            </Typography>
            <Input
                type={showKonPassword ? "text" : "password"}
                color="gray"
                size="lg"
                placeholder="....."
                name="konfir"
                autoComplete="off"
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                containerProps={{ className: "!min-w-full" }}
                labelProps={{ className: "hidden" }}
            />
            <IconButton variant="text" color="blue-gray" onClick={toggleKonPasswordVisibility} className="!absolute right-2 top-8">
                <Icon icon={showKonPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"} className="h-5 w-5" />
            </IconButton>
        </div>
    );
};

export const InputRole = () => {
    return (
        <div className="w-full">
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                Role
            </Typography>
            <Select
                color="gray"
                size="lg"
                name="role"
                autoComplete="off"
                placeholder="Pilih role"
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-none focus:ring-gray-900/10"
                containerProps={{ className: "!min-w-full" }}
            >
                <Option value="karyawan">Karyawan</Option>
                <Option value="admin">Admin</Option>
                <Option value="manager">Manager</Option>
                <Option value="calon_karyawan">Calon Karyawan</Option>
            </Select>
        </div>
    );
};
