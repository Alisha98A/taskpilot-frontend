import { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";

const useNotesList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axiosReq.get("/api/notes/");
        const data = res.data.results || res.data;
        setNotes(data);
        setError(null);
      } catch {
        setError("Failed to load notes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return { notes, loading, error };
};

export default useNotesList;