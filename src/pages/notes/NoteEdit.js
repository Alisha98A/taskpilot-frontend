import React from "react";
import { useParams, useHistory } from "react-router-dom";

function NoteEdit() {
  const { id } = useParams();
  const history = useHistory();

  return (
    <div>
      <h2>Edit Note #{id}</h2>
    </div>
  );
}

export default NoteEdit;