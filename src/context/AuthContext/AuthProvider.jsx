import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../../firebase/firebase.init";
import { updateProfile } from "firebase/auth";
import PropTypes from "prop-types";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // const createUser = (email, password) => {
  //   setLoading(true);
  //   return createUserWithEmailAndPassword(auth, email, password);
  // };
  const createUser = (email, password, displayName, photoURL) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).then((result) => {
      return updateProfile(result.user, {
        displayName: displayName || "",
        photoURL: photoURL || "",
      })
        .then(() => {
          // console.log("Profile updated successfully!");
          // Ensure the updated user is set
          setUser({
            ...result.user,
            displayName,
            photoURL,
          });
          return result.user;
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
          throw error;
        });
    });
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // console.log(loading);


  const singInWithGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
}

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // console.log("CurrentUser-->", currentUser);
      setLoading(true);

      if (currentUser?.email) {
        setUser(currentUser);

        try {
          // Request JWT from the backend
          const { data } = await axios.post(
            `https://volunteer-server-nu.vercel.app/jwt`,
            { email: currentUser?.email },
            { withCredentials: true }
          );
          localStorage.setItem("jwt", data.token);
          // console.log("JWT Received:", data);
        } catch (error) {
          console.error("Error fetching JWT:", error);
        }
      } else {
        setUser(null);

        try {
          // Logout user and clear cookies from backend
          const { data } = await axios.get(
            `https://volunteer-server-nu.vercel.app/logout`,
            { withCredentials: true }
          );
          // console.log("User logged out:", data);
        } catch (error) {
          console.error("Error during logout:", error);
        }
      }

      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signOutUser,
    singInWithGoogle
  };
  return (
    <AuthContext.Provider value={authInfo}>{!loading && children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;