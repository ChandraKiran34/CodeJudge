import React, { useState } from "react";
import { MdPerson } from "react-icons/md";
const RegisterPage = () => {
  const [inputData, setInputData] = useState({
    userName: "",
    email: "",
    password: "",
    phone: "",
    github: "",
    linkedin: "",
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const formData = new FormData();


  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  
  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputData);
    formData.append("userName", inputData.userName);
    formData.append("email", inputData.email);
    formData.append("password", inputData.password);
    formData.append("phone", inputData.phone);
    formData.append("github", inputData.github);
    formData.append("linkedin", inputData.linkedin);
    formData.append('avatar', file);
    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setMessage(data.message);
      console.log(message);
      setInputData({
        userName: "",
        email: "",
        password: "",
        phone: "",
        github: "",
        linkedin: "",
      });
      setProfilePicture(null);
    } catch (error) {
      console.log(error);
      setMessage("Registration not successful");
    }
  };

  const handleInputChange = (event) => {
    setInputData((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    console.log(event.target.value);
  };

  const customStyles = {
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen dark  bg-slate-600">
      <h2 className="text-4xl text-[#eee] font-bold text- mb-5 flex items-center justify-center">
        <MdPerson className="mr-[0.3rem] text-4xl" /> Register
      </h2>
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8">
        {/* <label className="block text-gray-200 ">Profile Picture</label> */}
        <form className="flex flex-col" onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className="flex items-center mb-4">
            <label
              htmlFor="profilePicture"
              className="cursor-pointer flex items-center justify-center w-32 h-32 ml-[8.5rem] bg-gray-700 text-gray-200 border-0 rounded-full overflow-hidden focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 "
            >
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profile Preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-sm">Upload Picture</span>
              )}
            </label>
            <input
              id="profilePicture"
              type="file"
              name="avatar"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <input
            type="text"
            name="userName"
            value={inputData.userName}
            onChange={handleInputChange}
            required
            placeholder="Full Name"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          />
          <input
            placeholder="Email"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="email"
            name="email"
            value={inputData.email}
            onChange={handleInputChange}
            required
          />
          <input
            placeholder="Password"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="password"
            name="password"
            value={inputData.password}
            onChange={handleInputChange}
            required
          />
          <input
            placeholder="Phone"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="tel"
            name="phone"
            value={inputData.phone}
            onChange={handleInputChange}
            required
          />
          <input
            placeholder="Github Link"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="url"
            name="github"
            value={inputData.github}
            onChange={handleInputChange}
            required
          />
          <input
            placeholder="LinkedIn Profile"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="url"
            name="linkedin"
            value={inputData.linkedin}
            onChange={handleInputChange}
            required
          />
          <button
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
