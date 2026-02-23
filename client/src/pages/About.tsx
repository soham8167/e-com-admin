const About = () => {
  return (
    <div className="pt-32 px-4 max-w-5xl mx-auto mt-10">
      <h1 className="text-2xl md:text-3xl font-bold text-[#5E8E2D] mb-4">
        About Bhoomi
      </h1>

      <p className="text-gray-600 leading-relaxed">
        Bhoomi connects farmers directly to customers by delivering fresh,
        organic, and responsibly grown produce. We believe in fair pricing,
        sustainability, and healthy living.
      </p>

      {/* <div className="grid md:grid-cols-3 gap-6 mt-8">
        {["Fresh Produce", "Direct From Farmers", "Eco Friendly"].map(
          (item) => (
            <div
              key={item}
              className="bg-white shadow rounded-xl p-6 text-center"
            >
              <h3 className="font-semibold text-lg">{item}</h3>
              <p className="text-sm text-gray-500 mt-2">
                Quality guaranteed with every order.
              </p>
            </div>
          )
        )}
      </div> */}
    </div>
  );
};

export default About;
