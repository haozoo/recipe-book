import React from "react";

export default function LoadingIcon({ message }) {
  return (
    <div className="flex flex-col h-full justify-center items-center opacity-20">
      <div className="animate-bounce inline-block w-32 h-32 rounded-full ">
        <picture>
          <img className="h-18 w-18" src="/recipe_logo.png" alt="Workflow" />
        </picture>
      </div>
      <div className="mt-2 text-2xl text-chestnut font-patrick tracking-wide">
        {message}
      </div>
    </div>
  );
}
