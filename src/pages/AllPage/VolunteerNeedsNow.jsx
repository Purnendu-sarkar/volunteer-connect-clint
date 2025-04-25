import { useEffect, useState } from "react";

const VolunteerNeedsNow = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://volunteer-server-nu.vercel.app/volunteerNeedsNow"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-75"></div>
        <span className="ml-3 text-lg font-semibold dark:text-white">
          Fetching Opportunities...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 font-semibold dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">
        Volunteer Needs Now
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="border rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            {/* Thumbnail with Lazy Loading */}
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-40 object-cover"
              loading="lazy"
            />

            {/* Post Info */}
            <div className="p-4 ">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm ">
                Category: {post.category}
              </p>
              <p className="text-sm ">
                Deadline: {new Date(post.deadline).toLocaleDateString()}
              </p>

              {/* View Details Button */}
              <button
                onClick={() =>
                  (window.location.href = `/volunteer/${post._id}`)
                }
                className="mt-4 w-full px-4 py-2 bg-accent text-white rounded hover:bg-blue-600 transition 
                dark:bg-blue-600 dark:hover:bg-blue-700"
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
