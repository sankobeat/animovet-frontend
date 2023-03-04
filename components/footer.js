import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

function Footer() {
  return (
    <footer className="mt-5">
      <Container className="pt-5">
        <Row className="footer-row">
          <Col>
            <h5 className="color-orange bolder">ANIMOVET</h5>
            <p className="light-text lower-case">
              Un fournisseur de soins de santé animaliers de premier plan, dédié
              à fournir des soins médicaux exceptionnels et des traitements à
              vos amis à fourrure. Notre équipe de vétérinaires et de personnel
              qualifié est passionnée par le bien-être animal.
            </p>
          </Col>
          <Col>
            <h5 className="color-orange bolder">Nous contacter</h5>
            <ul className="list-unstyled">
              <li>Animovet</li>
              <hr style={{ opacity: "1" }} />
              <li>Oued El Alleug, Rond Point, Blida.</li>
              <hr style={{ opacity: "1" }} />
              <li>Phone: (025) 143143</li>
              <hr style={{ opacity: "1" }} />
              <li>Email: info@animovet.com</li>
            </ul>
          </Col>
          <Col>
            <h5 className="color-orange bolder">Navigation</h5>
            <ul className="list-unstyled">
              <li>
                <Link href="/" className="link">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/about" className="link">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="link">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/reserve" className="link">
                  Réservation
                </Link>
              </li>
            </ul>
          </Col>
          <Col>
            <h5 className="color-orange bolder">Contactez-nous</h5>
            <ul className="list-unstyled">
              <li>
                <i className="fab fa-facebook-f"></i>{" "}
                <a href="https://www.facebook.com/animovet/">Facebook</a>
              </li>
              <li>
                <i className="fab fa-instagram"></i>{" "}
                <a href="https://www.instagram.com/animovet/">Instagram</a>
              </li>
              <li>
                <i className="fab fa-twitter"></i>{" "}
                <a href="https://twitter.com/animovet">Twitter</a>
              </li>
            </ul>
          </Col>
        </Row>
        <hr />
        <div className="text-center">
          <p>
            &copy; {new Date().getFullYear()} ANIMOVET - Tous droits réservés".
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
