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
  console.log(user);
  return (
    <>
      {user ? (
        <>
          {user.role === "USER" ? (
            <>
              <HomeUser />
            </>
          ) : (
            <>
              {user.role === "SCANNER" ? (
                <>
                  <HomeScanner />
                </>
              ) : (
                <>
                  {user.role === "OWNED" ? (
                    <>
                      <HomeOwned />
                    </>
                  ) : (
                    <>
                      {user.role === "GOVERNED" ? (
                        <>
                          <HomeGoverned />
                        </>
                      ) : (
                        <>
                          {user.role === "ADMIN" ? (
                            <>
                              <HomeAdmin />
                            </>
                          ) : (
                            <>
                              <HomeGlobal />
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <HomeGlobal />
        </>
      )}
    </>
  );
}
