// import { useNavigate } from "react-router-dom";
// import logo from "../../assets/images/logo.png";
// import Navbar from "./Navbar";
// import SearchBar from "./SearchBar";

// const Header = () => {
//   const navigate = useNavigate();

//   return (
//     <header className="fixed top-0 left-0 w-full z-50">
//       <div className="px-4 sm:px-6">
//         <div className="bg-white rounded-b-2xl shadow-md">
          
//           <div className="flex items-center justify-between gap-4 px-4 py-3">
            
//             <img
//               src={logo}
//               alt="Bhoomi Farmers"
//               className="h-12 sm:h-14 cursor-pointer"
//               onClick={() => navigate("/")}
//             />

//             {/* Desktop */}
//             <div className="hidden md:flex flex-1 max-w-xl justify-end">
//               <SearchBar />
//             </div>

//             {/* Mobile Menu */}
//             <div className="md:hidden">
//               <Navbar />
//             </div>
//           </div>

//           <div className="block md:hidden px-4 pb-3">
//             <SearchBar />
//           </div>

//           {/* Desktop Navbar with Clip */}
//           <div className="hidden md:block relative h-14">
//             <div
//               className="absolute right-0 bottom-0 bg-[#5E8E2D] 
//                          w-[90%] h-[85%] 
//                          px-4 flex items-center justify-end 
//                          shadow-lg rounded-br-2xl"
//               style={{
//                 clipPath:
//                   "polygon(10% 16%, 100% 8%, 100% 100%, 0% 100%, 3% 20%)",
//               }}
//             >
//               <Navbar />
//             </div>
//           </div>

//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;














import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="px-4 sm:px-6">
        <div className="bg-white rounded-b-2xl shadow-md">

          {/* TOP ROW */}
          <div className="flex items-center justify-between gap-4 px-4 py-3">

            {/* LOGO */}
            <motion.img
              src={logo}
              alt="Bhoomi Farmers"
              className="h-12 sm:h-14 cursor-pointer"
              onClick={() => navigate("/")}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            />

            {/* DESKTOP SEARCH */}
            <motion.div
              className="hidden md:flex flex-1 max-w-xl justify-end"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <SearchBar />
            </motion.div>

            {/* MOBILE NAV */}
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Navbar />
            </motion.div>
          </div>

          {/* MOBILE SEARCH */}
          <motion.div
            className="block md:hidden px-4 pb-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <SearchBar />
          </motion.div>

          <div className="hidden md:block relative h-14">
            <motion.div
              className="absolute right-0 bottom-0 bg-[#5E8E2D] 
                         w-[90%] h-[85%] 
                         px-4 flex items-center justify-end 
                         shadow-lg rounded-br-2xl"
              style={{
                clipPath:
                  "polygon(10% 16%, 100% 8%, 100% 100%, 0% 100%, 3% 20%)",
              }}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Navbar />
            </motion.div>
          </div>

        </div>
      </div>
    </motion.header>
  );
};

export default Header;
