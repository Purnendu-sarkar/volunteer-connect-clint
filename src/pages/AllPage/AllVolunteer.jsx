import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaThLarge, FaTable } from "react-icons/fa";

const AllVolunteer = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [isGrid, setIsGrid] = useState(true);

  // Fetch all posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/volunteerPosts",
          {
            params: { title: search },
          }
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [search]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Helmet>
        <title>All Volunteers | Professional Design</title>
      </Helmet>

      {/* Header Section */}
      <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-blue-600">
          Volunteer Recruitment Platform
        </h1>
      </header>

      {/* Main Section */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Explore Volunteer Opportunities
        </h2>

        {/* Search and Toggle Layout */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Search by Title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full md:w-2/3 border-gray-300"
          />
          <button
            onClick={() => setIsGrid(!isGrid)}
            className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-blue-700 transition"
          >
            {isGrid ? <FaTable /> : <FaThLarge />}
            Change to {isGrid ? "Table" : "Grid"}
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
                  <h3 className="text-lg font-bold text-gray-800">{post.title}</h3>
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
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-3 text-left font-medium text-gray-600">
                    Title
                  </th>
                  <th className="border p-3 text-left font-medium text-gray-600">
                    Location
                  </th>
                  <th className="border p-3 text-center font-medium text-gray-600">
                    Volunteers Needed
                  </th>
                  <th className="border p-3 text-center font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-50">
                    <td className="border p-3">{post.title}</td>
                    <td className="border p-3">{post.location}</td>
                    <td className="border p-3 text-center">
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
