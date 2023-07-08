import React from "react";
import Calendar from "../components/PagesComponents/Calendar/Calendar";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../utils/redux";
import { calendarFetchEvents } from "../store/slices/calendar-slice";

const CalendarPage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const month = searchParams.get("month");
    const day = searchParams.get("day");
    if (month && day) {
      dispatch(calendarFetchEvents({ day: `${day}`, month }));
    }
  }, [location.search, dispatch]);
  return <Calendar />;
};

export default CalendarPage;
