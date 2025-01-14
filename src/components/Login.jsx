import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context-Api/AuthProvider.jsx";
import { Input, Button } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import { loginUser } from "../api/axios.js"; // Import loginUser
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Fonts.css";

function Login() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(""); // State to store the user's role
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username: user, password: pwd });x
      console.log(response);

      if (response.status === 200) {
        setSuccess(true);
        setUser("");
        setPwd("");
        
        // Assuming the API response contains the role
        setRole(response.data.role); // Set role based on response

        // Arahkan berdasarkan role
        if (response.data.role === "admin") {
          navigate("/adminSidebar");
        } else if (response.data.role === "calon_karyawan") {
          navigate("/Pengisian");
        } else {
          navigate("/"); // Default fallback jika role tidak dikenal
        }
      }
    } catch (err) {
      setErrMsg("Login Failed");
      console.log(err);
      errRef.current.focus();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
        </section>
      ) : (
        <div className="flex items-center mx-auto w-full justify-center h-screen absolute">
          <div className="card-login flex relative bg-white pl-10 rounded-[30px]">
            <div className="left-login pt-10 mr-28 w-5/12">
              <div className="flex mb-14">
                <img src="/img/logo.png" alt="logo" className="w-16 me-5" />
                <h1 className="text-4xl flex items-center">Welcome!</h1>
              </div>
              <section>
                <p
                  ref={errRef}
                  className={errMsg ? "errmsg" : "offscreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="username">Username:</label>
                    <Input
                      color="purple"
                      type="text"
                      id="username"
                      ref={userRef}
                      autoComplete="off"
                      className="username"
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mt-5 mb-4 relative">
                    <label htmlFor="password">Password:</label>
                    <Input
                      color="purple"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="password"
                      value={pwd}
                      onChange={(e) => setPwd(e.target.value)}
                      required
                      placeholder="Password"
                    />
                    <Icon
                      icon={showPassword ? "iconamoon:eye" : "iconamoon:eye-off"}
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    />
                  </div>
                  <div className="inline-flex items-center mb-4">
                    <label
                      className="relative flex items-center p-3 rounded-full cursor-pointer"
                      htmlFor="check"
                    >
                      <input
                        type="checkbox"
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all checked:border-gray-900 checked:bg-gray-900 hover:before:opacity-10"
                        id="check"
                      />
                      <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </label>
                    <label
                      className="mt-px font-light text-gray-700 cursor-pointer select-none"
                      htmlFor="check"
                    >
                      Ingat Saya
                    </label>
                  </div>
                  <Button
                    type="submit"
                    className="rounded-full bg-[#9D83C1] flex flex-col w-full items-center justify-center btn-login"
                  >
                    Submit
                  </Button>
                </form>
                <p className="mx-auto text-center pt-5 pb-5">
                  Belum punya akun?{" "}
                  <Link to="/regis" className="text-blue-500">
                    Sign Up
                  </Link>
                </p>
              </section>
            </div>
            <div className="right-login bg-[#A996C5] pt-16 w-[400px] rounded-l-none rounded-[30px]">
              <img
                src="/img/login-vector.png"
                alt=""
                className="w-full ml-[-42px]"
              />
            </div>
          </div>
        </div>
      )}
      <img
        src="/img/latar-login.jpg"
        alt="background"
        className="w-full h-screen"
      />
    </>
  );
}

export default Login;
