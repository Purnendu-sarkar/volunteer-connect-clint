import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthContext from "../../context/AuthContext/AuthContext";

const ManageMyPost = () => {
  const { user } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/my-posts?email=${user.email}`);
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

  // Delete post
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/volunteerPost/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (response.ok) {
        setMyPosts(myPosts.filter((post) => post._id !== id));
        toast.success("Post deleted successfully");
      } else {
        toast.error(result.message || "Failed to delete post");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the post.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        My Volunteer Need Posts
      </h1>
      {myPosts.length === 0 ? (
        <p className="text-gray-500 text-center">You haven't added any posts yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-blue-100">
                <th className="border p-3 text-left text-sm font-medium text-gray-700">Title</th>
                <th className="border p-3 text-left text-sm font-medium text-gray-700">Category</th>
                <th className="border p-3 text-center text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myPosts.map((post) => (
                <tr key={post._id} className="border-t hover:bg-gray-50">
                  <td className="border p-3 text-sm text-gray-700">{post.title}</td>
                  <td className="border p-3 text-sm text-gray-700">{post.category}</td>
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

export default ManageMyPost;
