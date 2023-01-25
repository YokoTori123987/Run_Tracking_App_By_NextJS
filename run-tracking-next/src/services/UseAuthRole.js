import React from "react";
import { useUserAuth } from "../context/UserAuthContext";
export default function UseAuthRole() {
  const { user } = useUserAuth({ children });
  return <div>UseAuthRole</div>;
}
