import { useState } from "react";
import ManagePost from "./ManagePost";
import RequestsByOwner from "./RequestsByOwner";

const ManageMyPost = () => {
  const [activeComponent, setActiveComponent] = useState("ManagePost");

  return (
    <div className="max-w-7xl mx-auto min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-center  mb-8">
        Manage My Posts
      </h1>

      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setActiveComponent("ManagePost")}
          className={`px-4 py-2 rounded-lg text-white font-medium transition 
            ${
              activeComponent === "ManagePost"
                ? "bg-primary border-b-4 border-blue-900"
                : "bg-secondary hover:bg-blue-700"
            }`}
        >
          Manage Post
        </button>

        <button
          onClick={() => setActiveComponent("RequestsByOwner")}
          className={`px-4 py-2 rounded-lg text-white font-medium transition 
            ${
              activeComponent === "RequestsByOwner"
                ? "bg-primary border-b-4 border-blue-900"
                : "bg-secondary hover:bg-blue-700"
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
