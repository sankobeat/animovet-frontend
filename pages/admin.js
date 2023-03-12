import Messages from "@/components/admin components/messages";
import Reservations from "@/components/admin components/reservations";
import Users from "@/components/admin components/users";
import Header from "@/components/header";
import Cookies from "js-cookie";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import {
  FaUsers,
  FaClock,
  FaMailBulk,
  FaDatabase,
  FaUser,
} from "react-icons/fa";

export default function Admin() {
  const [show, setShow] = useState("users");
  const router = useRouter();
  const token = Cookies.get("token");
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Header />
      <Container fluid className="h-auto">
        <Row className="mt-2">
          <Col md={12} className="back-blue p-2 rounded text-center">
            <h2 className="bolder">Animovet</h2>
            <p className="uppercase light-text">Tableau de bord</p>
          </Col>
        </Row>
        <Row className="back-orange p-3">
          <Col
            md={3}
            className="d-flex align-items-center  my-2"
            style={{ cursor: "pointer" }}
            onClick={() => setShow("analytics")}
          >
            <Col md={4} className="d-flex justify-content-center">
              <FaDatabase size={32} />
            </Col>
            <Col md={6}>
              <p className="m-0 light-text text-center">Analyse des données</p>
            </Col>
          </Col>
          <Col
            md={3}
            className="d-flex align-items-center  my-2"
            style={{ cursor: "pointer" }}
            onClick={() => {
              router.push("/admin?page=1"), setShow("users");
            }}
          >
            <Col md={4} className="d-flex justify-content-center">
              <FaUsers size={32} />
            </Col>
            <Col md={6}>
              <p className="m-0 light-text text-center">Utilisateurs</p>
            </Col>
          </Col>
          <Col
            md={3}
            className="d-flex align-items-center  my-2"
            style={{ cursor: "pointer" }}
            onClick={() => {
              router.push("/admin?page=1"), setShow("reservations");
            }}
          >
            <Col md={4} className="d-flex justify-content-center">
              <FaClock size={32} />
            </Col>
            <Col md={6}>
              <p className="m-0 light-text text-center">Réservations</p>
            </Col>
          </Col>
          <Col
            md={3}
            className="d-flex align-items-center  my-2"
            style={{ cursor: "pointer" }}
            onClick={() => setShow("messages")}
          >
            <Col md={4} className="d-flex justify-content-center">
              <FaMailBulk size={32} />
            </Col>
            <Col md={6}>
              <p className="m-0 light-text text-center">Méssages</p>
            </Col>
          </Col>
        </Row>

        <Container>
          <Row>
            {show === "users" && <Users />}
            {show === "reservations" && <Reservations />}
            {show === "messages" && <Messages />}
          </Row>
        </Container>
      </Container>
    </>
  );
}
