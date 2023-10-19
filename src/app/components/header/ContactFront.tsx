"use client";
import { Formik, Form, Field } from "formik";
import { object, string, optional } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const userSchema = object({
  name: string({ required_error: "Votre nom et prénom sont requis" }),
  entreprise: optional(string()),
  email: string({ required_error: "Votre adresse mail est requise" }).email(
    "Votre adresse mail est invalide"
  ),
  phoneNumber: string({
    required_error: "Votre numéro de téléphone est requis",
  }).length(10),
  message: string({ required_error: "Un message est requis" }),
});

export default function ContactFront() {
  return (
    <div className="form-container">
      <h3>
        Vous avez un projet, une question, envie de rejoindre l&apos;équipe ?
      </h3>
      <Formik
        initialValues={{
          name: "",
          entreprise: "",
          email: "",
          phoneNumber: "",
          message: "",
        }}
        validationSchema={toFormikValidationSchema(userSchema)}
        onSubmit={(values) => console.log(values)}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              name="name"
              placeholder="Votre Nom et prénom"
              className={errors.name && touched.name ? "error-field" : null}
            />
            {errors.name && touched.name ? (
              <div className="error">{errors.name}</div>
            ) : null}
            <Field name="entreprise" placeholder="Votre Entreprise" />
            {errors.entreprise && touched.entreprise ? (
              <div className="error">{errors.entreprise}</div>
            ) : null}
            <Field
              name="email"
              placeholder="Votre Email"
              type="email"
              className={errors.email && touched.email ? "error-field" : null}
            />
            {errors.email && touched.email ? (
              <div className="error">{errors.email}</div>
            ) : null}
            <Field
              name="phoneNumber"
              placeholder="Votre Numéro de téléphone"
              className={
                errors.phoneNumber && touched.phoneNumber ? "error-field" : null
              }
            />
            {errors.phoneNumber && touched.phoneNumber ? (
              <div className="error">{errors.phoneNumber}</div>
            ) : null}
            <Field
              as="textarea"
              name="message"
              placeholder="Votre Message"
              className={
                errors.message && touched.message ? "error-field" : null
              }
            />
            {errors.message && touched.message ? (
              <div className="error">{errors.message}</div>
            ) : null}
            <button type="submit">Envoyer</button>
          </Form>
        )}
      </Formik>
      <ul className="informations">
        <li>
          <strong>Btg Communication</strong>
        </li>
        <li>52 boulevard Heurteloup / 37000 Tours / 02.46.65.51.15</li>
        <li>contact@btg-communication.fr</li>
      </ul>
    </div>
  );
}
