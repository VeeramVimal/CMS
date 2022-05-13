import React from "react";
import { Route, Redirect } from "react-router-dom";

const Protectedrouter =({component,...rest})=>{
    
   let RenderComponbt=component;
        let hastoken=localStorage.getItem('savedToken');
       
    return(
        <Route
        {...rest}
        render={
            props=>{
               return hastoken !== null ? (
                    <RenderComponbt {...props}/>
                ):(
                    <Redirect
                    to={{
                        pathname:'/login'
                    }}
                    />
                )
               
            }
        }
        />
    )
}

export default Protectedrouter;