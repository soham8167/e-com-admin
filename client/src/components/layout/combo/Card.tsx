import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useProducts } from "../../../hooks/useProducts";
import { useState } from "react";

const ComboCard = () => {
  const { products, loading } = useProducts();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  //  FILTER ONLY COMBO CATEGORY
  const comboProducts = products.filter(
    (item) => item.category?.toLowerCase() === "combos"
  );

  const increment = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decrement = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="flex flex-wrap gap-8 justify-center m-5">
      {comboProducts.map((item, index) => {
        //  Special Card (index 1)
        if (index === 1) {
          return (
            <div
              key={item._id}
              onClick={() => alert("Product not available")}
              className="bg-[#FBF9F6] w-60 rounded-2xl p-4 shadow-md relative cursor-pointer hover:scale-105 transition"
            >
              <div className="bg-white rounded-xl flex justify-center p-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-32 object-contain"
                />
              </div>

              <div className="text-center mt-2">
                <h3>{item.title}</h3>
              </div>

              <div className="text-[#E27148] flex justify-center text-2xl mt-3">
                <p>Coming Soon</p>
              </div>
            </div>
          );
        }

        //  Normal Combo Products
        return (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="bg-[#FBF9F6] w-60 rounded-2xl p-4 shadow-md hover:scale-105 transition relative">
              
              {/* Image */}
              <div className="bg-white rounded-xl flex justify-center p-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-32 object-contain"
                />
              </div>

              {/* Text */}
              <div className="text-center mt-4">
                <h3 className="font-medium">{item.title}</h3>

                <div className="flex justify-center gap-2 mt-2">
                  <span className="text-green-600 font-bold text-lg">
                    ₹{item.price}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => decrement(item._id)}
                    className="border rounded-full px-1 py-1"
                  >
                    <Minus size={10} />
                  </button>

                  <div className="border px-2 py-0.5 rounded-sm font-medium">
                    {quantities[item._id] || 1}
                  </div>

                  <button
                    onClick={() => increment(item._id)}
                    className="border rounded-full px-1 py-1"
                  >
                    <Plus size={10} />
                  </button>
                </div>

                <button
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="flex items-center gap-2 border border-orange-500 px-3 py-2 rounded-2xl cursor-pointer"
                >
                  <ShoppingCart size={15} /> Cart
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ComboCard;