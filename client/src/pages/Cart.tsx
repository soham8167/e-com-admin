import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "../store/cardStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const { items, increment, decrement, removeItem } = useCartStore();

  const total = items.reduce((sum, i) => sum + (i.price ?? 0) * i.quantity, 0);
  const navigate = useNavigate();

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-32 mt-8">
        <h2 className="text-2xl font-semibold mb-6">My Cart</h2>

        {/* Desktop  Header */}
        <div className="hidden md:grid grid-cols-6 text-sm font-medium text-gray-500 border-b pb-3">
          <span>Product</span>
          <span>Quantity</span>
          <span>Total</span>
          <span>Tax</span>
          <span>Shipping</span>
          <span>Discount</span>
        </div>

        {/* Cart Items */}
        {items.map((item) => (
          <div
            key={`${item.id}-${item.variantId}`}

            className="border-b py-5 md:grid md:grid-cols-6 md:items-center gap-4 space-y-4 md:space-y-0"
          >
            {/* Product */}
            <div className="flex items-center gap-4">
              <img src={item.image} className="w-16 h-16 object-contain" />
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">{item.weight}</p>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center justify-between md:justify-start gap-3">
              <span className="md:hidden text-sm text-gray-500">Quantity</span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => decrement(item.id, item.variantId)}
                  className="w-6 h-6 border rounded-full flex items-center justify-center cursor-pointer"
                >
                  <Minus size={14} />
                </button>

                <span className="w-8 text-center border rounded">
                  {item.quantity}
                </span>

                <button
                  className="w-6 h-6 border rounded-full flex items-center justify-center cursor-pointer"
                  onClick={() => increment(item.id, item.variantId)}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between md:block">
              <span className="md:hidden text-sm text-gray-500">Total</span>
              <span>₹{(item.price ?? 0) * item.quantity}</span>
            </div>

            {/* Tax */}
            <div className="flex justify-between md:block">
              <span className="md:hidden text-sm text-gray-500">Tax</span>
              <span>₹0.00</span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between md:block">
              <span className="md:hidden text-sm text-gray-500">Shipping</span>
              <span>₹0.00</span>
            </div>

            {/* Discount + Delete */}
            <div className="flex items-center justify-between md:justify-start gap-4">
              <div className="flex justify-between w-full md:block">
                <span className="md:hidden text-sm text-gray-500">
                  Discount
                </span>
                <span>₹0.00</span>
              </div>
              <button onClick={() =>{
                  removeItem(item.id, item.variantId)
                  toast.success("Removed item to cart successfully!");
              } 
              
              }
                
                >
                <Trash2 size={16} className="  text-red-500 cursor-pointer" />
              </button>
            </div>
          </div>
        ))}

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4">
          <div className="flex gap-2 w-full md:w-auto">
            <input
              placeholder="Coupon Code"
              className="border px-4 py-2 rounded-md w-full"
            />
            <button className="cursor-pointer bg-green-600 text-white px-6 py-2 rounded-md">
              Apply
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button className="cursor-pointer border px-6 py-2 rounded-md w-full sm:w-auto">
              Continue Shopping
            </button>
            <button
              onClick={() => navigate("/checkout")}
              className="cursor-pointer bg-orange-500 text-white px-6 py-2 rounded-md w-full sm:w-auto"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>

        <div className="text-right mt-4 font-semibold">Total: ₹{total}</div>
      </div>
    </>
  );
};

export default Cart;
