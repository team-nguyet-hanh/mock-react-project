import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { updateUserActions } from "../redux/update/updateSlice";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ModalSettings({ show, setShow, data }: any) {
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleSave = () => {
    setShow(false);
    dispatch(updateUserActions.update(data));
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Submit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to submit the following details?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleSave}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalSettings;
