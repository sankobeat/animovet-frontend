import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import useSWR from "swr";

const fetcher = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get("/api/messages", config);

  if (!data) {
    console.log("there was an error!");
  }

  return data;
};

export default function Messages() {
  const [selectedMessage, setSelectedMessage] = useState({});

  const token = Cookies.get("token");
  const { data, isLoading, error } = useSWR("fetchMessages", () =>
    fetcher(token)
  );

  const selectMessage = (id) => {
    const selectedMessage = data?.filter((message) => {
      if (message._id === id) return message;
    })[0];
    setSelectedMessage(selectedMessage);
  };

  if (error) return <h1>Sorry, something went wrong</h1>;
  if (isLoading) return <Spinner animation="border" role="status" />;

  return (
    <>
      <Container>
        <Row>
          <h1 className="color-blue bolder text-center my-5">Messages</h1>
        </Row>
        <Row>
          <Col
            md={4}
            style={{ overflowY: "scroll", height: "450px" }}
            className="px-5"
          >
            {data?.map((message) => (
              <Row
                onClick={() => selectMessage(message._id)}
                className="mb-3 py-3"
                style={{
                  border: "0.5px solid",
                  borderRadius: "25px",
                  background:
                    message._id === selectedMessage._id ? "#000958" : "",
                  color: message._id === selectedMessage._id ? "#fffaf5" : "",
                  cursor: "pointer",
                }}
              >
                <p className="w-100 bold mb-0">Mr./Ms. {message.senderName}</p>

                <p
                  className="light-text mb-0"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Message: {message.message}
                </p>
              </Row>
            ))}
          </Col>
          <Col md={8} className="p-3">
            <Row>
              <h4>{selectedMessage.senderName}</h4>
              <p className="light-text mb-0">{selectedMessage.senderEmail}</p>
            </Row>
            <hr className="w-100" />
            <Row>
              <p className="light-text">{selectedMessage.message}</p>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
