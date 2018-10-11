import * as R from "ramda";
// import { request } from "superagent";

import phones from "./mockPhones";
import categories from "./mockCategories";

// Без API
// export const fetchPhones = async () => {
//   return new Promise((resolve, reject) => {
//     resolve(phones);
//     // reject("error"); так можно проверить выводится ли ошибка
//   });
// };

export const fetchPhones = async () => {
  // Не работает
  // const { body } = await request.get(
  //   "http://www.mocky.io/v2/5bbf2d3f34000067006fce1d"
  // );
  // return body.phones;

  //prettier-ignore
  await fetch("http://www.mocky.io/v2/5bbf2d3f34000067006fce1d")
    .then(function(res) {
      res.json()
    .catch(function(err) {
      console.log("error fectching " + err);
    });
  });
  return phones;
};

export const loadMorePhones = async ({ offset }) => {
  return new Promise(resolve => {
    resolve(phones);
  });
};

export const fetchPhoneById = async id => {
  return new Promise((resolve, reject) => {
    const phone = R.find(R.propEq("id", id), phones);
    resolve(phone);
  });
};

export const fetchCategories = async () => {
  return new Promise((resolve, reject) => {
    resolve(categories);
  });
};
