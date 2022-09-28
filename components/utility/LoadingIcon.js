import React from "react";

export default function LoadingIcon({ message }) {
  return (
    <div class="flex flex-col h-full justify-center items-center opacity-20">
      <div class="animate-bounce inline-block w-32 h-32 rounded-full ">
        <img className="h-18 w-18" src="/recipe_logo.png" alt="Workflow" />
      </div>
      <div className="mt-2 text-2xl text-chestnut font-patrick tracking-wide">
        {message}
      </div>
    </div>
  );
}
