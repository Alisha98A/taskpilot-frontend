import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await axiosReq.get(`/api/notes/${id}/`);
        setNote(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNote();
  }, [id]);

  return <div>{note ? note.body : "Loading..."}</div>;
}

export default NoteDetail;