import React, { useEffect, useState } from "react";
import Select from "react-select";
import firebaseUpload from "../helpers/firbaseUpload";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../API";
import { motion } from 'framer-motion'
import axios from "axios";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


export default function EditProduct() {
  const [img, setImg] = useState();
  const [preview, setPreview] = useState();
  const [name, setname] = useState();
  const [description, setdescription] = useState();
  const [category, setcategory] = useState();
  const [rent, setrent] = useState();
  const [timeduration, settimeduration] = useState("Per Month");
  const [dop, setdop] = useState();
  const [city, setCity] = useState();

  const [ isLoading, setIsLoading] = useState(false)

  const [product, setProduct] = useState();

  const location = useLocation();

  const options = [
    { value: "MachanicalTools", label: "Machanical Tools" },
    { value: "WeddingDress", label: "Wedding Dress" },
    { value: "Vehicle", label: "Vehicle" },
    { value: "BridalSet", label: "Bridal Set" },
    { value: "StudioEquipments", label: "Studio Equipments" },
    { value: "Gadgets", label: "Electrical Gadgets" },
  ];

  const navigate = useNavigate();

  const handleFile = (e) => {
    setImg(e.target.files[0]);
  };
  const fileSelect = () => {
    if (typeof img == "object") setPreview(URL.createObjectURL(img));
    else setPreview(img);
  };



  const updateProduct = async (img = preview) => {

    const reqBody = {
      _id: product._id,
      title: name,
      description,
      age: dop,
      rent,
      timeperiod: timeduration,
      category,
      image: img,
      location: city,
    }
    const res = await axios.put(API + `/product/${product._id}`, reqBody, { withCredentials: true }).catch((err) => alert("error"))

    if (res.status === 200) {
      navigate('/')
    }

  }










  const handleSubmit = async () => {
    console.log(name, description, category, rent, timeduration, dop, img);
    if (
      // true
      name &&
      description &&
      category &&
      rent &&
      timeduration &&
      dop
    ) {

      setIsLoading(true)

      if (img) {

        await firebaseUpload(img, product._id, (img) => {
          updateProduct(img.data)
        })
      }

      else {
        await updateProduct(preview)
      }
      setIsLoading(false)

    }
  };

  useEffect(() => {
    fileSelect();
  }, [img]);

  useEffect(() => {
    setProduct(location.state);
    console.log(location.state);
  }, [location]);

  useEffect(() => {
    setPreview(product?.image);
    setname(product?.title);
    setdescription(product?.description);
    setCity(product?.location);
    setcategory(product?.category);
    setrent(product?.rent);
    settimeduration(product?.timeperiod);
    setdop(product?.age)


  }, [product]);

  if (product)
    return (
      <motion.div className="addproduct page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: .2 }}
      >
        <h2>Edit Product</h2>

        <div className="form flex">
          <div className="left">
            <div className="avatarWrap">
              <p>Image :</p>
              {!preview ? (
                <div className="avatar"></div>
              ) : (
                <img src={preview || ""} className="avatar" alt="" />
              )}

              <label for="avatarimg" className="blue">
                <CloudUploadIcon sx={{ fontSize: 30 }} />

              </label>
              <input
                id="avatarimg"
                type="file"
                onChange={(e) => handleFile(e)}
              />
            </div>
          </div>
          <div className="right">
            <div className="title">
              <p>Name : </p>
              <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className="description">
              <p>Description : </p>
              <textarea
                type="text"
                rows={5}
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              ></textarea>
            </div>

            <div className="title">
              <p>Location : </p>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="category">
              <p>Catergory : </p>
              <Select
                className="select"
                options={options}
                onChange={(selectedOptions) =>
                  setcategory(selectedOptions.value)
                }
              />
            </div>

            <div className="rent">
              <p>Rent : </p>
              <div className="rentInp">
                <input
                  type="number"
                  value={rent}
                  onChange={(e) => setrent(e.target.value)}
                ></input>
                <select
                  name="per"
                  className="yellow"
                  id=""
                  value={timeduration}
                  onChange={(e) => {
                    console.log(e);
                    settimeduration(e.target.value);
                  }}
                >
                  <option value="Per Day">Per Day</option>
                  <option value="Per Month">Per Month</option>
                  <option value="Per Year">Per Year</option>
                </select>
              </div>
            </div>

            <div className="title">
              <p>Date of Purchase : </p>
              <input
                type="date"
                value={dop}
                onChange={(e) => setdop(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex">
          <button className="blue" onClick={handleSubmit} disabled={isLoading}>
             { isLoading ? "Loading ..." : "Edit Product"}
          </button>
        </div>
      </motion.div>
    );
}
