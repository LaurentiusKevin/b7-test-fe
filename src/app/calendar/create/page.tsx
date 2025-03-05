'use client'

import axios from "axios";
import {useAuth} from "@/context/AuthContext";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";

export default function CreateEventPage() {
  const router = useRouter();
  const {zoomToken, zoomUser} = useAuth();

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const handleSubmit = async () => {
    const { data } = await axios.post(process.env.NEXT_PUBLIC_API_URL!+ "/add-event", {
      access_token: zoomToken?.access_token,
      calendar_id: zoomUser?.email,
      start: {
        dateTime: startDate,
        timeZone: "Asia/Jakarta",
      },
      end: {
        dateTime: endDate,
        timeZone: "Asia/Jakarta",
      },
      summary: title,
    });

    if (data.success) {
      router.push("/calendar");
    }
  }

  return (
    <div className="flex flex-col w-full gap-6 p-6 md:p-10">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Create an Event
      </h3>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="startDate">Start Date</Label>
        <Input type="startDate" id="startDate" placeholder="format: YYYY-DD-MM HH:mm:ss"
               value={startDate}
               onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="startDate">End Date</Label>
        <Input type="startDate" id="startDate" placeholder="format: YYYY-DD-MM HH:mm:ss"
               value={endDate}
               onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="startDate">Title</Label>
        <Input type="startDate" id="startDate" placeholder="Event title"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  )
}