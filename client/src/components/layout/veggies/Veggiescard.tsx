import { Minus, Plus, ShoppingCart } from "lucide-react";
import { vegcardStore } from "../../../store/vegCardStore";

const Veggiescard = () => {
  const { products, increment, decrement } = vegcardStore();

  return (
    <>
      <div className="flex flex-wrap gap-8 justify-center m-5">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-[#FBF9F6] w-65 rounded-2xl p-4 shadow-md relative"
          >
            {item.bestSeller && (
              <span className="absolute top-1 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                Best Seller
              </span>
            )}

            <span className="absolute top-3 right-3 bg-orange-400 text-white text-xs px-1.5 py-1 rounded-full text-center">
              {item.discount}% <br /> OFF
            </span>

            <div className="bg-white rounded-xl p- flex justify-center">
              <img
                src={item.image}
                alt={item.title}
                className="h-32 object-contain"
              />
            </div>

            <div className="text-center mt-4">
              <h3 className="font-medium text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.weight}</p>

              <div className="flex justify-center items-center gap-2 mt-2">
                <span className="line-through text-gray-400 text-sm">
                  ₹{item.originalPrice}
                </span>
                <span className="text-green-500 font-bold text-lg">
                  ₹{item.price}/-
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => decrement(item.id)}
                  className="border rounded-full px-1 py-1 hover:bg-gray-100 cursor-pointer"
                >
                  <Minus size={10} />
                </button>
                <div className="border   px-2 py-0.5 rounded-sm font-medium">
                  {item.quantity}
                </div>
                <button
                  onClick={() => increment(item.id)}
                  className="border rounded-full px-1 py-1 hover:bg-gray-100 cursor-pointer"
                >
                  <Plus size={10} />
                </button>
              </div>

              <button className="flex items-center gap-3 border border-orange-500 text-orange-500 px-3 py-2 rounded hover:bg-orange-500 hover:text-white">
                <ShoppingCart size={15} />
                Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      
    </>
  );
};

export default Veggiescard;
