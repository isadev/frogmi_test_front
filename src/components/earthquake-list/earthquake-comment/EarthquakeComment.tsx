import React, { useState } from "react";
import "./EarthquakeComment.css";
import { IEarthquake, postComment } from "../../api/user";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface earthquakeProp {
  earthquake: IEarthquake;
}

function EarthquakeComment(props: earthquakeProp) {
  const [userComment, setUserComment] = useState("");
  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await postComment(userComment, props.earthquake.id);
    setUserComment("");
  };

  const handleWriteComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserComment(e.target.value);
  };

  const [show, setShow] = useState(false);

  const handleClose = async () => {
    await postComment(userComment, props.earthquake.id).catch((err) =>
      console.error(`The comment couldnt be post`)
    );
    setUserComment("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        style={{ position: "absolute", bottom: "1rem", right: "1rem" }}
        variant="primary"
        onClick={handleShow}
      >
        Comment
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <b>Placed at {props.earthquake.attributes.place}</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Was a tsunami: {props.earthquake.attributes.tsunami ? "yes" : "no"}
          </p>
          <p>When it happend: {props.earthquake.attributes.time}</p>
          <textarea
            className="comment__form-textarea form-control"
            name="userComment"
            id="comment"
            placeholder="comment about this earthquake"
            value={userComment}
            onChange={(e) => handleWriteComment(e)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            disabled={!userComment.trim()}
            onClick={handleClose}
          >
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EarthquakeComment;
