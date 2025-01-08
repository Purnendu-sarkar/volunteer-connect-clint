import { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const SocialLogin = () => {
  const { singInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    singInWithGoogle()
      .then((result) => {
        // console.log(result.user);
        toast.success(`Welcome, ${result.user.displayName || "User"}!`, {
          position: "top-right",
        });
        navigate("/");
      })
      .catch((error) => {
        console.error(error.message);
        toast.error("Google Sign-In failed. Please try again.", {
          position: "top-right",
        }); 
      });
  };

  return (
    <div className="m-4 text-center">
      <div className="divider"></div>

      <button onClick={handleGoogleSignIn} className="btn btn-primary ">
        Google
      </button>
    </div>
  );
};

export default SocialLogin;
