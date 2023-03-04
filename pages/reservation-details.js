import React from "react";
import useSWR from "swr";
import axios from "axios";
import { useRouter } from "next/router";

const fetcher = async (url, id) => {
  const { data } = await axios.get(`${url}/${id}`);

  if (!data) {
    throw new Error("there was an error");
  }
  return data;
};

export default function ReservationDetails() {
  const router = useRouter();

  console.log(router.pathname);

  // const {data,error} = useSWR('fetching reservations',fetcher())

  return <div>reservation-details</div>;
}
