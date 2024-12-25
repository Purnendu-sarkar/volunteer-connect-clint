import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext/AuthContext";

const BeAVolunteer = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/volunteerPost/${id}`
        );
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [id]);


  const handleRequest = async () => {
    const requestData = {
      ...post,
      volunteerName: user?.displayName || "No Name",
      volunteerEmail: user?.email || "No Email",
      suggestion,
      status: "requested",
    };

    try {
      await axios.post(
        `http://localhost:5000/requestVolunteer/${id}`,
        requestData
      );

      // Decrement "No. of volunteers needed"
      await axios.patch(`http://localhost:5000/volunteerPost/${id}`, {
        $inc: { volunteersNeeded: -1 },
      });

      alert("Request submitted successfully!");
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  if (!post) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
        Be a Volunteer
      </h1>
      <form className="space-y-6">
        {/* Read-Only Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Thumbnail:
          </label>
          <img
            src={post.thumbnail}
            alt="Thumbnail"
            className="w-full rounded-md shadow-sm"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title:
            </label>
            <input
              type="text"
              value={post.title}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description:
            </label>
            <textarea
              value={post.description}
              readOnly
              className="textarea textarea-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category:
            </label>
            <input
              type="text"
              value={post.category}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location:
            </label>
            <input
              type="text"
              value={post.location}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              No. of Volunteers Needed:
            </label>
            <input
              type="number"
              value={post.volunteersNeeded}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Deadline:
            </label>
            <input
              type="text"
              value={post.deadline}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Organizer Name:
            </label>
            <input
              type="text"
              value={post.organizerName}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Organizer Email:
            </label>
            <input
              type="text"
              value={post.organizerEmail}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Editable Field for Suggestion */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Suggestion:
          </label>
          <textarea
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="Enter your suggestion here"
          />
        </div>

        {/* Read-Only User Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Volunteer Name:
            </label>
            <input
              type="text"
              value={user?.displayName || "No Name"}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Volunteer Email:
            </label>
            <input
              type="email"
              value={user?.email || "No Email"}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Request Button */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleRequest}
            className="btn btn-primary w-full md:w-auto"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default BeAVolunteer;
