import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import add_product_icon from '../../assets/Product_Cart.svg';
import list_product_icon from '../../assets/Product_list_icon.svg';
import inventory_icon from '../../assets/inventory.svg'; // Ensure this icon exists in your assets

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addproduct'} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={add_product_icon} alt="Add Product" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={'/listproduct'} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="Product List" />
          <p>Product List</p>
        </div>
      </Link>
      <Link to={'/inventory'} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={inventory_icon} alt="Inventory" className='inventory-icon'/>
          <p>Inventory</p>
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
