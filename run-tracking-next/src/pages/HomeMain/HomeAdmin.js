import usePermission from "@/services/usePermission";
import React from "react";

export default function HomeAdmin() {
  usePermission(["ADMIN"]);
  return <div>HomeAdmin</div>;
}
