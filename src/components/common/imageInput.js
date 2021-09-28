import React from "react";
import { FloatingLabel, Form, Image } from "react-bootstrap";

const imageChangeFile = (e, setForm) => {
  if (e.target.files[0]) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setForm(e.target.name, reader.result);
    };
    reader.readAsDataURL(file);
  }
};

function ImageInput({ value, label, setForm, name }) {
  return (
    <>
      <FloatingLabel
        className="mb-3 float-left"
        controlId={name}
        label={label}
        style={{ width: "calc(100% - 100px)" }}
      >
        <Form.Control
          name={name}
          type="text"
          value={value}
          onChange={(event) => setForm(name, event.target.value)}
        />
        <Form.Group controlId="formFileSm" className="mt-1">
          <Form.Control
            type="file"
            size="sm"
            name={name}
            onChange={(e) => imageChangeFile(e, setForm)}
          />
        </Form.Group>
      </FloatingLabel>
      <Image
        className="float-right"
        src={value === "" ? "/no-img.jpeg" : value}
        width="93"
        height="93"
        rounded
      />
    </>
  );
}

export default ImageInput;
