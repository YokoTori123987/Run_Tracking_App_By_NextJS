import React from "react";

import { useUserAuth } from "../context/UserAuthContext";
import HomeUser from "./HomeMain/HomeUser";
import HomeScanner from "./HomeMain/HomeScanner";
import HomeGlobal from "./HomeMain/HomeGlobal";
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
                    <></>
                  ) : (
                    <>
                      {user.role === "GOVERNED" ? (
                        <></>
                      ) : (
                        <>
                          {user.role === "ADMIN" ? (
                            <></>
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
        <></>
      )}
    </>
  );
}
