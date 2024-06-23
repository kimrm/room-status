import { useState, useEffect } from "react";

export default function Clock(props: props) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className={props.className}>
      {time.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "numeric",
        hour12: false, // or false, depending on your preference for 12-hour or 24-hour format
        second: undefined, // This will exclude seconds from the time
      })}
    </div>
  );
}

type props = {
  className: string;
};
