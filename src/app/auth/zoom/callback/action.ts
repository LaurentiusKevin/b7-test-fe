"use server";

import axios, { AxiosError } from "axios";

export async function generateToken({ code }: { code: string }) {
  try {
    const response = await axios.post("https://zoom.us/oauth/token", null, {
      params: {
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.NEXT_PUBLIC_ZOOM_REDIRECT_URI,
      },
      auth: {
        username: process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID || "",
        password: process.env.NEXT_PUBLIC_ZOOM_CLIENT_SECRET || "",
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("Error generating Zoom token", error, error.response?.data);
    } else {
      console.error("Error generating Zoom token", error);
    }
  }
}

export async function getUser({ access_token }: { access_token: string }) {
  try {
    const { data } = await axios.get("https://api.zoom.us/v2/users/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("Error getting user data", error, error.response?.data);
    } else {
      console.error("Error getting user data", error);
    }
  }
}
