import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Button from '@mui/material/Button';
import Metadata from "../layout/Metadata";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SideBar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProd } from "../../redux/reducers/product/productDetailsReducer";
import { clearErrors, resetUpdatedProduct, updateProduct } from "../../redux/reducers/admin/adminProducts";


const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { product, error } = useSelector((state) => state.productDetails);

  const {
    loading = false,
    error: updateError = null,
    isUpdated
  } = useSelector((state) => state.adminProducts);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const productId = id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(fetchProd(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
     
      dispatch(resetUpdatedProduct());
    }
  }, [dispatch, error, navigate, isUpdated, productId, product, updateError]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
  
    const productData = {
      name,
      price,
      description,
      category,
      stock,
    };
  
    dispatch(updateProduct({ id: productId, productData }));
    toast.success("Product Updated Successfully");
    navigate("/admin/products");
  };
  
  return (
    <Fragment>
      <Metadata title="Update Product" />
      <div className="dashboard" style={{ height: "100%" }}>
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={stock}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;