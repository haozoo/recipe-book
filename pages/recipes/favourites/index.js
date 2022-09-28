import React from "react";
import UserLayout from "../../../components/layout/UserLayout";

export default function FavouriteRecipesPage() {
  return <div className="font-nunito text-chestnut text-md"></div>;
}

FavouriteRecipesPage.getLayout = function getLayout(page) {
  return (
    <UserLayout activePageTitle="Your favourite recipes">{page}</UserLayout>
  );
};
