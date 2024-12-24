// import { useContext } from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import AuthContext from "./AuthContext";


// const PrivateRoute = ({ children }) => {
//     const { user, loading } = useContext(AuthContext);
//   const location = useLocation();
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <span className="loading loading-bars loading-lg"></span>
//       </div>
//     );
//   }
//   if (!user) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }
//   return children;
// };
// }

// export default PrivateRoute;
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    // Loading state display
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  // If user is not logged in, redirect to the login page
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Return the children if the user is logged in
  return children;
};

export default PrivateRoute;

