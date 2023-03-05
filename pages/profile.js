import Header from "@/components/header";
import { useEffect } from "react";
import { useHydrate } from "next/dynamic";
import { userStore } from "@/state/store";
import axios from "axios";
import { Container, Row, Col, Image, Table, Button } from "react-bootstrap";
import Cookies from "js-cookie";
import useSWR, { mutate } from "swr";
import { FaCheck, FaTimesCircle } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
const fetcher = async (url, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(url, config);

  if (!data) {
    throw new Error("Network response was not ok");
  }

  return data;
};

function Profile() {
  const router = useRouter();
  const token = Cookies.get("token");
  const { data, error, isLoading } = useSWR("/api/user/profile", () =>
    fetcher("/api/user/profile", token)
  );

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, []);

  const deleteFunction = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `/api/user/deleteReservation/${id}`,
        config
      );

      toast.success(data);
      mutate("/api/user/profile");
    } catch (error) {
      toast.error(error.data.response.message);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-5">
        <Toaster position="center " reverseOrder={false} />
        <Row className="my-4 d-flex align-items-center justify-content-center flex-column">
          <Col md className="d-flex align-items-center justify-content-center">
            <Image
              src={data?.user.profilePic}
              width={250}
              height={250}
              rounded
              fluid
            />
          </Col>
          <Col md className="my-4 text-center">
            {isLoading ? (
              <h2>Loading...</h2>
            ) : (
              <>
                <h2 className="color-blue">{data?.user.userName}</h2>
                <p className="color-blue">
                  <strong>Email: </strong> {data?.user.email}
                </p>
                <p className="color-blue">
                  <strong>Téléphone: </strong>
                  {data?.user.phoneNumber}
                </p>
                <p className="color-blue">
                  <strong>Date de naissance: </strong>
                  {data?.user.birthday}
                </p>
              </>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            {isLoading ? (
              <h2 className="text-center">Loading...</h2>
            ) : (
              <>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Reservation ID</th>
                      <th>Date</th>
                      <th>Heure</th>
                      <th>Approuvé </th>
                      <th>Effectué </th>
                      <th>Détails </th>
                      <th>Supprimer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.reservations.map((reservation, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{reservation._id}</td>
                        <td>{reservation.reservationDate.date}</td>
                        <td>{reservation.reservationDate.time}</td>
                        <td>
                          {reservation.isApproved ? (
                            <FaCheck size={24} color="#4AA96C" />
                          ) : (
                            <FaTimesCircle size={24} color="#F55C47" />
                          )}
                        </td>
                        <td>
                          {" "}
                          {reservation.isDone ? (
                            <FaCheck size={24} color="#4AA96C" />
                          ) : (
                            <FaTimesCircle size={24} color="#F55C47" />
                          )}
                        </td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={() => {
                              router.push(`/reservation/${reservation._id}`);
                            }}
                          >
                            Détails
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => deleteFunction(reservation._id)}
                          >
                            Supprimer
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;
