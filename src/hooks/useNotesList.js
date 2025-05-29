import { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";

const useNotesList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axiosReq.get("/api/notes/");
        const data = res.data.results || res.data;
        setNotes(data);
      } catch {
        // Error handling to be added
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return { notes, loading };
};

export default useNotesList;