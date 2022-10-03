import { EnvelopeIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import UserLayout from "../../components/layout/UserLayout";
import { useUserAuth } from "../../context/UserAuthContext";

const UsernameIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="flex-shrink-0 h-7 w-7 p-1 bg-orange-100 rounded-full border-2 border-orange-300 text-orange-400"
    >
      <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
    </svg>
  );
};

const EmailIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="flex-shrink-0 h-7 w-7 p-1 bg-orange-100 rounded-full border-2 border-orange-300 text-orange-400"
    >
      <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
      <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
    </svg>
  );
};

const PasswordIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="flex-shrink-0 h-7 w-7 p-1 bg-orange-100 rounded-full border-2 border-orange-300 text-orange-400"
    >
      <path
        fillRule="evenodd"
        d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const UserInfoHeading = ({ heading, text, Icon }) => {
  return (
    <div>
      <div className="flex items-center gap-3">
        <Icon />
        <h1 className="text-xl font-patrick font-extrabold tracking-wider text-chestnut">
          {heading}
        </h1>
      </div>
      <p className="pl-1 py-2 text-lg font-medium tracking-wide text-hazelnut font-patrick">
        {text}
      </p>
    </div>
  );
};

const UserInput = ({ label, value, handleEdit }) => {
  return (
    <div>
      <label
        className="bg-white px-1 text-base font-patrick font-extrabold tracking-wide text-chestnut"
        htmlFor="name"
      >
        {label}
      </label>
      <input
        className="block w-full rounded-md border border-gray-300 px-4 py-1 my-2 input-font input-focus focus:ring-0"
        type="text"
        id="name"
        value={value}
        onChange={(e) => handleEdit(e.target.value)}
      />
    </div>
  );
};

export default function UserProfilePage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useUserAuth();

  useEffect(() => {
    if (user && !email) {
      setEmail(user?.email);
    }
  }, [user]);

  return (
    <div className="flex-1 xl:overflow-y-auto max-w-3xl divide-y divide-gray-200">
      <div className="pt-11 pb-20">
        <UserInfoHeading
          heading="Username"
          text="Update your username address associated with your account. This
          username will be used as your login."
          Icon={UsernameIcon}
        />

        <form className="pt-8 w-full sm:w-1/3">
          <div>
            <UserInput
              label="Username"
              value={username}
              handleEdit={setUsername}
            />
            <button
              className="mt-2 py-2 px-4 bg-sajah rounded-lg text-white text-sm font-patrick tracking-wider font-extrabold"
              type="button"
            >
              Update username
            </button>
          </div>
        </form>
      </div>
      <div className="py-20">
        <UserInfoHeading
          heading="Email Address"
          text="Update your email address associated with your account."
          Icon={EmailIcon}
        />
        <form className="pt-8 w-full sm:w-1/3">
          <div>
            <UserInput label="Email" value={email} handleEdit={setEmail} />
            <button
              className="mt-2 py-2 px-4 bg-sajah rounded-lg text-white text-sm font-patrick tracking-wider font-extrabold"
              type="button"
            >
              Update email
            </button>
          </div>
        </form>
      </div>
      <div className="py-20">
        <UserInfoHeading
          heading="Password"
          text="Update your password associated with your account. Please enter your current password first."
          Icon={PasswordIcon}
        />
        <form className="pt-8 w-full sm:w-1/3">
          <div>
            <UserInput
              label="Current Password"
              value={password}
              handleEdit={setPassword}
            />
            <UserInput
              label="New Password"
              value={newPassword}
              handleEdit={setNewPassword}
            />
            <button
              className="mt-2 py-2 px-4 bg-sajah rounded-lg text-white text-sm font-patrick tracking-wider font-extrabold"
              type="button"
            >
              Update password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

UserProfilePage.getLayout = (page) => {
  return <UserLayout activePageTitle="Your profile">{page}</UserLayout>;
};
