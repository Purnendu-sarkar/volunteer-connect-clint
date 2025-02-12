import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const RequestsByOwner = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  // Fetch all the requests for the posts created by the logged-in user
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/requests-by-owner?email=${user?.email}`,
          // { withCredentials: true}
        );
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
        toast.error("Error fetching requests. Please try again.", {
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
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this volunteer request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `http://localhost:5000/my-volunteer-requests/${requestId}`
          );

          setRequests((prevRequests) =>
            prevRequests.filter((request) => request._id !== requestId)
          );

          Swal.fire(
            "Cancelled!",
            "The volunteer request has been cancelled successfully.",
            "success"
          );
        } catch (error) {
          console.error("Error cancelling request:", error);
          toast.error("Error cancelling the request. Please try again.", {
            position: "top-center",
          });
        }
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 my-10 bg-gray-50 shadow-md rounded-lg">
      <Helmet>
        <title>Volunteer Requests | Volunteer</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Requests on My Posts
      </h1>

      {requests.length === 0 ? (
        <div className="text-center text-xl text-gray-500">
          No volunteer requests have been made on your posts yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Volunteer Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Volunteer Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Requested Post
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id} className="hover:bg-gray-100 transition">
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {request.volunteerName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {request.volunteerEmail}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {request.title}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleCancelRequest(request._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
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

export default RequestsByOwner;
