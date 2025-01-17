import {
    Card,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import DetailCalonKaryawan from "../DetailCalonKaryawan";
import { useState } from "react";


const CardDetailRekrut = () => {
    const [showDetail, setShowDetail] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const handleDetail = (id) => {
            setShowDetail(true);
            setSelectedId(id);
        };
    
        if (showDetail) {
            return <DetailCalonKaryawan id={selectedId} />;
        }
    
    return (
        <>
            <Card className="w-64 border border-black">
                <CardBody className="text-center">
                    <img src="https://docs.material-tailwind.com/img/team-3.jpg" alt="profile-picture" className="w-28 mx-auto rounded-full"/>
                    <Typography variant="h5" color="blue-gray">
                    Natalie Paisley
                    </Typography>
                    <Typography color="blue-gray" className="font-medium mb-2" textGradient>
                    12209428
                    </Typography>
                    <Button color="blue" size="sm" className="flex px-2 mx-auto" onClick={() => {handleDetail(id);}}>
                        <Icon icon="carbon:user-profile" className="h-4 w-4 mr-2" />
                        Detail
                    </Button>
                </CardBody>
            </Card>
        </>
    )
}
export default CardDetailRekrut