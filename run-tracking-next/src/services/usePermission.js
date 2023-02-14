import React from "react";
import Router from "next/router";
import { useUserAuth } from "../context/UserAuthContext";
export default function usePermission(roles = []) {
  const { user, loading } = useUserAuth();
  // return <div>UseAuthRole</div>;
  if (user && !roles.includes(user.role)) {
    Router.push("/");
  }
}
