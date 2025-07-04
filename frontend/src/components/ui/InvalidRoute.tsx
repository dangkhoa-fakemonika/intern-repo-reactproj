import {Navigate} from "react-router-dom";

export function InvalidRoute() {
  return (
    <Navigate to={"/"}/>
  )
}