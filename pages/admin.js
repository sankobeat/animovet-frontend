import Messages from "@/components/admin components/messages";
import Reservations from "@/components/admin components/reservations";
import Users from "@/components/admin components/users";
import Header from "@/components/header";
import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaUsers, FaClock, FaMailBulk, FaDatabase } from "react-icons/fa";

export default function Admin() {
  const [show, setShow] = useState("users");

  return (
    <>
      <Header />
      <Container fluid className="h-auto">
        <Row className="my-2">
          <Col
            md={2}
            className="back-blue p-2 rounded my-5"
            style={{ height: "500px" }}
          >
            <Row className="text-center ">
              <h2 className="bolder">Animovet</h2>
              <p className="uppercase light-text">Tableau de bord</p>
            </Row>
            <hr className="w-100" />
            <Row
              className="d-flex align-items-center my-2"
              style={{ cursor: "pointer" }}
            >
              <Col md={4} className="d-flex justify-content-center">
                <FaDatabase size={32} />
              </Col>
              <Col md={6}>
                <p className="m-0 light-text text-center">
                  Analyse des données{" "}
                </p>{" "}
              </Col>
            </Row>
            <hr className="w-100" />
            <Row
              className="d-flex align-items-center my-2"
              style={{ cursor: "pointer" }}
            >
              <Col md={4} className="d-flex justify-content-center">
                <FaUsers size={32} />
              </Col>
              <Col md={6}>
                <p
                  className="m-0 light-text text-center"
                  onClick={() => setShow("users")}
                >
                  Utilisateurs
                </p>{" "}
              </Col>
            </Row>
            <hr className="w-100" />
            <Row
              className="d-flex align-items-center my-2"
              style={{ cursor: "pointer" }}
            >
              <Col md={4} className="d-flex justify-content-center">
                <FaClock size={32} />
              </Col>
              <Col md={6}>
                <p
                  className="m-0 light-text text-center"
                  onClick={() => setShow("reservations")}
                >
                  Réservations
                </p>{" "}
              </Col>
            </Row>
            <hr className="w-100" />
            <Row
              className="d-flex align-items-center my-2"
              style={{ cursor: "pointer" }}
            >
              <Col md={4} className="d-flex justify-content-center">
                <FaMailBulk size={32} />
              </Col>
              <Col md={6}>
                <p
                  className="m-0 light-text text-center"
                  onClick={() => setShow("messages")}
                >
                  Messages
                </p>{" "}
              </Col>
            </Row>
            <hr className="w-100" />
          </Col>
          <Col md={10}>
            {show === "users" && <Users />}
            {show === "reservations" && <Reservations />}
            {show === "messages" && <Messages />}
          </Col>
        </Row>
      </Container>
    </>
  );
}
