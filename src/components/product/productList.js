import { useQuery } from "@apollo/client";
import { Error, Loading } from "utils/context";
import CountDropdown from "components/common/countDropdown";
import SortDropdown from "components/common/sortDropdown";
import TablePagination from "components/common/tablePagination";
import {
  CATEGORIES_TABLE_PARAMS,
  CATEGORY_COUNTS,
  CATEGORY_SORT_TYPES,
  DEFAULT_ORDER,
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
  DEFAULT_SORT_BY,
  NONE_PARENT,
} from "consts";
import { GET_CATEGORIES } from "graphql/category";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import CategoriesTable from "../common/listItems";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Список категорий.
const ProductList = () => {
  const [setLoading] = useContext(Loading);
  const [setError] = useContext(Error);
  const [parent] = useState(NONE_PARENT);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [count, setCount] = useState(DEFAULT_PER_PAGE);
  const [sortBy, setSortBy] = useState(DEFAULT_SORT_BY);
  const [order, setOrder] = useState(DEFAULT_ORDER);
  const { t } = useTranslation("category");
  const history = useHistory();

  // Загружаем список элементов с параметрами по умолчанию.
  const { loading, data, error } = useQuery(GET_CATEGORIES, {
    variables: { parent, page, count, sortBy, order },
  });

  // При клике на элемент - открываем ссылку детального просмотра.
  const onClickRow = useCallback(
    (id) => history.push(`/categories/${id}/`),
    [history]
  );

  // При клике на элемент - открываем ссылку детального просмотра.
  const onClickNew = useCallback(
    () => history.push(`/categories/new/`),
    [history]
  );

  // Изменение параметров страницы при именении их в запросе.
  useEffect(() => setPage(DEFAULT_PAGE), [count, sortBy, order]);

  // Обработка статуса загрузки и возникших ошибок.
  useEffect(() => {
    setLoading(loading);
    setError(error);
  }, [loading, error, setLoading, setError]);

  // Если есть ошибки или данные еще не загружены - ничего не рендерим.
  if (loading && error) return null;

  // Если список элементов пуст - показываем что нет элементов.
  if (data?.getCategories?.length <= 0) return <div>{t("noCategories")}</div>;

  // Рендер таблицы категорий.
  return (
    <>
      <Row>
        <Col md>
          <h3>{t("listTitle")}</h3>
        </Col>
        <Col sm>
          <Button className="float-right" variant="danger" onClick={onClickNew}>
            {t("newCategory")}
          </Button>
        </Col>
      </Row>
      {data?.getCategories?.length > 0 && (
        <CategoriesTable
          list={data.getCategories}
          params={CATEGORIES_TABLE_PARAMS}
          order={order}
          setOrder={setOrder}
          setSortBy={setSortBy}
          onClickRow={onClickRow}
        />
      )}
      <Row className="mt-4">
        <Col>
          <div className="float-left">
            <SortDropdown
              types={CATEGORY_SORT_TYPES}
              sortBy={sortBy}
              order={order}
              setSortBy={setSortBy}
              setOrder={setOrder}
            />
          </div>
          <div className="float-left ml-15">
            <CountDropdown
              counts={CATEGORY_COUNTS}
              count={count}
              setCount={setCount}
            />
          </div>
          <div className="float-right">
            <TablePagination
              count={count}
              page={page}
              allCount={data?.getCategoriesCount}
              setPage={setPage}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ProductList;
