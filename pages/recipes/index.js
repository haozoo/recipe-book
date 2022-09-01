import React from "react";
import UserLayout from "../../components/layout/UserLayout";

export default function AllRecipesPage() {
  return (
    <div className="font-nunito text-chestnut text-md">All recipes here</div>
  );
}

AllRecipesPage.getLayout = (page) => {
  return <UserLayout pageName="Recipes">{page}</UserLayout>;
};
