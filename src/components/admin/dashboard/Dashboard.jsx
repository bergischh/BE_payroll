import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { Icon } from "@iconify/react/dist/iconify.js"
import CardElement from "./components/CardElement";
import DashChart from "./components/DashChart";
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from 'react';
import CardCheck from "./components/CardCheck";
import { getProducts } from "../../../services/product.service";

const Dashboard = ({ open }) => {
    const [isOn, setIsOn] = useState(false);

    const toggleSwitch = () => {
        setIsOn(!isOn);
    };

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts((data) => {
            console.log(data);
        })
    },[])
    return (
        <>
            <div className="flex flex-col h-screen">
                <div className="overflow-y-scroll flex-1 mb-20 scrollbar-thin scrollbar-webkit">
                    <Icon icon="ph:bell-bold" className="w-8 h-8 p-1 rounded-full bg-gray-400 ml-auto" />
                    <h1 className="text-gray-500 mt-5">Hello Admin Payroll!</h1>
                    <div className="flex">
                        {/* Menampilkan vector jika sidebar w-20 */}
                        <img src="./img/vector.png" alt="" className={`w-48 h-72 mt-14 ${open ? "hidden" : ""}`} />
                        <div className="grid gap-4 gap-y-0 grid-cols-2 w-4/6">
                            <CardElement header="Jumlah Karyawan" jumlah="2" icon="clarity:employee-group-line" ket="*Jumlah karyawan saat ini" bg="bg-green-800" logo="./img/card1.png" bgcard="bg-green-100"/>
                            <CardElement header="Pengeluaran Tunjangan" jumlah="Rp. 320.000" icon="game-icons:money-stack" ket="*Total tunjangan karyawan" bg="bg-blue-900" logo="./img/card2.png" bgcard="bg-blue-100" head="mr-8"/>
                            <CardElement header="Pinjaman Karyawan" jumlah="Rp. 500.000" icon="healthicons:money-bag-outline" ket="*Jumlah pinjaman karyawan" bg="bg-red-900" logo="./img/card3.png" bgcard="bg-red-100" head="mr-8"/>
                            <CardElement header="Recruitment" jumlah="7" icon="grommet-icons:group" ket="*Terdapat 7 peserta wawancara" bg="bg-yellow-700 p-3" logo="./img/card4.png" bgcard="bg-yellow-100"/>
                        </div>
                        <Card className="w-72 ms-5 bg-gradient-to-t from-[#7E679F] to-[#C8A1E0] mt-6">
                            <CardBody className="text-center p-0">
                                <Typography className="text-xs mt-8 mx-9 p-2">
                                    *Sudah terdapat 7 peserta wawancara sejak recruitment dimulai
                                </Typography>
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    Open Recruitment
                                </Typography>
                                <div
                                    onClick={toggleSwitch}
                                    className={`w-24 h-9 flex items-center rounded-full p-1 cursor-pointer transition-colors mx-auto mt-8 ${
                                        isOn ? 'bg-green-700' : 'bg-red-700'
                                    }`}
                                >
                                    <div
                                        className={`w-6 h-6 ms-1 bg-gray-200 rounded-full drop-shadow-xl transform transition-transform ${
                                            isOn ? 'translate-x-14' : 'translate-x-0'
                                        }`}
                                    ></div>
                                    <span className={`ml-2 text-white text-base ${
                                        isOn ? '-translate-x-4' : 'translate-x-0'}`}>
                                        {isOn ? 'ON' : 'OFF'}
                                    </span>
                                </div>
                                <div className="flex">
                                    <img src="./img/cardR.png" alt="" className="mt-5"/>
                                    <img src="./img/iconR.png" alt="" className="ml-auto"/>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="flex w-full mt-6">
                        <div className={`${open ? "w-[32rem]" : "w-[64%]"}`}>
                            <DashChart/>
                        </div>
                        <Card className="w-96 ml-auto bg-[#EDEDED] overflow-hidden">
                            <CardBody>
                                <Typography variant="h5" color="blue-gray" className="mb-2 flex">
                                    Approve Kehadiran
                                    <Button
                                        size="lg"
                                        variant="outlined"
                                        color="purple"
                                        className="flex gap-1 ml-auto items-center rounded-full py-1 px-3 text-black relative overflow-hidden"
                                    >
                                        <span className="absolute inset-0 bg-[#7E679F] opacity-40 rounded-full"></span>
                                        <Icon icon="subway:admin" className="h-4 w-4 text-[#7D7D7D] relative z-10" />
                                        <span className="relative z-10">4</span>
                                    </Button>
                                </Typography>
                                <div className="overflow-y-scroll mt-3 max-h-[290px]">
                                    <CardCheck foto="./img/satu.jpeg" name="Tania Amara" posisi="Chief Excecutive Officer"/>
                                    <CardCheck foto="./img/dua.jpeg" name="Tania Amara" posisi="Chief Excecutive Officer"/>
                                    <CardCheck foto="./img/dua.jpeg" name="Tania Amara" posisi="Chief Excecutive Officer"/>
                                    <CardCheck foto="./img/tiga.jpeg" name="Tania Amara" posisi="Chief Excecutive Officer"/>
                                    <CardCheck foto="./img/tiga.jpeg" name="Tania Amara" posisi="Chief Excecutive Officer"/>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Dashboard;
