import React from "react";
import { Card, Carousel, Col, Row } from "antd";
import {
  QrcodeOutlined,
  TrophyOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Inter } from "@next/font/google";
// import { useUserAuth } from "../context/UserAuthContext";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { Button } from "antd";

const inter = Inter({ subsets: ["latin"] });

const contentStyle = {
  width: "100%",
  color: "#fff",
  textAlign: "center",
  background: "#364d79",
  fontSize: 70,
  fontFamily: "cursive",
};

export default function HomeGlobal() {
  return (
    <div>
      <Carousel autoplay>
        <div>
          <div style={contentStyle}>
            <div
              style={{
                backgroundImage: `url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/72d9717d-2ba6-4008-bd25-ceb6d49b5f40/dbmim7a-8cec114b-c425-4a73-a95b-f97d3e5100b2.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzcyZDk3MTdkLTJiYTYtNDAwOC1iZDI1LWNlYjZkNDliNWY0MFwvZGJtaW03YS04Y2VjMTE0Yi1jNDI1LTRhNzMtYTk1Yi1mOTdkM2U1MTAwYjIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.O4Rh64Kmq0kYDgA2oGiTkAKAv1RqJkwy0V367V8G2U4")`,
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
                height: "700px",
                width: "100%",
              }}
            ></div>
          </div>
        </div>
        <div style={contentStyle}>
          <div
            style={{
              backgroundImage: `url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/72d9717d-2ba6-4008-bd25-ceb6d49b5f40/dbmim7a-8cec114b-c425-4a73-a95b-f97d3e5100b2.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzcyZDk3MTdkLTJiYTYtNDAwOC1iZDI1LWNlYjZkNDliNWY0MFwvZGJtaW03YS04Y2VjMTE0Yi1jNDI1LTRhNzMtYTk1Yi1mOTdkM2U1MTAwYjIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.O4Rh64Kmq0kYDgA2oGiTkAKAv1RqJkwy0V367V8G2U4")`,
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
              backgroundSize: "cover",
              height: "700px",
              width: "100%",
            }}
          ></div>
        </div>
        <div style={contentStyle}>
          <div
            style={{
              backgroundImage: `url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/72d9717d-2ba6-4008-bd25-ceb6d49b5f40/dbmim7a-8cec114b-c425-4a73-a95b-f97d3e5100b2.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzcyZDk3MTdkLTJiYTYtNDAwOC1iZDI1LWNlYjZkNDliNWY0MFwvZGJtaW03YS04Y2VjMTE0Yi1jNDI1LTRhNzMtYTk1Yi1mOTdkM2U1MTAwYjIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.O4Rh64Kmq0kYDgA2oGiTkAKAv1RqJkwy0V367V8G2U4")`,
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
              backgroundSize: "cover",
              height: "700px",
              width: "100%",
            }}
          ></div>
        </div>
        <div style={contentStyle}>
          <div
            style={{
              backgroundImage: `url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/72d9717d-2ba6-4008-bd25-ceb6d49b5f40/dbmim7a-8cec114b-c425-4a73-a95b-f97d3e5100b2.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzcyZDk3MTdkLTJiYTYtNDAwOC1iZDI1LWNlYjZkNDliNWY0MFwvZGJtaW03YS04Y2VjMTE0Yi1jNDI1LTRhNzMtYTk1Yi1mOTdkM2U1MTAwYjIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.O4Rh64Kmq0kYDgA2oGiTkAKAv1RqJkwy0V367V8G2U4")`,
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
              backgroundSize: "cover",
              height: "700px",
              width: "100%",
            }}
          ></div>
        </div>
      </Carousel>

      <div
        className="site-card-wrapper"
        style={{
          margin: "50px",
          alignItems: "center",
          justifyContent: "center",
          // textAlign:"center",
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
    </div>
  );
}
