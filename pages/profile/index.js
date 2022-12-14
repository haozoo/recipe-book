import {
  EnvelopeIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { UserInput } from "../../components/forms/UserInput";
import UserLayout from "../../components/layout/UserLayout";
import { useUserAuth } from "../../context/UserAuthContext";
import {
  changeEmailAddress,
  changePassword,
  deleteUserAccount,
  updateUserProfile,
} from "../../services/auth";
import {
  checkValidConfirmPassword,
  checkValidEmail,
  checkValidNewPassword,
  checkValidUsername,
} from "../../utils/constraints";

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

const AccountIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="flex-shrink-0 h-7 w-7 p-1 bg-orange-100 rounded-full border-2 border-orange-300 text-orange-400"
    >
      <path
        fillRule="evenodd"
        d="M19 5.5a4.5 4.5 0 01-4.791 4.49c-.873-.055-1.808.128-2.368.8l-6.024 7.23a2.724 2.724 0 11-3.837-3.837L9.21 8.16c.672-.56.855-1.495.8-2.368a4.5 4.5 0 015.873-4.575c.324.105.39.51.15.752L13.34 4.66a.455.455 0 00-.11.494 3.01 3.01 0 001.617 1.617c.17.07.363.02.493-.111l2.692-2.692c.241-.241.647-.174.752.15.14.435.216.9.216 1.382zM4 17a1 1 0 100-2 1 1 0 000 2z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const UserInfoHeading = ({
  heading,
  text,
  type,
  name,
  Icon,
  handleUpload,
  data,
}) => {
  const [errors, setErrors] = useState(Array(data?.length).fill(false));
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setResult("");
    setIsLoading(true);
    const status = await handleUpload(e);
    if (status === "SUCCESS") {
      setResult(`${name} has been updated succesffuly!`);
    } else {
      setResult("An error has occurred, please retry later.");
    }
    setIsLoading(false);
  };

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
      <form className="pt-8 w-full" onSubmit={handleSubmit} autoComplete="off">
        {data &&
          data.map((input, idx) => {
            return (
              <UserInput
                key={idx}
                label={input?.label}
                type={input?.type}
                value={input?.value}
                checkValue={input?.checkValue}
                placeholder={input?.placeholder}
                handleEdit={input?.handleEdit}
                handleError={(err) =>
                  setErrors(
                    errors.map((e, id) => {
                      return idx === id ? err : e;
                    })
                  )
                }
              />
            );
          })}
        <div className="flex flex-col sm:flex-row sm:items-center mt-2">
          <button
            className="py-2 px-4 bg-rajah rounded-lg text-white text-sm font-patrick tracking-wider font-extrabold disabled:opacity-30"
            type="button"
            disabled={
              isLoading ||
              !data.reduce(
                (acc, input) => acc && input?.value?.length !== 0,
                true
              ) ||
              errors.reduce((acc, err) => acc || err, false)
            }
            onClick={handleSubmit}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg
                  role="status"
                  className="inline mr-3 w-4 h-4 text-sajah animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Updating...
              </div>
            ) : (
              `${type} ${name}`
            )}
          </button>
          <p
            className="flex justify-center mt-2 text-gray-400 text-sm font-patrick tracking-wider font-extrabold
            sm:justify-start sm:pl-2 sm:mt-0"
          >
            {result}
          </p>
        </div>
      </form>
    </div>
  );
};


export default function UserProfilePage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [passwordEmail, setPasswordEmail] = useState("");
  const [passwordChange, setPasswordChange] = useState("");
  const [passwordDelete, setPasswordDelete] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user } = useUserAuth();

  const isGoogleAccount = user?.providerData?.find(
    (provider) => provider.providerId === "google.com"
  )
    ? true
    : false;

  const handleUsernameUpdate = async () => {
    const status = await updateUserProfile(username);
    setUsername("");

    return status;
  };

  const handleEmailUpdate = async () => {
    const status = await changeEmailAddress(email, passwordEmail);
    setEmail("");
    setPasswordEmail("");

    return status;
  };

  const handlePasswordUpdate = async () => {
    const status = await changePassword(
      passwordChange,
      newPassword,
      confirmPassword
    );
    setPasswordChange("");
    setNewPassword("");
    setConfirmPassword("");

    return status;
  };

  const handleDeleteAccount = async () => {
    const status = await deleteUserAccount(passwordDelete);
    setPasswordDelete("");

    return status;
  };

  return (
    <div className="flex-1 xl:overflow-y-auto max-w-3xl divide-y divide-gray-200">
      <div className="pt-11 pb-20">
        <UserInfoHeading
          heading="Username"
          text="Your username address associated with your account. This
          username will only be your display name."
          type="Update"
          name="Username"
          Icon={UsernameIcon}
          handleUpload={handleUsernameUpdate}
          data={[
            {
              label: "Username",
              type: "text",
              value: username,
              placeholder: user?.displayName,
              checkValue: () => checkValidUsername(user?.displayName, username),
              handleEdit: setUsername,
            },
          ]}
        />
      </div>
      {!isGoogleAccount && (
        <div className="py-20">
          <UserInfoHeading
            heading="Email Address"
            text="Update your email address associated with your account. Please enter your current password first."
            type="Update"
            name="Email"
            Icon={EmailIcon}
            handleUpload={handleEmailUpdate}
            data={[
              {
                label: "Current Password",
                type: "password",
                value: passwordEmail,
                handleEdit: setPasswordEmail,
              },
              {
                label: "Email",
                type: "email",
                value: email,
                placeholder: user?.email,
                checkValue: (val) => checkValidEmail(user?.email, val),
                handleEdit: setEmail,
              },
            ]}
          />
        </div>
      )}
      {!isGoogleAccount && (
        <div className="py-20">
          <UserInfoHeading
            heading="Password"
            text="Update your password associated with your account. Please enter your current password first."
            type="Update"
            name="Password"
            Icon={PasswordIcon}
            handleUpload={handlePasswordUpdate}
            data={[
              {
                label: "Current Password",
                type: "password",
                value: passwordChange,
                handleEdit: setPasswordChange,
              },
              {
                label: "New Password",
                type: "password",
                value: newPassword,
                checkValue: checkValidNewPassword,
                handleEdit: setNewPassword,
              },
              {
                label: "Confirm Password",
                type: "password",
                value: confirmPassword,
                checkValue: (val) =>
                  checkValidConfirmPassword(newPassword, val),
                handleEdit: setConfirmPassword,
              },
            ]}
          />
        </div>
      )}
      <div className="py-20">
        <UserInfoHeading
          heading="Account"
          text="Delete your account. All your data will be deleted. This action cannot be undone. Please enter your current password first."
          type="Delete"
          name="Account"
          Icon={AccountIcon}
          handleUpload={handleDeleteAccount}
          data={[
            {
              label: "Current Password",
              type: "password",
              value: passwordDelete,
              handleEdit: setPasswordDelete,
            },
          ]}
        />
      </div>
    </div>
  );
}

UserProfilePage.getLayout = (page) => {
  return (
    <UserLayout activePageTitle="User Profile" activePageHeading="Your profile">
      {page}
    </UserLayout>
  );
};
