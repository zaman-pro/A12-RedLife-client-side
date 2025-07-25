import useAuth from "../../hooks/useAuth";

const DashboardHome = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center space-x-4">
        <img
          src={user?.photoURL}
          alt="User Avatar"
          className="w-16 h-16 rounded-full ring-2 ring-blood"
        />
        <h1 className="text-2xl font-semibold">
          Welcome, {user?.displayName}!
        </h1>
      </div>
    </div>
  );
};

export default DashboardHome;
