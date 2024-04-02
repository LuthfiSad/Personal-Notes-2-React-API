import React from "react";

export default function ErrorPage() {
  return (
    <div className="flex text-xs justify-center items-center flex-col min-h-screen">
      <h1 className="text-3xl text-red-700 font-bold">Oops!</h1>
      <p className="my-5">Sorry, an unexpected error has occured</p>
    </div>
  );
}
