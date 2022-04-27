import Vimal from "react";
import { Switch, Route } from "react-router-dom";

// Our all component files
import Register from "../Auth/Register/Register";
import Login from "../Auth/Login/Login";
import CustomerList from "../Customer";
import Protectedrouter from "../ProtectedRouter/Protected.Router";
// import Home from "../Products/Home";
// import ViewCart from "../Products/ViewCart";
// import ProductList from "../Products/ProductList";

function Main() {

  return (
    <main>
      <Switch>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/" component={Login}/>
        <Route exact path="/editCustomer/:id" component={Register}/>
        <Protectedrouter exact path="/home" component={CustomerList} />
        <Route exact path= '*' component={() =>"404 NOT FOUND"}/>
        {/* <Route exact path="/viewcart" component={ViewCart}/> */}

      </Switch>
    </main>
  );
}

export default Main;
