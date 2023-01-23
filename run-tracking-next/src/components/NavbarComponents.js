import React from "react";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  AlibabaOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import Image from "next/image";
// import styles from "@/styles/Home.module.css";

import Head from "next/head";
import Link from "next/link";
import { useUserAuth } from "../context/UserAuthContext";
import { useRouter } from "next/router";
import { Layout, Menu, Col, Row } from "antd";
// import { getAuth, signOut } from "firebase/auth";
// import { Volkhov } from "@next/font/google";

export default function NavbarComponents() {
  const { user, logOut } = useUserAuth();
  const router = useRouter();
  const { Header } = Layout;
  const navigationAdmin = [
    {
      label: <Link href="/parks">Park</Link>,
      key: "manu-1",
      // icon: <MailOutlined />,
    },
    {
      label: <Link href="/checkpoints">Checkpoints</Link>,
      key: "manu-2",
      // icon: <AppstoreOutlined />,
    },
    {
      label: <Link href="/paths">Paths</Link>,
      key: "manu-3",
    },
    {
      label: <Link href="/users">Users</Link>,
      key: "menu-4",
    },
    {
      lable: "sub menu",
      key: "summenu",
      icon: <UnorderedListOutlined />,
      children: [
        {
          label: <Link href="/logs">Logs</Link>,
          key: "summenu-2",
        },
        {
          label: <Link href="/laps">Laps</Link>,
          key: "summenu-3",
        },
        {
          label: <Link href="/runs">Runs</Link>,
          key: "summenu-4",
        },
        {
          label: <Link href="/path-checkpoints">PathCheckpoints</Link>,
          key: "summenu-5",
        },
        {
          label: <Link href="/checkPath">CheckPath</Link>,
          key: "summenu-6",
        },
      ],
    },
  ];

  // const navlogout = [
  //   {
  //     label: <Link href="/login">ออกจากระบบ</Link>,
  //     key: "login",
  //     icon: <UsergroupAddOutlined />,
  //   },
  // ];

  const navigationMain = [
    {
      label: <Link href="/login">เข้าสู่ระบบ</Link>,
      key: "login",
      icon: <UsergroupAddOutlined />,
    },
    {
      label: <Link href="/checkPath">เข้าระบบสแกนแส้นทาง</Link>,
      key: "checkPath",
      icon: <AppstoreOutlined />,
    },
  ];
  return (
    <>
      <Header className="header">
        <Row>
          <Head>
            <title>Run Tracking App</title>
            <meta name="description" content="Generated by create next app" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Col span={1} />
          {/* <Row justify="space-around" align="middle"> */}
          {/* <Col span={2} justify="space-evenly"> */}
          <div className="logo">
            <Link href="/">
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                // className={styles.vercelLogo}
                width={100}
                height={24}
                style={{ margin: "auto" }}
                priority
              />
            </Link>
          </div>
          <Col span={1} />
          <Col span={2} style={{ marginLeft: "auto" }}>
            {user ? (
              <>
                {/* <Meun theme="dark" mode="horizontal" items={navlogout} /> */}
                <Link
                  href="/login"
                  onClick={() => {
                    logOut();
                    router.push("/login");
                  }}
                >
                  ออกจากระบบ
                </Link>
              </>
            ) : (
              <>
                <Menu
                  theme="dark"
                  mode="horizontal"
                  // mode="inline"
                  items={navigationMain}
                />
              </>
            )}
          </Col>
          {/* <Menu
            className="relative ml-3 grid grid-cols-1"
            theme="dark"
            mode="horizontal"
            items={navigationAdmin}
          /> */}
          <Col span={1} />
        </Row>
      </Header>
    </>
  );
}
