import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import ApolloCliient from "lib/apollo";
import { Layout } from "antd";
import NavbarComponents from "@/components/NavbarComponents";
import { useRouter } from "next/router";
import { UserAuthContextProvider } from "../context/UserAuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const noAuthRequired = ["/", "/login", "/signup"];
  // const adminAuthRequired = ["/admin"];
  return (
    <div>
      <ApolloProvider client={ApolloCliient}>
        <UserAuthContextProvider>
          {/* <AuthContextProvider> */}
          <Layout>
            <NavbarComponents />
            <Layout>
              {/* {noAuthRequired.includes(router.pathname) ? (
                <Component {...pageProps} />
              ) : (
                <ProtectedRoute>
                  <Component {...pageProps} />
                </ProtectedRoute>
              )} */}
              <Component {...pageProps} />
            </Layout>
          </Layout>
        </UserAuthContextProvider>
      </ApolloProvider>
      {/* </AuthContextProvider> */}
    </div>
  );
}
