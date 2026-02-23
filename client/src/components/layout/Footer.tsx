import logo from "../../assets/images/logo.png";
import a1 from '../../assets/images/path690.svg'
import a2 from '../../assets/images/path694.svg'
import a3 from '../../assets/images/path700.svg'
import a4 from '../../assets/images/path704.svg'
import a5 from '../../assets/images/image 97.svg'
import a6 from '../../assets/images/image 98.svg'
import a7 from '../../assets/images/image 99.svg'
import a8 from '../../assets/images/image 100.svg'
import a9 from '../../assets/images/path800.svg'
 import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 px-4 sm:px-6 py-10 mt-10">
      <div className="flex justify-center relative bottom-15">
        <img src={a9}/>
      </div>
      <div className="text-center mb-10">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">JOIN OUR MAILING LIST</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-2">
          <input
            type="text"
            placeholder="Email Address"
            className="px-4 py-2 border rounded-md w-full sm:w-64"
          />
          <button className="bg-[#7C6345] text-white px-4 py-2 rounded-md">
            Subscribe
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
        <div>
          <img src={logo} alt="logo" className="mb-4 w-32 mx-auto sm:mx-0" />
          <p className="text-sm text-[#7C6345]">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <p className="text-sm text-[#7C6345] mt-2">Lorem ipsum dolor sit amet consectetur.</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[#7C6345]">About Us</p>
          <p className="text-[#7C6345]">Careers</p>
          <p className="text-[#7C6345]">Social</p>
          <p className="text-[#7C6345]">Boxes</p>
          <p className="text-[#7C6345]">Fruits</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[#7C6345] cursor-pointer"
          onClick={() => navigate("/privacy")}
          >
            Privacy Policy
            </p>
          <p className="text-[#7C6345]">Terms & Conditions</p>
          <p className="text-[#7C6345]">Refund Policy</p>
          <p className="text-[#7C6345]">Faqs</p>
        </div>

        <div>
          <p className="text-[#7C6345]">Contact us on</p>
          <h4 className="text-[#7C6345] font-bold text-lg">1111111111</h4>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 justify-center sm:justify-start">
            <p className="text-[#7C6345]">Follow our Journey</p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {[a1, a2, a3, a4].map((icon, idx) => (
                <div key={idx} className="border bg-white rounded-full p-1">
                  <img src={icon} alt={`icon-${idx}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
            {[a5, a6, a7, a8].map((img, idx) => (
              <img key={idx} src={img} alt={`img-${idx}`} className="w-8 h-8" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
