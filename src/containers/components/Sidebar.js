import React from "react";
import BasketCart from "containers/components/BasketCart";
import Search from "containers/components/Search";
import Categories from "containers/components/Categories";

const Sidebar = () => {
  return (
    <div>
      <BasketCart />
      <Search />
      <Categories />
    </div>
  );
};

export default Sidebar;
