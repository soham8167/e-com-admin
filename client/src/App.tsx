import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import ScrollToTop from "./components/layout/ScrollTop";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
    <ScrollToTop/>
      <Header/>
      
     <AppRoutes />
     <Footer/>
    </>
  );
}

export default App;
