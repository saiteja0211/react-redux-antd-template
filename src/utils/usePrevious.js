import { useEffect, useRef } from "react";

const usePrevious = (value) => {
  const ref = useRef({ value: "" });
  useEffect(() => {
    ref.current.value = value;
  }, [value]);

  return ref.current.value;
};

export default usePrevious;
