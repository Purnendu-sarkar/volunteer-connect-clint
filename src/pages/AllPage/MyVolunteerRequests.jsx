import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";

const MyVolunteerRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  // Fetch all the volunteer requests of the logged-in user
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/my-volunteer-requests?email=${user?.email}`
        );
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
        toast.error("Error fetching volunteer requests. Please try again.", {
          position: "top-center",
        });
      }
    };

    if (user?.email) {
      fetchRequests();
    }
  }, [user]);

  // Handle cancellation of a volunteer request
  const handleCancelRequest = async (requestId) => {
    const confirmation = window.confirm(
      "Are you sure you want to cancel this volunteer request?"
    );
    if (confirmation) {
      try {
        await axios.delete(
          `http://localhost:5000/my-volunteer-requests/${requestId}`
        );

        setRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== requestId)
        );
        toast.success("Request cancelled successfully!", {
          position: "top-center",
        });
      } catch (error) {
        console.error("Error cancelling request:", error);
        toast.error("Error cancelling the request. Please try again.", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Helmet>
        <title>Volunteer Request | Volunteer</title>
      </Helmet>
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
        My Volunteer Requests
      </h1>

      {/* Display a message if no requests are found */}
      {requests.length === 0 ? (
        <div className="text-center text-xl text-gray-500">
          You have not requested to volunteer for any event yet. Start
          exploring!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-blue-100">
                <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">
                  Title
                </th>
                <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">
                  Category
                </th>
                <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">
                  Deadline
                </th>
                <th className="px-4 py-2 border text-center text-sm font-medium text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border text-sm text-gray-700">
                    {request.title}
                  </td>
                  <td className="px-4 py-2 border text-sm text-gray-700">
                    {request.category}
                  </td>
                  <td className="px-4 py-2 border text-sm text-gray-700">
                    {request.deadline}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => handleCancelRequest(request._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                    >
                      Cancel
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

export default MyVolunteerRequests;
