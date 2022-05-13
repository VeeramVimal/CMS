import React, { useState, useEffect } from "react";
import user from "../../images/male.png";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import '../auth.scss'
import { useHistory } from "react-router-dom";
import DashbourdIcon from "../../dashbourdIcon";
import { useDispatch, useSelector } from 'react-redux';
import { authLogin, getAllCustomer, getAllAdmin } from '../action';
import BackImage from '../../../Asserts/images/backGround/pagedownload-560x420.png';
// import BackLog from '../../../Asserts/images/backGround/additional_modules_10.svg';
import { API_URL } from "../../../@configs/APIConfig";
function Login() {
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal)
  const state = useSelector((state) => state.Authorized);
  console.log("state===", state);
  const History = useHistory();

  const [EmailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [data, setData] = useState({
    Email: "",
    Password: "",
  });

  //** customer list show */
  useEffect(() => {
    dispatch(getAllCustomer(`${API_URL}/customer`))
  }, [dispatch, state.allData?.length])

useEffect(() => {
    dispatch(getAllAdmin(`${API_URL}/admin`))
}, [dispatch, state.allAdmin?.length])

  const InputChange = (event) => {
    switch (event.target.name) {
      case "Email":
        setData({ ...data, ...{ Email: event.target.value } });
        break;
      case "Password":
        setData({ ...data, ...{ Password: event.target.value } });
        break;
      default:
        break;
    }
    validationCheck(event.target)
  };

  //** validation functionality */
  const [pass, setpass] = useState([]);
  const validationCheck = (target) => {
    let isValid = true;
    {
      if (target.name == 'Email') {
        let emailAdminErr = state.allAdmin?.filter((el) => (el.Email == target.value))
        let emailCustomerErr = state.allData?.filter((el) => (el.Email == target.value));
        var emailErr;
        if (emailAdminErr?.length) {
          emailErr = emailAdminErr 
        } else if (emailCustomerErr?.length) {
          emailErr = emailCustomerErr
        }

        var z = []
        for (let i = 0; i < emailErr?.length; i++) {
          z = emailErr[i]
          setpass(emailErr[i]);
        }

        if (z.Email !== target.value) {
          isValid = false;
          // setEmailError('Enter valid Email!', 'Enter mail is not match!')
          setEmailError('Enter mail is not match!')
        } else {
          setEmailError('')
        }

      } else if (target.name == 'Password') {
        if (target.value == "") {
          setPasswordError("Please enter your Password.");
          isValid = false;

        } else if (target.value !== pass?.PasswordConfirm) {
          isValid = false;
          setPasswordError("Password is not match");
        } else {
          setPasswordError("")
        }
      }
    }
    return isValid

  };

  const redirected = () => {
    return History.push({
      pathname: "/home",
    })
  }

  const handleResSubmit = () => {
    History.push({
      pathname: "/register",
      data: {}
    })
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { Email, Password } = data;
    const submitData = {
      Email: Email,
      Password: Password,
    };
    if (pass.role == 'admin') {
      dispatch(authLogin(`${API_URL}/auth/Admin/login`, submitData, redirected));
    } else if (pass.role == 'customer') {
      dispatch(authLogin(`${API_URL}/auth/customer/login`, submitData, redirected))
    }
  };


  return (
    <section className="logIn_section">
      {/* <DashbourdIcon /> */}
      <div className="container">
        <div className="row">
          <div className="col-md-4 card_log">
            <div className="card card_cr">
              <div className="card-body log_content">
                <h4>New Customer</h4>
                <div className="main_about">
                  <h6>Register Account</h6>
                  <p>
                    {" "}
                    As such,tourism is a product of modern social arrangements,
                    beginning in the 17th century, although it is Classical
                    antiquity.
                  </p>
                  <div className="form-group">
                    <Button type="submit"
                      className="btn btn-lg button_click"
                      // style={{ backgroundColor: "#1e87e4", float: "left", }}
                      onClick={handleResSubmit}>Click</Button></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 card_log">
            <div className="card card_form" style={{ border: "0px" }}>
              <div className="card-body log_content">
                <h4>Returning Customer</h4>
                <div className="main_about">
                  <h6>I am a Returning Customer</h6>
                  <div className="row">
                    <div className="col-sm-12">
                      <form className="log_form" onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label> Email Address &nbsp; </label>
                          <input
                            className="form-control"
                            type="email"
                            placeholder="Enter your Email"
                            name="Email"
                            value={data.Email}
                            onChange={InputChange}
                          />
                          <div className="error">{EmailError}</div>
                        </div>
                        <div className="form-group">
                          <label> Password </label>
                          <input
                            className="form-control"
                            type="password"
                            placeholder="Password"
                            name="Password"
                            value={data.Password}
                            onChange={InputChange}
                          />
                          <div className="error">{PasswordError}</div>
                        </div>
                        <div className="form-group">
                          <Button block size="lg" className="btn btn-success btn-lg button_press" type="submit">
                            LogIn
                          </Button>{" "}
                          {""}
                        </div>

                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 card_clr">
            <div className="card card_cr">
              <span className="">
                <img className="" src={BackImage} alt="BackImage"/>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Login;
