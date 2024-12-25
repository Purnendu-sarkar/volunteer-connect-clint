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
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">My Volunteer Need Posts</h1>
      {myPosts.length === 0 ? (
        <p className="text-gray-500">You haven't added any posts yet.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Title</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myPosts.map((post) => (
              <tr key={post._id} className="border-t">
                <td className="border p-2">{post.title}</td>
                <td className="border p-2">{post.category}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => navigate(`/update-post/${post._id}`)}
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageMyPost;
