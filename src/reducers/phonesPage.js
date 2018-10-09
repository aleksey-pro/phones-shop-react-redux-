// Редюсер хранит все полученные с сервера id телефонов, незаваимио нужны они нам или нет
import * as R from "ramda";
import { FETCH_PHONES_SUCCESS } from "actions/actionTypes";

const initialState = {
  ids: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PHONES_SUCCESS:
      //померджим наш state с новым обьектом, в который мы записали массив ids.
      return R.merge(state, {
        ids: R.pluck("id", payload) // вытаскивает из payload айдишники и положит в масив
      });
    default:
      return state;
  }
};
