import React, { useState } from "react";

const RegisterPage = () => {
  const [inputData, setInputData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    github: "",
    linkedin: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    console.log(inputData);
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });
      const data = await response.json();
      setMessage(data.message);
      console.log(message);
      setInputData({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        github: "",
        linkedin: "",
      });
    } catch (error) {
      console.log(error);
      setMessage("registration not successful");
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
    // backgroundImage : `linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('https://thumbor.forbes.com/thumbor/fit-in/1290x/https://www.forbes.com/advisor/wp-content/uploads/2024/01/Coding-Bootcamp-Statistics.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div
      className="min-h-[91vh] flex items-center justify-center bg-gray-100 px-4 py-5 sm:px-6 lg:px-8"
      style={customStyles}
    >
      <div className="max-w-4xl w-full space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl font-bold mb-[4rem]  text-gray-900">
            User Registration
          </h1>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="col-span-1">
              <label
                htmlFor="fullName"
                className="block text-sm font-bold text-black"
              >
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={inputData.fullName}
                onChange={handleInputChange}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="email"
                className="block text-sm font-bold text-black"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={inputData.email}
                onChange={handleInputChange}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="password"
                className="block text-sm font-bold text-black"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={inputData.password}
                onChange={handleInputChange}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="phone"
                className="block text-sm font-bold text-black"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={inputData.phone}
                onChange={handleInputChange}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="github"
                className="block text-sm font-bold text-black"
              >
                Github Link
              </label>
              <input
                type="url"
                name="github"
                value={inputData.github}
                onChange={handleInputChange}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="linkedin"
                className="block text-sm font-bold text-black"
              >
                Linkedin Profile
              </label>
              <input
                type="url"
                name="linkedin"
                value={inputData.linkedin}
                onChange={handleInputChange}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-[30%] ml-[18rem] mt-[5rem] flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
