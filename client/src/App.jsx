import axios from "axios";
import React, { useState } from "react";

import StatusListItem from "./Card";
import OverlaySpinner from "./Spinner";

export default function ImageUploader() {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [base64, setBase64] = useState("");
  const [result, setresult] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [loading, setloading] = useState(false);
  const sectionRef = React.useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) processImage(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processImage(file);
  };


  const processImage = (file) => {
    if (!file) return;
    setImage(URL.createObjectURL(file));
    setImageName(file.name);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setBase64(reader.result.split(',')[1]);
    };
  };

  const apicall = async () => {
    setloading(true);
    await axios.post('https://signal-analyzer-backend.onrender.com/api/upload', {
      base64Image: base64,
      imageName: imageName
    })
      .then(response => {
        setresult(JSON.parse(response.data.response.replace("```json", "") 
          .replace("```", "")    
          .trim()));
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        setloading(false);

      })
      .catch(error => {
        console.error('There was an error uploading the image!', error);
        setloading(false);
      });
  }




  return (
    <div className="min-h-screen flex items-center justify-center  from-indigo-50 via-purple-50 to-pink-50 p-6">
      {loading && <OverlaySpinner />}
      <div className="w-full flex max-md:flex-col gap-4 max-w-5xl bg-white/70 backdrop-blur-xl shadow-2xl rounded-2xl p-4 border border-white/30">
        <div className="w-full  flex-1">


          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Upload Image of Signal
          </h1>

          {/* Upload Box */}
          <div
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 transition-all duration-300 ${dragOver
              ? "border-purple-500 bg-purple-50"
              : "border-gray-300 hover:border-purple-400"
              }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor="imageInput"
              className="cursor-pointer text-center flex flex-col items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-purple-500 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16 10l-4-4m0 0L8 10m4-4v12"
                />
              </svg>
              <p className="text-gray-700 font-medium">
                Drag & drop or{" "}
                <span className="text-purple-600 underline">browse</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 5MB</p>
            </label>
          </div>

          {/* Preview */}
          {image && (
            <div id="result" className="mt-8 flex flex-col items-center">
              <div className="relative h-64 rounded-xl overflow-hidden shadow-lg border border-gray-200">
                <img
                  src={image}
                  alt="Uploaded preview"
                  className=" w-full h-full transform hover:scale-105 transition duration-300"
                />
              </div>
              <p className="mt-4 text-gray-700 font-semibold">{imageName}</p>
            </div>
          )}

          {image && <button onClick={() => { apicall() }} className="bg-[#ad46ff] cursor-pointer px-4 py-2 rounded-md mt-5 w-full text-xl  text-white">Analyze</button>
          }
        </div>
        {result && <div ref={sectionRef} className="w-full flex-1">




          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Output
            </h2>
            <div className="bg-gray-100 p-2 rounded-lg  text-xs text-gray-600 border border-gray-200 h-full">
              {result && result.map((item, index) => (
                <StatusListItem key={index} item={item} />
              ))}
            </div>
          </div>

        </div>}
      </div>

    </div>
  );
}
