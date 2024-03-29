import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Pagination,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { FaCheck, FaTimesCircle } from "react-icons/fa";
import useSWR, { mutate } from "swr";
import toast, { Toaster } from "react-hot-toast";
import { fetcherAuth } from "../../utils/fetcher";
import { useRouter } from "next/router";

// todos
// update the url page to match the page number
// if we enter a page in the url, the page should be related to and render the same data related to page number

export default function Users() {
  const [pageNum, setPageNum] = useState(1);
  const token = Cookies.get("token");
  //const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const page = router.query.page ? router.query.page : 1;
  let keyword = router.query.keyword ? router.query.keyword : "";

  // const { data, error } = useSWR(`http://localhost:5000/api/user/get-users?page=${pageNum}`, () => fetcher());
  const { error, data, mutate } = useSWR(
    [`/api/user/get-users?page=${page}&keyword=${keyword}`, token],
    ([url, token]) => fetcherAuth(url, token)
  );

  let items = [];
  for (let number = 1; number <= data?.pages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === Number(page)}
        onClick={() => router.push(`admin?page=${number}&keyword=${keyword}`)}
      >
        {number}
      </Pagination.Item>
    );
  }

  // const { data, error, isLoading } = useSWR("fetchAllUsers", () =>
  //   fetcher(token)
  // );

  const makeAdmin = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.patch(
        "/api/user/admin/make-admin",
        { id },
        config
      );
      mutate([`/api/user/get-users?page=${page}`, token]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`admin?page=${1}&keyword=${keyword}`);
  };
  const handleKeywordChange = (e) => {
    keyword = e.target.value;
  };

  if (error) {
    router.push("/");
  }

  if (!data) return <Spinner animation="border" role="status" />;

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Row>
        <h1 className="color-blue bolder text-center my-5 uppercase">
          utilisateurs
        </h1>
      </Row>
      <Row>
        <Col md>
          <Form
            onSubmit={handleSearch}
            className="d-flex justify-content-center mb-4"
          >
            <Form.Group className="h-100" controlId="keyword">
              <Form.Control
                type="text"
                placeholder="Search Users"
                onChange={handleKeywordChange}
              />
            </Form.Group>
            <button
              variant="primary"
              className="back-orange py-0"
              type="submit"
            >
              Rechercher
            </button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Date de naissance</th>
              <th>Admin</th>
              <th>Changé le role</th>
            </tr>
          </thead>
          <tbody>
            {data?.userToSend?.map((user, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{user._id}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.birthday}</td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck size={24} color="#4AA96C" />
                  ) : (
                    <FaTimesCircle size={24} color="#F55C47" />
                  )}
                </td>
                <td>
                  {user.isAdmin ? (
                    <button
                      className="back-red"
                      onClick={() => makeAdmin(user._id)}
                    >
                      Retirer d'administrateur.
                    </button>
                  ) : (
                    <button
                      className="back-green"
                      onClick={() => makeAdmin(user._id)}
                    >
                      Rendre administrateur.
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      <Row>
        <Col md className="overflow-scroll">
          <Pagination size="sm">{items}</Pagination>
        </Col>
      </Row>
    </>
  );
}
