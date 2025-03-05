"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useMemo } from "react";
import { generateToken, getUser } from "@/app/auth/zoom/callback/action";

export default function ZoomCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    zoomCode,
    zoomToken,
    setZoomCode,
    setZoomToken,
    zoomUser,
    setZoomUser,
  } = useAuth();

  const accountValidated = useMemo(() => {
    return zoomCode !== null && zoomToken !== null && zoomUser !== null;
  }, [zoomCode, zoomToken, zoomUser]);

  useEffect(() => {
    const handleAuth = async () => {
      const zoomCode = searchParams.get("code");
      setZoomCode(zoomCode);

      const tokenResponse = await generateToken({ code: zoomCode || "" });
      setZoomToken(tokenResponse);

      const userData = await getUser({
        access_token: tokenResponse.access_token || "",
      });
      setZoomUser(userData);

      if (accountValidated) {
        router.push("/calendar");
      }
    };

    void handleAuth();
  }, []);

  return (
    <div>
      <p>
        {!accountValidated
          ? "Validating, please wait..."
          : "Authorization success! Redirecting..."}
      </p>
    </div>
  );
}
