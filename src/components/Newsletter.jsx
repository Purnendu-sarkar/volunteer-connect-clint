import { useState } from "react";
import Swal from "sweetalert2";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    Swal.fire({
      title: `Subscribed with: ${email}`,
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
    setEmail("");
  };

  return (
    <div className="container mx-auto py-8 px-4  transition-colors">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold  mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className=" mb-6">
          Stay updated with our latest events and volunteer opportunities!
        </p>
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-4 py-2 border rounded-lg w-full sm:w-2/3 "
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white  font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
