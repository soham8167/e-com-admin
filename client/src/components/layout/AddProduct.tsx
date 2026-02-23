import img1 from "../../assets/images/Rectangle 115.png";
import img2 from "../../assets/images/Group 112.png";
import img3 from "../../assets/images/Group 113.png";
import img4 from "../../assets/images/Rectangle 168.png";
import img5 from "../../assets/images/Rectangle 169.png";
import { motion } from "framer-motion";


const AddProduct = () => {
  return (

    <motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 2 , delay:  0.7 }}

  viewport={{ once: true }}
  
>
    <div
      className="bg-cover bg-center py-16 px-4"
      style={{ backgroundImage: `url(${img1})` }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
        Value Added Products
      </h2>

      <div className="flex flex-col sm:flex-row justify-center gap-6">
        

        {/* CARD 1 */}
        <div
          className="rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 
                     bg-cover bg-center 
                     w-full sm:w-105 md:w-120"
          style={{ backgroundImage: `url(${img4})` }}
        >
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-[#EF7F00]">FARM FRESH</h3>
            <h2 className="text-4xl font-bold text-black">GOLD</h2>

            <p className="text-gray-700 mt-5 text-sm sm:text-base">
              Lorem ipsum dolor sit amet,
              <br />
              consectetur.
            </p>

            <button className="bg-[#FBF9F6] text-[#00814E] px-4 py-2 rounded-full mt-6 font-semibold self-center sm:self-start">
              Shop Now!
            </button>
          </div>

          <img
            src={img2}
            alt="Gold Product"
            className="w-36 sm:w-44 md:w-48 h-auto mx-auto sm:mx-0"
          />
        </div>

        {/* CARD 2 */}
        <div
          className="rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 
                     bg-cover bg-center 
                     w-full sm:w-105 md:w-120"
          style={{ backgroundImage: `url(${img5})` }}
        >
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-white">FARM FRESH</h3>
            <h2 className="text-4xl font-bold text-black">PREMIUM</h2>

            <p className="text-white mt-5 text-sm sm:text-base">
  <span className="whitespace-nowrap">
    Lorem ipsum dolor sit amet,
  </span>
  <br />
  consectetur.
</p>



            <button className="bg-[#FBF9F6] text-[#00814E] px-4 py-2 rounded-full mt-6 font-semibold self-center sm:self-start">
              Shop Now!
            </button>
          </div>

          <img
            src={img3}
            alt="Premium Product"
            className="w-36 sm:w-44 md:w-48 lg:w-70 h-auto mx-auto sm:mx-0 lg:-translate-x-20 lg:translate-y-6"
          />
        </div>
      </div>
    </div>
    </motion.div>
  );
};

export default AddProduct;
