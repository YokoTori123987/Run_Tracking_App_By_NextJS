import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import ApolloCliient from "lib/apollo";
// import "../styles/header.css";
// import "../styles/index.css";
import { Row, Col } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Sider } = Layout;
import NavbarComponents from "@/components/NavbarComponents";
export default function App({ Component, pageProps }) {
  return (
    <div>
      <ApolloProvider client={ApolloCliient}>
        <Layout>
          <NavbarComponents />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Layout>
      </ApolloProvider>
    </div>
  );
}
