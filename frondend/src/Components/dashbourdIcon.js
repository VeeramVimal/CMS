import React, {useState, useEffect} from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import FontAwesome from "react-fontawesome";
import  "font-awesome/css/font-awesome.css";
import "./Style/Styles.css";
import '@blueprintjs/core';
import {useParams } from "react-router-dom"
import {Home} from 'react-feather'
function DashbourdIcon(){
  const getToken = localStorage.getItem("savedToken")
  const [num, setNum] = useState(null)
const {id} = useParams();
useEffect(() => {
  if (id) {
    setNum(id);
  }
}, [id])

 // Sample Breadscrum items
 const sampleItems = [
    { href: "/", icon: "folder-close", text: "Document" },
    { href: "/document/profile", icon: "user", text: "Profile" },
    { icon: "document", text: "Username.jpg" },
];

    return(
       <section>
        <div className="bread_icon">
          <ul className="breadcrumb">
            <li><a href="/"> <FontAwesome className="fa fa-home"></FontAwesome></a></li>
            <li><a href="#">Account</a></li>
            <li><a href="/register">{num ? "Updated" : "Register"}</a></li>
          </ul>
        </div>
       </section>
    )
}
export default DashbourdIcon;