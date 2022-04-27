import React, {useState, useEffect} from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import FontAwesome from "react-fontawesome";
import  "font-awesome/css/font-awesome.css";
import "./Style/Styles.css";
import '@blueprintjs/core';

function DashbourdIcon(){

 // Sample Breadscrum items
 const sampleItems = [
    { href: "/", icon: "folder-close", text: "Document" },
    { href: "/document/profile", icon: "user", text: "Profile" },
    { icon: "document", text: "Username.jpg" },
];
    // const [DashIcon, setDashIcon ] = useState();
    const handleClick =(event)=>{
        event.preventDefault();
        alert("home Page enter")
    }

    return(
       <section>
          <div className="bread_icon">
            <Breadcrumbs aria-label="breadcrumb">
            <Link
            color="inherit"
            href="/"
           onClick ={(e) =>handleClick(e)}
            >
            <FontAwesome className="fa fa-home"></FontAwesome>
            </Link>
            <Link
            color="inherit"
            href="/getting-started/installation/"
            onClick={(event) => {
                event.preventDefault();
                alert("Dashboard Clicked");
            }}
            >
            Account
            </Link>
            <Typography color="textPrimary">
                Register
            </Typography>
            </Breadcrumbs>
        </div>

        {/* <div style={{
            display: 'block', width: 400, padding: 30
        }}>
            <Breadcrumbs
                items={sampleItems}
            />
        </div > */}
       </section>
    )
}
export default DashbourdIcon;