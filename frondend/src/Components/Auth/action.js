import { CREATE_REGISTER, AUTH_LOGIN, ALL_CUSTOMER_DATA, DELETE_CUSTOMER, GET_SINGLE_CUSTOMER, UPDATE_CUSTOMER, ALL_ADMIN_DATA } from './actionType';
import axios from 'axios';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { API_URL, API_URL_BASE } from '../../@configs/APIConfig';

const MySwal = withReactContent(swal);

//** get all customer list */
export const getAllCustomer = (params) => {
    return async (dispatch) => {
        try {
            await axios.get(params).then(res => {
                dispatch({
                    type: ALL_CUSTOMER_DATA,
                    allData: res.data
                })
            })
            .catch(err => console.log(err))
        } catch (error) {
            console.log(error);
        }
    }
}

//** admin get all data */
export const getAllAdmin = (params) => {
    return async (dispatch) => {
        try {
            await axios.get(params).then(res => {
                dispatch({
                    type: ALL_ADMIN_DATA,
                    allAdmin: res.data
                })
            })
            
        } catch (error) {
            console.log(error);
        }
    }
}
//**edit singlecustomer */
export const getSingleCustomer = (params) => {
    return async (dispatch) => {
        try {
            await axios.get(params)
            .then(res => {
                dispatch({
                    type: GET_SINGLE_CUSTOMER,
                    singleCustomer: res.data
                })
            })
        } catch (error) {
            console.log(error);
        }
    }
}

//** register create customer */
export const register_create = (params, userData, redirected) => {
    console.log("userData===", userData);
    return async (dispatch) => {
            try {
               await axios({
                    method: "POST",
                    url: params,
                    data: userData,
                    headers: { contentType: "multipart/form-data", Authorization: `Bearer`}
                })
                .then(res => {
                    if (res.status === 200 || res.statusText === 'created') {
                        MySwal.fire({
                            title: 'Success',
                            text: 'Registration created successfully!',
                            icon: 'success',
                            customClass: {
                                confirmButton: 'btn btn-primary'
                            },
                            buttonsStyling: false
                        })
                    }
                    redirected()
                    dispatch({
                        type: CREATE_REGISTER,
                        RegisterPost: res.data
                    })
                })
                .catch(err => {
                    if (err.response && err.response.data) {
                        MySwal.fire({
                            title: 'Error',
                            text: err.response.data.message,
                            icon: 'error',
                            customClass: {
                                confirmButton: 'btn btn-primary'
                            },
                            buttonsStyling: false
                        })
                    }
                })

            } catch (error) {
                console.log(error);
            }
    }

}
//** update customer details */
export const updatedCustomer = (params, userData, editRedirected) => {
    console.log(params, "====updatedCustomer===", userData);
    return async (dispatch) => {
        try {
            await axios.put(params, userData)
            .then(res => {
                if (res.status === 200 || res.statusText === 'created') {
                    MySwal.fire({
                        title: 'Success',
                        text: 'Registration Update successfully!',
                        icon: 'success',
                        customClass: {
                            confirmButton: 'btn btn-primary'
                        },
                        buttonsStyling: false
                    })
                }
                editRedirected()
                dispatch({
                    type: UPDATE_CUSTOMER,
                    data: res.data
                })
            })
            .then(() => dispatch(getAllCustomer(`${API_URL}/customer`)))
            .catch(err => {
                if (err.response && err.response.data) {
                    MySwal.fire({
                        title: 'Error',
                        text: err.response.data.message,
                        icon: 'error',
                        customClass: {
                            confirmButton: 'btn btn-primary'
                        },
                        buttonsStyling: false
                    })
                }
            })

        } catch (error) {
            console.log(error);
        }
    }
}
// deleted customerdetails
export const deletedCustomer = (params) => {
    return async (dispatch) => {
        try {
            await axios.delete(params)
            .then(res => {
                if (res.status === 200 || res.data === "Deleted Success") {
                    MySwal.fire({
                        title: 'Success',
                        text: 'deleted successfully!',
                        icon: 'success',
                        customClass: {
                            confirmButton: 'btn btn-primary'
                        },
                        buttonsStyling: false
                    })
                }
                dispatch({
                    type: DELETE_CUSTOMER,
                    data: res.data
                })
            })
            .then(() => dispatch(getAllCustomer(`${API_URL}/customer`)))
            .catch(e => {
                if (e.response && e.response.data) {
                    MySwal.fire({
                        title: 'Error',
                        text: e.response.data.message,
                        icon: 'error',
                        customClass: {
                            confirmButton: 'btn btn-primary'
                        },
                        buttonsStyling: false
                    })
                }
            })
        } catch (error) {
            
        }
    }
}
// login customer
export const authLogin = (params, userData, redirected) => {
        return async (dispatch) => {
            try {
                await axios({
                    method: "POST",
                    url: params,
                    data: userData,
                }) .then(res => {
                    if (res.data) {
                        let userData = res.data.userData;
                        console.log("userData==", userData);
                        let token = res.data.data;
                        localStorage.setItem("savedToken", `Bearer ${token}`);
                        localStorage.setItem("data", JSON.stringify(userData));

                        axios.defaults.headers.common['Authorization'] = 'Bearer' + token
                    }
                    redirected()
                    dispatch({
                        type: AUTH_LOGIN,
                        logIn: res.data
                    })
 
                }) 
                .catch(err => {
                    if (err.response && err.response.data) {
                        MySwal.fire({
                            title: 'Go Register First',
                            text: err.response.data.message,
                            icon: 'error',
                            customClass: {
                                confirmButton: 'btn btn-primary'
                            },
                            buttonsStyling: false
                        })
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
}