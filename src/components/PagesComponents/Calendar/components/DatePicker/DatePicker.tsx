import React, { useCallback } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Value } from "react-calendar/dist/cjs/shared/types";
import { useLocation, useNavigate } from "react-router-dom";

const DatePicker = () => {
  const [value, onChange] = React.useState<Value>(new Date());
  const minDate = new Date(2023, 5, 1);
  const maxDate = new Date(2023, 7, 31);
  const navigate = useNavigate();
  const location = useLocation();

  const [isQueryParamSet, setIsQueryParamSet] = React.useState(false);
  React.useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const myParam = queryParams.get("month");
    if (!myParam && !isQueryParamSet) {
      const month = value
        ?.toLocaleString("en-US", { month: "long" })
        .toLowerCase();
      const day = value?.toLocaleString("en-US", { day: "2-digit" });
      if (month && day) {
        queryParams.set("month", month);
        queryParams.set("day", day);
      }

      navigate({
        search: queryParams.toString(),
      });

      setIsQueryParamSet(true);
    }
  }, [location.search, navigate, isQueryParamSet, value]);
  return (
    <div>
      <Calendar
        minDate={minDate}
        showWeekNumbers={true}
        showNeighboringMonth={false}
        maxDate={maxDate}
        locale="en"
        onChange={(e) => {
          onChange(e);
          const searchParams = new URLSearchParams(location.search);
          const month = e
            ?.toLocaleString("en-US", { month: "long" })
            .toLowerCase();
          const day = e?.toLocaleString("en-US", { day: "2-digit" });
          if (month && day) {
            searchParams.set("month", month);
            searchParams.set("day", day);
            navigate(`?${searchParams}`);
          }
        }}
        value={value}
      />
    </div>
  );
};

export default DatePicker;
