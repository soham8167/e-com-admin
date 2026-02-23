import group from "../../assets/images/Group.svg";
import cart from "../../assets/images/cart.svg";
import vector from "../../assets/images/v1.svg";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/cardStore";
import { useWishlistStore } from "../../store/wishListStore";

const SearchBar = () => {
  const navigate = useNavigate();
  const { items } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  return (
    <div className="w-full">
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search products"
            className="w-full px-5 py-2 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5E8E2D]"
          />
          <FaMagnifyingGlass className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer" />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <img
            src={group}
            alt="profile"
            className="w-5 h-5 cursor-pointer"
            onClick={() => navigate("/login")}
          />

          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/wishlist")}
          >
            <img src={vector} className="w-5 h-5" />

            {wishlistItems.length > 0 && (
              <span
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs
                           w-4 h-4 rounded-full flex items-center justify-center"
              >
                {wishlistItems.length}
              </span>
            )}
          </div>
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <img src={cart} alt="cart" className="w-5 h-5" />

            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
