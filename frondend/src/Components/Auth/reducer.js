import { CREATE_REGISTER, AUTH_LOGIN, ALL_CUSTOMER_DATA, DELETE_CUSTOMER, GET_SINGLE_CUSTOMER, UPDATE_CUSTOMER, ALL_ADMIN_DATA } from './actionType';

const intialState = {
    allData: [],
    data: [],
    allAdmin: [],
    singleCustomer: [],
    RegisterPost: [],
    logIn: [],
    defaultValue: {
        FirstName: "",
        LastName: "",
        DOB: "",
        Email: "",
        avatar: "",
        Gender: '',
        Mobile_number: "",
        Password: "",
        PasswordConfirm: ""
    }
}

const Authorized = (state = intialState, action) => {

    switch (action.type) {
        case ALL_CUSTOMER_DATA:
            return { ...state, allData: action.allData };
        case ALL_ADMIN_DATA:
            return { ...state, allAdmin: action.allAdmin };
        case GET_SINGLE_CUSTOMER:
            return { ...state, singleCustomer: action.singleCustomer };
        case CREATE_REGISTER:
            return { ...state, RegisterPost: action.RegisterPost };
        case UPDATE_CUSTOMER:
            return { ...state, data: action.data };
        case AUTH_LOGIN:
            return { ...state, logIn: action.logIn };
        case DELETE_CUSTOMER:
            return { ...state };
        default:
            return { ...state };
    }

}
export default Authorized;