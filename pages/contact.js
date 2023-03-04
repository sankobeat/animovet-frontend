import Footer from "@/components/footer";
import Header from "@/components/header";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaHourglass,
} from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({
    senderName: "",
    senderEmail: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/messages/send", form);
      toast.success(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Header />
      <Container style={{ backgroundColor: "#fff" }}>
        <div>
          <Toaster position="top-center" reverseOrder={false} />
        </div>
        <Row>
          <h1 className="text-center large-text p-5 color-blue">
            Contactez-nous
          </h1>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col sm={6}>
            <Form className="color-blue bolder">
              <Form.Group controlId="formName" className="my-3">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  name="senderName"
                  type="text"
                  placeholder="Entrez votre nom"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="my-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="senderEmail"
                  type="email"
                  placeholder="Entrez votre email"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formMessage" className="my-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  name="message"
                  as="textarea"
                  rows={3}
                  placeholder="Entrez votre message"
                  onChange={handleChange}
                />
              </Form.Group>

              <button
                className="back-blue my-4"
                type="submit"
                onClick={handleSubmit}
              >
                Envoyer
              </button>
            </Form>
          </Col>
        </Row>
        <Row className="my-5">
          <Col md>
            <Row className="d-flex align-items-center justify-content-center flex-column">
              <span className="my-3 d-flex justify-content-center align-items-center">
                <strong className="me-4 color-orange">
                  <FaMapMarkerAlt size={20} />
                </strong>
                Oued El Alleug, Rond Point, Blida.
              </span>
              <span className="my-3 d-flex justify-content-center align-items-center">
                <strong className="me-4 color-orange">
                  {" "}
                  <FaEnvelope size={20} />
                </strong>{" "}
                info@animovet.com.
              </span>
              <span className="my-3 d-flex justify-content-center align-items-center">
                <strong className="me-4 color-orange">
                  {" "}
                  <FaPhone size={20} />{" "}
                </strong>{" "}
                025143143.
              </span>
              <span className="my-3 d-flex justify-content-center align-items-center">
                <strong className="me-4 color-orange">
                  <FaHourglass size={20} />{" "}
                </strong>{" "}
                Du samedi au jeudi, de 8h à 19h
              </span>
            </Row>
            <Row>
              <span className="my-4 text-center">
                <strong className="color-orange">Social Media</strong>
                <div className="d-flex justify-content-evenly mt-3">
                  <Link href="#">
                    <FaFacebook size={32} />
                  </Link>
                  <Link href="#">
                    <FaTwitter size={32} />
                  </Link>
                  <Link href="#">
                    <FaInstagram size={32} />
                  </Link>
                </div>
              </span>
            </Row>
          </Col>
          <Col md>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51282.2006322013!2d2.77288545!3d36.5507965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128f0ac7bf5ccf6d%3A0x1be33bac7d1c266c!2sOued%20Alleug!5e0!3m2!1sen!2sdz!4v1677332823026!5m2!1sen!2sdz"
              width="100%"
              height="100%"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
