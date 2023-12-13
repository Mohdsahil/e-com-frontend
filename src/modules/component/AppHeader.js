import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'

const AppHeader = () =>{
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const onChange = (e) => {
    e.preventDefault();
    console.log(e.target)
    setName(e.target.value)
  }

  const onSearch = () => {
    if (name!='') {
      navigate(`/products?name=${name}`);
    }
  }

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link component  href="/products">Products</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AppHeader;