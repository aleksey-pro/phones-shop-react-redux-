// Редюсер хранит все полученные с сервера id телефонов, незаваимио нужны они нам или нет
import * as R from "ramda";
import {
  FETCH_PHONES_SUCCESS,
  LOAD_MORE_PHONES_SUCCESS,
  SEARCH_PHONE
} from "actions/actionTypes";

const initialState = {
  ids: [],
  search: ""
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PHONES_SUCCESS:
      //померджим наш state с новым обьектом, в который мы записали массив ids.
      return R.merge(state, {
        ids: R.pluck("id", payload) // вытаскивает из payload айдишники и положит в масив
      });
    case LOAD_MORE_PHONES_SUCCESS:
      const ids = R.pluck("id", payload);
      return R.merge(state, {
        ids: R.concat(ids, state.ids)
      });
    case SEARCH_PHONE:
      return R.merge(state, {
        search: payload
      });

    default:
      return state;
  }
};
