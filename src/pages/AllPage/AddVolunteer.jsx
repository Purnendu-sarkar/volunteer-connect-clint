import { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthContext from "../../context/AuthContext/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddVolunteer = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    thumbnail: "",
    title: "",
    description: "",
    category: "",
    location: "",
    volunteersNeeded: "",
    deadline: new Date(),
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate "thumbnail" URL field
    if (name === "thumbnail") {
      const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i;
      if (!urlPattern.test(value)) {
        toast.error("Please enter a valid image URL (png, jpg, jpeg, gif, webp, svg).", {
          position: "top-center",
        });
        return;
      }
    }

    // Validate "volunteersNeeded" field
    if (name === "volunteersNeeded") {
      if (value < 1) {
        toast.error("Number of Volunteers Needed must be at least 1.", {
          position: "top-center",
        });
        return;
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle date change for deadline
  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      deadline: date,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      ...formData,
      volunteersNeeded: parseInt(formData.volunteersNeeded, 10), // Convert to number
      organizerName: user.displayName,
      organizerEmail: user.email,
    };

    try {
      const response = await axios.post("http://localhost:5000/addPost", postData);
      if (response.data.insertedId) {
        toast.success("Post added successfully!", {
          position: "top-center",
        });
        setFormData({
          thumbnail: "",
          title: "",
          description: "",
          category: "",
          location: "",
          volunteersNeeded: "",
          deadline: new Date(),
        });
      }
    } catch (error) {
      toast.error("Failed to add post. Try again!", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error("Error adding post:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">
        Add Volunteer Need Post
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded-lg space-y-6 max-w-3xl mx-auto"
      >
        {/* Thumbnail */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Thumbnail</label>
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
          <label className="block mb-1 font-semibold text-gray-700">Post Title</label>
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
          <label className="block mb-1 font-semibold text-gray-700">Description</label>
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
          <label className="block mb-1 font-semibold text-gray-700">Category</label>
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
          <label className="block mb-1 font-semibold text-gray-700">Location</label>
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
          <label className="block mb-1 font-semibold text-gray-700">Deadline</label>
          <DatePicker
            selected={formData.deadline}
            onChange={handleDateChange}
            className="input input-bordered w-full border-gray-300 focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Organizer Name */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Organizer Name</label>
          <input
            type="text"
            value={user?.displayName || "N/A"}
            readOnly
            className="input input-bordered w-full bg-gray-100 border-gray-300"
          />
        </div>

        {/* Organizer Email */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Organizer Email</label>
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
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVolunteer;
