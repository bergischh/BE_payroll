import {
    Card,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import { Icon } from "@iconify/react/dist/iconify.js";
  
  const CardBayar = (props) => {
    
    const {colorBtn, icon, colorIcon, ketBtn, nama, pinjaman, tgl} = props;

    return (
      <>
        <Card className="mt-6 w-full relative overflow-hidden">
          <Icon
            icon={`${icon}`}
            className={`absolute w-36 h-36 ${colorIcon} opacity-20 pointer-events-none`}
          />
          <CardBody className="w-full">
          <Button color={`${colorBtn}`} className="rounded-full ml-auto">{ketBtn}</Button>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {nama}
            </Typography>
            <Typography color="gray">
              {pinjaman}
            </Typography>
            <Typography color="gray">
              {tgl}
            </Typography>
          </CardBody>
        </Card>
      </>
    );
  };
  
  export default CardBayar;
  