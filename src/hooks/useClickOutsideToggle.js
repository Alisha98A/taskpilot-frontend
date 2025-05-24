import { useRef, useState } from "react";

const useClickOutsideToggle = () => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);

  return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;