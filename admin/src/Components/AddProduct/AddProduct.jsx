import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "himalayan",
    new_price: "",
    old_price: ""
  });

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setProductDetails({ ...productDetails, image: file });
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = { ...productDetails };

    let formData = new FormData();
    formData.append('product', image);

    try {
      const uploadResponse = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });
      responseData = await uploadResponse.json();

      if (responseData.success) {
        product.image = responseData.image_url;
        console.log(product);

        const addProductResponse = await fetch('http://localhost:4000/addproduct', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });

        const addProductData = await addProductResponse.json();
        if (addProductData.success) {
          alert("Product Added");
        } else {
          alert("Failed to add product");
        }
      } else {
        alert("Failed to upload image");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product");
    }
  };

  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name='name'
          placeholder='Type here'
          autoComplete="off"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name='old_price'
            placeholder='Type here'
            autoComplete="off"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name='new_price'
            placeholder='Type here'
            autoComplete="off"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className='add-product-selector'
          autoComplete="off"
        >
          <option value="himalayan">Himalayan</option>
          <option value="hilly">Hilly</option>
          <option value="terai">Terai</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className='addproduct-thumbnail-img'
            alt="Upload"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name='image'
          id='file-input'
          hidden
        />
      </div>
      <button onClick={Add_Product} className='addproduct-btn'>ADD</button>
    </div>
  );
};

export default AddProduct;
