import Footer from "@/components/ui/Footer";
import NavBar from "@/components/ui/NavBar"
import Home from "@/features/SampleFeature/pages/Home/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import {SearchAndFilter} from "@/features";


function App() {

  return (
    <div className={"w-screen"}>
      <div className="flex flex-col min-h-screen">
        <div className="relative z-20">
          <NavBar/>
        </div>
        <div className="flex flex-col ">
          {/*<Home/>*/}
          <SearchAndFilter/>
        </div>
        <div className="relative z-20">
          <Footer/>
        </div>
      </div>
    </div>
  )
}

export default App
