


import { Minus, Plus, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useProducts } from "../../hooks/useProducts";
import { useState } from "react";

const Card = () => {
  const { products, loading } = useProducts();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  //  FILTER ONLY BEST SELLERS
  const bestSellerProducts = products.filter(
    (item) => item.category?.toLowerCase() === "best sellers"
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
    <div className="flex flex-wrap gap-16 justify-center m-15">
      {bestSellerProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          No Best Seller products found
        </p>
      ) : (
        bestSellerProducts.map((item, index) => (
          <div
            key={item._id}
            className="bg-[#FBF9F6] w-60 rounded-2xl p-4 shadow-md relative"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-40 w-40 object-contain" 
                />
              </div>

              <div className="text-center mt-4">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-green-600 font-bold text-lg">
                  ₹{item.price}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => decrement(item._id)}
                    className="border rounded-full px-1 py-1 hover:bg-gray-100"
                  >
                    <Minus size={12} />
                  </button>

                  <div className="border px-3 rounded">
                    {quantities[item._id] || 1}
                  </div>

                  <button
                    onClick={() => increment(item._id)}
                   className="border rounded-full px-1 py-1 hover:bg-gray-100"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                <button className="flex items-center gap-2 border border-orange-500 text-orange-500 px-3 py-2 rounded-xl hover:bg-orange-500 hover:text-white">
                  <ShoppingCart size={15} />
                  Cart
                </button>
              </div>
            </motion.div>
          </div>
        ))
      )}
    </div>
  );
};

export default Card;