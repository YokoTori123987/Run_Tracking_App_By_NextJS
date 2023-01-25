import { Inter } from "@next/font/google";

import React from "react";
import { Card, Carousel, Col, Row } from "antd";
import {
  QrcodeOutlined,
  TrophyOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const inter = Inter({ subsets: ["latin"] });

const contentStyle = {
  height: "700px",
  color: "#fff",
  textAlign: "center",
  background: "#364d79",
  fontSize: 70,
  fontFamily: "cursive",
};

export default function Home() {
  return (
    <>
      <Col xs={{ span: 24}} >
        <Carousel autoplay>
          <div>
            <div style={contentStyle}>
              <div
                style={{
                  backgroundImage: `url("https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2019/09/WEB_GreenSpace-00.jpg")`,
                  height: "700px",
                  
                }}
              ></div>
            </div>
          </div>
          <div style={contentStyle}>
            <div
              style={{
                backgroundImage: `url("https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5eeea355389655.59822ff824b72.gif")`,
                height: "700px",
              }}
            ></div>
          </div>
          <div style={contentStyle}>
            <div
              style={{
                backgroundImage: `url("https://wallpaperaccess.com/full/5927911.gif")`,
                height: "700px",
              }}
            ></div>
          </div>
          <div style={contentStyle}>
            <div
              style={{
                backgroundImage: `url("https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5eeea355389655.59822ff824b72.gif")`,
                height: "700px",
              }}
            ></div>
          </div>
        </Carousel>
      </Col>
      <div
        style={{
          padding: "20px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 6, push: 2 }}>
            <Card style={{ marginBottom: "20px" }}>
              <QrcodeOutlined style={{ height: "50px" }} />
              <h1 className="fontSize-2xl">หัวข้อที่1 </h1>
              <br />
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua.
              </p>
            </Card>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 6, push: 3 }}>
            <Card style={{ marginBottom: "20px" }}>
              <TrophyOutlined style={{ height: "50px" }} />
              <h1>หัวข้อที่2 </h1>
              <br />
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore.
              </p>
            </Card>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 6, push: 4 }}>
            <Card style={{ marginBottom: "20px" }}>
              <TeamOutlined style={{ height: "50px" }} />
              <h1>หัวข้อที่3 </h1>
              <br />
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat.
              </p>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
