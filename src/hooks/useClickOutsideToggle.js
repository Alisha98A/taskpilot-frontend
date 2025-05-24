import { useEffect, useRef, useState } from "react";

/**
 * Custom hook to toggle a component (e.g., navbar) and collapse it
 * when a click is detected outside of the target component.
 */
const useClickOutsideToggle = () => {
  // State to track whether the component (e.g., navbar) is expanded or not
  const [expanded, setExpanded] = useState(false);

  // Ref to be attached to the toggled component for click detection
  const ref = useRef(null);

  useEffect(() => {
    // Handler function to detect clicks outside the referenced element
    const handleClickOutside = (event) => {
      // If the click was outside the element referred to by `ref`, collapse it
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    // Add mouseup listener when the component mounts
    document.addEventListener("mouseup", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]); // Effect runs only if ref changes (which it won't, but this is good practice)

  // Return the toggle state, setter, and the ref to attach
  return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;