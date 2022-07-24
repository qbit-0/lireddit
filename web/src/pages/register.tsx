import React from "react";
import { Formik, Form } from "formik";

type Props = {};

const register = (props: Props) => {
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {() => {
          <Form></Form>;
        }}
      </Formik>
    </Wrapper>
  );
};

export default register;
