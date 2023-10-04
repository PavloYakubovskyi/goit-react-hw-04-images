import { Field, Form, Formik } from "formik";
import { FcSearch } from "react-icons/fc";

const Searchbar = ({ onSubmit }) => {
  const handleSubmit = async (values, { setSubmitting }) => {
    // console.log("values: ", values);
    await onSubmit(values);
    setSubmitting(false);
  };

  return (
    <header className="Searchbar">
      <Formik initialValues={{ search: "" }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="SearchForm" autoComplete="off">
            <button type="submit" className="SearchForm-button">
              <span className="SearchForm-button-label">
                <FcSearch />
              </span>
            </button>

            <Field
              className="SearchForm-input"
              type="text"
              name="search"
              // autocomplete="off"
              // autofocus
              placeholder="Search images and photos"
            />
          </Form>
        )}
      </Formik>
    </header>
  );
};

export default Searchbar;
