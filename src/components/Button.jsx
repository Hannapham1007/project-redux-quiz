//Button component
import React from "react";
import '../styles/Button.css'

export default function Button({ onClick, text, border }) {
  return <button className="btn" onClick={onClick} border={border}>{text}</button>;
}
