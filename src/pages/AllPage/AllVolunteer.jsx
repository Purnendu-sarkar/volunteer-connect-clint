import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FaThLarge,
  FaTable,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";

const AllVolunteer = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isGrid, setIsGrid] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://volunteer-server-nu.vercel.app/volunteerPosts",
          {
            params: { title: search },
          }
        );
        let sortedPosts = [...response.data];
        if (sortOrder === "asc") {
          sortedPosts.sort((a, b) => a.volunteersNeeded - b.volunteersNeeded);
        } else {
          sortedPosts.sort((a, b) => b.volunteersNeeded - a.volunteersNeeded);
        }
        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [search, sortOrder]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-75"></div>
        <span className="ml-3 text-lg font-semibold dark:text-white">
          Fetching Opportunities...
        </span>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-4">
      <Helmet>
        <title>All Volunteers | Professional Design</title>
      </Helmet>
      {/* Main Section */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Explore Volunteer Opportunities
        </h2>

        {/* Search and Toggle Layout */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Search by Title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full md:w-2/3 border-gray-300 dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="w-full md:w-auto bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700 transition"
          >
            {sortOrder === "asc" ? <FaSortAmountDown /> : <FaSortAmountUp />}{" "}
            Sort by Volunteers Needed
          </button>
          <button
            onClick={() => setIsGrid(!isGrid)}
            className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition"
          >
            {isGrid ? <FaTable /> : <FaThLarge />} Change to{" "}
            {isGrid ? "Table" : "Grid"}
          </button>
        </div>

        {/* Cards or Table */}
        {isGrid ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="card bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {post.title}
                  </h3>
                  <p className="text-gray-600">Location: {post.location}</p>
                  <p className="text-gray-600">
                    Volunteers Needed: {post.volunteersNeeded}
                  </p>
                  <Link
                    to={`/volunteer/${post._id}`}
                    className="block mt-4 bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="border p-3 text-left font-medium text-gray-600 dark:text-white">
                    Title
                  </th>
                  <th className="border p-3 text-left font-medium text-gray-600 dark:text-white">
                    Location
                  </th>
                  <th className="border p-3 text-center font-medium text-gray-600 dark:text-white">
                    Volunteers Needed
                  </th>
                  <th className="border p-3 text-center font-medium text-gray-600 dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="border p-3 text-gray-800 dark:text-white">
                      {post.title}
                    </td>
                    <td className="border p-3 text-gray-800 dark:text-white">
                      {post.location}
                    </td>
                    <td className="border p-3 text-center text-gray-800 dark:text-white">
                      {post.volunteersNeeded}
                    </td>
                    <td className="border p-3 text-center">
                      <Link
                        to={`/volunteer/${post._id}`}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllVolunteer;
