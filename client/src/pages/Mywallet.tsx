import { useNavigate } from "react-router-dom";
import walleticon from "../assets/images/Vector1.svg";

const Mywallet = () => {
    const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto px-4 mt-40">

      {/* Title */}
      <h1 className="text-2xl font-playfair mb-6">My Wallet</h1>

      {/* Main Card */}
      <div className=" bg-[#FBF9F6] border rounded-xl p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 shadow-md ">

        {/* Left: Wallet Balance */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <img src={walleticon} alt="wallet" className="w-6" />
          </div>

          <div>
            <p className="text-sm font-semibold text-black">Wallet Balance</p>
            <p className="text-2xl font-bold text-green-600">₹3245</p>
          </div>
        </div>

        {/* Vertical Line */}
        <div className="hidden lg:block w-px h-18 bg-gray-400"></div>

        {/* Middle: Add Money */}
        <div className="flex flex-col gap-3 text-left lg:text-center 
                        lg:relative lg:right-10">

          <h3 className="font-semibold text-black lg:relative lg:right-22">
            Add money to your wallet
          </h3>

          <div className="flex flex-wrap gap-2 justify-start lg:justify-center">
            {["₹500", "₹1000", "₹1500", "₹2000", "₹2500"].map((value) => (
              <button
                key={value}
                className="border px-4 py-1.5 rounded-md text-sm hover:border-green-600 hover:text-green-600 transition"
              >
                {value}
              </button>
            ))}
          </div>

        </div>

        {/* Vertical Line */}
        <div className="hidden lg:block w-px h-18 bg-gray-400"></div>

        {/* Right: History Button */}
        <div className="flex justify-start lg:justify-end">
          <button 
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition cursor-pointer"
          onClick={() => navigate("/mywalletopen")}
          >
            Recharge History
          </button>
        </div>

      </div>
    </div>
  );
};

export default Mywallet;
