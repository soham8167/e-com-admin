import Mywallet from "./Mywallet";

const MyWalletOpen = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Top Wallet Card */}
      <Mywallet />

      {/* Transaction History Table */}
      <div className="mt-8 bg-[#FBF9F6] rounded-xl overflow-hidden shadow-sm">

        {/* Table Header */}
        <div className="grid grid-cols-4 gap-2 px-4 py-3 text-sm font-semibold text-gray-700 border-b">
          <p>Transaction No.</p>
          <p className="text-center">Amount</p>
          <p className="text-center">Date</p>
          <p className="text-right">Status</p>
        </div>

        {/* Rows */}
        {[
          { id: "123456780", amount: "₹2500", date: "12/01/2026", status: "Success" },
          { id: "123456781", amount: "₹2500", date: "15/01/2026", status: "Success" },
          { id: "123456782", amount: "₹2500", date: "20/01/2026", status: "Success" },
          { id: "123456783", amount: "₹2500", date: "25/01/2026", status: "Success" },
        ].map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-4 gap-2 px-4 py-4 text-sm border-b last:border-none items-center"
          >
            <p>{item.id}</p>
            <p className="text-center">{item.amount}</p>
            <p className="text-center">{item.date}</p>
            <p className="text-right text-green-600 font-medium">{item.status}</p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default MyWalletOpen;
