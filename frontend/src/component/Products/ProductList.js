import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './ProductList.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import prodimage from './images/zyro-image (1).png' ;
import darkProdImage from './images/main-image-dark.png';

const ProductList = ({isDarkMode, toggleDarkMode}) => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/products/')
            .then((response) => setProducts(response.data.products))
            .catch((error) => console.log(error));
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = products.filter((product) => {
        return product.product_name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const buyProduct = (productId, quantity) => {
        const csrftoken = Cookies.get('csrftoken');
        if (!csrftoken) {
            console.log('CSRF token not found');
            return;
        }

        const headers = {
            'X-CSRFToken': csrftoken,
        };

        // Rest of the code for buying a product...
    };

    const getImageSource = () => {
        return isDarkMode ? darkProdImage : prodimage;
    };

    return (
        <div className={`container-fluid ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="row">
                <div className="col-lg-6 order-lg-1">
                    <div className="section-left">
                        {!isMobile && (
                            <h1 className={`section-heading ${isDarkMode ? 'dark-mode-heading' : 'light-mode-text'}`}>
                                Lovelyn
                            </h1>
                        )}
                        <p className={`section-paragraph ${isDarkMode ? 'dark-mode-text' : ''}`}>
                            Your gateway to the world of exquisite fine jewelry. Immerse yourself in the captivating
                            artistry and unparalleled craftsmanship of our carefully curated collection.
                        </p>
                        <div className="button-container">
                            <button className={`explore-button ${isDarkMode ? 'dark-mode-explore-button' : ''}`}>Buy Now</button>
                            <button className={`explore-button ${isDarkMode ? 'dark-mode-explore-button' : ''}`}>Explore</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 order-lg-2">
                    <div className="section-right">
                        <div className={`image-container ${isDarkMode ? 'dark-mode-image' : ''}`}>
                            <img src={getImageSource()} className="large-image" alt="Large Image"/>
                        </div>
                    </div>
                </div>
            </div>

            {/*middlesec1*/}
            <div  className={`middleSect1 ${isDarkMode ? 'middleSect1-dark' : 'middleSect1-light'}`}>

                <h1>hii</h1>
            </div>


            {/*middlesec1*/}


            {/*middle section*/}

            {/*products section*/}

            <h1 className={`heading ${isDarkMode ? 'dark-mode-text' : ''}`}>Products</h1>
            <div className={`mb-3 ${isDarkMode ? 'dark-mode-input' : ''}`}>
                <div className="search-input-wrapper">
                    <input
                        type="text"
                        className={`search-input ${isDarkMode ? 'dark-mode-text' : ''}`}
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search by product name"
                    />
                </div>
            </div>

            <div className="row">
                {filteredProducts.map((product) => (
                    <div className="col-sm-6 col-md-4 col-lg-3" key={product.product_id}>
                        <div className={`card mb-3 ${isDarkMode ? 'dark-card' : 'light-card'}`}>
                            <img
                                src={require(`./images/${product.product_image}`)}
                                className="product-image"
                                alt={product.product_name}
                            />
                            <div className="card-body">
                                <h5 className={`card-title product-title ${isDarkMode ? 'dark-mode-text' : ''}`}>
                                    {product.product_name}
                                </h5>
                                <p className='product-price'>
                                    LKR {product.product_price}
                                </p>

                                <button className="buy-button" onClick={() => buyProduct(product.product_id, 1)}>
                                    <FontAwesomeIcon icon={faShoppingCart}/> Buy
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
