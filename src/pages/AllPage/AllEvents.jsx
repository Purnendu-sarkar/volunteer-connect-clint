import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://volunteer-server-nu.vercel.app/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Sorting and Filtering
  const sortedEvents = [...events]
    .filter((event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "date-newest")
        return new Date(b.date) - new Date(a.date);
      if (sortOption === "date-oldest")
        return new Date(a.date) - new Date(b.date);
      return 0;
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-75"></div>
        <span className="ml-3 text-lg font-semibold dark:text-white">
          Loading Events...
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
        All Events
      </h2>

      {/* Search & Sorting */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search events..."
          className="p-2 border rounded-md w-full md:w-1/3 dark:bg-gray-800 dark:text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="date-newest">Date: Newest First</option>
          <option value="date-oldest">Date: Oldest First</option>
        </select>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedEvents.map((event) => (
          <div
            key={event.id}
            className="border rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 
            bg-white dark:bg-gray-800 dark:border-gray-700"
          >
            <img
              src={event.thumbnail || "https://via.placeholder.com/300"}
              alt={event.title}
              className="w-full h-40 object-cover"
              loading="lazy"
            />
            <div className="p-4 dark:text-gray-200">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {event.description}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Date: {new Date(event.date).toLocaleDateString()}
              </p>

              {/* Learn More Button */}
              <Link
                to={`/events/${event.id}`}
                className="mt-4 block text-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition 
                dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </div>

      {sortedEvents.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
          No events found.
        </p>
      )}
    </div>
  );
};

export default AllEvents;
