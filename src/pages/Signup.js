import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import SignupGIF from "../imgs/register.gif";
import axios from "axios";
import { API } from "../API";
import { motion } from "framer-motion";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
export default function Signup() {
  const [page, setPage] = useState(1);

  const [username, setusername] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [cpassword, setcpassword] = useState();
  const [city, setcity] = useState();
  const [mobile, setmobile] = useState();
  const [isError, setIsError] = useState();
  const [ isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();
  useEffect(() => {
    setIsError(
      !username || !email || !password || !cpassword || !city || !mobile
    );
  }, [username, email, password, cpassword, city, mobile]);

  const handleSubmit = async () => {
    if (!isError) {

      setIsLoading(true)
      const reqBody = {
        username,
        email,
        mobile,
        location: city,
        password,
        cpassword,
      };

      try {
        const res = await axios.post(API + "/auth/register", reqBody);

        if (res.status === 200) {
          navigate("/login");
        }
      } catch (e) {
        alert("User not created !!");
      }

      setIsLoading(false)

    }
  };

  return (
    <motion.div
      className=" login flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="left flex-col">
        <Logo />
        <div className="form flex-col">
          <div className="flex-col">
            {page === 1 ? (
              <>
                <div>
                  <p>Username : </p>
                  <input
                    id="uname"
                    type="text"
                    value={username || ""}
                    onChange={(e) => setusername(e.target.value)}
                  />
                </div>

                <div>
                  <p>Email : </p>
                  <input
                    id="email"
                    type="email"
                    value={email || ""}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
              </>
            ) : page === 2 ? (
              <>
                <div>
                  <p>Password : </p>
                  <input
                    id="password"
                    type="password"
                    value={password || ""}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>

                <div>
                  <p>Confirm Password : </p>
                  <input
                    id="cpassword"
                    type="password"
                    value={cpassword || ""}
                    onChange={(e) => setcpassword(e.target.value)}
                  />
                </div>
              </>
            ) : page === 3 ? (
              <>
                <div>
                  <p>Location (City) : </p>
                  <input
                    id="city"
                    type="text"
                    value={city || ""}
                    onChange={(e) => setcity(e.target.value)}
                  />
                </div>

                <div>
                  <p>Mobile : </p>
                  <input
                    id="mob"
                    type="number"
                    value={mobile || ""}
                    onChange={(e) => setmobile(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
            <div className="flex-bet btns">
              <button
                className="yellow"
                disabled={page === 1}
                onClick={() => setPage(page === 1 ? page : page - 1)}
              >
                <ArrowCircleLeftIcon />
                Previous
              </button>
              <button
                className="blue"
                disabled={page === 3}
                onClick={() => setPage(page === 3 ? page : page + 1)}
              >
                Next <ArrowCircleRightIcon />
              </button>
            </div>
            <button className="blue" disabled={isError || isLoading} onClick={handleSubmit}>
              { isLoading ? "Loading ..." : "Signup"}
            </button>
          </div>
          <Link to="/login">Already have an account</Link>
        </div>
      </div>
      <div className="right flex-col">
        <img src={SignupGIF} alt="" className="img" />
        <div>
          <h1>Create Your account</h1>
          <p>Join the community!!</p>
        </div>
      </div>
    </motion.div>
  );
}
