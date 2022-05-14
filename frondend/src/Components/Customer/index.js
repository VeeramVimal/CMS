import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './customer.scss';
import { getAllCustomer, deletedCustomer } from '../Auth/action';
import FontAwesome from "react-fontawesome";
import { CardText, Modal, ModalBody, UncontrolledTooltip } from "reactstrap"
// import { Edit, Trash } from "react-feather"
import { Edit, Trash, Eye, X, Gift } from 'react-feather'
import { Table, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import moment from 'moment';
import { API_URL, IMAGE_URL_BASE } from "../../@configs/APIConfig";
import DummyProfile from "../../Asserts/images/profile/pic1.png"
import ReactPaginate from "react-paginate";
import Header from "../Navigates/Header/Header";
import Footer from "../Navigates/Fooder/Footer";

const CustomerList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector((state) => state.Authorized);
    console.log("state == all==", state);
    const [listValue, setListValue] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [searchText, setSearchText] = useState('');
    //** customer list show */
    useEffect(() => {
        dispatch(getAllCustomer(`${API_URL}/customer`))
        if (state.allData?.length > 0) {
            setListValue(state.allData)
        }
    }, [dispatch, state.allData?.length])


    //** localStored value get metod */
    const [dashbourt, setDashbourt] = useState([]);
    // const Profile = dashbourt.map(e => e.avatar.slice(13, 47));
    const Profile = dashbourt.map(el => {
        return (el.role ? el.role == 'admin' ? el.admin_avatar.slice(13, 51) : el.avatar.slice(13, 47) : '')
    })

    useEffect(() => {
        let LocalValue = localStorage.getItem('data');
        var get = []
        if (LocalValue) {
            get.push(JSON.parse(LocalValue))
        }
        setDashbourt(get)
    }, [])

    //** filer listPage in admin added*/
    useEffect(() => {
        let valueList = dashbourt.map(el => el.role == 'admin');
        let disableButton = dashbourt.map(el => el.role == 'customer')
        if (valueList[0]) {
            var y = dashbourt.map(el => el._id);
            var z = listValue.filter((ele) => (ele.admin_id === y[0]));
            setListValue(z);
        } else if (disableButton[0]) {
            setDisabled(true);
        }
    }, [dashbourt?.length, listValue?.length])

    const handleDetails = () => {

    }

    //** edit functionality */
    const handleEditData = (val) => {
        history.push({
            pathname: `/editCustomer/${val._id}`,
            data: {}
        })
    }

    //** pagination function */
    const [offset, setOffset] = useState(0);
    const [perPage, setperPage] = useState(2);

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    }
    const handleShow = (showVal) => {
        setperPage(showVal)
    }

    const sliceValue = listValue.slice(offset, offset + perPage)
    const count = Math.ceil(listValue.length / perPage)

    const handleClick = () => {
        history.push('/register')
    }
    //View popup functionality
    const [Open, setOpen] = useState(false)
    const [showValue, setShowValue] = useState([])
    const handleViewData = (ele) => {
        setShowValue(ele);
        togglePopup();
    }
    const togglePopup = () => {
        setOpen(!Open)
    }

    const deleteAlert = (Id) => {
        dispatch(deletedCustomer(`${API_URL}/customer/${Id}`))
    }

    const emptyToken = () => {
        localStorage.removeItem('savedToken');
        localStorage.removeItem('data')
        history.push('/login');
    }

    return (
        <section className="list_customer">
            <Header />
            <div className="container contain_back">
                <div className="row">
                    {/* <div className="col-sm-10 list"> */}
                    <div className="col-sm-12">

                        <div className="card rounded p-3">
                            <span >

                                <div className="d-flex flex-warp justify-content-start align-items-start">
                                    {dashbourt.map((ele) => ele.avatar === null ||
                                        ele.avatar === ""?
                                        <img src={DummyProfile} height={40} width={40} className="rounded-circle mt-2 " onClick={() => handleEditData(ele, "edit")} /> :
                                        <img src={`${IMAGE_URL_BASE}/${Profile[0]}`} height={60} width={60} className="rounded-circle mt-2" onClick={() => handleEditData(ele, "edit")} />)}
                                    {dashbourt.map((ele) => (
                                        <div className="pt-2 pl-3">
                                            <h2 onClick={() => handleEditData(ele, "edit")}> {ele.role ? ele.role == 'admin' ? `${ele.admin_firstName} ${ele.admin_lastName}` : `${ele.FirstName} ${ele.LastName}` : "haiii"}</h2>
                                            <span onClick={() => handleEditData(ele, "edit")}> {ele.role ? ele.role : ''}</span>
                                        </div>
                                    ))}
                                </div>
                            </span>
                            <span >
                                <Button
                                    className="btn btn-danger log_out"
                                    onClick={emptyToken}>LogOut</Button> </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* show table jsx*/}
            <div className="container contain_back">
                <div className="row" >
                    <div className="col-sm-4 list">
                        <button type="button" className="btn btn-primary btn_Add" disabled={disabled} onClick={handleClick}>
                            Add Record
                        </button>
                    </div>
                    <div className="col-sm-4">
                        {/* <label>Search :<input type="text" name="Search" onKeyUp={(event) => handleSearch(event.target.value)} /></label> */}
                        <label>Search :
                            <input
                                type="text"
                                name="Search"
                                placeholder="search ...."
                                onChange={(event) => setSearchText(event.target.value)}
                            /></label>
                    </div>
                    <div className="col-sm-4">
                        <div >
                            <label>Show</label>
                            <select name='show' onChange={(e) => handleShow(e.target.value)} >
                                <option value="2"> 2 </option>
                                <option value="5"> 5 </option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="table_show mt-1">
                    <Table responsive size="xlg" hover>
                        {/* <table className="table table-light table-hover m-0"> */}
                        <thead className="back_table">
                            <tr>
                                <th>S.No</th>
                                <th>PROFILE</th>
                                <th>FIRSTNAME</th>
                                <th>LASTNAME</th>
                                <th>EMAIL</th>
                                <th>MOBILENUMBER</th>
                                <th>DOB</th>
                                <th>GENDER</th>
                                {/* <th>ADDRESS</th> */}
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sliceValue && sliceValue.filter((index) =>
                                    index.FirstName.toLowerCase().includes(searchText.toLowerCase()) ||
                                    index.LastName.toLowerCase().includes(searchText.toLowerCase()) ||
                                    index.Email.toLowerCase().includes(searchText.toLowerCase())).map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>
                                                    {
                                                        item.avatar == "" || !item.avatar ? <img className="rounded-circle" src={DummyProfile} height={60} width={60} /> :
                                                            <img className="rounded-circle" height={60} width={60} src={`${IMAGE_URL_BASE}/${item.avatar?.slice(13, 47)}`} />
                                                    }
                                                </td>
                                                <td>{item.FirstName}</td>
                                                <td>{item.LastName}</td>
                                                <td>{item.Email}</td>
                                                <td>{item.Mobile_number}</td>
                                                <td>{moment(item.DOB).format('DD-MM-YYYY')}</td>
                                                <td>{item.Gender}</td>
                                                {/* <td>{item.Address}</td> */}
                                                <td>

                                                    <div className="column-action d-flex align-items-center">
                                                        {dashbourt.map((val) => (val.role == 'admin' ? <>
                                                            <Edit onClick={() => handleEditData(item, "edit")} className="mx-1" size={17} id={`send-tooltip-${item._id}`} />
                                                            <UncontrolledTooltip placement="top" target={`send-tooltip-${item._id}`} >
                                                                Edit
                                                            </UncontrolledTooltip>
                                                            <Eye onClick={() => handleViewData(item)} size={17} className="mx-1" id={`viwe-tooltip-${item._id}`} />
                                                            <UncontrolledTooltip placement="top" target={`viwe-tooltip-${item._id}`} >
                                                                View
                                                            </UncontrolledTooltip>
                                                            <Trash onClick={() => deleteAlert(item._id)} className="mx-1" size={17} id={`del-tooltip-${item._id}`} />
                                                            <UncontrolledTooltip placement="top" target={`del-tooltip-${item._id}`} >
                                                                Delete
                                                            </UncontrolledTooltip>
                                                        </> : <>
                                                            <Eye onClick={() => handleViewData(item)} size={17} className="mx-1" id={`viwe-tooltip-${item._id}`} />
                                                            <UncontrolledTooltip placement="top" target={`viwe-tooltip-${item._id}`} >
                                                                View
                                                            </UncontrolledTooltip>
                                                        </>))}

                                                    </div>
                                                </td>

                                            </tr>
                                        )
                                    })
                            }
                        </tbody>
                        {/* </table> */}
                    </Table>
                </div>
                <div>
                    <div className="pagination">
                        <ReactPaginate
                            previousLabel={"prev"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={count || 1}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            // containerClassName={"pagination"}
                            containerClassName={
                                "pagination react-paginate justify-content-end p-1"
                            }
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"} />
                    </div>
                </div>
            </div>
            <Modal centered isOpen={Open} className='mt-5'>
                <ModalBody>
                    <div className="closepop">
                        <X size={30} onClick={() => togglePopup()} className=" text-light bg-danger rounded-box hover-zoom mr-0" />
                    </div>
                    <div className="p-1 m-4">
                        <div className="d-flex justify-content-center mb-1 " >
                            {showValue == null || !showValue.avatar ? <img className="rounded-circle" src={DummyProfile} alt="dummy" height={100} width={100} /> :
                                <img className="rounded-circle" src={`${IMAGE_URL_BASE}/${showValue.avatar?.slice(13, 47)}`} alt="Profile" height={100} width={100} />}
                        </div>
                        <h4 className=" d-flex justify-content-center mb-3 mx-5">Profile Details</h4>
                    </div>
                    <CardText>
                        <table className="table table-align-middle border-0">
                            {/* <span className="border border-primary"> */}
                            <tbody className="border-0">
                                <tr>
                                    <td>
                                        <div className="fst-normal fw-bold fs-5 mt-1">NAME :</div>
                                    </td>
                                    <td>

                                        <span className="fs-5 fst-normal mb-5">{`${showValue.FirstName} ${showValue.LastName}`}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {/* <div><h5 className="head_list">Email :</h5></div> */}
                                        <div className="fst-normal fw-bold fs-5 mt-1">EMAIL :</div>
                                    </td>
                                    <td>
                                        <span className="fs-5 fst-normal mb-5">{showValue.Email}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {/* <div><h5 className="head_list">DOB :</h5></div> */}
                                        <div className="fst-normal fw-bold fs-5 mt-1">DOB :</div>
                                    </td>
                                    <td>
                                        <span className="fs-5 fst-normal mb-5">{showValue.DOB}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {/* <div><h5 className="head_list">Gender :</h5></div> */}
                                        <div className="fst-normal fw-bold fs-5 mt-1">Gender :</div>

                                    </td>
                                    <td>
                                        <span className="fs-5 fst-normal mb-5">{showValue.Gender}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {/* <div><h5 className="head_list">Mobile :</h5></div> */}
                                        <div className="fst-normal fw-bold fs-5 mt-1">Mobile :</div>
                                    </td>
                                    <td>
                                        <span className="fs-5 fst-normal mb-5">{showValue.Mobile_number}</span>
                                    </td>
                                </tr>
                            </tbody>
                            {/* </span> */}
                        </table>
                    </CardText>
                </ModalBody>
            </Modal>
            <Footer />
        </section>
    )
}
export default CustomerList;