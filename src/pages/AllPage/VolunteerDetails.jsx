import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const VolunteerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://volunteer-server-nu.vercel.app/volunteerPost/${id}`
        );
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };
    fetchPost();
  }, [id]);
  //   console.log(post, id);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto h-screen px-4 py-8">
      <Helmet>
        <title>Volunteer Details | Volunteer</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-center text-secondary mb-8 sm:text-5xl">
        {post.title}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-full object-cover rounded-lg shadow-lg md:h-96"
        />
        <div>
          <p className=" text-lg mb-4">
            <strong>Description:</strong> {post.description}
          </p>
          <p className=" text-lg mb-4">
            <strong>Location:</strong> {post.location}
          </p>
          <p className=" text-lg mb-4">
            <strong>Volunteers Needed:</strong> {post.volunteersNeeded}
          </p>
          <p className=" text-lg mb-6">
            <strong>Deadline:</strong>{" "}
            {new Date(post.deadline).toLocaleDateString()}
          </p>
          {post.volunteersNeeded > 0 ? (
            <button
              className="bg-secondary text-white py-2 px-4 rounded-md"
              onClick={() => navigate(`/be-volunteer/${id}`)}
            >
              Be a Volunteer
            </button>
          ) : (
            <p className="text-accent font-bold">
              No more volunteers needed for this post
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolunteerDetails;
