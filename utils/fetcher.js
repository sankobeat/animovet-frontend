import axios from "axios";

export const fetcherAuth = (url, token) =>
  axios
    .get(url, { headers: { Authorization: "Bearer " + token } })
    .then((res) => res.data);
