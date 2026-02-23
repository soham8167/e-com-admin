// Catagory.tsx
import p1 from "../../../assets/images/bestseller.png";
import p2 from "../../../assets/images/exotic 1.png";
import p3 from "../../../assets/images/fruit 1.png";
import p4 from "../../../assets/images/greens 1.png";
import p5 from "../../../assets/images/ready-cook 1.png";
import p6 from "../../../assets/images/ready-eat 1.png";
import p7 from "../../../assets/images/cabbage 1.png";
import p8 from "../../../assets/images/i5.png";
import p9 from "../../../assets/images/i6.png";
import p10 from "../../../assets/images/i7.png";


interface CatagoryData {
  img: string;
}
const allData: CatagoryData[] = [
  { img: p1 },
  { img: p2 },
  { img: p3 },
  { img: p4},
  { img: p5 },
  { img: p6 },
  { img: p7 },
  { img: p8 },
  { img: p9 },
  { img: p10 },
];

const Catagory = () => {
  return (
    <div className="flex justify-center w-full px-2 sm:px-10">
  <div
    className=" grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-10 gap-3 lg:gap-1 py-6 rounded-3xl w-full max-w-7xl ml-12">
    {allData.map((item, index) => (
      <div key={index} className="flex justify-center">
        <div className="p-2 rounded-full bg-black/5">
          <div className="bg-white rounded-full p-4 flex items-center justify-center">
            <img
              src={item.img}
              alt=""
              className="w-14 h-14 object-contain"
            />
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default Catagory;
