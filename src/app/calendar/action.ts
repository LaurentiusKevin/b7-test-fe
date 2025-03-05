"use server";

import axios, { AxiosError } from "axios";

export async function getCalendars({
  access_token,
}: {
  access_token: string;
}) {
  try {
    const { data } = await axios.get(`https://api.zoom.us/v2/calendars/users/me/calendarList`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("Error getting calendars", error, error.response?.data);
    } else {
      console.error("Error getting calendars", error);
    }
  }
}

export async function getEvents({
  id,
  access_token,
}: {
  id: string;
  access_token: string;
}) {
  console.log(access_token)
  try {
    const { data } = await axios.get(`https://api.zoom.us/v2/calendars/${id}/events`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("Error generating Zoom token", error, error.response?.data);
    } else {
      console.error("Error generating Zoom token", error);
    }
  }
}
