import Footer from "@/components/footer";
import Header from "@/components/header";
import { Col, Container, Image, Row } from "react-bootstrap";

export default function About() {
  return (
    <>
      <Header />
      <Container className="my-5 py-5 h-auto">
        <Row>
          <Col
            sm={8}
            className="d-flex flex-column justify-content-between align-items-center flex-colmun"
          >
            <h1 className="text-start large-text p-2 color-blue">
              Qui est UMC VET?
            </h1>
            <p className="light-text text-start mb-3 w-100">
              ANIMOVET est un fournisseur de soins de santé pour animaux de
              premier plan, dédié à assurer la santé et le bien-être de vos
              animaux de compagnie. Notre équipe de vétérinaires et de personnel
              hautement qualifiés et compatissants s'engage à fournir des soins
              médicaux et des traitements de la plus haute qualité à vos amis à
              fourrure. Avec des installations de pointe et la dernière
              technologie médicale, nous offrons une gamme complète de services
              vétérinaires, des examens de routine et des vaccinations aux
              interventions chirurgicales complexes et aux soins d'urgence.
            </p>
            <p className="light-text text-start w-100">
              Notre objectif est non seulement de traiter les conditions
              médicales de votre animal de compagnie, mais aussi de fournir un
              environnement chaleureux et accueillant qui vous met à l'aise,
              vous et votre animal. Chez ANIMOVET, nous comprenons le lien
              spécial entre les animaux de compagnie et leurs propriétaires, et
              nous nous efforçons de construire des relations durables avec les
              deux. Faites-nous confiance pour être votre partenaire pour
              maintenir la santé et le bonheur de vos animaux de compagnie
              pendant de nombreuses années.
            </p>
            <Row className="d-flex align-items-center justify-content-center">
              <Image src="/about-bot.png" fluid width="auto" />
            </Row>
          </Col>
          <Col
            sm={4}
            className="d-flex align-items-center justify-content-center"
          >
            <Image src="/about.png" fluid height="auto" />
          </Col>
        </Row>
        <Row>
          <Col sm={6} className="light-text text-start mt-5 w-100">
            Animovet est une clinique vétérinaire de premier plan qui offre des
            soins exceptionnels pour les animaux de compagnie depuis 2018. Nous
            sommes une équipe de professionnels passionnés qui ont une vaste
            expérience dans le domaine de la médecine vétérinaire. Notre
            objectif principal est de fournir les meilleurs soins possibles pour
            tous les animaux de compagnie qui nous sont confiés. Nous sommes
            déterminés à offrir un service de qualité supérieure et à nous
            assurer que chaque animal est traité avec le plus grand soin et
            respect. Chez Animovet, nous sommes fiers de notre approche
            professionnelle et orientée vers les résultats. Nous comprenons que
            chaque animal est unique et nécessite un traitement personnalisé.
            C'est pourquoi nous travaillons en étroite collaboration avec nos
            clients pour comprendre leurs besoins et fournir des soins adaptés à
            chaque cas individuel. Notre équipe est composée de vétérinaires
            hautement qualifiés et expérimentés qui sont constamment à jour sur
            les dernières avancées en matière de médecine vétérinaire. Nous
            sommes déterminés à offrir un service exceptionnel à tous nos
            clients et à leurs animaux de compagnie. Nous comprenons que la
            santé et le bien-être de votre animal de compagnie sont de la plus
            haute importance, et c'est pourquoi nous offrons une gamme complète
            de services de soins de santé vétérinaires pour répondre à tous les
            besoins de votre animal. Nous sommes fiers de notre réputation en
            tant que l'un des meilleurs établissements de soins de santé pour
            animaux de compagnie, et nous nous engageons à fournir des soins
            exceptionnels pour tous les animaux qui nous sont confiés.
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
