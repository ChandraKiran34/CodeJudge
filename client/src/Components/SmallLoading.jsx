import React from "react";

function SmallLoading() {
  return (
    //     <div
    //       classNameName="loader border-t-2 rounded-full border-gray-500 bg-gray-300 animate-spin
    // aspect-square w-8 flex justify-center items-center text-yellow-700"
    //     ></div>
    <div className="w-full gap-x-2 flex justify-center items-center">
      <div className="w-5 bg-[#d991c2]  h-5 rounded-full animate-bounce"></div>
      <div className="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full "></div>
      <div className="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full "></div>
    </div>
  );
}

export default SmallLoading;
