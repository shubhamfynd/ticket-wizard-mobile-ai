
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";

const Reports = () => {
  return (
    <div className="min-h-screen bg-secondary pb-16">
      <Header />
      <div className="p-4 pb-20">
        <h1 className="text-2xl font-bold mb-4">Reports</h1>
        <p className="text-gray-600">Your reports will appear here.</p>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Reports;
