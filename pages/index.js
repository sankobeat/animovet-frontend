import Head from "next/head";
//import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Landing from "@/components/landing";
import Document from "next/document";
import Header from "@/components/header";

import {
  Container,
  Row,
  Col,
  Image,
  Button,
  ListGroup,
  Form,
  Carousel,
} from "react-bootstrap";
import CountUp from "react-countup";
import { MdPets } from "react-icons/md";
import { BsPersonCheckFill, BsCheckCircleFill } from "react-icons/bs";
import { GiTripleNeedle } from "react-icons/gi";
import {
  RiServiceFill,
  RiHeartPulseFill,
  RiHospitalFill,
  RiEyeFill,
  RiArrowRightSLine,
} from "react-icons/ri";
import { useRouter } from "next/router";
import Footer from "@/components/footer";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    image: "/users/default_profile.jpg",
    comment:
      "Je suis tellement heureux d'avoir trouvé ce service vétérinaire. Leur équipe est très compétente et bienveillante envers les animaux. Je recommande vivement leurs services à tous mes amis propriétaires d'animaux de compagnie.",
  },
  {
    id: 2,
    name: "Jane Doe",
    image: "/users/default_profile.jpg",
    comment:
      "J'ai été impressionné par la qualité de service de ce cabinet vétérinaire. Ils ont pris le temps d'écouter mes préoccupations et ont fourni des soins exceptionnels à mon animal de compagnie. Je suis reconnaissant de leur expertise et de leur dévouement.",
  },
  {
    id: 3,
    name: "Bob Smith",
    image: "/users/default_profile.jpg",
    comment:
      "Je recommande fortement ce service vétérinaire pour leur professionnalisme et leur attention exceptionnelle aux détails. Ils ont été en mesure de diagnostiquer et de traiter rapidement mon animal de compagnie, et leur personnel amical et attentionné a rendu l'expérience beaucoup plus facile pour nous deux.",
  },
];

export default function Home() {
  const router = useRouter();

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

  // Socket Io

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Animovet</title>
      </Head>
      <Header />
      <Container fluid className="back-landing">
        <Container className="d-flex align-items-center pt-5 h-auto">
          <Row>
            <Col
              md={12}
              className="d-flex flex-column justify-content-center align-items-center py-5"
            >
              <Image src="/utc-logo.png" style={{ height: "350px" }} />
              <h1 className="align-self-center large-text p-2 color-white">
                UMC Vet.
              </h1>
              <p className="light-text align-self-start text-center my-3 w-100 color-white">
                Bienvenue chez ANIMOVET, votre prestataire de soins vétérinaires
                de confiance pour les animaux de compagnie de haute qualité.
                Notre équipe de vétérinaires expérimentés et de professionnels
                de la santé animale est dédiée à s'assurer que vos amis à
                fourrure reçoivent les meilleurs soins possibles. Chez ANIMOVET,
                nous comprenons que les animaux de compagnie font partie
                intégrante de votre famille, c'est pourquoi nous offrons une
                gamme de services adaptés pour répondre à leurs besoins
                individuels.
              </p>
              <button
                className="back-orange align-self-center rounded my-3"
                onClick={() => {
                  router.push("/about");
                }}
              >
                En savoir plus!
              </button>
            </Col>
          </Row>
        </Container>
      </Container>

      <Container>
        <Row className="py-5 d-flex justify-content-evenly align-items-center">
          <Col className="d-flex justify-content-center align-items-center flex-column">
            <p className="light-text">ANIMAUX GUÉRIS</p>
            <Col
              sm={6}
              className="d-flex justify-content-around align-items-center"
            >
              <MdPets size={50} className="color-orange" />
              <CountUp
                end={150}
                style={{ fontSize: "50px", fontWeight: "900" }}
              />
            </Col>
          </Col>

          <Col className="d-flex justify-content-center align-items-center flex-column">
            <p className="light-text">CLIENTS</p>
            <Col
              sm={6}
              className="d-flex justify-content-around align-items-center"
            >
              <BsPersonCheckFill size={50} className="color-orange" />
              <CountUp
                end={129}
                style={{ fontSize: "50px", fontWeight: "900" }}
              />
            </Col>
          </Col>
        </Row>
      </Container>
      <Container className="back-orange my-5 p-5 h-auto" fluid>
        <Row className="back-orange py-5 d-flex justify-content-center h-auto">
          <Row className="text-center">
            <h1 className="large-text text-white mb-5 pb-5">SERVICES</h1>
          </Row>
          <Row className="d-flex justify-content-evenly align-items-center">
            <Col
              md
              className="d-flex justify-content-between align-items-center align-self-start flex-column text-white w-100 p-3"
            >
              <GiTripleNeedle size={48} className="mb-2" />
              <span className="text-start light-text">
                Nous offrons un service de vaccination pour les animaux de
                compagnie pour les protéger contre les maladies. Nous proposons
                des programmes de vaccination personnalisés pour répondre aux
                besoins individuels de chaque animal. Nos vétérinaires peuvent
                vous conseiller sur le calendrier de vaccination approprié pour
                votre animal de compagnie.
              </span>
            </Col>
            <Col
              md
              className="d-flex justify-content-between align-items-center align-self-start flex-column text-white w-100 p-3"
            >
              <RiServiceFill size={48} className="mb-2" />
              <span className="text-start light-text">
                Nous offrons des conseils en nutrition pour les animaux de
                compagnie afin de les aider à maintenir une alimentation saine
                et équilibrée. Notre équipe de professionnels peut vous aider à
                choisir les bons aliments pour votre animal de compagnie en
                fonction de son âge, de sa race et de ses besoins alimentaires.
              </span>
            </Col>
            <Col
              md
              className="d-flex justify-content-between align-items-center align-self-start flex-column text-white w-100 p-3"
            >
              <RiEyeFill size={48} className="mb-2" />
              <span className="text-start light-text">
                Notre équipe de professionnels expérimentés propose des
                interventions chirurgicales de qualité pour les petits et grands
                animaux. Nous offrons une gamme de services de chirurgie pour
                assurer le bien-être de votre animal de compagnie.
              </span>
            </Col>
            <Col
              md
              className="d-flex justify-content-between align-items-center align-self-start flex-column text-white w-100 p-3 mb-4"
            >
              <RiHospitalFill size={48} className="mb-2" />
              <span className="text-start light-text">
                Nous offrons un service de déplacement à domicile pour les
                animaux de compagnie dans le besoin. Nos vétérinaires peuvent
                venir chez vous pour effectuer des examens et des traitements,
                ce qui rend la visite chez le vétérinaire plus facile pour vous
                et moins stressante pour votre animal.
              </span>
            </Col>
          </Row>
        </Row>
      </Container>

      <Container fluid>
        <Container className="h-auto">
          <Row>
            <Col
              sm={8}
              className="d-flex flex-column justify-content-center align-items-center"
            >
              <h1 className="text-center large-text p-2 color-blue">
                Réservez maintenant !
              </h1>
              <p className="light-text text-center my-3 w-75">
                Notre système de réservation en ligne facile à utiliser rend la
                prise de rendez-vous pour votre animal de compagnie rapide et
                sans tracas. Il suffit de sélectionner la date et l'heure
                souhaitées, de saisir vos informations et nous nous occupons du
                reste. Avec notre système de réservation pratique, prendre
                rendez-vous pour votre ami à fourrure n'a jamais été aussi
                facile.
              </p>
              <button
                className="back-blue align-self-center rounded my-5"
                onClick={() => {
                  router.push("/reserve");
                }}
              >
                Effectuez une réservation.
                <RiArrowRightSLine size={24} />
              </button>
            </Col>
            <Col sm={4}>
              <Image src="/reserve.png" fluid className="w-100" />
            </Col>
          </Row>
        </Container>
      </Container>
      <section
        className="contact-section py-5"
        style={{ backgroundColor: "#fffaf5" }}
      >
        <Carousel className="testimonials-slider back-blue py-5">
          {testimonials.map((testimonial) => (
            <Carousel.Item key={testimonial.id} className="my-5">
              <Container>
                <Row className="justify-content-center">
                  <Col md={6} className="d-flex flex-column align-items-center">
                    <div className="testimonial-image-container rounded-circle overflow-hidden mb-3">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="testimonial-image"
                        height="160px"
                        width="160px"
                      />
                    </div>
                    <p className="testimonial-name bolder">
                      {testimonial.name}
                    </p>
                    <p className="testimonial-comment text-center my-3">
                      {testimonial.comment}
                    </p>
                  </Col>
                </Row>
              </Container>
            </Carousel.Item>
          ))}
        </Carousel>

        <Container>
          <Row>
            <Col
              xs={12}
              md={6}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="contact-header d-flex align-items-center justify-content-evenly flex-column h-75">
                <h2
                  style={{ color: "#000958" }}
                  className="text-center large-text p-2 color-orange"
                >
                  CONTACTEZ-NOUS.
                </h2>
                <p style={{ color: "#ff5b2e" }} className="text-center">
                  Vous avez des questions ou des commentaires ? Contactez-nous !
                </p>
                <div>
                  <Button
                    className="p-3 d-flex justify-content-center my-3"
                    href="/contact"
                    variant="primary"
                    style={{ backgroundColor: "#000958" }}
                  >
                    Contactez-nous.
                  </Button>
                </div>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <Form className="contact-form color-blue bolder">
                <Form.Group controlId="formName p-5" className="my-3">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Entez votre nom"
                    name="senderName"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEmail p-5" className="my-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Entez votre email"
                    required
                    name="senderEmail"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formMessage p-5" className="my-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Entez votre message"
                    required
                    name="message"
                    onChange={handleChange}
                  />
                </Form.Group>
                <div className="d-flex justify-content-end my-3">
                  <Button
                    className="py-3 px-5"
                    type="submit"
                    variant="primary"
                    style={{
                      backgroundColor: "#ff5b2e",
                      border: "none",
                      outline: "none",
                    }}
                    onClick={handleSubmit}
                  >
                    Envoyer
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
}
