import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';
import Navbar from '../Navbar/Navbar.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:4000/allproducts');
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    try {
      await fetch('http://localhost:4000/removeproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      fetchInfo(); // Refresh the list after removing the product
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className='list-product'>
        <h1>All Products List</h1>
        <div className="product-list-box">
          <div className="listproduct-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Old Price</p>
            <p>New Price</p>
            <p>Category</p>
            <p>Remove</p>
          </div>
          <div className="listproduct-allproducts">
            <hr />
            {allProducts.map((product) => (
              <div key={product.id}>
                <div className="listproduct-format-main listproduct-format">
                  <img src={product.image} alt="" className="listproduct-product-icon" />
                  <p>{product.name}</p>
                  <p>${product.old_price}</p>
                  <p>${product.new_price}</p>
                  <p>{product.category}</p>
                  <img onClick={() => removeProduct(product.id)} className='listproduct-remove-icon' src={cross_icon} alt="Remove" />
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListProduct;
