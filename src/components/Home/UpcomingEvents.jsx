import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch events from backend
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4  border-opacity-75"></div>
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
      <h2 className="text-3xl font-bold text-center mb-6 ">
        Upcoming Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.slice(0, 6).map((event) => (
          <div
            key={event.id}
            className="border rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 
            "
          >
            <img
              src={event.thumbnail || "https://via.placeholder.com/300"}
              alt={event.title}
              className="w-full h-40 object-cover"
              loading="lazy"
            />
            <div className="p-4 ">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="">
                {event.description}
              </p>
              <p className="text-sm ">
                Date: {new Date(event.date).toLocaleDateString()}
              </p>
              <Link
                to={`/events/${event.id}`}
                className="mt-4 block text-center px-4 py-2 bg-accent text-white rounded hover:bg-blue-600 transition 
                "
              >
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <Link to="/all-events">
          <button className="btn bg-accent text-white px-9">See All</button>
        </Link>
      </div>
    </div>
  );
};

export default UpcomingEvents;
