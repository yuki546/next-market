import { jwtVerify } from "jose";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CustomJWTPayload } from "@/types";

const useAuth = () => {
  const [loginUserEmail, setLoginUserEmail] = useState("");

  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/user/login");
        return;
      }

      try {
        const secretKey = new TextEncoder().encode(
          "next-market-route-handlers"
        );
        const decodedJwt = await jwtVerify(token, secretKey);
        const payload = decodedJwt.payload as CustomJWTPayload;
        setLoginUserEmail(payload.email);
      } catch (_error) {
        router.push("/user/login");
      }
    };
    checkToken();
  }, [router]);

  return loginUserEmail;
};

export default useAuth;
