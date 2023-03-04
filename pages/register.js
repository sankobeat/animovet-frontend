import React, { useEffect, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import logo from "@/public/animovet-logo.png";
import Image from "next/image";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { userStore } from "@/state/store";
import { useRouter } from "next/router";
import Footer from "@/components/footer";
import Cookies from "js-cookie";
function isValidDate(year, month, day) {
  const date = new Date(year, month - 1, day);
  return (
    date.getDate() === day &&
    date.getMonth() === month - 1 &&
    date.getFullYear() === year
  );
}

export default function Register() {
  const router = useRouter();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")).state.user;
    if (user) {
      router.push(`/`);
    }
  }, []);

  const storeUser = userStore((state) => state.storeUser);

  const [birthday, setBirthday] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const handleDateChange = (e) => {
    setBirthday({
      ...birthday,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!form.name) {
      toast.error("Please Provid A Name");
    } else if (!form.email.includes("@")) {
      toast.error("Please Provid A Valid Email");
    } else if (form.password !== form.confirmPassword) {
      toast.error("Passwords must match");
    } else if (
      !isValidDate(
        Number(birthday.year),
        Number(birthday.month),
        Number(birthday.day)
      )
    ) {
      toast.error("Please enter a valid date");
    } else {
      try {
        const { data } = await axios.post("/api/user/registration", {
          ...form,
          birthday: `${birthday.day}-${birthday.month}-${birthday.year}`,
        });
        if (data) {
          toast.success("Registration Validated");
          storeUser(data.user);
          Cookies.set("token", data.token);
          router.push("/");
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <section>
        <div>
          <Container>
            <div>
              <Toaster position="bottom-center" reverseOrder={false} />
            </div>
            <Row className="vh-100 d-flex justify-content-center align-items-center">
              <Col md={8} lg={6} xs={12}>
                <Card className="px-4">
                  <Card.Body>
                    <div className="mb-3 mt-md-4">
                      <h1 className="fw-bold mb-2 text-center text-uppercase color-orange bolder">
                        INSCRIRE
                      </h1>
                      <div className="mb-3">
                        <Form>
                          <Form.Group className="mb-3" controlId="Name">
                            <Form.Label className="text-center">Nom</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Entrez votre nom"
                              name="name"
                              onChange={handleFormChange}
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label className="text-center">
                              Entrez votre adress email
                            </Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="Entrez votre email"
                              name="email"
                              onChange={handleFormChange}
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Label>Mot de pass</Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="Entrez un mot de pass"
                              name="password"
                              onChange={handleFormChange}
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Label>Confirmez votre mot de pass</Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="Confirmez votre mot de pass"
                              name="confirmPassword"
                              onChange={handleFormChange}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="phoneNumber">
                            <Form.Label>Téléphone</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Ton numéro de téléphone"
                              name="phoneNumber"
                              onChange={handleFormChange}
                            />
                          </Form.Group>

                          <Form.Label>Date de naissance</Form.Label>
                          <Form.Group
                            className="mb-3 d-flex"
                            controlId="birthday"
                          >
                            <Form.Control
                              id="day"
                              type="text"
                              placeholder="Jour"
                              name="day"
                              min={1}
                              max={31}
                              maxlength="2"
                              onChange={handleDateChange}
                            />

                            <Form.Control
                              id="month"
                              type="text"
                              placeholder="Mois"
                              name="month"
                              min={1}
                              max={12}
                              maxlength="2"
                              onChange={handleDateChange}
                            />

                            <Form.Control
                              id="year"
                              type="text"
                              placeholder="Année"
                              name="year"
                              min={1903}
                              max={2020}
                              maxlength="4"
                              onChange={handleDateChange}
                            />
                          </Form.Group>

                          <div className="d-grid my-5">
                            <button
                              className="back-blue"
                              type="submit"
                              onClick={handleSubmitForm}
                            >
                              Créer un compte
                            </button>
                          </div>
                        </Form>
                        <div className="mt-3">
                          <p className="mb-0  text-center">
                            Avez-vous déjà un compte ?
                            <Link
                              href="/login"
                              className="text-primary fw-bold"
                            >
                              Connexion
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      <Footer />
    </>
  );
}
