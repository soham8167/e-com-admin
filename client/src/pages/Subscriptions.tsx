const Subscription = () => {
  return (
    <div className="pt-32 px-4 max-w-5xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-[#5E8E2D] mb-6">
        Subscriptions
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {["Weekly", "Monthly", "Family"].map((plan) => (
          <div
            key={plan}
            className="bg-white shadow rounded-xl p-6 text-center"
          >
            <h3 className="font-semibold text-lg">{plan} Plan</h3>
            <p className="text-sm text-gray-500 mt-2">
              Fresh delivery on schedule
            </p>
            <button className="mt-4 bg-[#5E8E2D] text-white px-4 py-2 rounded">
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
