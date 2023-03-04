import Image from "next/image";
import BootstrapImage from "react-bootstrap/Image";
import logo from "@/public/animovet-logo.png";
import styles from "@/styles/Header.module.css";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { userStore } from "@/state/store";
import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { DropdownButton } from "react-bootstrap";
import { useRouter } from "next/router";
import { BiLogIn } from "react-icons/bi";
import Cookies from "js-cookie";
function Header() {
  const router = useRouter();
  const [userLS, setUserLS] = useState(null);
  const user = userStore((state) => state.user);
  const logout = userStore((state) => state.logout);
  useEffect(() => {
    setUserLS(user);
  }, [user]);

  const logoutUser = () => {
    logout();
    Cookies.remove("token");
    router.push("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="py-3 border-bottom ">
      <Container className="d-flex ">
        <Navbar.Brand>
          <Link href="/">
            <h3 className="color-blue bolder">ANIMOVET.</h3>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Link
              href="/"
              className="mx-3 align-self-center text-blue light-text bold uppercase"
            >
              Accueil
            </Link>
            <Link
              href="/about"
              className="mx-3 align-self-center text-blue light-text bold uppercase"
            >
              À propos
            </Link>

            <Link
              href="/contact"
              className="mx-3 align-self-center text-blue light-text uppercase"
            >
              Contact
            </Link>

            <Link
              href="/reserve"
              className="mx-3 align-self-center text-blue light-text uppercase"
            >
              Réservation
            </Link>
          </Nav>
          <Nav className="ms-auto">
            {userLS ? (
              <>
                <DropdownButton
                  className="align-self-center back-blue color-orange"
                  id="dropdown-basic-button"
                  title={`${userLS.name}`}
                >
                  <Dropdown.Item className="align-self-center text-blue">
                    <Link href="/profile" className="color-blue">
                      Profile
                    </Link>
                  </Dropdown.Item>
                  {userLS.isAdmin ? (
                    <Dropdown.Item
                      onClick={() => {
                        router.push("/admin");
                      }}
                      className="align-self-center"
                    >
                      Dashboard
                    </Dropdown.Item>
                  ) : (
                    ""
                  )}
                  <Dropdown.Item
                    onClick={logoutUser}
                    className="align-self-center text-blue"
                  >
                    LOGOUT
                  </Dropdown.Item>
                </DropdownButton>
              </>
            ) : (
              <Link
                href="/login"
                className="mx-3 align-self-center text-blue uppercase"
              >
                Connexion
                <BiLogIn size={32} />
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
