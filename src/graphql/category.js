import { gql } from "@apollo/client";

// Получить список категорий по фильтру с общим количеством категорий.
export const GET_CATEGORIES = gql`
  query getCategories(
    $parent: String
    $page: Int
    $count: Int
    $sortBy: String
    $order: Int
  ) {
    getCategories(
      parent: $parent
      page: $page
      count: $count
      sortBy: $sortBy
      order: $order
    ) {
      name
      _id
      parent
      sort
      active
    }
    getCategoriesCount(parent: $parent)
  }
`;

// Получить все категории для поля родительские категории.
export const GET_PARENTS = gql`
  query getCategories {
    getCategories {
      name
      _id
    }
  }
`;

// Получить каегорию по её ID.
export const GET_CATEGORY = gql`
  query getCategory($id: ID!) {
    getCategory(id: $id) {
      name
      _id
      parent
      sort
      active
      description
      image
      link
    }
  }
`;

// Сохранение существующей или создание новой категории.
export const SAVE_CATEGORY = gql`
  mutation saveCategory(
    $_id: ID
    $name: String
    $parent: String
    $sort: Int
    $active: Boolean
    $description: String
    $image: String
    $link: String
  ) {
    saveCategory(
      _id: $_id
      name: $name
      parent: $parent
      sort: $sort
      active: $active
      description: $description
      image: $image
      link: $link
    )
  }
`;

// Удаление категории по её ID.
export const REMOVE_CATEGORY = gql`
  mutation removeCategory($_id: ID!) {
    removeCategory(_id: $_id)
  }
`;
