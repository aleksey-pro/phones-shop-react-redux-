import * as R from "ramda";

// Полчаем телефон из state по id
export const getPhoneById = (state, id) => R.prop(id, state.phones);

export const getCategories = state => R.values(state.categories);

export const getActiveCategoryId = ownProps =>
  R.path(["params", "id"], ownProps); // проверяет наличие params и id и если нет  - вернется undefined и код не упадет

// Мапим массив айдишек и по ним уже возвращем phones из store в component
export const getPhones = (state, ownProps) => {
  const activeCategoryId = getActiveCategoryId(ownProps);

  const applySearch = item =>
    R.contains(state.phonesPage.search, R.prop("name", item));

  const applyCategory = item =>
    R.equals(activeCategoryId, R.prop("categoryId", item));

  const phones = R.compose(
    R.filter(applySearch),
    //когда у нас есть activeCategoryId, мы хотим применить filter с функцией applyCategory
    // R.always возыращает функцию, к-я возвращает то, что ты в нее передаш
    R.when(R.always(activeCategoryId), R.filter(applyCategory)),
    R.map(id => getPhoneById(state, id))
  )(state.phonesPage.ids);

  return phones;
};

export const getRenderedPhonesLength = state => R.length(state.phonesPage.ids);

export const getTotalBasketCount = state => R.length(state.basket);

export const getTotalBasketPrice = state => {
  const totalPrice = R.compose(
    R.sum,
    R.pluck("price"),
    R.map(id => getPhoneById(state, id))
  )(state.basket);

  return totalPrice;
};

export const getBasketPhonesWithCount = state => {
  const phoneCount = id =>
    R.compose(
      R.length,
      R.filter(basketId => R.equals(id, basketId))
    )(state.basket);
  const phoneWithCount = phone => R.assoc("count", phoneCount(phone.id), phone);
  const uniqueIds = R.uniq(state.basket);
  const phones = R.compose(
    R.map(phoneWithCount),
    R.map(id => getPhoneById(state, id))
  )(uniqueIds);

  return phones;
};
