import { useState } from "react";
import ManagePost from "./ManagePost";
import RequestsByOwner from "./RequestsByOwner";

const ManageMyPost = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleShowManagePost = () => {
    setActiveComponent("ManagePost");
  };

  const handleShowRequestsByOwner = () => {
    setActiveComponent("RequestsByOwner");
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Manage My Posts
      </h1>

      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={handleShowManagePost}
          className={`px-4 py-2 rounded-lg text-white font-medium transition ${
            activeComponent === "ManagePost"
              ? "bg-blue-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Manage Post
        </button>

        <button
          onClick={handleShowRequestsByOwner}
          className={`px-4 py-2 rounded-lg text-white font-medium transition ${
            activeComponent === "RequestsByOwner"
              ? "bg-blue-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Requests By Volunteer
        </button>
      </div>

      <div className="mt-8">
        {activeComponent === "ManagePost" && <ManagePost />}
        {activeComponent === "RequestsByOwner" && <RequestsByOwner />}
      </div>
    </div>
  );
};

export default ManageMyPost;


