import React, { useState } from "react";
import "./EarthquakeComment.css";
import { postComment } from "../../api/user";
interface earthquakeProp {
  earthquakeId: string;
}

function EarthquakeComment(props: earthquakeProp) {
  const [userComment, setUserComment] = useState("");

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await postComment(userComment, props.earthquakeId);
    setUserComment("");
  };

  const handleWriteComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserComment(e.target.value);
  };

  return (
    <div className="comment">
      <form onSubmit={(event) => submitForm(event)} className="comment__form">
        <div className="form-floating mb-3">
          <textarea
            className="comment__form-textarea form-control"
            name="userComment"
            id="comment"
            placeholder="comment about this earthquake"
            value={userComment}
            onChange={(e) => handleWriteComment(e)}
          />
          <label
            className="d-none d-xl-block"
            htmlFor="comment"
            aria-label="userComments"
          >
            ¿Quieres dejar un comentario?
          </label>
        </div>
        <button type="submit" style={{ float: "right" }}>
          Enviar
        </button>
      </form>
    </div>
  );
}

export default EarthquakeComment;
