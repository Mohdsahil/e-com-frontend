import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';


const ProductDetails = () => {
    let { id } = useParams();
    const [item, setItem] = useState(null);
    const [thumbnail, setThumbnail] = useState('')
    const [quantity, setQuantity] = useState(1);

    const updateQuantity = (qu) => {
        const newQuantity = quantity+qu
        if (newQuantity) {
            setQuantity(quantity+qu)   
        }
    }
   
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3001/product/${id}`);
                
                if (!response.ok) {
                throw new Error('Product not found');
                }
                const responseData = await response.json()
                console.log("response",responseData.data )
            //   const productData = await response.data.products.json();
                setItem(responseData.data);
            } catch (error) {
                console.error('Error fetching product:', error.message);
                // Handle error as needed, e.g., set an error state
            }
        };
            if (id) {
                fetchProduct(id);
            }
    }, [])
    
    return (
        <Container className="mt-5">
            {item && 
                <div className="row mb-3">
                <div className="col-md-5 text-center">
                    <img
                        src={thumbnail ? thumbnail : item.thumbnail}
                        className="img-fluid mb-3"
                        alt=""
                    />
                    {item.color.map((color, idx) => (
                        <img
                            key={idx}
                            src={color.image}
                            className="border border-secondary me-2"
                            width="75"
                            alt={item.name}
                            onClick={() => setThumbnail(color.image)}
                        />        
                    ))}
               
                
              
                </div>
                <div className="col-md-7">
                <h1 className="h3 d-inline me-2">{item.name}</h1>
                <span className="badge bg-success me-2">New</span>
                
                <div className="my-3">
                    <span className="h5 me-2"> Rs. 1900</span>
                    
                </div>

                <dl className="row small mb-3 mt-2">
                    <dt className="col-sm-3">Availability</dt>
                    <dd className="col-sm-9">In stock</dd>
                    <dt className="col-sm-3">Size</dt>
                    <dd className="col-sm-9">
                        {item.size.map((size, idx) => (
                            <div className="form-check form-check-inline" key={idx}> 
                                <input
                                className="form-check-input"
                                type="radio"
                                name="size"
                                id="sizes"
                                />
                                <label className="form-check-label" htmlFor="sizes">
                                {size}
                                </label>
                            </div>
                        ))}
                   
                  
                   
                    
                    </dd>
                    <dt className="col-sm-3">Color</dt>
                    <dd className="col-sm-9">
                        {item.color.map((color, idx) => (
                            <button className="btn border btn-light p-2 me-2" 
                                key={idx} 
                                style={{ backgroundColor: color.name }}
                                onClick={() => setThumbnail(color.image)}    
                            ></button>
                        ))}
                    </dd>
                </dl>

                
                <div className="mb-3">
                    <div className="d-inline float-start me-2">
                    <div className="input-group mw-140">
                        <button
                        className="btn btn-primary text-white"
                        type="button"
                        onClick={() => updateQuantity(-1)}
                        >
                        -
                        </button>
                        <input
                        type="text"
                        className="form-control"
                        defaultValue="1"
                        value={quantity}
                        disabled
                        />
                        <button
                        className="btn btn-primary text-white"
                        type="button"
                        onClick={() => updateQuantity(1)}
                        >
                        +
                        </button>
                    </div>
                    </div>
                   
                    <button
                    type="button"
                    className="btn btn-dark me-2"
                    title="Buy now"
                    >
                    <i className="bi bi-cart3 me-1"></i>Buy now
                    </button>
                    
                </div>
                <div>
                    <p className="fw-bold mb-2">Product Details</p>
                    <div>
                        {item.description}
                    </div>
                    <p className="fw-bold my-2">Features</p>
                     <ul className="small">
                        {item.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                        ))}
                    </ul>
                    <p className="fw-bold my-2">Benefits</p>
                     <ul className="small">
                        {item.benefits.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                        ))}
                    </ul>
                    <p className="fw-bold my-2">Care Instructions</p>
                     <ul className="small">
                        {item.instructions.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                        ))}
                    </ul>
                </div>
                </div>
            </div>
            }
                
          
        </Container>
    )
}

export default ProductDetails;