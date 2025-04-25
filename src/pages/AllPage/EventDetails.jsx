import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`https://volunteer-server-nu.vercel.app/events/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
        <span className="mt-3 text-lg font-semibold dark:text-white">
          Fetching Opportunities...
        </span>
      </div>
    );
  }

  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-col items-center gap-6">
      {/* Event Image */}
      <div className="w-full">
        <img
          src={event?.thumbnail}
          alt={event?.title}
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Event Details */}
      <div className="w-full md:w-1/2 space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          {event?.title}
        </h1>
        <p className="text-lg dark:text-gray-300">{event?.description}</p>
        <p className="dark:text-gray-300">
          <strong>Date:</strong> {new Date(event?.date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default EventDetails;
