import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import AuthContext from "../../context/AuthContext/AuthContext";
import { Helmet } from "react-helmet-async";
// import axios from "axios";

const ManagePost = () => {
  const { user } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/my-posts?email=${user.email}&token=${localStorage.getItem("jwt")}`,
          { credentials: "include"}
        );
        const data = await response.json();
        setMyPosts(data);
      } catch (error) {
        toast.error("Failed to fetch your posts.");
      }
    };

    if (user?.email) {
      fetchMyPosts();
    }
  }, [user.email]);

  // Delete post with SweetAlert2
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `http://localhost:5000/volunteerPost/${id}`,
            {
              method: "DELETE",
            }
          );
          const result = await response.json();

          if (response.ok) {
            setMyPosts(myPosts.filter((post) => post._id !== id));
            Swal.fire("Deleted!", "Your post has been deleted.", "success");
          } else {
            Swal.fire(
              "Failed!",
              result.message || "Failed to delete post.",
              "error"
            );
          }
        } catch (error) {
          Swal.fire(
            "Error!",
            "An error occurred while deleting the post.",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Manage Post | Volunteer</title>
      </Helmet>
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        My Volunteer Need Posts
      </h1>
      {myPosts.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 mb-5">You haven't added any posts yet.</p>
          <Link
            className="mt-11 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            to="/volunteer-needs"
          >
            Click the button to add a new post
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-blue-100">
                <th className="border p-3 text-left text-sm font-medium text-gray-700">
                  Title
                </th>
                <th className="border p-3 text-left text-sm font-medium text-gray-700">
                  Category
                </th>
                <th className="border p-3 text-center text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {myPosts.map((post) => (
                <tr key={post._id} className="border-t hover:bg-gray-50">
                  <td className="border p-3 text-sm text-gray-700">
                    {post.title}
                  </td>
                  <td className="border p-3 text-sm text-gray-700">
                    {post.category}
                  </td>
                  <td className="border p-3 text-center space-x-2">
                    <button
                      onClick={() => navigate(`/update-post/${post._id}`)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManagePost;
