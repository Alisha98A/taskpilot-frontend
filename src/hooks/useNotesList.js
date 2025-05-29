import { useEffect, useState } from "react";

const useNotesList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return { notes, loading };
};

export default useNotesList;