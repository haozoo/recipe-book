import React from "react";
import UserLayout from "../../components/layout/UserLayout";

export default function UserProfilePage() {
  return <div className="font-nunito text-chestnut text-md">Your profile</div>;
}

UserProfilePage.getLayout = (page) => {
  return <UserLayout pageName="Your profile">{page}</UserLayout>;
};
