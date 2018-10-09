import * as R from "ramda";

import { FETCH_PHONES_SUCCESS } from "actions/actionTypes";
const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PHONES_SUCCESS:
      const newValues = R.indexBy(R.prop("id"), payload); // из массива
      // объектов в полученных данных получаем объект с ключами, где id -
      // ключ в полученном объекте
      return R.merge(state, newValues);
    default:
      return state;
  }
};
