import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { Icon } from "@iconify/react/dist/iconify.js"
import CardElement from "./components/CardElement";
import DashChart from "./components/DashChart";
import { useState, Suspense } from 'react';

const Dashboard = () => {
    const [isOn, setIsOn] = useState(false);

    const toggleSwitch = () => {
        setIsOn(!isOn);
    };

    return (
        <>
            <div className="flex flex-col h-screen"> {/* Use full height */}
                <div className="overflow-y-scroll flex-1 mb-20">
                    <Icon icon="ph:bell-bold" className="w-8 h-8 p-1 rounded-full bg-gray-400 ml-auto" />
                    <h1 className="text-gray-500 mt-5">Hello Admin Payroll!</h1>
                    <div className="flex">
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
                    <div className="flex w-full">
                    <DashChart className="w-2/3" />
                    <Card className="mt-6 w-96">
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                            UI/UX Review Check
                            </Typography>
                            <Typography>
                            The place is close to Barceloneta Beach and bus stop just 2 min by
                            walk and near to &quot;Naviglio&quot; where you can enjoy the main
                            night life in Barcelona.
                            </Typography>
                        </CardBody>
                    </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
