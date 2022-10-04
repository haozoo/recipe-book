export const checkValidUsername = (oldUsername, username) => {
  if (username?.length < 3) {
    return "Your username must be at least 3 characters long.";
  }
  if (!/^[\w ]*$/.test(username)) {
    return "Your username can only contain letters, numbers and spaces.";
  }
  if (oldUsername === username) {
    return "Your new username must be different.";
  }
  return "";
};

export const checkValidEmail = (oldEmail, email) => {
  if (oldEmail === email) {
    return "Your new email must be different.";
  }
  if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(email)) {
    return "Not a valid email!";
  }
  return "";
};

export const checkValidNewPassword = (password) => {
  if (password?.length < 8) {
    return "Your password must be at least 8 characters long.";
  }
  if (!/\p{Lu}/u.test(password)) {
    return "Your password must have an uppercase letter in it.";
  }
  if (!/\d/.test(password)) {
    return "Your password must have a number in it.";
  }
  return "";
};

export const checkValidConfirmPassword = (newPassword, confirmPassword) => {
  if (confirmPassword !== newPassword) {
    return "Your passwords must match";
  }
  return "";
};
