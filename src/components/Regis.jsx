import './Fonts.css';
// import './Regis-responsive.css';
// import { Input } from "@material-tailwind/react";
// import { Button } from "@material-tailwind/react";

// function Regis() {
//     return (
//         <>
//             <div className="card flex items-center justify-center h-screen mx-auto w-full absolute">
//                 <div className="card-login flex relative bg-white pl-10 rounded-[30px]">
//                     <div className="left-login pt-10 mr-14 w-[55%]">
//                         <div className="logo flex mb-14">
//                             <img src="/img/logo.png" alt="logo" className="w-16 me-5 pic-logo" />
//                             <h1 className='text-4xl flex items-center'>Create an account!</h1>
//                         </div>
//                         <form action="" method="post" className=''>
//                             <div className="">
//                                 <label htmlFor="email">Email:</label>
//                                 <Input color="purple" type='email' label="" className='email' name='email' id="email" />
//                             </div>
//                             <div className="">
//                                 <label htmlFor="username">Username:</label>
//                                 <Input color="purple" type='text' label="" className='username' name='username' id="username" />
//                             </div>
//                             <div className="mb-5">
//                                 <label htmlFor="password">Password:</label>
//                                 <Input color="purple" type='password' label="" className='password' name='password' id="password" />
//                             </div>
//                             <Button className="rounded-full bg-[#9D83C1] flex flex-col w-full items-center justify-center btn-login">Submit</Button>
//                         </form>
//                         <p className="mx-auto text-center pt-5 pb-5">Sudah punya akun? <a href="#" className='text-blue-500'>Sign Up</a></p>
//                     </div>
//                     <div className="right-login bg-[#A996C5] pt-16 w-[400px] rounded-l-none rounded-[30px]">
//                         <img src="/img/login-vector.png" alt="" className='w-full ml-[-42px] img-vector'/>
//                     </div>
//                 </div>
//             </div>
//             <img src="/img/latar-login.jpg" alt="background" className="w-full h-screen"/>
//         </>
//     );
// }

// export default Regis;

const Regis = () => {
  return (
    <div className="card flex flex-col lg:flex-row items-center justify-center h-screen mx-auto w-full relative bg-cover bg-center" style={{ backgroundImage: "url('/img/latar-login.jpg')" }}>
      <div className="flex flex-col px-3 lg:flex-row relative bg-white lg:pl-10 rounded-[30px] w-[90%] lg:w-auto">
        <div className="lg:hidden pt-10 w-full flex flex-col items-center">
          <img src="/img/logo.png" alt="logo" className="w-16 mb-5 pic-logo" />
          <img src="/img/login-vector.png" alt="vector" className="w-3/4 mb-5" />
        </div>

        <div>
          <div className="hidden lg:block left-login pt-10 lg:mr-14 w-full lg:w-[55%]">
            <div className="logo flex mb-14">
              <img src="/img/logo.png" alt="logo" className="w-16 h-16 me-5 pic-logo" />
              <h1 className="text-4xl flex items-center">Create an account!</h1>
            </div>
          </div>

          <div className="lg:hidden lg:w-[45%] lg:bg-[#A996C5] lg:pt-16 lg:rounded-l-none lg:rounded-[30px]"></div>
          <div className="lg:pt-10 lg:mr-14 w-full lg:w-[70%]">
            <form action="" method="post">
              <div className="mb-4">
                <input type="email" id="email" placeholder="Email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-400 shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
              </div>
              <div className="mb-4">
                <input type="text" id="username" placeholder="Username" name="username" className="mt-1 block w-full px-3 py-2 border border-gray-400 shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
              </div>
              <div className="mb-4">
                <input type="password" id="password" placeholder="Password" name="password" className="mt-1 block w-full px-3 py-2 border border-gray-400 shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
              </div>
              <button type="submit" className="w-full py-2 px-4 bg-[#9D83C1] text-white rounded-full shadow-sm hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">Submit</button>
            </form>
            <p className="mx-auto text-center pt-5 pb-5">Sudah punya akun? <a href="#" className="text-blue-500">Sign Up</a></p>
          </div>
        </div>

        <div className="hidden lg:block right-login bg-[#A996C5] pt-16 w-[400px] rounded-l-none rounded-[30px]">
          <img src="/img/login-vector.png" alt="vector" className="w-full ml-[-42px] img-vector" />
        </div>
      </div>
    </div>
  )
}

export default Regis