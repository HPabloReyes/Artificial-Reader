"use client";

import React, { useState } from "react";
import Tesseract from "tesseract.js";

const ImageReader = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);

      // Use Tesseract.js for OCR on the image
      Tesseract.recognize(
        reader.result,
        "spa",
        {
          config: {
            tessedit_ocr_engine_mode: 11,
          },
          logger: (info) => console.log(info),
        } // Optional logger for debugging
      )
        .then(({ data: { text } }) => {
          setResult(text);
        })
        .catch((error) => {
          console.error("Error performing OCR:", error);
        });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {image && <img src={image} alt="Selected" />}
      {result && <p>OCR Result: {result}</p>}
    </div>
  );
};

export default ImageReader;
