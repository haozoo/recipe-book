import React from "react";
import UserLayout from "../../../components/layout/UserLayout";
import _ from "lodash";

export default function SingleRecipePage({ recipeID }) {
  return <div>{recipeID}</div>;
}

SingleRecipePage.getLayout = (page) => {
  return <UserLayout pageName="Edit Recipe">{page}</UserLayout>;
};

export async function getServerSideProps(context) {
  const { recipeID } = context.params;
  return { props: { recipeID } };
}
