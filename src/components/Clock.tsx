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
        hour12: false,
        second: undefined
      })}
    </div>
  );
}

type props = {
  className: string;
};
