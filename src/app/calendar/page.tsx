'use client';

import { Button } from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useAuth} from "@/context/AuthContext";
import {useCallback} from "react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

export default function CalendarPage() {
  const {zoomToken, zoomUser} = useAuth();

  const {data: calendarData, isLoading: isLoadingEventData} = useQuery({
    queryKey: ["calendar"],
    queryFn: () => axios
      .post(process.env.NEXT_PUBLIC_API_URL!+ "/calendar", {
        access_token: zoomToken?.access_token,
      }),
  });

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
      {calendarData?.data.calendars.calendars === null && (
        <div className="flex w-full items-center justify-center">
          <div className="p-4 border border-gray-400 rounded-lg w-full">
            <span>No events found</span>
          </div>
        </div>
      )}
    </div>
  );
}