import { User } from "./AuthSlice";

const STORAGE_KEY = "users";

const capitalize = (string: string) => {
  const upperFirst = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };
  return string.trim().split(" ").map(upperFirst).join(" ");
};

const randomTimeout = (min = 100, max = 300) => {
  return Math.random() * (max - min) + min;
};

export function register(username: string) {
  return new Promise<{ data: User }>((resolve, reject) => {
    const name = capitalize(username);

    return setTimeout(() => {
      const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

      if (users.indexOf(name) > -1) {
        return reject({
          status_code: 409,
          error: "User already exists.",
        });
      }

      users.push(name);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
      return resolve({ data: { name } });
    }, randomTimeout());
  });
}

export function login(username: string) {
  return new Promise<{ data: User }>((resolve, reject) => {
    const name = capitalize(username);

    return setTimeout(() => {
      const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

      if (users.indexOf(name) === -1) {
        return reject({
          status_code: 404,
          error: "User not found.",
        });
      }

      return resolve({ data: { name } });
    }, randomTimeout(50, 200));
  });
}

export default { login, register };
