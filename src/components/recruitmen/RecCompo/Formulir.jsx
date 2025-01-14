import { 
    Progress,
    Textarea,

 } from "@material-tailwind/react";

const Formulir = () => {
    return(
        <>
        <div className="flex flex-col h-screen"> 
            <div className="overflow-y-auto mac-scrollbar mac-scrollbar-x mac-scrollbar-y pr-4">
                <div className="mx-8">
                        <div className="flex mt-4 items-center gap-3">
                            <Progress value={25} variant="gradient" className=""/>
                            <span>25%</span>
                        </div>
                        <h1 className="bio text-2xl mt-8">Penampilan Fisik</h1>
                        <p className='text-[#7D738A] mb-4 text-md'>Kerjakan dengan teliti dan jujur!</p>
                        <div className="drop-shadow-md w-full bg-gray-50 p-5 h-72">
                            <p className='text-[#7D738A] text-xs'>Question 1 of 2</p>
                            <p className="text-lg mt-4">1.  Bagaimana Anda menjaga kebersihan dan kerapihan penampilan sehari-hari?                            </p>
                            <Textarea label="Message" className="w-3/5"/>
                        </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Formulir