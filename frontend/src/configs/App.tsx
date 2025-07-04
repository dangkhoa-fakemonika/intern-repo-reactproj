import {RouterProvider} from "react-router-dom";
import router from "@/configs/routes/route.ts";
import {Provider} from "react-redux";
import {persistedStore, store} from "@/shared/stores/store.ts";
import {Toaster} from "@/components/ui/sonner.tsx";
import {PersistGate} from "redux-persist/integration/react";


function App() {
  return (
    <div>
      <Provider store={store}>
        <PersistGate persistor={persistedStore}>
          <RouterProvider router={router}/>
        </PersistGate>
      </Provider>
      <Toaster/>
    </div>
  )
}

export default App
