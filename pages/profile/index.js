import React from "react";
import UserLayout from "../../components/layout/UserLayout";

const AccountDetail = ({ label, data, handleEdit }) => {
  return (
    <div>
      <div className="pb-2 text-base font-patrick font-extrabold tracking-wider text-gray-500">
        {label}
      </div>
      <div className="border-x-0 border-t-0 border-b-2 border-gray-200 text-slate-500 text-base font-nunito font-medium">
        {data}
      </div>
    </div>
  );
};

export default function UserProfilePage() {
  return (
    <div className="">
      <div className="flex-1 xl:overflow-y-auto">
        <div className="max-w-3xl py-10">
          <div className="pb-2 text-lg font-patrick font-extrabold tracking-wider text-chestnut">
            Account Information
          </div>
          <div className="bg-gray-50 border border-1 border-gray-200 p-6 sm:p-10 rounded-lg">
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-6 sm:gap-x-6">
              <div className="sm:col-span-6">
                <AccountDetail label="Username" data="@haozoo" />
              </div>
              <div className="sm:col-span-6">
                <AccountDetail label="Email" data="b.hao.xu@gmail.com" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

UserProfilePage.getLayout = (page) => {
  return <UserLayout activePageTitle="Your profile">{page}</UserLayout>;
};
