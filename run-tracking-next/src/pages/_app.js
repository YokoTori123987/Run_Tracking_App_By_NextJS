import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import ApolloCliient from "lib/apollo";
// import "../styles/header.css";
// import "../styles/index.css";
import { Row, Col } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import NavbarComponents from "@/components/NavbarComponents";
import { useRouter } from "next/router";
import { UserAuthContextProvider } from "../context/UserAuthContext";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const noAuthRequired = ["/", "/login", "/signup"];
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
                <ProtectedRoute> */}
              <Component {...pageProps} />
              {/* </ProtectedRoute>
              )} */}
            </Layout>
          </Layout>
        </UserAuthContextProvider>
      </ApolloProvider>
      {/* </AuthContextProvider> */}
    </div>
  );
}
