import React, { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Loader from "../../modules/component/Loader";

const ProductListing = () => {
    const [items, setItems] = useState([]);
    const [loader, setLoader] = useState(true);
    let searchQuery = "";
	const [searchValue, setSearchValue] = useState("");

    const fetchProduct = async () => {
        try {
          setLoader(true)
          const response = await fetch(`http://localhost:3001/products?name=${searchQuery}`);
          
          if (!response.ok) {
            setLoader(false)
            throw new Error('Product not found');
          }
          const responseData = await response.json()
          setItems(responseData.data.products);
          setLoader(false)
        } catch (error) {
          console.error('Error fetching product:', error.message);
          // Handle error as needed, e.g., set an error state
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [])

    const onSearchChanged = (e) => {
		const searchTerm = e.target.value;
		setSearchValue(searchTerm);
        setLoader(true)
		debouncedCall(searchTerm);
	};

	const debouncedCall = useCallback(
		debounce((search) => {
			searchQuery = search;
            fetchProduct();
		}, 1000),
		[]
	);
    
    return (
        <Container className="my-5"> 
            <Row>
                <Col md={3}>
                <h1 className=" mb-4">Filters</h1>
                <Form.Control
                    type="text"
                    placeholder="Search"
                    className=" mr-sm-2"
                    onChange={(e) => onSearchChanged(e)}
                    value={searchValue}
                    />
                </Col>
                <Col md={9}>
                <div>
                    <h1 className=" mb-4">Products</h1>
                    <Row >
                        { loader && <Loader /> }

                        {items && !loader && items.length > 0 && 
                        <>
                            {items.map((item, idx) => (
                        <Col key={idx} xs={1} md={6} >
                        <Card className="my-4">
                            <Card.Img variant="top" src={item.thumbnail} />
                            <Card.Body>
                                <Card.Title className="list-card-title">{item.name}</Card.Title>
                                <Card.Text>
                                    {/* {item.description} */}
                                </Card.Text>
                                <span className="price">Rs.{item.price}</span>
                            </Card.Body>
                            <Link to={`/product/${item.id}`} className="d-contents">
                                <Button variant="outline-dark" className="m-3">Buy</Button>
                            </Link>
                        </Card>
                        </Col>
                            ))}
                        </>   
                        }
                        {items.length == 0 &&
                            <p className="text-center">Product not found</p>
                        }
                    </Row>
                    </div>
                </Col>
            </Row>
            
        </Container>
    )
}

export default ProductListing;