import i1 from '../assets/images/i1.svg'
import i2 from '../assets/images/i2.png'
import i3 from '../assets/images/i3.png'
import i4 from '../assets/images/i4.png'
import { useCartStore } from "../store/cardStore";


const Checkout = () => {
  const { items } = useCartStore();

  const subtotal = items.reduce(
    (sum, i) => sum + (i.price ?? 0) * i.quantity,
    0
  );

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-32 mt-20">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-8">

            <div className="  rounded-lg p-5">
              <h3 className="font-semibold mb-4 ">
                Billing / Shipping Address
              </h3>

              
<div className="space-y-3">
  {/* Address  */}
  <div className="flex items-start gap-3">
    <div className="w-6 h-6 rounded-full bg-[#e0e0e0] flex items-center justify-center">
      <img src={i1} alt="address-icon" className="w-3 h-5" />
    </div>

    <p className="text-sm text-gray-700 ">
      <span className="font-medium">Home Address:</span> Kolkata, 700000
    </p>
  </div>

  <button className="cursor-pointer text-green-600 text-sm">
    + Add new address
  </button>

  <textarea
    placeholder="Type your order notes here"
    className="w-full border rounded-md p-2 text-sm h-20 resize-none"
  />
</div>




            </div>

            
<div className="bg-white rounded-xl p-4 sm:p-5 w-full -mt-10">
  <h3 className="font-semibold text-base mb-4">Payment</h3>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">

    <div
      className="relative bg-[#FBF9F6] rounded-lg p-3 h-23
                 w-full max-w-45 cursor-pointer"
    >
      <span className="absolute top-3 left-3 w-3.5 h-3.5 border border-gray-400 rounded-full" />

      <img
        src={i2}
        alt="cod"
        className="absolute top-3 right-3 w-9 h-9 object-contain"
      />

      <div className="absolute bottom-3 left-3">
        <p className="text-sm font-medium">Cash on Delivery</p>
      </div>
    </div>

    {/* Bhoomi */}
    <div
      className="relative bg-[#FBF9F6] rounded-lg p-3 h-23
                 w-full max-w-45 cursor-pointer"
    >
      <span className="absolute top-3 left-3 w-3.5 h-3.5 border border-gray-400 rounded-full" />

      <img
        src={i3}
        alt="wallet"
        className="absolute top-3 right-3 w-9 h-9 object-contain"
      />

      <div className="absolute bottom-3 left-3">
        <p className="text-sm font-medium">Bhoomi Wallet</p>
        <p className="text-xs text-gray-500">₹1050 in your account</p>
      </div>
    </div>

    <div
      className="relative bg-[#FBF9F6] rounded-lg p-3 h-23
                 w-full max-w-45 cursor-pointer"
    >
      <span className="absolute top-3 left-3 w-3.5 h-3.5 border border-gray-400 rounded-full" />

      <img
        src={i4}
        alt="card"
        className="absolute top-3 right-3 w-9 h-9 object-contain"
      />

      <div className="absolute bottom-3 left-3">
        <p className="text-sm font-medium">Credit / Debit Card</p>
      </div>
    </div>

  </div>

  <div className="flex flex-col sm:flex-row gap-3 mt-15">
    <button className="border border-gray-300 px-5 py-2.5 rounded-lg
                       text-sm w-full sm:w-auto">
      Add funds to your wallet
    </button>

    <button className="bg-orange-500 text-white px-8 py-2.5 rounded-lg
                       text-sm font-medium w-full sm:w-auto">
      Proceed to Payment
    </button>
  </div>
</div>

          </div>

          {/* RIGHT SECTION */}
         
    <div className="bg-white rounded-xl p-4 sm:p-5 w-full max-w-md mx-auto shadow-sm">
  <h3 className="font-semibold text-base mb-1">Order Summary</h3>
  <p className="text-sm text-gray-500 mb-3">
    Delivery Date <span className="font-medium">1st January 2025</span>
  </p>

  <div className="border-t border-dashed my-3" />

  <div className="text-sm space-y-3">
    <div className="flex justify-between">
      <span className="text-gray-600">Sub Total</span>
      <span className="font-medium">₹{subtotal}</span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-600">Discount</span>
      <span>₹0.00</span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-600">Delivery</span>
      <span>₹0.00</span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-600">Tax</span>
      <span>₹0.00</span>
    </div>
  </div>

  <div className="border-t border-dashed my-4" />

  <div className="flex justify-between font-semibold text-base">
    <span>Total</span>
    <span>₹{subtotal}</span>
  </div>

  <button className="mt-5 w-full border border-green-600 text-green-600 py-2.5 rounded-lg text-sm hover:bg-green-50 transition">
    Continue Shopping
  </button>
</div>


        </div>
      </div>

     
    </>
  );
};

export default Checkout;
