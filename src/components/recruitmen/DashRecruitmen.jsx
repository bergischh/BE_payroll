import { Button } from "@material-tailwind/react";
import '../Fonts.css';
import { Link } from "react-router-dom";

const DashRecruitmen = () => {
    return (
        <>
            <div className="absolute mt-20 flex items-center">
                <div className="left ms-4">
                    <img src="/img/IconRec.png" alt=""/>
                </div>
                <div className="right ms-8">
                    <h1 className="hello text-6xl">Hello...</h1>
                    <p className='w-[472px] text-2xl mt-6'>Selamat datang di halaman rekruitmen kami! Kami menawarkan kesempatan karir yang menjanjikan dan lingkungan kerja nyaman. Jika anda berminat anda bisa langsung klik tombol mulai dibawah ini !</p>
                    <div className="flex mt-12">
                        <Button
                        variant="filled"
                        className="me-2 relative inline-flex items-center justify-center p-0.5 rounded-full bg-gradient-to-r from-[#5730C0] to-[#D30FC9]"
                        >
                            <Link to="/" className="relative rounded-full bg-white text-black px-8 py-2.5">
                                Kembali
                            </Link>
                        </Button>
                        <Button
                        variant="filled"
                        className="ms-2 relative inline-flex items-center justify-center p-0.5 rounded-full bg-gradient-to-r from-[#5730C0] to-[#D30FC9]"
                        >
                            <Link to="/login" className="relative rounded-full bg-white text-black px-8 py-2.5">
                                Mulai
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
            <img src="/img/logo.png" alt="" className="absolute m-4 w-14"/>
            <img src="/img/DashRec.png" alt="" className="w-full"/>
        </>
    )
}
export default DashRecruitmen