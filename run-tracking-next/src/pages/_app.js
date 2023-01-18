import "@/styles/globals.css";
import "../styles/header.css";
// import "../styles/index.css";
import { Row, Col } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";

const { Header, Content, Sider } = Layout;
import NavbarComponents from "@/components/NavbarComponents";
export default function App({ Component, pageProps }) {
  return (
    <div>
      <Layout>
        <NavbarComponents />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Layout>
    </div>
  );
}
