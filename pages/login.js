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
import Spinner from "react-bootstrap/Spinner";

export default function Register() {
  const storeUser = userStore((state) => state.storeUser);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")).state.user;
    if (user) {
      router.push(`/`);
    }
  }, []);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!form.email.includes("@")) {
      toast.error("Veuillez fournir une adresse e-mail valide");
    } else if (!form.password) {
      toast.error("Veuillez fournir un mot de passe");
    } else {
      try {
        setLoading(true);
        const { data } = await axios.post("/api/user/login", form);
        if (data) {
          console.log(data);
          toast.success("You'r Logged In");
          Cookies.set("token", data.token);
          storeUser(data.user);
          setLoading(false);
          router.push("/");
        }
      } catch (error) {
        setLoading(false);
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
              <Toaster position="top-center" reverseOrder={false} />
            </div>
            <Row className="vh-100 d-flex justify-content-center align-items-center">
              <Col md={8} lg={6} xs={12}>
                <Card className="px-4">
                  <Card.Body>
                    <div className="mb-3 mt-md-4">
                      <h1 className="fw-bold mb-2 text-center text-uppercase color-orange bolder">
                        Connexion
                      </h1>

                      <div className="mb-3">
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label className="text-center">
                              Adresse e-mail.
                            </Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="Enter email"
                              name="email"
                              onChange={handleFormChange}
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="Password"
                              name="password"
                              onChange={handleFormChange}
                            />
                          </Form.Group>

                          <div className="d-grid my-5">
                            <button
                              className="back-blue"
                              type="submit"
                              onClick={handleSubmitForm}
                            >
                              {loading ? (
                                <Spinner animation="border" role="status" />
                              ) : (
                                "Connexion"
                              )}
                            </button>
                          </div>
                        </Form>
                        <div className="mt-3">
                          <p className="mb-0  text-center">
                            Vous n'avez pas de compte?{" "}
                            <Link
                              href="/register"
                              className="text-primary fw-bold"
                            >
                              S'inscrire
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
