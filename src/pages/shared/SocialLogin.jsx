import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { singInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    singInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
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
