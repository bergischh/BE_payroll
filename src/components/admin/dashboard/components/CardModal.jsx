import React from "react";
import { 
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Icon } from "@iconify/react/dist/iconify.js";

const CardModal = (props) => {
    const [open, setOpen] = React.useState(false);
    const { 
      toptitle, 
      button = '', 
      icon, 
      namabtn = '', 
      iconbtn, 
      ukiconbtn, 
      backg, 
      wbtn, 
      input1 = '',  
      input2 = '',  
      input3 = '',  
      input4 = '',  
      input5 = '',  
      input6 = '',  
      onClick, // add onClick prop
    } = props;

    const handleOpen = () => setOpen(!open);

    return (
        <>
      <Button onClick={handleOpen} className={`${backg} ${wbtn}`}> 
        <div className="flex items-center">
          <Icon icon={iconbtn} className={ukiconbtn}/>
          {namabtn}
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
              {icon}
              {toptitle}
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
        <form action="" method="post" autoComplete="off">
          <DialogBody className="space-y-4 pb-6">
              <div className="flex gap-4">
                {input1}
                {input2}
              </div>
              <div className="flex gap-4">
                {input3}
                {input4}
              </div>
              <div className="flex gap-4">
                {input5} 
                {input6}
              </div>
          </DialogBody>
          <DialogFooter className="flex justify-end space-x-2">
              <Button color="red" onClick={handleOpen} className="p-3">
                  Cancel
              </Button>
              {button}
              <Button color="green" onClick={onClick || handleOpen} className="p-3">
                  Save
              </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}

export default CardModal;
