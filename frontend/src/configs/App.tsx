import 'bootstrap/dist/css/bootstrap.min.css';
import {RouterProvider} from "react-router-dom";
import router from "@/configs/routers/route.ts";


function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
