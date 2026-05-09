import { useEffect, useRef, useState } from 'react';

export function useFadeIn(delay: number = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (ref.current) {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
        observer.observe(ref.current);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return { ref, visible };
}

export function useCountdown(targetDate: string) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setDays(0);
        setHours(0);
        setMins(0);
        setSecs(0);
        return;
      }

      const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutesLeft = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const secondsLeft = Math.floor((difference % (1000 * 60)) / 1000);

      setDays(daysLeft);
      setHours(hoursLeft);
      setMins(minutesLeft);
      setSecs(secondsLeft);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return { days, hours, mins, secs };
}
