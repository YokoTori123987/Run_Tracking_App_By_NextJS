import React from "react";

import { useUserAuth } from "../context/UserAuthContext";
import HomeUser from "./HomeMain/HomeUser";
import HomeScanner from "./HomeMain/HomeScanner";
import HomeGlobal from "./HomeMain/HomeGlobal";
import HomeOwned from "./HomeMain/HomeOwned";
import HomeGoverned from "./HomeMain/HomeGoverned";
import HomeAdmin from "./HomeMain/HomeAdmin";
export default function Home() {
  const { user } = useUserAuth();
  if (user) {
    if (user.role === "USER") {
      return <HomeUser />;
    }
    if (user.role === "SCANNER") {
      return <HomeScanner />;
    }
    if (user.role === "OWNED") {
      return <HomeOwned />;
    }
    if (user.role === "GOVERNED") {
      return <HomeGoverned />;
    }
    if (user.role === "ADMIN") {
      return <HomeAdmin />;
    }
  }
  return <HomeGlobal />;
}
