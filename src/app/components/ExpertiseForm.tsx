"use client";
import { ImageType } from "@/middleware/Image";
import { Form, Formik, Field, ErrorMessage } from "formik";
import he from "he";
import Image from "next/image";
import { boolean, object, string } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const initialValues = {
  nom: "",
  email: "",
  phoneNumber: "",
  society: "",
  message: "",
  consent: false,
};

const formSchema = object({
  nom: string({ required_error: "Veuillez saisir votre nom" }),
  email: string({ required_error: "Votre adresse mail est requise" }).email(
    "Vauillez saisir une adresse mail valide"
  ),
  phoneNumber: string()
    .length(10, { message: "Veuillez saisir un numéro de téléphone valide" })
    .optional(),
  society: string().optional(),
  message: string({ required_error: "Votre demande est nécessaire pour nous" }),
  consent: boolean({
    required_error: "Veuillez accepter notre politique de confidentialité",
  }),
});

export default function ExpertiseForm({
  titre,
  image,
}: {
  titre: string;
  image: ImageType;
}) {
  return (
    <section className="expertise__form">
      <div className="container">
        <h2 className="expertise__form-title">{he.decode(titre)}</h2>
        <Formik
          initialValues={{
            nom: "",
            email: "",
            phoneNumber: "",
            society: "",
            message: "",
            consent: false,
          }}
          validationSchema={toFormikValidationSchema(formSchema)}
          onSubmit={(values) => console.log(values)}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="yellow-form">
                <div className="txt">
                  <p>{he.decode("Et si nous allions plus loin ?")}</p>
                  <p>
                    {he.decode(
                      "Vous souhaitez en découvrir plus sur notre agence ou tout simplement débuter votre projet avec nous ?"
                    )}
                  </p>
                </div>
                <label htmlFor="nom">
                  <span>Votre prénom et nom *</span>
                  <Field
                    id="nom"
                    name="nom"
                    className={errors.nom && touched.nom ? "error-field" : ""}
                  />
                  <ErrorMessage name="nom" component="div" className="error" />
                </label>
                <label htmlFor="email">
                  <span>Votre email *</span>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className={
                      errors.email && touched.email ? "error-field" : ""
                    }
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </label>
                <label htmlFor="phoneNumber">
                  <span>Votre numéro de téléphone</span>
                  <Field
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    className={
                      errors.phoneNumber && touched.phoneNumber
                        ? "error-field"
                        : ""
                    }
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="error"
                  />
                </label>
                <label htmlFor="societe">
                  <span>Votre société</span>
                  <Field
                    name="societe"
                    id="societe"
                    className={
                      errors.society && touched.society ? "error-field" : ""
                    }
                  />
                  <ErrorMessage
                    name="societe"
                    component="div"
                    className="error"
                  />
                </label>
                <label htmlFor="message" style={{ marginBottom: 0 }}>
                  <span>Votre demande *</span>
                  <Field
                    as="textarea"
                    name="message"
                    id="message"
                    className={
                      errors.message && touched.message ? "error-field" : ""
                    }
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="error"
                  />
                </label>
                <label
                  htmlFor="consent"
                  className="consent"
                  style={{
                    flexDirection: "row",
                    alignItems: "start",
                    gap: "1rem",
                    fontWeight: 300,
                    fontSize: "1.4rem",
                    lineHeight: 1.3,
                    marginBottom: 0,
                  }}
                >
                  <Field
                    type="checkbox"
                    name="consent"
                    id="consent"
                    style={{ width: "fit-content", marginBlock: "0" }}
                    className={
                      errors.consent && touched.consent ? "error-field" : ""
                    }
                  />
                  <span>
                    {he.decode(
                      "En cochant cette case, j'affirme avoir pris connaissance de la politique de confidentialisé de btg communication"
                    )}
                  </span>
                </label>
              </div>
              <button type="submit">
                Envoyer
                <svg
                  className="arrow"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  x="0px"
                  y="0px"
                >
                  <g data-name="Layer 2">
                    <polygon points="44.13 72.13 58 86 94.25 50 57.87 13.13 44 27 57.51 41 6 41 6 59 57.51 59 44.13 72.13"></polygon>
                  </g>
                </svg>
              </button>
            </Form>
          )}
        </Formik>
        <div className="expertise__form-left">
          <Image
            src={image.url}
            alt={image.alt}
            title={image.title}
            width={445}
            height={608}
          />
        </div>
      </div>
    </section>
  );
}
