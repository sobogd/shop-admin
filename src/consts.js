import CategoryLightbox from "components/category/CategoryLightbox";
import CategoryList from "components/category/categoryList";
import ProductLightbox from "components/product/productLightbox";
import ProductList from "components/product/productList";
import React from "react";

export const DEFAULT_PER_PAGE = 2;
export const DEFAULT_PAGE = 1;
export const DEFAULT_SORT_BY = "sort";
export const DEFAULT_ORDER = 1;
export const NONE_PARENT = "";
export const SORT_NAMES = {
  sortAsc: "По порядку, возр.",
  sortDesc: "По порядку, убыв.",
  nameAsc: "По названию, возр.",
  nameDesc: "По названию, убыв.",
  priceAsc: "По цене, возр.",
  priceDesc: "По цене, убыв.",
};
export const CATEGORY_SORT_TYPES = ["sort", "name"];
export const CATEGORY_COUNTS = [2, 5, 10, 20, 50, 100];
export const CATEGORIES_TABLE_PARAMS = [
  {
    name: "Название",
    type: "name",
  },
  {
    name: "Сортировка",
    type: "sort",
  },
  {
    name: "Активность",
    type: "active",
  },
];
export const INIT_CATEGORY_STATE = {
  link: "",
  name: "",
  active: true,
  image: "",
  description: "",
  parent: "0",
  sort: "500",
};

// Список роутов для показа списков и элементов определенных типов.
export const routes = [
  {
    name: "Категории",
    path: "/categories/",
    list: <CategoryList />,
    detail: <CategoryLightbox />,
  },
  {
    name: "Товары",
    path: "/products/",
    list: <ProductList />,
    detail: <ProductLightbox />,
  },
  {
    name: "Слайды",
    path: "/slides/",
    list: <CategoryList />,
    detail: <CategoryLightbox />,
  },
];
