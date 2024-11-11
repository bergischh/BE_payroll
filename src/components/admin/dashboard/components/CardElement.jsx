import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";

import { Icon } from "@iconify/react/dist/iconify.js"

const CardElement = (props) => {
    const { header, jumlah, icon, ket, bg, logo, bgcard, head ='' } = props;

    return (
        <Card className={`mt-6 max-w-[350px] min-h-[160px] text-center ${bgcard} text-black relative flex items-center justify-center`}>
            <CardBody className="flex flex-col justify-between relative w-full p-0 h-full">
                <div className="absolute flex flex-col justify-center items-center w-full h-full">
                    <Typography variant="h6" className={`mb-2 ${head}`}>
                        {header}
                    </Typography>
                    <Typography variant="h2" className="mb-4 mt-3">
                        {jumlah}
                    </Typography>
                    <Typography className="text-[8px] leading-none text-gray-600 mt-3">
                        {ket}
                    </Typography>
                </div>
                <Icon icon={icon} className={`w-16 h-16 p-2 text-white rounded-full ml-auto ${bg} mr-2 mt-2`} />
                <img src={logo} alt="" className="w-16 mr-auto" />
            </CardBody>
        </Card>
    );
}

export default CardElement;
