"use client";
import { Field, Form, Formik, ErrorMessage } from "formik";
import Image from "next/image";
import { object, string } from "yup";

const newsletterSchema = object().shape({
  email: string()
    .email("Votre email est invalide")
    .required("Votre email est requis"),
});

export default function Newsletter() {
  return (
    <section id="newsletter">
      <h3>Inscription à la newsletter</h3>
      <Image
        src="/wave-yellow.gif"
        alt="Vague jaune qui bouge"
        width={190}
        height={33}
      />
      <p>
        Recevez tous les mois les actualités de notre agence de communication,
        des articles sur{" "}
        <strong>
          le marketing, la création de site internet, les bonnes pratiques, des
          guides etc.
        </strong>
      </p>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={newsletterSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              name="email"
              placeholder="Votre adresse mail (*)"
              type="email"
              className={errors.email && touched.email ? "error-field" : null}
            />
            {errors.email && touched.email ? (
              <div className="error">{errors.email}</div>
            ) : null}
            <button type="submit">S&apos;inscrire</button>
          </Form>
        )}
      </Formik>
    </section>
  );
}
