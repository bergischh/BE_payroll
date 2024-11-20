import { Icon } from "@iconify/react/dist/iconify.js"
import React from "react";
import {
  Input,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Select,
  Option,
  Checkbox,
  CardHeader,
  Avatar,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const CardPinjam = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    const [showPassword, setShowPassword] = useState(false);
    const [showKonPassword, setShowKonPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    const toggleKonPasswordVisibility = () => {
        setShowKonPassword(!showKonPassword);
    }
    return(
        <>
    <Button onClick={handleOpen} className="bg-gray-200 p-0 w-full my-1"> 
    <div className="">
        <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 p-3 mt-0 w-full"
        >
            <Avatar
                size="base"
                variant="circular"
                src="./img/dua.jpeg"
                className=""
            />
            <div className="flex normal-case items-center">
                <div className="flex w-full text-start flex-col gap-0.5 mr-5">
                    <p className="text-sm font-normal text-[#411F70]">
                        Naura siti
                    </p>
                    <Typography className="text-xs text-gray-600">Rp 200.000</Typography>
                </div>
                <div className="border-r border-black h-8"></div>
                <p className="text-xs text-[#411F70] mx-6 font-normal whitespace-nowrap">
                    Kebutuhan Ekonomi
                </p>
                <div className="flex items-center gap-0">
                    <Checkbox color="green" className="bg-transparent checked:bg-green-700 border-green-700" />
                    <Checkbox
                        icon={<Icon icon="ph:x-bold" className="w-4 h-4" />}
                        className="bg-transparent checked:bg-red-700 border-red-700"
                    />
                </div>
            </div>
        </CardHeader>
    </div>
    </Button>
      <Dialog 
        size="sm" 
        open={open} 
        handler={handleOpen} 
        className="bg-center"
        style={{ backgroundImage: "url('./img/CardModal.png')" }}
        >
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            <div className="flex">
            </div>
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6">
          <div className="flex gap-4">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Nama Lengkap
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="Gabbie xx"
                name="nama"
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Email
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="gabie@gmail.com"
                name="email"
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Username
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="Karyawan gabie"
                name="username"
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div className="w-full relative">
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 text-left font-medium"
                >
                    Password
                </Typography>
                <Input
                    type={showPassword ? "text" : "password"}
                    color="gray"
                    size="lg"
                    placeholder="....."
                    name="password"
                    className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                    containerProps={{
                        className: "!min-w-full",
                    }}
                    labelProps={{
                        className: "hidden",
                    }}
                />
                <IconButton
                    variant="text"
                    color="blue-gray"
                    onClick={togglePasswordVisibility}
                    className="!absolute right-2 top-8"
                >
                    <Icon icon={showPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"} className="h-5 w-5" />
                </IconButton>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-full">
            <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
            >
                Role
            </Typography>
            <Select
                color="gray"
                size="lg"
                name="role"
                placeholder="Pilih role"
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-none focus:ring-gray-900/10"
                containerProps={{
                className: "!min-w-full",
                }}
            >
                <Option value="karyawan">Karyawan</Option>
                <Option value="admin">Admin</Option>
                <Option value="manager">Manager</Option>
                <Option value="calon_karyawan">Calon Karyawan</Option>
            </Select>
            </div>
            <div className="w-full relative">
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 text-left font-medium"
                >
                    Konfirmasi Password
                </Typography>
                <Input
                    type={showKonPassword ? "text" : "password"}
                    color="gray"
                    size="lg"
                    placeholder="....."
                    name="konfir"
                    className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                    containerProps={{
                        className: "!min-w-full",
                    }}
                    labelProps={{
                        className: "hidden",
                    }}
                />
                <IconButton
                    variant="text"
                    color="blue-gray"
                    onClick={toggleKonPasswordVisibility}
                    className="!absolute right-2 top-8"
                >
                    <Icon icon={showKonPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"} className="h-5 w-5" />
                </IconButton>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-end space-x-2">
            <Button color="red" onClick={handleOpen} className="p-3">
                Cancel
            </Button>
            <Button color="green" onClick={handleOpen} className="p-3">
                Save
            </Button>
        </DialogFooter>
      </Dialog>
        </>
    )
}
export default CardPinjam