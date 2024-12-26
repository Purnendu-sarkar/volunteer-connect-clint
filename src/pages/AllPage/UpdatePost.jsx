import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthContext from "../../context/AuthContext/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";

const UpdatePost = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    thumbnail: "",
    title: "",
    description: "",
    category: "",
    location: "",
    volunteersNeeded: "",
    deadline: new Date(),
  });

  // Fetch the current post data and set it to the form state
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/volunteerPost/${id}`
        );
        const data = response.data;
        setFormData({
          thumbnail: data.thumbnail || "",
          title: data.title || "",
          description: data.description || "",
          category: data.category || "",
          location: data.location || "",
          volunteersNeeded: data.volunteersNeeded || "",
          deadline: new Date(data.deadline) || new Date(),
        });
      } catch (error) {
        toast.error("Failed to fetch post data.");
      }
    };

    fetchPostData();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle date change for the deadline
  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      deadline: date,
    });
  };

  // Handle form submission to update the post
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      organizerName: user.displayName,
      organizerEmail: user.email,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/volunteerPost/${id}`,
        updatedData
      );
      console.log(response);
      if (response.data.result.modifiedCount > 0) {
        toast.success("Post updated successfully!");
        navigate("/manage-posts");
        console.log(response.data.result.modifiedCount);
      } else {
        toast.info("No changes were made to the post.");
        console.log(response.data.result.result.modifiedCount);
      }
    } catch (error) {
      toast.error("Failed to update the post.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Update Post | Volunteer</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">
        Update Volunteer Need Post
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded-lg space-y-6 max-w-3xl mx-auto"
      >
        {/* Thumbnail */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Thumbnail
          </label>
          <input
            type="text"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            placeholder="Enter thumbnail URL"
            className="input input-bordered w-full border-gray-300 focus:ring-primary focus:border-primary"
            required
          />
        </div>

        {/* Post Title */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Post Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter post title"
            className="input input-bordered w-full border-gray-300 focus:ring-primary focus:border-primary"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter post description"
            className="textarea textarea-bordered w-full border-gray-300 focus:ring-primary focus:border-primary"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="select select-bordered w-full border-gray-300 focus:ring-primary focus:border-primary"
            required
          >
            <option value="">Select a category</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="socialService">Social Service</option>
            <option value="animalWelfare">Animal Welfare</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            className="input input-bordered w-full border-gray-300 focus:ring-primary focus:border-primary"
            required
          />
        </div>

        {/* Volunteers Needed */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            No. of Volunteers Needed
          </label>
          <input
            type="number"
            name="volunteersNeeded"
            value={formData.volunteersNeeded}
            onChange={handleChange}
            placeholder="Enter number of volunteers"
            className="input input-bordered w-full border-gray-300 focus:ring-primary focus:border-primary"
            required
          />
        </div>

        {/* Deadline */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Deadline
          </label>
          <DatePicker
            selected={formData.deadline}
            onChange={handleDateChange}
            className="input input-bordered w-full border-gray-300 focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Organizer Name */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Organizer Name
          </label>
          <input
            type="text"
            value={user?.displayName || "N/A"}
            readOnly
            className="input input-bordered w-full bg-gray-100 border-gray-300"
          />
        </div>

        {/* Organizer Email */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Organizer Email
          </label>
          <input
            type="email"
            value={user?.email || "N/A"}
            readOnly
            className="input input-bordered w-full bg-gray-100 border-gray-300"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="btn btn-primary w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
