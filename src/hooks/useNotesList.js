import { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";

const useNotesList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchNotes = async () => {
      try {
        const res = await axiosReq.get("/api/notes/");
        const data = res.data.results || res.data;
        if (isMounted) {
          setNotes(data);
          setLoading(false);
          setError(null);
        }
      } catch {
        if (isMounted) {
          setError("Failed to load notes. Please try again later.");
          setLoading(false);
        }
      }
    };

    fetchNotes();

    return () => {
      isMounted = false;
    };
  }, []);

  // Return setters so calling components can update state & errors
  return { notes, setNotes, loading, error, setError };
};

export default useNotesList;