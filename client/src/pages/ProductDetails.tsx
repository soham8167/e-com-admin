import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import bgimg from "../assets/images/Rectangle 122.png";
import Veggiescard from "../components/layout/veggies/Veggiescard";
import v1 from "../assets/images/v1.svg";
import toast from "react-hot-toast";
import { api } from "../api/axios";

interface Variant {
  _id: string;
  weight: string;
  price: number; 
}

interface Product {
  _id: string;
  title: string;
  price: number;
  image: string;
  description?: string;
  variants?: Variant[];
  weight?: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<
    "description" | "nutrition" | "recipes"
  >("description");

  // Fetch Single Product from Backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);

        if (res.data.variants && res.data.variants.length > 0) {
          setSelectedVariant(res.data.variants[0]);
        } else {
          setSelectedVariant({
            _id: res.data._id,
            weight: res.data.weight,
            price: res.data.price,
          });
        }
      } catch (error) {
        console.error("Failed to fetch product");
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (!product || !selectedVariant) {
    return <h2 className="text-center mt-20">Product not found</h2>;
  }

  return (
    <div className="w-full">
      {/* 🔹 Banner */}
      <div className="flex justify-center mt-5">
        <div
          className="w-[92%] sm:w-[88%] md:w-full mt-30 lg:w-[70%]
                     h-35 sm:h-50 md:h-65
                     bg-cover bg-center rounded-2xl"
          style={{ backgroundImage: `url(${bgimg})` }}
        />
      </div>

      <div className="h-10 sm:h-16" />

      {/* 🔹 Main */}
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
              <span className="font-medium text-black">In Stock</span>
            </p>

            {/* 🔹 Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="flex gap-4 mt-6">
                {product.variants.map((variant) => (
                  <div
                    key={variant._id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`cursor-pointer border rounded-lg p-2 text-center
                      ${
                        selectedVariant._id === variant._id
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
                  toast.success("Added to cart successfully!");
                }}
                className="w-full sm:w-auto bg-orange-500 text-white px-6 py-3 rounded-md cursor-pointer"
              >
                Add to Cart
              </button>

              {/* Add to Wishlist */}
              <button
                onClick={() => {
                  toast.success("Added to wishlist successfully!");
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

              <div className="mt-5 text-sm text-gray-700 leading-relaxed">
                {activeTab === "description" && (
                  <p>
                    {product.description ||
                      "No description available for this product."}
                  </p>
                )}

                {activeTab === "nutrition" && (
                  <p>Nutritional details will be added soon.</p>
                )}

                {activeTab === "recipes" && (
                  <p>Recipe suggestions coming soon.</p>
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