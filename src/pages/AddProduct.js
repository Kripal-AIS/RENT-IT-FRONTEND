import React, { useEffect, useState } from "react";
import Select from "react-select";
import firebaseUpload from "../helpers/firbaseUpload";
import { useNavigate } from "react-router-dom";
import { API } from "../API";
import axios from "axios";
import { motion } from 'framer-motion'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function AddProduct() {
  const [img, setImg] = useState();
  const [preview, setPreview] = useState();
  const [name, setname] = useState();
  const [description, setdescription] = useState();
  const [category, setcategory] = useState();
  const [rent, setrent] = useState();
  const [timeduration, settimeduration] = useState("Per Day");
  const [dop, setdop] = useState();
  const [city, setCity] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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





  const handleSubmit = async () => {

    
    if (
      // true
      name && description && category && rent && timeduration && dop && img
    ) {

      setIsLoading(true);

      await firebaseUpload(img, name, async (img_url) => {

        const reqBody = {
          title: name,
          description,
          age: dop,
          rent,
          timeperiod: timeduration,
          category,
          image: img_url.data,
          location: city,
        };

      
        const res = await axios.post(API + "/product/create", reqBody, { withCredentials: true }).catch((err) => {
          alert(err.response.data)
          setIsLoading(false)
        });

        if (res?.status === 200) {
          navigate("/explore");
        }

      }, () => {
        alert("Image not uploaded")
      });






    }
    else {
      setError("Please fill all the details.")
    }
    setIsLoading(false)

  };

  useEffect(() => {
    fileSelect();
  }, [img]);

  return (
    <motion.div className="addproduct page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .2 }}
    >
      <h2>Add Product</h2>
      <p className="red" style={{ background: "none" }}>{error}</p>
      <div className="form">
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
            <input id="avatarimg" type="file" onChange={(e) => handleFile(e)} />
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
              onChange={(selectedOptions) => setcategory(selectedOptions.value)}
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
          {isLoading ? "Loading ..." : "Add Product"}
        </button>
      </div>
    </motion.div>
  );
}
