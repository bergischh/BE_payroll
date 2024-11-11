import { Swiper, SwiperSlide } from 'swiper/react';
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Icon } from '@iconify/react';

import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

const Produk = () => {
    return (
        <>
          <div className="prev-custom rounded-full w-20 h-12 bg-black flex items-center justify-center my-auto">
            <Icon icon="ic:outline-arrow-back" className="h-8 w-8 text-white"/>
          </div>
          <Swiper
          cssMode={true}
          slidesPerView={3}
          spaceBetween={0}
          navigation={{
            nextEl: '.next-custom',
            prevEl: '.prev-custom',
          }}
          pagination={{
            clickable: true,  
          }}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
        >
            <SwiperSlide>
            <Card className="mt-6 w-80 h-96 rounded-[40px] bg-white border border-black">
              <CardBody className='absolute'>
                  <Typography variant="h3" className="mb-2 text">
                  Alat Tulis
                  </Typography>
                  <Typography>
                  <img src="./img/alat-tulis.png" alt="" className='w-80 mt-10 pt-6 ml-auto'/>
                  </Typography>
              </CardBody>
              <img src="./img/card.png" alt="" />
              </Card>
            </SwiperSlide>
            <SwiperSlide>
            <Card className="mt-6 w-80 h-96 rounded-[40px] bg-white border border-black">
              <CardBody className='absolute w-full'>
                  <Typography variant="h3" className="mb-2 text">
                  Buku Tulis
                  </Typography>
                  <Typography>
                  <img src="./img/buku.png" alt="" className='w-40 mt-14 pt-6 ml-auto'/>
                  </Typography>
              </CardBody>
              <img src="./img/card.png" alt="" />
              </Card>
            </SwiperSlide>
            <SwiperSlide>
            <Card className="mt-6 w-80 h-96 rounded-[40px] bg-white border border-black">
              <CardBody className='absolute'>
                  <Typography variant="h3" className="mb-2 text">
                  Perlengkapan Kerja
                  </Typography>
                  <Typography>
                  <img src="./img/alat-kerja.png" alt="" className='w-52 mt-20 ml-auto pt-6'/>
                  </Typography>
              </CardBody>
              <img src="./img/card.png" alt="" />
              </Card>
            </SwiperSlide>
            <SwiperSlide>
            <Card className="mt-6 w-80 h-96 rounded-[40px] bg-white border border-black">
              <CardBody className='absolute w-full'>
                  <Typography variant="h3" className="mb-2 text">
                  Alat Lukis
                  </Typography>
                  <Typography>
                  <img src="./img/alat-lukis.png" alt="" className='mt-6 w-80 ml-auto'/>
                  </Typography>
              </CardBody>
              <img src="./img/card.png" alt="" />
              </Card>
            </SwiperSlide>
            <SwiperSlide>
            <Card className="mt-6 w-80 h-96 rounded-[40px] bg-white border border-black">
              <CardBody className='absolute w-full'>
                  <Typography variant="h3" className="mb-2 text">
                  Jasa Print dan Fotocopy
                  </Typography>
                  <Typography>
                  <img src="./img/fotocopy.png" alt="" className='w-80 mt-6 ml-auto'/>
                  </Typography>
              </CardBody>
              <img src="./img/card.png" alt="" />
              </Card>
            </SwiperSlide>
          </Swiper>
          <div className="next-custom rounded-full w-20 h-12 bg-black flex items-center justify-center my-auto">
            <Icon icon="ic:outline-arrow-back" className="h-8 w-8 text-white rotate-180"/>
          </div>
      </>
      );
}
export default Produk
