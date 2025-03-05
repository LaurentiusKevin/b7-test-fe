"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getCalendars, getEvents } from "@/app/calendar/action";

export default function CalendarPage() {
  const { zoomToken, zoomUser } = useAuth();

  const { data: eventsData, isLoading: isLoadingEventData } = useQuery({
    queryKey: ["events", zoomToken?.access_token, zoomUser?.email],
    queryFn: () =>
      getEvents({
        access_token: zoomToken?.access_token || "",
        id: zoomUser?.email || "",
      }),
  });

  const { data: calendarData, isLoading: isLoadingCalendarData } = useQuery({
    queryKey: ["calendar"],
    queryFn: () =>
      getCalendars({
        access_token: zoomToken?.access_token,
      }),
  });

  useEffect(() => {
    console.log("calendarData", calendarData);
  }, [calendarData]);

  return (
    <div className="flex flex-col w-full gap-6 p-6 md:p-10">
      <div className="flex justify-between pointer-events-auto">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Calendar
        </h3>
        <Link href="/calendar/create">
          <Button>Add Event</Button>
        </Link>
      </div>
      {isLoadingEventData && (
        <div className="flex w-full items-center justify-center">
          <div className="p-4 border border-gray-400 rounded-lg w-full">
            <span>Loading ...</span>
          </div>
        </div>
      )}
      {eventsData?.data.calendars.calendars === null && (
        <div className="flex w-full items-center justify-center">
          <div className="p-4 border border-gray-400 rounded-lg w-full">
            <span>No events found</span>
          </div>
        </div>
      )}
    </div>
  );
}
