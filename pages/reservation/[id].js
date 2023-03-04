import React, { useState, useRef, Component } from "react";
import useSWR from "swr";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "@/components/header";
import { Col, Container, Row, Table } from "react-bootstrap";
import { FaCheck, FaTimesCircle } from "react-icons/fa";
import ReactToPrint from "react-to-print";
const fetcher = async (url) => {
  const { data } = await axios.get(url);
  if (!data) {
    throw new Error("there was an error");
  }
  return data;
};

export default function ReservationDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(id ? `/api/reservation/${id}` : null, fetcher);

  const componentRef = useRef();

  const convertUTCtoGMT = () => {
    // const utcDate = new Date(data?.createdAt);

    // // Get the time zone offset in minutes for GMT
    // const gmtOffset = 0;

    // // Subtract the time zone offset from the UTC date
    // const gmtDate = new Date(utcDate.getTime() + gmtOffset * 60 * 1000);

    // return gmtDate.toUTCString();

    const utcDate = new Date(data?.createdAt);
    // get the UTC timestamp of the date
    const utcTimestamp = utcDate.getTime();
    // convert the UTC timestamp to GMT+1 (Central European Time) timestamp
    const gmtPlusOneTimestamp = utcTimestamp;
    // create a new Date object with the GMT+1 timestamp
    const gmtPlusOneDate = new Date(gmtPlusOneTimestamp); // "2023-03-01T12:00:00.000Z"
    return gmtPlusOneDate.toString(); // "2023-03-01T13:00:00.000Z"
  };

  if (!id) return <div>Loading...</div>;
  if (error) return <div>Failed to load data</div>;

  return (
    <>
      <Header />

      <Container ref={componentRef}>
        <Row className="mt-5 d-flex justify-content-between">
          <Col md={2} className="w-25">
            <h3 className="color-blue bolder">ANIMOVET.</h3>
            <p className="my-0 light-text">
              Oued El Alleug, Rond Point, Blida.
            </p>
            <p className="my-0 light-text">info@animovet.com.</p>
            <p className="my-0 light-text">(025)685215</p>
          </Col>
          <Col md={2} className="w-25">
            <h3 className="color-blue bolder">
              {data?.guestName
                ? data?.guestName.toUpperCase()
                : data?.name.toUpperCase()}
            </h3>
            <p className="my-0 light-text">({data?.phoneNumber})</p>
          </Col>
        </Row>
        <Row>
          <h1 className="bold text-center my-5">RESERVATION DETAILS</h1>
        </Row>
        <Row className="text-center">
          <h3 className="color-blue bolder">
            {data?.guestName
              ? data?.guestName.toUpperCase()
              : data?.name.toUpperCase()}
          </h3>
          <h3 className="mb-5">Réservation pour animal {data?.petType}</h3>
        </Row>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Reservation ID</th>
              <th>Date</th>
              <th>Heure</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>{data?._id}</td>
              <td>{data?.reservationDate.date}</td>
              <td>{data?.reservationDate.time}</td>
            </tr>
          </tbody>
        </Table>
        <Row className="text-center my-3">
          <p className="light-text color-blue">Créé à {convertUTCtoGMT()}</p>
        </Row>
      </Container>
      <Container>
        <Row className="d-flex justify-content-end">
          <Col md={3}>
            {" "}
            <ReactToPrint
              trigger={() => (
                <button className="color-white back-orange">
                  Imprimer/Enregistrer en PDF
                </button>
              )}
              content={() => componentRef.current}
            />
          </Col>
        </Row>
      </Container>
      <Container className="my-3">
        <Row>
          <Col className="light-text text-center">
            <strong className="color-red medium-text bolder uppercase">
              Attention, Doit être lu!
            </strong>
            <p>
              Nous ne sommes pas responsables des réservations qui ne sont ni
              enregistrées ni imprimées pour les utilisateurs non signés sur
              notre site web !. Nous recommandons aux utilisateurs non signés
              d'imprimer le PDF ou de le sauvegarder sur leur téléphone
              portable, afin de le présenter le jour du rendez-vous.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
