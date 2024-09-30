import './Fonts.css';
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

function Login() {
    return (
        <>
            <div className="flex items-center mx-auto w-full justify-center h-screen absolute ">
                <div className="card-login flex relative bg-white pl-10 rounded-[30px]">
                    <div className="left-login pt-10 mr-28 w-5/12">
                        <div className="flex mb-14">
                            <img src="/img/logo.png" alt="logo" className="w-16 me-5" />
                            <h1 className='text-4xl flex items-center'>Welcome!</h1>
                        </div>
                        <form action="" method="post" className=''>
                            <div className="">
                                <label htmlFor="username">Username:</label>
                                <Input color="purple" type='text' label="" className='username' name='username' id="username" />
                            </div>
                            <div className="mt-5">
                                <label htmlFor="password">Password:</label>
                                <Input color="purple" type='password' label="" className='password' name='password' id="password" />
                            </div>
                            <div className="inline-flex items-center">
                                <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="check">
                                    <input
                                        type="checkbox"
                                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                                        id="check"
                                    />
                                    <span
                                        className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                            stroke="currentColor" strokeWidth="1">
                                            <path fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"></path>
                                        </svg>
                                    </span>
                                </label>
                                <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="check">
                                    Ingat Saya
                                </label>
                            </div>
                            <Button className="rounded-full bg-[#9D83C1] flex flex-col w-full items-center justify-center btn-login">Submit</Button>
                        </form>
                        <p className="mx-auto text-center pt-5 pb-5">Belum punya akun? <a href="#" className='text-blue-500'>Sign Up</a></p>
                    </div>
                    <div className="right-login bg-[#A996C5] pt-16 w-[400px] rounded-l-none rounded-[30px]">
                        <img src="/img/login-vector.png" alt="" className='w-full ml-[-42px]'/>
                    </div>
                </div>
            </div>
            <img src="/img/latar-login.jpg" alt="background" className="w-full h-screen"/>
        </>
    );
}

export default Login;
