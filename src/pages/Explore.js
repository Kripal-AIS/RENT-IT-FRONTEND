import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { API } from "../API";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import emptyBox from "../imgs/emptyBox.png";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
export default function Explore() {
  const options = [
    { value: "MachanicalTools", label: "Machanical Tools" },
    { value: "WeddingDress", label: "Wedding Dress" },
    { value: "Vehicle", label: "Vehicle" },
    { value: "BridalSet", label: "Bridal Set" },
    { value: "StudioEquipments", label: "Studio Equipments" },
    { value: "Gadgets", label: "Electrical Gadgets" },
  ];

  const { search } = useLocation();

  const [keyword, setKeyWord] = useState("");
  const [products, setProducts] = useState([]);
  const [category, setcategory] = useState([]);
  const x1 = new URLSearchParams(search).get("keyword") || null;
  const [isLoading, setIsLoading] = useState(false);
  const [firstTime, setFirstTime] = useState(true);
  const [page, setPage] = useState(1)
  const [hasmore, setHasmore] = useState(true)
  const changeCategories = (val) => {
    setFirstTime(false);
    if (category.indexOf(val) != -1) {
      setcategory(category.filter((cat) => cat != val));
    } else {
      setcategory([...category, val]);
    }
  };

  useEffect(()=>{
    fetchProducts()
  },[])

  useEffect(() => {
    if (x1) setKeyWord(x1);
  }, [x1]);

  useEffect(() => {
    if (keyword) {
      searchProducts();
    }

  }, [keyword]);
  useEffect(() => {
    if (!firstTime) searchProducts();
  }, [category]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(API + "/product/search?keyword=&category=");
      setProducts(res.data);
      setKeyWord("");
      setcategory([]);
    } catch (e) { }
    setIsLoading(false);
  };

  const searchProducts = async () => {
    setIsLoading(true);
    // let categoriesValue = category.map(ctg => ctg.value)
    let categoriesValue = category;
    // console.log(categoriesValue);
    let queryKeyword = keyword || "";
    try {
      const res = await axios.get(
        API +
        `/product/search?keyword=${queryKeyword}&category=${categoriesValue}&page=${page}&limit=${10}`
      );

      // console.log(res.data);
      if (res.data.length === 0) {
        setHasmore(false)
      }
      else {
        setHasmore(true)

      }
      setProducts([...res.data]);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  // useEffect(()=>{
  //   if(page>1 && hasmore){
  //     searchProducts()
  //   }
  // },[page])

  return (
    <motion.div
      className="page explore"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="top flex-col">
        <b>Showing Results of : {keyword || "All"}</b>

        {/* <Select className="select"
        
        options={options} isMulti  

          value={category}
              onChange={(value) =>{ setcategory(value)}}
        
            /> */}

        {/* <div className="search">
          <input type="text" value={keyword} onChange={(e)=>{
            setKeyWord(e.target.value)
          }}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              searchProducts()
            }
          }}
          />
          <button className="green roundBtn" onClick={searchProducts}><i className="im im-magnifier"></i></button>
        </div> */}

        <div className="categories">
          <div className={`pill blue filterpill`}>
            <FilterAltIcon sx={{ fontSize: 30 }} />
          </div>
          <button
            className={`pill yellow`}
            onClick={() => {
              fetchProducts();
            }}
          >
            All
          </button>
          {options.map((op) => (
            <button
              className={`pill ${category.indexOf(op.value) != -1 ? "blue" : "yellow"
                }`}
              onClick={() => {
                changeCategories(op.value);
              }}
            >
              {op.value}
            </button>
          ))}
        </div>
      </div>

      <div className="listProduct">
        {isLoading ? (
          <>
            <Loader />
          </>
        ) : products.length ? (
          products.map((product, index) => (
            <>
              <ProductCard index={index} {...product} />
            </>
          ))
        ) : (
          <div className="flex-col">
            <img height={80} width={80} src={emptyBox} alt="" />
            No Products
          </div>
        )}

        {/* {hasmore && <button className="blue" onClick={()=>setPage(page+1)}>Load more</button>} */}
      </div>
    </motion.div>
  );
}
