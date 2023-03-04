import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import { Button, Row, Table } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import { FaCheck, FaTimesCircle } from "react-icons/fa";
import useSWR, { mutate } from "swr";

const fetcher = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get("/api/reservation/all", config);

  if (!data) {
    throw new Error("there was an error");
  }
  return data;
};

export default function Reservations() {
  const router = useRouter();
  const token = Cookies.get("token");
  const { data, error, isLoading } = useSWR("fetchAllReservations", () =>
    fetcher(token)
  );

  const approveReservation = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.patch(
        "/api/reservation/approved",
        { id },
        config
      );

      toast.success(data);
      mutate("fetchAllReservations");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const doneReservation = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.patch(
        "/api/reservation/done",
        { id },
        config
      );

      toast.success(data);
      mutate("fetchAllReservations");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteReservation = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.delete(
        `/api/reservation/delete/${id}`,
        config
      );

      toast.success(data);
      mutate("fetchAllReservations");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!data) return <h1>Loading</h1>;

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Row>
        <h1 className="color-blue bolder text-center my-5 uppercase">
          réservations
        </h1>
      </Row>
      <Row>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Nom</th>
              <th>Téléphone</th>
              <th>Animal</th>
              <th>Date / Heure</th>
              <th>Approuvé</th>
              <th>Terminé</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((reservation, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{reservation._id}</td>
                <td>
                  {reservation.guestName
                    ? reservation.guestName
                    : reservation.name}
                </td>
                <td>{reservation.phoneNumber}</td>
                <td>{reservation.petType}</td>
                <td>
                  {reservation.reservationDate.date} /{" "}
                  {reservation.reservationDate.time}
                </td>
                <td>
                  {reservation.isApproved ? (
                    <FaCheck size={24} color="#4AA96C" />
                  ) : (
                    <FaTimesCircle size={24} color="#F55C47" />
                  )}
                </td>
                <td>
                  {reservation.isDone ? (
                    <FaCheck size={24} color="#4AA96C" />
                  ) : (
                    <FaTimesCircle size={24} color="#F55C47" />
                  )}
                </td>
                <td>
                  <button
                    className="back-blue p-2"
                    onClick={() =>
                      router.push(`/reservation/${reservation._id}`)
                    }
                  >
                    Détails
                  </button>
                </td>
                <td>
                  {reservation.isApproved ? (
                    <button
                      className="back-red p-2"
                      onClick={() => approveReservation(reservation._id)}
                    >
                      Disapprove
                    </button>
                  ) : (
                    <button
                      className="back-green p-2"
                      onClick={() => approveReservation(reservation._id)}
                    >
                      Approve
                    </button>
                  )}
                </td>
                <td>
                  {reservation.isDone ? (
                    <button
                      className="back-red p-2"
                      onClick={() => doneReservation(reservation._id)}
                    >
                      Non effectué
                    </button>
                  ) : (
                    <button
                      className="back-green p-2"
                      onClick={() => doneReservation(reservation._id)}
                    >
                      Effectué
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="back-red p-2"
                    onClick={() => deleteReservation(reservation._id)}
                  >
                    Supprimé
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </>
  );
}
