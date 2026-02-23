

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { vegStore } from "../store/vegstore";
import bgimg from "../assets/images/Rectangle 122.png";
import Veggiescard from "../components/layout/veggies/Veggiescard";
import { useCardDetailsStore } from "../store/cardDetailsStore";
import { useCartStore } from "../store/cardStore";
import { useWishlistStore } from "../store/wishListStore";
import v1 from "../assets/images/v1.svg";
import toast from "react-hot-toast";



const ProductDetails = () => {
  const { id } = useParams();
  const { products } = vegStore();
  const { activeTab, setActiveTab } = useCardDetailsStore();
  const { addToCart } = useCartStore();
  const { addToWishlist } = useWishlistStore();

  const product = products.find((item) => item.id === Number(id));

  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  //  Handle products with & without variants
  useEffect(() => {
    if (!product) return;

    if (product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    } else {
      setSelectedVariant({
        id: product.id,
        weight: product.weight,
        price: product.price,
      });
    }
  }, [product]);

  if (!product || !selectedVariant) {
    return <h2 className="text-center mt-20">Product not found</h2>;
  }

  return (
    <div className="w-full">
      <div className="flex justify-center mt-5">
        <div
          className="w-[92%] sm:w-[88%] md:w-full mt-30 lg:w-[70%]
                     h-35 sm:h-50 md:h-65
                     bg-cover bg-center rounded-2xl"
          style={{ backgroundImage: `url(${bgimg})` }}
        />
      </div>

      <div className="h-10 sm:h-16" />

      {/*  Main  */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT */}
          <div className="flex justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-60 sm:w-[320px] md:w-90 object-contain"
            />
          </div>

          {/* RIGHT */}
          <div>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-[#E27148]">
              {product.title.toUpperCase()} ({selectedVariant.weight})
            </h2>

            <p className="text-green-700 font-bold mt-2 text-lg">
              ₹{selectedVariant.price}/-
            </p>

            <p className="text-sm text-gray-500 mt-1">
              <span className="font-medium text-black">64 Units left</span> ·
              Delivery by Dec 31
            </p>
        

            {product.variants && (
              <div className="flex gap-4 mt-6">
                {product.variants.map((variant) => (
                  <div
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`cursor-pointer border rounded-lg p-2 text-center
                      ${
                        selectedVariant.id === variant.id
                          ? "border-green-600"
                          : "border-gray-300"
                      }`}
                  >
                    <img
                      src={product.image}
                      className="w-14 h-14 mx-auto object-contain"
                    />
                    <p className="text-xs mt-1">{variant.weight}</p>
                  </div>
                ))}
              </div>
            )}

            {/* 🔹 Buttons */}
           <div className="flex flex-col sm:flex-row gap-4 mt-6">

  {/* Add to Cart */}
  <button
  onClick={() => {
    addToCart({
      id: product.id,
      variantId: selectedVariant.id,
      title: product.title,
      price: selectedVariant.price,
      image: product.image,
      weight: selectedVariant.weight,
    });

    toast.success("Added to cart successfully! ");
  }}
  className="w-full sm:w-auto bg-orange-500 text-white px-6 py-3 rounded-md cursor-pointer"
>
  Add to Cart
</button>

  {/* Add to Wishlist */}
  <button
    onClick={() =>{
      addToWishlist({
        variantId: selectedVariant.id,
        id: product.id,
        title: product.title,
        price: selectedVariant.price,
        image: product.image,
        weight: selectedVariant.weight,
      });
      toast.success("Added to wishlist successfully! ");
    }}
    className="w-full sm:w-auto border border-green-600 text-green-600 px-4 py-3 rounded-md cursor-pointer flex items-center gap-4"
  >
    <img src={v1} alt="wishlist" />
    Add to Wishlist
  </button>

</div>


            {/* 🔹 Tabs */}
            <div className="mt-10">
              <div className="flex gap-3 border-b text-sm overflow-x-auto">
                {(["description", "nutrition", "recipes"] as const).map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-2 px-3 transition cursor-pointer
                        ${
                          activeTab === tab
                            ? "border-b-2 border-[#B09764] text-[#613812] font-medium bg-[#F3EFE7]"
                            : "text-gray-500 hover:text-green-600"
                        }`}
                    >
                      {tab === "description" && "Description"}
                      {tab === "nutrition" && "Nutritional Value"}
                      {tab === "recipes" && "Recipes"}
                    </button>
                  )
                )}
              </div>

              {/* 🔹 Tab Content */}
              <div className="mt-5 text-sm text-gray-700 leading-relaxed">
                {activeTab === "description" && (
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Fugiat eos facilis consequuntur vitae impedit atque corrupti.
                  </p>
                )}

                {activeTab === "nutrition" && (
                  <ul className="space-y-2">
                    <li><strong>Fiber:</strong> 3 g</li>
                    <li><strong>Protein:</strong> 3 g</li>
                    <li><strong>Carbs:</strong> 6 g</li>
                    <li><strong>Fat:</strong> 1 g</li>
                    <li><strong>Iron:</strong> 20% DV</li>
                    <li><strong>Magnesium:</strong> 5% DV</li>
                  </ul>
                )}

                {activeTab === "recipes" && (
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Incidunt quasi cumque temporibus.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-20" />
      <Veggiescard />
    </div>
  );
};

export default ProductDetails;












