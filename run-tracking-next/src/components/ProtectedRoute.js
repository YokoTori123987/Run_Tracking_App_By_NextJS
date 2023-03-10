import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useUserAuth } from "../context/UserAuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;

// const ProtectedRoute = ({ children }) => {
//     const { user } = useUserAuth();
//     if (!user) {
//       return <Navigate to="/" />;
//     }
//     return children;
//   };

//   export default ProtectedRoute;
