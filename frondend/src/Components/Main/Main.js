import Vimal from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Our all component files
import Register from "../Auth/Register/Register";
import Login from "../Auth/Login/Login";
import CustomerList from "../Customer";
import Protectedrouter from "../ProtectedRouter/Protected.Router";
import TestElement from "../Test_cases/DeleteMethod/testElement";
import { TestChecked } from "../Test_cases/AddMethod/testChecked";


function Main() {

  return (
    <main>
      <Switch>
        <Route exact path='/' render={() => <Redirect to='/login'/>}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/editCustomer/:id" component={Register}/>
        <Protectedrouter exact path="/home" component={CustomerList} />
        <Route exact path= '*' component={() =>(<h3 className="d-flex align-items-center">404 NOT FOUND</h3>)}/>
      <TestElement/>
      <TestChecked/>
      </Switch>
    </main>
  );
}

export default Main;
