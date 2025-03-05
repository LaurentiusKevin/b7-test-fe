"use client"

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const clientId = process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID;
const redirectUri = process.env.NEXT_PUBLIC_ZOOM_REDIRECT_URI;

export default function AuthZoomPage() {
  const handleAuth = () => {
    redirect(
      `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`,
    );
  };

  return (
    <Button type="button" onClick={handleAuth}>
      Zoom Auth
    </Button>
  );
}
