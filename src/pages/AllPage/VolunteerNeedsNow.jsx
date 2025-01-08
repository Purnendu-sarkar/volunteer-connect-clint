import { useEffect, useState } from "react";

const VolunteerNeedsNow = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch the posts from the backend
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://volunteer-server-nu.vercel.app/volunteerNeedsNow");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-6">
        Volunteer Needs Now
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="border rounded-lg shadow-md overflow-hidden"
          >
            {/* Thumbnail */}
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-40 object-cover"
            />

            {/* Post Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-600">Category: {post.category}</p>
              <p className="text-sm text-gray-600">
                Deadline: {new Date(post.deadline).toLocaleDateString()}
              </p>

              {/* View Details Button */}
              <button
                onClick={() =>
                  (window.location.href = `/volunteer/${post._id}`)
                }
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolunteerNeedsNow;
