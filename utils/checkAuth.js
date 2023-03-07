import Cookies from "js-cookie";
import { useRouter } from "next/router";

export const requireAuthentication = () => {
  const router = useRouter();
  const token = Cookies.get("token");

  if (!token) {
    router.push("/");
  }
};
