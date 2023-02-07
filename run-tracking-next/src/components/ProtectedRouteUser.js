import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useUserAuth } from "../context/UserAuthContext";

import React from "react";

const ProtectedRouteUser = ({ children }) => {
  const { user } = useUserAuth();
  const { route } = useRouter();

  useEffect(()=> {
    if (user){
        {user.route === ""}
    }
  })
  return <div>ProtectedRouteUser</div>;
};

export default ProtectedRouteUser;
