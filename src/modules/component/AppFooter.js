import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AppFooter = () =>{
  return (
    <>
      <footer className="bg-body-tertiary text-light text-center py-5" data-bs-theme="dark">
        <Container >
        <Row>
          <Col>
            <small>© 2023, Blossom & Bold Powered by Sahil</small>
          </Col>
        </Row>
     
        </Container>
        
      </footer>
    </>
  );
}

export default AppFooter;