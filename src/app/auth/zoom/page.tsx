'use client';

import {Button} from "@/components/ui/button";
import {redirect} from "next/navigation";

const clientId = 'il8CP_STpq95fwAnSADDw';
const redirectUri = 'http://localhost:3000/auth/zoom/callback';

export default function AuthZoomPage() {
  const handleAuth = () => {
    redirect(`https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`);
  }
  return (
    <Button type="button" onClick={handleAuth}>Zoom Auth</Button>
  )
}