import {RouterProvider} from "react-router-dom";
import router from "@/configs/routers/route.ts";
import {Provider} from "react-redux";
import {store} from "@/shared/stores/store.ts";
import {Toaster} from "@/components/ui/sonner.tsx";


function App() {
  return (
    <div>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
      <Toaster/>
    </div>
  )
}

export default App
