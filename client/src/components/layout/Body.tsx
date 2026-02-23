
import { motion } from "framer-motion";
const Body = () => {
  return (
    
    <div className="bg-[#E9F0EB] px-4 sm:px-10 py-10">
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.9,delay:0.7 , ease: "easeOut" }}
  viewport={{ once: true }}
>

      
      <div className="text-center mb-6">
        <p className="flex justify-center text-[#B09764] tracking-[0.35em]  text-sm mb-3">
  TESTMONIAL
</p>
        <h2 className="text-2xl sm:text-3xl md:text-3xl font-weight: 500;  text-[#00814E]">
          WHAT OUR CLIENTS SAY
        </h2>
      </div>
      <div className="max-w-full sm:max-w-3xl mx-auto">
        <p className="text-sm sm:text-base text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia a dignissimos perspiciatis sunt magni, provident sequi fuga natus amet nemo laudantium aspernatur mollitia veniam aliquam enim voluptatum laborum placeat et architecto quaerat earum sapiente impedit incidunt cum! Voluptatum, ipsum consectetur unde neque dignissimos nihil ut distinctio, adipisci eius totam !
        <br/>
       <b> Mulbery Wood</b>
        <br/>
        Minu
        </p>
      </div>
      </motion.div>

    </div>
    
    
  );
}

export default Body;
