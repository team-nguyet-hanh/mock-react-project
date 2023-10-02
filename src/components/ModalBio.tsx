import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ModalBio({ show, setShow, bio }: any) {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title>Bio details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflowWrap: "break-word" }}>
          <p>{bio}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalBio;
