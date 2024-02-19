import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/reducers/product/productReducer.js';
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';
import Metadata from '../layout/Metadata';
import './Products.css';
import Search from '../layout/Search/Search';
import { Slider, Typography } from '@mui/material';
import ProductCard from '../Home/Card';
import Loader from '../layout/Loader/Loader';

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones"
];

const Products = () => {
  const [price, setPrice] = useState([0, 250000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [key, setKey] = useState(0); // Key for re-rendering NavLink
  const dispatch = useDispatch();
  const { loading, error, products, productCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);
  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    dispatch(fetchProducts({ keyword, currentPage, price, category, ratings }));
  }, [dispatch, keyword, currentPage, price, category, ratings, key]); // Include key in dependencies

  const handleUnfilter = () => {
    setCategory("");
    setKey((prevKey) => prevKey + 1); // Update key to force re-render of NavLink
  };

  useEffect(() => {
    console.log(filteredProductsCount);
  }, [filteredProductsCount]);

  if (error) {
    toast.error(error);
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Metadata title="Products-ShopKart" />
          <div className='search-filter'>
            <Search />
            <NavLink to='/products' onClick={handleUnfilter} className='un-filter'><p>Un-Filter</p></NavLink>
          </div>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <div className="filterBox">
            <Typography> Price</Typography>
            <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay='auto'
                aria-labelledby='range-slider'
                min={0}
                max={250000}
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li className='category-link'
                  key={category}
                  onClick={() => setCategory(category)}>
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend"> Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby='continuous-slider'
                valueLabelDisplay='auto'
                min={0}
                max={5}
                style={{ width: '100px', marginLeft: '15px' }}
              />
            </fieldset>
          </div>
          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
