// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
  
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

import Karyawan from './content-compo/Karyawan.jsx'

const Bkaryawan = () => {
    return (
        <>
            <div className="flex my-16 ms-16" id="karyawan">
                <div className="left w-4/5">
                    <h1 className='judul text-5xl pt-6 mb-10 font-semibold'><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7E679F] to-[#97698C]">Karyawan </span><br/> Saat ini</h1>
                    <div className="border-b border-black w-4/5 mb-10"></div>
                    <span className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#7E679F] to-[#97698C]">Ola Stationery </span>
                    <p className='text-2xl text mt-6 w-4/5'>Karyawan Ola Stationery berdedikasi menyediakan produk berkualitas dan layanan terbaik untuk menjaga kepuasan pelanggan.</p>
                </div>
                <div className="right">
                    <div className="absolute ml-32">
                    <div className="w-[28rem]">
                        <Swiper
                        spaceBetween={0}
                        loop={true}
                        centeredSlides={false}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay, Pagination]}
                        className="mySwiper mt-16"
                        >
                            <SwiperSlide>
                                <Karyawan img="/img/karyawan1.png" name="Sela Kresnawati"></Karyawan>
                            </SwiperSlide>
                        
                            <SwiperSlide>
                                <Karyawan img="/img/karyawan2.png" name="Amelia Puteri"></Karyawan>
                            </SwiperSlide>
                        
                        </Swiper>
                    </div>
                    </div>
                    <img src="./img/bkaryawan1.png" alt="" className="z-10 h-[110%] w-[250%]"/>
                </div>
            </div>
        </>
    )
}
export default Bkaryawan