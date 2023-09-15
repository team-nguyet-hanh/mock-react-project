import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function RegisterToast() {

  return (
    <Row>
      <Col xs={6}>
        <Toast bg='success' show={true} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
          </Toast.Header>
          <Toast.Body className='text-wh'>Register successfully. Please sign in!</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}

export default RegisterToast;