import { useRef, useEffect, useState } from "react";

export const TimeOut = (props) => {
  const { status, handleSubmit, setStatus, timeCount, setTimeCount } = props;
  //Countdown Time
  const useInterval = (callback, delay) => {
    const savedCallback = useRef();
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    // Set up the interval.
    useEffect(() => {
      const tick = () => {
        savedCallback.current();
      };
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };
  const twoDigits = (num) => String(num).padStart(2, "0");
  const secondsToDisplay = timeCount % 60;
  const minutesRemaining = (timeCount - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

  useInterval(
    () => {
      if (timeCount > 0) {
        setTimeCount(timeCount - 1);
      } else {
        setStatus(false);
        handleSubmit();
        // postSubmitAnswer();
        // expired Time
        // setTimeout(() => {
        //   history.replace(`/list-test/take-quiz/finish/${id}&${Number(stt)}`);
        // }, 1000);
      }
    },
    1000
    // passing null stops the interval
  );
  return (
    <div>
      <b>
        {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
        {twoDigits(secondsToDisplay)}
      </b>
    </div>
  );
};
