import * as R from "ramda";

// Полчаем телефон из state по id
const getPhoneById = (state, id) => R.prop(id, state.phones);

// Мапим массив айдишек и по ним уже возвращем phones из state в store
export const getPhones = state => {
  const phones = R.map(id => getPhoneById(state, id), state.phonesPage.ids);
  return phones;
};

export const getRenderedPhonesLength = state => R.length(state.phonesPage.ids);
