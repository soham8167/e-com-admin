import bgimg from "../assets/images/Rectangle 122.png";
import Card from "../components/layout/veggies/Card";
import Catagory from "../components/layout/veggies/Catatory";

const Veggies = () => {
  return (
    <div className="pt-20 flex flex-col items-center mt-15">
  <div
    className="w-full max-w-275 h-40 sm:h-50 md:h-60 lg:h-70 bg-no-repeat bg-center bg-contain"
      
    style={{ backgroundImage: `url(${bgimg})` }}
  />

  {/* Category Section */}
  <div className="w-full px-3  relative left- ">
    <Catagory />
  </div>

  {/* Card Section */}
  <div className="w-full mt-15">
    <Card />
  </div>
</div>


  );
};

export default Veggies;
