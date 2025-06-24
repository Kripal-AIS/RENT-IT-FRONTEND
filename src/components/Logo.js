import React from "react";
import { Link } from "react-router-dom";
import LogoImg from "../imgs/logo.png";

export default function Logo() {
  return (
    <Link to="/" className="logo">
      <img src={LogoImg} className="logoimg" alt="" />
      <h1>Rent It</h1>
    </Link>
  );
}
