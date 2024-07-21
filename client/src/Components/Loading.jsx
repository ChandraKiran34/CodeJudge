import React from "react";

const Loading = () => {
  return (
   <div className="text-center">
      <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"></div>
      <h2 className="text-zinc-900 dark:text-white mt-2">Loading...</h2>
      <p className="text-zinc-600 dark:text-zinc-400">
        Your adventure is about to begin
      </p>
    </div>

    // <div className="flex justify-center items-center h-screen">
    //   <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>
    //   <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-red-500 ml-3"></div>
    //   <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-blue-500 ml-3"></div>
    // </div>
  );
};

export default Loading;
