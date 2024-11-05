import {
    Card,
    CardHeader,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
  
import { Icon } from '@iconify/react';
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";
import '../../../../components/Fonts.css';
const Contact = () => {
    return (
        <>
            <Card className="w-full max-w-[53rem] flex-row p-4 border border-black mx-auto">
                <CardHeader
                    shadow={false}
                    floated={false}
                    className="m-0 w-5/12 shrink-0 bg-[#746997] pb-8"
                >
                    <Typography variant="h3" color="blue-gray" className="m-2 mt-8 mb-5 text text-center text-white">
                    Contact Us
                    </Typography>
                    <Typography color="white" className="mb-8 font-normal mx-6">
                    Untuk informasi lebih lanjut atau pertanyaan, Silahkan hubungi kami !
                    </Typography>
                    <Typography color="white" className="mb-8 mx-6 uppercase flex">
                    <Icon icon="ion:call" className="h-8 w-8 text-white mr-3"/>
                        +62 852-1851-2959
                    </Typography>
                    <Typography color="white" className="mb-8 mx-6 flex">
                    <Icon icon="ic:round-email" className="h-8 w-8 text-white mr-3"/>
                        Olagmail.com
                    </Typography>
                    <Typography color="white" className="mb-8 mx-6 flex">
                    <Icon icon="mdi:location" className="h-28 w-28 text-white mr-3 mt-[-40px]"/>
                    Jl. Cibeureum RT 01/03 No. 9, RT.01/RW.03, Mulyaharja, Kec. Bogor Sel., Kabupaten Bogor, Jawa Barat 16135
                    </Typography>
                </CardHeader>
                <CardBody className="mt-8">
                    <div className="flex gap-4 mb-7">
                        <Input variant="static" label="Your Name :" placeholder=""/>
                        <Input variant="static" label="Your Email :" placeholder="" />
                    </div>
                    <div className="mb-7">
                        <Input variant="static" label="Tittle :" placeholder=""/>
                    </div>
                    <Textarea size="lg" label="Message"rows={8}/>
                    <Button variant="filled" className="mt-4 bg-[#97698C]">Send Message</Button>
                </CardBody>
            </Card>
        </>
    )
}
export default Contact