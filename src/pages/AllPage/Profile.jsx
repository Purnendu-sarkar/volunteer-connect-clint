import React from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import avatar from "../../assets/default-avatar.png";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Please log in to view your profile.
      </div>
    );
  }

  const userBio =
    "Passionate about volunteering and making a difference in the community.";
  const joinedDate = "January 1, 2023";
  const profileViews = 150;
  const recentPosts = [
    {
      id: 1,
      content: "Organized a community cleanup today!",
      date: "October 10, 2023",
    },
    {
      id: 2,
      content: "Attended a volunteering workshop.",
      date: "October 5, 2023",
    },
  ];
  const socialMedia = {
    twitter: "https://twitter.com/user",
    facebook: "https://facebook.com/user",
    linkedin: "https://linkedin.com/in/user",
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-8 ">My Profile</h1>

      {/* Profile Header */}
      <div className="flex justify-center mb-8">
        <img
          src={user.photoURL || avatar}
          alt="Profile Picture"
          className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
        />
      </div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">
          {user.displayName || "No name set"}
        </h2>
        <p>{user.email}</p>
        <p className="text-sm ">Joined: {joinedDate}</p>
        <p className="text-sm ">Profile Views: {profileViews}</p>
      </div>

      {/* Bio Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">About Me</h3>
        <p className=" leading-relaxed">{userBio}</p>
      </div>

      {/* Social Media Links */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2 ">Social Media</h3>
        <div className="flex space-x-4">
          <a
            href={socialMedia.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline hover:text-blue-600 transition"
          >
            Twitter
          </a>
          <a
            href={socialMedia.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline hover:text-blue-800 transition"
          >
            Facebook
          </a>
          <a
            href={socialMedia.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-800 hover:underline hover:text-blue-900 transition"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 ">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div
              key={post.id}
              className="p-4  rounded-lg shadow-sm hover:shadow-md transition"
            >
              <p>{post.content}</p>
              <small>{post.date}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
