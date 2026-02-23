// // Catagory.tsx


// import p1 from "../../assets/images/bestseller.png";
// import p2 from "../../assets/images/exotic 1.png";
// import p3 from "../../assets/images/fruit 1.png";
// import p4 from "../../assets/images/greens 1.png";
// import p5 from "../../assets/images/ready-cook 1.png";
// import p6 from "../../assets/images/ready-eat 1.png";
// import p7 from "../../assets/images/cabbage 1.png";

// interface CatagoryData {
//   img: string;
//   title: string;
// }
// const allData: CatagoryData[] = [
//   { img: p1, title: "Best Sellers" },
//   { img: p2, title: "Greens" },
//   { img: p3, title: "Veggies" },
//   { img: p4, title: "Exotics" },
//   { img: p5, title: "Fruits" },
//   { img: p6, title: "Ready to Cook" },
//   { img: p7, title: "Ready to Eat" },
// ];

// const Catagory = () => {
//   return (
//     <div className="flex justify-center w-full px-2 sm:px-10">
//       <div className="grid grid-cols-2 sm:grid-cols-7 gap-6 sm:gap-10 py-6 bg-[#81C157] rounded-3xl w-full">
//         {allData.map((item, index) => (
//           <div key={index} className="flex flex-col items-center">
//             <div className="p-2 rounded-full bg-black/5">
//               <div className="flex flex-col gap-4 bg-white rounded-full p-4">
//                 <img src={item.img} alt="" className="w-16 h-16 sm:w-auto sm:h-auto" />
//               </div>
//             </div>
//             <div className="text-center mt-2 text-xs sm:text-base text-[#FFFFFF]">{item.title}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Catagory;








import { useEffect, useState } from "react";
import { api } from "../../api/axios";

interface CategoryData {
  _id: string;
  name: string;
  image: string;
}

const Catagory = () => {
  const [categories, setCategories] = useState<CategoryData[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

 const fetchCategories = async () => {
  try {
    const res = await api.get("/categories");

    console.log("API DATA:", res.data); 

    setCategories(res.data);
  } catch (error) {
    console.log("Error fetching categories", error);
  }
};
  return (
    <div className="flex justify-center w-full px-2 sm:px-10">
      <div className="grid grid-cols-2 sm:grid-cols-7 gap-6 sm:gap-10 py-6 bg-[#81C157] rounded-3xl w-full">
        {categories.map((item) => (
          <div key={item._id} className="flex flex-col items-center">
            <div className="p-2 rounded-full bg-black/5">
              <div className="flex flex-col gap-4 bg-white rounded-full p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>
            <div className="text-center mt-2 text-xs sm:text-base text-[#FFFFFF]">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catagory;