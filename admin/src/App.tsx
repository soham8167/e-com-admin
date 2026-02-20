import AppRoutes from './routes/Approutes'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <AppRoutes />

      {/* Toast UI container */}
      <ToastContainer
        position="top-center"
        
        theme="dark"
      />
    </>
  );
}

export default App;
