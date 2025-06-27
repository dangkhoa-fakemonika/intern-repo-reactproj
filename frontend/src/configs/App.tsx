import {RouterProvider} from "react-router-dom";
import router from "@/configs/routers/route.ts";
import {Provider} from "react-redux";
import {store} from "@/shared/stores/store.ts";


function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  )
}

export default App
