"use client";

import React, { useState } from "react";
import { LayoutGrid, List as ListIcon, Info, CalendarIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import Image from "next/image";
import { hiringData } from "./hiringData";
import GridCard from "./GridCard";
import ListViewItem from "./ListViewItem";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function InternshipsCalendar() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  const filteredData = !date
    ? hiringData
    : hiringData.filter((item) => item.month === format(date, "MMMM"));

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="min-h-screen w-full bg-background text-foreground p-4 md:p-8 mt-16">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Internships Calendar
            </h2>
            <p className="text-muted-foreground">
              Track upcoming hiring windows and programs.
            </p>
          </div>
        </header>

        <Alert variant={"default"} className="mb-8 border border-border px-4">
          <Info className="h-4 w-4" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
            <div>
              <AlertTitle className="font-bold">
                Applications Opening Soon
              </AlertTitle>
              <AlertDescription className="text-muted-foreground">
                Official links are not live yet. We recommend tracking updates
                on these platforms:
              </AlertDescription>
            </div>
            <div className="flex items-center gap-6 pr-2">
              <a
                href="https://unstop.com"
                target="_blank"
                className="flex items-center gap-2"
              >
                <Image
                  src="/unstop.png"
                  alt="Unstop"
                  width={54}
                  height={42}
                  className="rounded-sm"
                />
              </a>
              <a
                href="https://hackerearth.com"
                target="_blank"
                className="flex items-center gap-2"
              >
                <Image
                  src="/hackerearth.png"
                  alt="HackerEarth"
                  width={24}
                  height={24}
                  className="rounded-sm"
                />
                <span className="text-xs font-semibold">HackerEarth</span>
              </a>
            </div>
          </div>
        </Alert>

        <Tabs defaultValue="grid" className="w-full">
          {/* MONTH ONLY DATE PICKER */}
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <span className="text-xs font-medium text-muted-foreground">
              Filter by Month
            </span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full md:w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "MMMM yyyy") : <span>Pick a month</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2">
                <div className="grid grid-cols-3 gap-2">
                  {/* Option to show all months */}
                  <Button
                    variant="ghost"
                    className={cn(
                      "text-xs h-9 col-span-3",
                      !date && "bg-accent"
                    )}
                    onClick={() => setDate(undefined)}
                  >
                    Show All Months
                  </Button>

                  {months.map((month, index) => (
                    <Button
                      key={month}
                      variant="ghost"
                      className={cn(
                        "text-xs h-9",
                        date?.getMonth() === index &&
                          "bg-primary text-primary-foreground hover:bg-primary"
                      )}
                      onClick={() =>
                        setDate(new Date(new Date().getFullYear(), index))
                      }
                    >
                      {month.substring(0, 3)}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex justify-end mb-6">
            <TabsList className="grid w-[200px] grid-cols-2">
              <TabsTrigger value="grid" className="flex items-center gap-2">
                <LayoutGrid className="h-4 w-4" /> Grid
              </TabsTrigger>
              <TabsTrigger value="list" className="flex items-center gap-2">
                <ListIcon className="h-4 w-4" /> List
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="grid">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredData.map((item, index) => (
                <GridCard key={index} {...item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list">
            <Card>
              <div className="divide-y divide-border">
                {filteredData.map((item, index) => (
                  <ListViewItem key={index} {...item} />
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
