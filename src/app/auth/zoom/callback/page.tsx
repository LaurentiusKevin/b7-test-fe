'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {useAuth} from "@/context/AuthContext";
import {useEffect, useMemo} from "react";
import axios from "axios";

export default function ZoomCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {zoomCode, zoomToken, setZoomCode, setZoomToken, zoomUser, setZoomUser} = useAuth();

  const accountValidated = useMemo(() => {
    return zoomCode !== null && zoomToken !== null && zoomUser !== null;
  }, [zoomCode, zoomToken, zoomUser]);

  useEffect(() => {
    const code = searchParams.get('code');

    if (code !== null) {
      const handleAuth = async () => {
        setZoomCode(searchParams.get('code'))

        const { data } = await axios.post('/api/auth/zoom/token', {
          code: zoomCode
        });

        const userData = await axios.post(process.env.NEXT_PUBLIC_API_URL!+'/user', {
          access_token: data.access_token
        });

        setZoomToken(data);
        setZoomUser(userData.data);
      }

      void handleAuth();
    }
  }, [router, searchParams, setZoomCode, setZoomToken, setZoomUser, zoomCode])

  useEffect(() => {
    if (accountValidated) {
      router.push('/calendar');
    }
  }, [accountValidated, router]);

  return (
    <div>
      <p>{!accountValidated ? 'Validating, please wait...' : 'Authorization success! Redirecting...'}</p>
    </div>
  );
}