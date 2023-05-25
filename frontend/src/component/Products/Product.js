import React from 'react';
import './Product.css';

function Product(props) {
  const { name, price,description, image } = props.product;

  return (
    <div className="product-container">
      <img className="product-image" src={image} alt={name} />
      <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
        <p className="product-price">${price}</p>
      <button>Add to Cart</button>
    </div>
  );
}

export default Product;
