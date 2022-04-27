//** react */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { API_URL, API_URL_BASE, IMAGE_URL_BASE } from "../../../@configs/APIConfig";

//** field design in bootstrap */
import { Button } from 'react-bootstrap';
import { Label } from "reactstrap";
import { useDropzone } from "react-dropzone";
import moment from 'moment';
import FontAwesome from "react-fontawesome";
import DatePicker from "react-datepicker";
// import { toast } from 'react-toastify';

//** style scss */
import '../auth.scss';
import "font-awesome/css/font-awesome.css";

//** state action */
import { register_create, getSingleCustomer, updatedCustomer } from "../action";

//** dummy & background image */
// import BackImage from '../../../Asserts/images/backGround/craft-cms-web-design.webp';
import BackImage from '../../../Asserts/images/backGround/craft-cms-web-design.webp';

import DummyProfile from "../../../Asserts/images/profile/pic1.png";

//** other components import */
import DashbourdIcon from "../../dashbourdIcon";
import Banner from "../../Banner";

function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams()
  const state = useSelector((state) => state.Authorized);
  const singleCustomer = useSelector((state) => state.Authorized.singleCustomer)
  //** edit state value */
  const [editCustomer, setEditCustomer] = useState([]);
  const [buttonState, setButtonState] = useState(true);
  const [isEditButton, setIsEditButton] = useState(true);
  const [num, setNum] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //** validation state */
  const [firstNameErr, setFirstNameErr] = useState('');
  const [lastNameErr, setLastNameErr] = useState('');
  const [phoneNumErr, setPhoneNumErr] = useState("")
  const [EmailError, setEmailError] = useState('');
  const [PasswordError, setPasswordError] = useState('');
  const [PasswordConfirmError, setPasswordConfirmError] = useState('');
  const [DobError, setDobErr] = useState('');

  //** image update */
  // const [image, setImage] = useState({ preview: "", raw: "" });
  // const [imageRaw, setImageRaw] = useState([]);
  const [checked, setChecked] = useState(false);

  const [data, setData] = useState({
    FirstName: "",
    LastName: "",
    DOB: "",
    Email: "",
    avatar: "",
    Gender: '',
    Mobile_number: "",
    Password: "",
    PasswordConfirm: ""
  });
  console.log("avatar ==image-==", data);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "application/png,.jpg,.jpeg,.png",
    onDrop: (acceptedFile) => {
      console.log(acceptedFile, "====acceptedFile===", acceptedFile[0]);
      setData({ ...data, avatar: acceptedFile[0] })
    }
  })

  //** local storage getValue */
  const [dashbourt, setDashbourt] = useState([]);
  console.log("dashbourt==", dashbourt);
  useEffect(() => {
    let LocalValue = localStorage.getItem('data');
    var get = []
    if (LocalValue) {
      get.push(JSON.parse(LocalValue))
    }
    setDashbourt(get)
  }, [])

  //** edit functionalities */
  useEffect(() => {
    if (id) {
      dispatch(getSingleCustomer(`${API_URL}/customer/${id}`))
      setEditCustomer(state.singleCustomer)
    }
  }, [id])
  useEffect(() => {
    if (id && singleCustomer) {
      setEditCustomer(singleCustomer)
    }

  }, [id, singleCustomer])

  useEffect(() => {
    const isDataVal = Object.keys(data).some((item) => {
      return item !== "FirstName" && data[item] !== ""
    })
    if (isDataVal) {
      setButtonState(false)
    }

    if (
      editCustomer &&
      (data.FirstName !== editCustomer.FirstName ||
        data.LastName !== editCustomer.LastName ||
        data.DOB !== editCustomer.DOB ||
        data.Email !== editCustomer.Email ||
        data.Gender !== editCustomer.Gender ||
        data.avatar !== editCustomer.avatar ||
        data.Mobile_number !== editCustomer.Mobile_number)) {
      setButtonState(false);
      setIsEditButton(false);
    }
  }, [data])

  useEffect(() => {
    if (editCustomer && editCustomer.length !== 0) {
      console.log("editCustomer===", editCustomer);
      setDisabled(true)
      setIsEditButton(true);
      setNum(editCustomer._id);
      var imageValue = editCustomer?.avatar;
      var imgPath = imageValue?.slice(13, 47)
      const imgBase = `${IMAGE_URL_BASE}/${imgPath}`
      console.log(imgPath, "===imgBase==", imgBase );
      const editValue = {
        FirstName: editCustomer?.FirstName,
        LastName: editCustomer?.LastName,
        DOB: moment.utc(editCustomer?.DOB).local().format("YYYY-MM-DD HH:mm:ss"),
        // DOB: editCustomer?.DOB,
        Email: editCustomer?.Email,
        Gender: editCustomer?.Gender,
        avatar: editCustomer?.avatar,
        Mobile_number: editCustomer?.Mobile_number,
        Password: editCustomer?.PasswordConfirm,
        PasswordConfirm: editCustomer?.PasswordConfirm
      }
      setData(editValue)
    }
  }, [editCustomer])

  const InputChange = (event) => {
    switch (event.target.name) {
      case 'FirstName':
        setData({ ...data, ...{ "FirstName": event.target.value } });
        break;
      case 'LastName':
        setData({ ...data, ...{ "LastName": event.target.value } });
        break;
      case 'DOB':
        setData({ ...data, ...{ "DOB": event.target.value } });
        break;
      case 'Email':
        setData({ ...data, ...{ "Email": event.target.value } });
        break;
      case 'Mobile_number':
        setData({ ...data, ...{ "Mobile_number": event.target.value } });
        break;
      case 'Password':
        setData({ ...data, ...{ "Password": event.target.value } });
        break;
      case 'PasswordConfirm':
        setData({ ...data, ...{ "PasswordConfirm": event.target.value } });
        break;
      default:
        break;
    }
    validationCheck(event.target.value)
  }

  const validationCheck = (value) => {
    let isValid = true;
    if (data.FirstName == "" || data.FirstName == undefined) {
      setFirstNameErr("First Name must be between 1 and 32 characters!")
      isValid = false
    } else {
      setFirstNameErr("")
    }

    if (data.LastName == "" || data.LastName === undefined) {
      setLastNameErr("Last Name must be between 1 and 32 characters!")
      isValid = false
    } else {
      setLastNameErr("")
    }

    if (data.DOB == "" || data.DOB === undefined) {
      setDobErr("DOB field is required")
      isValid = false
    } else {
      setDobErr("")
    }

    let emailReg = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
    if (data.Email == "" || data.Email === undefined) {
      setEmailError("Email field is required")
      isValid = false
    } else if (!emailReg.test(data.Email)) {
      setEmailError("Email Address does not appear to be valid")
      isValid = false
    } else {
      setEmailError("")
    }

    let phoneReg = /^[6-9]\d{9}$/
    if (data.Mobile_number == "" || data.Mobile_number === undefined) {
      setPhoneNumErr("Mobile_number field is required")
      isValid = false
    } else if (!phoneReg.test(data.Mobile_number)) {
      setPhoneNumErr("Phone Number must be between 10 characters!")
      isValid = false
    } else {
      setPhoneNumErr("")
    }


    let passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{6,18}/g
    //  alert(data.Password)
    if (data.Password == "" || data.Password === undefined) {
      setPasswordError("Password field is required")
      isValid = false
    } else if (!passwordRegex.test(data.Password)) {
      setPasswordError(" Password should contain atleast one uppercase, atleast one lowercase, atleast one number, atleast one special character and minimum 6 and maximum 18")
      isValid = false
    } else {
      setPasswordError("")
    }

    if (data.PasswordConfirm == "" || data.PasswordConfirm === undefined) {
      setPasswordConfirmError("Password field is required")
      isValid = false
    } else if (data.Password !== data.PasswordConfirm) {
      setPasswordConfirmError(" Password should not be matched")
      isValid = false
    } else {
      setPasswordConfirmError("")
    }

    return isValid;
  }

  // image functionality

  // const handleImageChange = e => {
  //   if (e.target.files.length) {
  //     setImage({
  //       preview: URL.createObjectURL(e.target.files[0])
  //     });
  //     var data = [];
  //     for (let i = 0; i < e.target.files.length; i++) {
  //       const element = e.target.files[i];
  //       data.push(element);
  //     }
  //     setImageRaw(data);

  //   }
  // };

  const handleClick = () => {
    setChecked(!checked)
  };

  //** Gender radio btn functionality */ 
  const handleChange = (e) => {
    setData({ ...data, Gender: e.target.value});
  };

  //** redirect to click */
  const redirected = () => {
    return history.push('/')
  }
  const editRedirected = () => {
    return history.push('/home')
  }

  //** submit functionality */
  const handleSubmit = (event) => {
    event.preventDefault();
    const addFormData = new FormData();
    addFormData.append('admin_id', dashbourt.map(el => el._id)[0])
    addFormData.append("FirstName", data.FirstName);
    addFormData.append("LastName", data.LastName);
    addFormData.append("DOB", data.DOB);
    addFormData.append("Email", data.Email);
    addFormData.append("Gender", data.Gender);
    addFormData.append("Mobile_number", data.Mobile_number);
    addFormData.append("Password", data.Password);
    addFormData.append("PasswordConfirm", data.PasswordConfirm);
    addFormData.append("avatar", data.avatar);

    const editFormData = new FormData();
    editFormData.append("FirstName", data.FirstName);
    editFormData.append("LastName", data.LastName);
    editFormData.append("DOB", data.DOB);
    editFormData.append("Email", data.Email);
    editFormData.append("Gender", data.Gender);
    editFormData.append("Mobile_number", data.Mobile_number);
    editFormData.append("avatar", data.avatar);

    if (!checked) {
      alert("go to read our terms and condiions")
    } else {
      var validstatus = validationCheck();
      console.log("validstatus===", validstatus);
      if (!num && validstatus) {
        console.log("addFormData===", addFormData);
        dispatch(register_create(`${API_URL}/customer/addStaff`, addFormData, redirected))
      }
      else if (num && validstatus) {
        console.log("editFormData==", editFormData);
        dispatch(updatedCustomer(`${API_URL}/customer/updateStaff/${id}`, editFormData, editRedirected))
      }
    }

  }


  return (
    <section className="register_page">
      <Banner />
      <DashbourdIcon />
      <div className='container'>
        <div className="row">
          <div className='col-sm-10'>
            <h5 className="head_reg">{num ? "Update Account" : "Register Account"}</h5>
            {!num ? <p className="para_reg">If you already have an Account with us, go login at the Login Page</p> : <p className="para_reg">If you can updated your details, go login at the Login Page</p>}
            <h6 className="subHead_reg">Your Personal Details</h6>
            <div className="shorted_hr">
              <hr className="short" />
            </div>
            <div className="row">
              <div className='col-sm-12 center'>
                <form className="reg_form" onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <label> FirstName </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter your FirstName"
                      name="FirstName"
                      value={data.FirstName}
                      onChange={InputChange}
                    />
                    <div className="error">
                      {firstNameErr}</div>
                  </div>
                  <div className='form-group'>
                    <label> LastName </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter your LastName"
                      name="LastName"
                      value={data.LastName}
                      onChange={InputChange}
                    />
                    <div className="error">
                      {lastNameErr}</div>
                  </div>

                  <div className='form-group'>
                    <label style={{ marginRight: "2.4rem" }}>DOB </label>
                    <input
                      className="form-control ml-xl-6"
                      type="date"
                      placeholder="Date of Birth"
                      name="DOB"
                      value={data.DOB}
                      onChange={InputChange}
                    />
                    <div className="error">
                      {DobError}</div>
                  </div>
                  <div className='form-group'>
                    <label style={{ marginRight: "1rem" }}> EmailID </label>
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Enter your Email"
                      name="Email"
                      value={data.Email}
                      onChange={InputChange}
                    />
                    <div className="error">
                      {EmailError}</div>
                  </div>

                  <div className='form-group'>
                    <label style={{ marginRight: "5px" }}> PhoneNo </label>
                    <input
                      className="form-control"
                      type="text"
                      maxlength={10}
                      minLength={10}
                      placeholder="Enter your Phone"
                      name="Mobile_number"
                      value={data.Mobile_number}
                      onChange={InputChange}
                    />
                    <div className="error">
                      {phoneNumErr}</div>
                  </div>
                  {/* <div className="form-group">
                      <div className="radio-btn-container">
                        <input type="radio" name="sex" value="male" id="male" onChange={handleChange} data-icon='' />
                        <input type="radio" name="sex" value="female" id="female" onChange={handleChange} data-icon='' />
                        <p>You gender is : {gender}</p>
                      </div>
                  </div> */}
                  <div className="form-group">
                      <div className="wrapper">
                        <input type="radio" name="sex" value="male" onChange={handleChange} id="option-1"/>
                        <input type="radio" name="sex" value="female" onChange={handleChange} id="option-2" />
                        <label for="option-1" className="option option-1">
                          <div className="dot"></div>
                          <span>Male</span>
                        </label>
                        <label for="option-2" className="option option-2">
                          <div className="dot"></div>
                          <span>Female</span>
                        </label>
                      </div>
                      <p>You gender is : {data.Gender}</p>
                  </div>
                  

                      <div className="form-group">
                        <div {...getRootProps({ className: "dropzone" })}>
                          <Label for="profile">profile pic</Label>
                          <input className="form-control" type="text" {...getInputProps()} />
                          <p className="profilepic1 p1-1 pointer">
                            {data.avatar ? data.avatar?.path ? data.avatar.path : data.avatar?.replace(/^.*[\\\/]/, '') : ''}
                          </p>
                        </div>
                      </div><br />

                      <h6 className="subHead_reg">Your Password</h6>
                      <div className="shorted_hr" >
                        <hr className="short" />
                      </div>
                      <div className='form-group'>
                        <label style={{ marginRight: "5px" }}> Password </label>
                        <input
                          className="form-control"
                          type="password"
                          placeholder="Password"
                          name="Password"
                          value={data.Password}
                          onChange={InputChange}
                          disabled={disabled}
                        />
                        <div className="error">
                          {PasswordError}</div>

                      </div>
                      <div className='form-group'>
                        <label style={{ marginRight: "14px" }}>Confirm </label>
                        <input
                          className="form-control"
                          type="password"
                          placeholder="PasswordConfirm"
                          name="PasswordConfirm"
                          value={data.PasswordConfirm}
                          onChange={InputChange}
                          disabled={disabled}
                        />
                        <div className="error">
                          {PasswordConfirmError}</div>

                      </div>&nbsp;
                      <div className='form-group'>
                        <p className="check_value"> I have read and agree to the <b>Private Policy</b>&nbsp;&nbsp;
                          <input
                            // className="form-control"
                            type="checkbox"
                            placeholder="Subscribe to Newsletter"
                            name="Newsletter"
                            checked={checked}
                            // value={State.Newsletter}
                            onClick={handleClick}
                          /></p>
                      </div>

                      <div className='form-group'>
                        <Button block size="lg"
                          disabled={buttonState || isEditButton}
                          className="btn btn-success btn-lg float-right"
                          type='submit' style={{ backgroundColor: "#1e87e4", marginLeft: "10px" }} >
                          {editCustomer.length == 0 ? "AddCustomer" : "updateCustomer"}</Button>
                      </div>

                    </form>
                  </div>
              </div>

            </div>

            <div className="col-md-2">
              <img className="backReg_img" src={BackImage} alt="backImage" />
              {/* <div className="card card_cr">
              <span className="foo_cnt">
                <div className="card-body foo_cnt">
                  <h2 ><img src={user} alt="user" />My Acount</h2>
                  <div className="main_abt">
                    <ul>
                      <li><a href="/">Login</a></li>
                      <li><a href="/register">Register</a></li>
                    </ul>
                  </div>
                </div>
              </span>
            </div> */}
            </div>

          </div>
        </div>
    </section>
  )
}
export default Register;