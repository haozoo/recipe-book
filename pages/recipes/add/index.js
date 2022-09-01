import React from "react";
import UserLayout from "../../../components/layout/UserLayout";

export default function AddRecipePage() {
  return (
    <div className="font-nunito text-chestnut text-md">Add new recipe!</div>
  );
}

AddRecipePage.getLayout = function getLayout(page) {
  return <UserLayout pageName="Add a new recipe">{page}</UserLayout>;
};
