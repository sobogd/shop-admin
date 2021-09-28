import { useLazyQuery, useMutation } from "@apollo/client";
import { Error, Loading } from "utils/context";
import { INIT_CATEGORY_STATE } from "consts";
import {
  GET_CATEGORIES,
  GET_CATEGORY,
  GET_PARENTS,
  REMOVE_CATEGORY,
  SAVE_CATEGORY,
} from "graphql/category";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ImageInput from "components/common/imageInput";
import translit from "utils/translit";

// Лайтбокс создания или редактирования категории.
const ProductLightbox = () => {
  const [setLoading] = useContext(Loading);
  const [setError] = useContext(Error);
  const [category, setCategory] = useState(INIT_CATEGORY_STATE);
  const history = useHistory();
  // @ts-ignore
  const { urlParam } = useParams();
  const { t } = useTranslation("category");

  // При клике по кнопке закрыть - переходим на главную страницу категорий.
  const handleCloseLightbox = useCallback(() => {
    history.push(`/categories/`);
  }, [history]);

  // Подготавливаем запрос для загрузки категории по ID в адресе.
  const [getCategory, { loading: loadingGet, error: errorGet, data: dataGet }] =
    useLazyQuery(GET_CATEGORY);

  // Подготавливаем запрос для загрузки родительских категорий.
  const [
    getParents,
    { loading: loadingParents, error: errorParents, data: dataParents },
  ] = useLazyQuery(GET_PARENTS);

  // Подготавливаем запрос для сохранения категории и обновление списка категорий.
  const [saveCategory, { loading: loadingSave, error: errorSave }] =
    useMutation(SAVE_CATEGORY, {
      variables: {
        ...category,
        sort: Number(category.sort),
      },
      refetchQueries: [GET_CATEGORIES, "getCategories"],
      onCompleted: handleCloseLightbox,
      onError: (error) => setError(error),
    });

  // Подготавливаем запрос для удаления категории и обновление списка категорий.
  const [removeCategory, { loading: loadingRemove, error: errorRemove }] =
    useMutation(REMOVE_CATEGORY, {
      variables: { _id: category._id },
      refetchQueries: [GET_CATEGORIES, "getCategories"],
      onCompleted: handleCloseLightbox,
      onError: (error) => setError(error),
    });

  // Если не новая категория - загружаем по переданному ID.
  useEffect(() => {
    if (urlParam !== "new") {
      getCategory({ variables: { id: urlParam } });
    }
    getParents();
  }, [urlParam, getCategory, getParents]);

  // Если изменено поле категории название - автоматически транслитерируем поле ссылки.
  useEffect(() => {
    if (category.name !== "") {
      setCategory({
        ...category,
        link: translit(category.name),
      });
    }
  }, [category]);

  // Если при сохранении не возникло ошибок, закрываем лайтбокс.
  useEffect(() => {
    const data = dataGet?.getCategory;
    if (data) setCategory(data);
  }, [dataGet, setCategory]);

  // Устанавливаем ошибки, статус и данные загруженной категории.
  useEffect(() => {
    setLoading(loadingGet || loadingSave || loadingRemove || loadingParents);
    setError(errorGet || errorSave || errorRemove || errorParents);
  }, [
    errorSave,
    errorGet,
    errorRemove,
    errorParents,
    setError,
    loadingGet,
    loadingSave,
    loadingRemove,
    loadingParents,
    setLoading,
  ]);

  // Если есть ошибки ничего не выводим.
  if (
    loadingGet &&
    loadingSave &&
    loadingParents &&
    errorGet &&
    errorSave &&
    errorParents
  )
    return null;

  // Событие изменения значений полей.
  const handleChangeValue = (event) => {
    const { name, value, checked } = event.target;

    setCategory({
      ...category,
      [name]: value === "on" ? checked : value,
    });
  };

  // При клике на кнопку сохранить.
  const handleSaveCategory = () => {
    saveCategory();
  };

  // При клике на кнопку удалить.
  const handleRemoveCategory = () => {
    removeCategory();
  };

  // Рендер контента внутри модального окна.
  const renderContent = () => {
    const { name, link, sort, parent, description, image, active } = category;
    const parentCategories = dataParents?.getCategories;

    return (
      <Form>
        <FloatingLabel className="mb-3" controlId="name" label={t("name")}>
          <Form.Control
            name="name"
            type="text"
            value={name}
            onChange={handleChangeValue}
          />
        </FloatingLabel>
        <FloatingLabel className="mb-3" controlId="link" label={t("link")}>
          <Form.Control
            name="link"
            type="text"
            value={link}
            onChange={handleChangeValue}
          />
        </FloatingLabel>
        <FloatingLabel className="mb-3" controlId="sort" label={t("sort")}>
          <Form.Control
            name="sort"
            type="text"
            value={sort}
            onChange={handleChangeValue}
          />
        </FloatingLabel>
        <FloatingLabel className="mb-3" controlId="parent" label={t("parent")}>
          <Form.Select
            name="parent"
            aria-label={t("parent")}
            value={parent}
            onChange={handleChangeValue}
          >
            <option value="0">{t("parentDefault")}</option>
            {parentCategories &&
              parentCategories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel
          className="mb-3"
          controlId="description"
          label={t("description")}
        >
          <Form.Control
            name="description"
            value={description}
            as="textarea"
            onChange={handleChangeValue}
          />
        </FloatingLabel>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label={t("active")}
            name="active"
            checked={active}
            onChange={handleChangeValue}
          />
        </Form.Group>
        <Row>
          <Col xs={12}>
            <ImageInput
              value={image}
              label={t("image")}
              setForm={(name, value) =>
                setCategory({
                  ...category,
                  [name]: value,
                })
              }
              name="image"
            />
          </Col>
        </Row>
      </Form>
    );
  };

  // Рендер модального окна.
  return (
    <Modal
      size="lg"
      show={!!category}
      onHide={handleCloseLightbox}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t("lightboxTitle")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{category && renderContent()}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleRemoveCategory}>
          {t("remove")}
        </Button>
        <Button variant="secondary" onClick={handleCloseLightbox}>
          {t("cancel")}
        </Button>
        <Button variant="success" onClick={handleSaveCategory}>
          {t("save")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductLightbox;
