import { useState } from "react";
import {
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Input,
  Textarea,
  Checkbox,
  CardHeader,
  Avatar,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Icon } from "@iconify/react/dist/iconify.js";

const CardPinjam = () => {
  const [open, setOpen] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const handleOpen = () => setOpen(!open);

  const handleCheckboxClick = (e, type) => {
    e.stopPropagation(); // Prevent button click from triggering
    if (type === "green") {
      setOpen(true); // Open dialog for green checkbox
    } else if (type === "red") {
      const confirmDelete = window.confirm(
        "Apakah Anda yakin akan menghapus pengajuan peminjaman ini?"
      );
      if (confirmDelete) {
        setShowButton(false); // Remove button if confirmed
      }
    }
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    setOpen(true); // Open dialog when button is clicked outside checkboxes
  };

  return (
    <>
      {showButton && (
        <Button
          onClick={handleButtonClick}
          className="bg-gray-200 p-0 w-full my-1"
        >
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 p-3 mt-0 w-full"
          >
            <Avatar
              size="sm"
              variant="circular"
              src="./img/dua.jpeg"
              className=""
            />
            <div className="flex normal-case items-center">
              <div className="flex w-full text-start flex-col gap-0.5 mr-5">
                <p className="text-sm font-normal text-[#411F70]">Naura siti</p>
                <Typography className="text-xs text-gray-600">
                  Rp 200.000
                </Typography>
              </div>
              <div className="border-r border-black h-8"></div>
              <p className="text-xs text-[#411F70] mx-6 font-normal whitespace-nowrap">
                Kebutuhan Ekonomi
              </p>
              <div className="flex items-center gap-0">
                <Checkbox
                  color="green"
                  className="bg-transparent checked:bg-green-700 border-green-700"
                  onClick={(e) => handleCheckboxClick(e, "green")}
                />
                <Checkbox
                  icon={<Icon icon="ph:x-bold" className="w-4 h-4" />}
                  className="bg-transparent checked:bg-red-700 border-red-700"
                  onClick={(e) => handleCheckboxClick(e, "red")}
                />
              </div>
            </div>
          </CardHeader>
        </Button>
      )}
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
              <h4>Pengajuan Peminjaman</h4>
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
        <DialogBody className="space-y-4 pb-2">
          <div className="flex gap-4">
            <div className="flex flex-col w-2/4">
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 text-left font-medium text-[#411F70]"
                >
                  Nama Lengkap
                </Typography>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 text-left font-medium border bg-white p-2 rounded-lg"
                >
                  Naura siti
                </Typography>
              </div>
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 text-left font-medium text-[#411F70]"
                >
                  Total pinjaman
                </Typography>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 text-left font-medium border bg-white p-2 rounded-lg"
                >
                  Rp 200.000
                </Typography>
              </div>
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 text-left font-medium text-[#411F70]"
                >
                  Tentukan Tenggat Pembayaran
                </Typography>
                <Input
                  type="date"
                  color="gray"
                  size="lg"
                  placeholder="..."
                  name="tenggat"
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
            <div className="w-2/4">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium text-[#411F70]"
              >
                Keterangan
              </Typography>
              <div className="relative">
                <Textarea
                  variant="outlined"
                  placeholder="Description"
                  rows={8}
                  className="bg-white pb-6"
                />
              </div>
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
  );
};

export default CardPinjam;
