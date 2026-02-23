import toast from "react-hot-toast";
import { useCartStore } from "../store/cardStore";
import { useWishlistStore } from "../store/wishListStore";

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="text-center mt-40 text-gray-500 ">
        Your wishlist is empty 
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 mt-30">
      <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(item => (
          <div
            key={item.id}
            className="border rounded-lg p-4 flex flex-col"
          >
            <img
              src={item.image}
              className="w-full h-40 object-contain"
            />

            <h3 className="mt-3 font-medium">{item.title}</h3>
            <p className="text-green-700 font-bold">₹{item.price}</p>

            <div className="mt-auto flex gap-2">
              <button
                onClick={() => addToCart(item)}
                className="flex-1 bg-orange-500 text-white py-2 rounded cursor-pointer
                
                "
              >
                Add to Cart
              </button>

              <button
                onClick={() =>
                  {
                    removeFromWishlist(item.id)
                       toast.success("Removed item to wishlist successfully!");
                  } 
                  
                }
                className="flex-1 border border-red-500 text-red-500 py-2 rounded cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
