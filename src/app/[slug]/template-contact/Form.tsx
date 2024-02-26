'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import Image from 'next/image';
import z from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import he from 'he';
import axios from 'axios';
import { useState } from 'react';
import Link from 'next/link';

const URL_API = process.env.NEXT_PUBLIC_URL_API;
const FORM_ID = process.env.NEXT_PUBLIC_FORM_ID;

const formSchema = z.object({
  nom: z.string({ required_error: 'Veuillez saisir votre nom' }),
  email: z
    .string({ required_error: 'Votre adresse mail est requise' })
    .email('Veuillez saisir une adresse mail valide'),
  phoneNumber: z
    .string()
    .length(10, { message: 'Veuillez saisir un numéro de téléphone valide' })
    .optional(),
  society: z.string().optional(),
  message: z.string({
    required_error: 'Votre demande est nécessaire pour nous',
  }),
  consent: z.boolean({
    required_error: 'Veuillez accepter notre politique de confidentialité',
  }),
});

type TValues = z.infer<typeof formSchema>;

export default function FormContact() {
  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);
  const [returnMessage, setReturnMessage] = useState({
    title: '',
    message: '',
  });

  const handleSubmit = async (values: TValues) => {
    const api = `${URL_API}/contact-form-7/v1/contact-forms/${FORM_ID}/feedback`;

    const data = new FormData();
    data.set('nom', values.nom);
    values.society
      ? data.set('entreprise', values.society)
      : data.set('entreprise', '');
    data.set('email', values.email);
    values.phoneNumber
      ? data.set('telephone', values.phoneNumber)
      : data.set('telephone', '');
    data.set('message', values.message);
    data.set('consent', values.consent ? 'true' : 'false');
    data.set('_wpcf7_unit_tag', 'wpcf-b8f4944-o1');

    try {
      const response = await axios.post(api, data);
      console.log({ response });
      if (response.status === 200) {
        setIsSent(true);
        setReturnMessage({
          title: 'Merci pour votre message',
          message: 'Nous vous répondrons dans les plus brefs délais',
        });
      } else {
        setIsError(true);
        setReturnMessage({
          title: 'Oups, une erreur est survenu',
          message:
            'Veuillez réessayer plus tard, nous nous excusons de la gêne occasionnée',
        });
      }
    } catch (error) {
      setIsError(true);
      console.log(`error ${error}`);
      setReturnMessage({
        title: 'Oups, une erreur est survenu',
        message:
          'Veuillez réessayer plus tard, nous nous excusons de la gêne occasionnée',
      });
    }
  };

  return (
    <div className="form-container">
      <h3>Formulaire de contact</h3>
      <Image
        src="/wave-yellow.gif"
        alt="Vague jaune"
        width={188}
        height={36.27}
        className="wave"
      />
      <>
        {isError && (
          <div className="yellow-form">
            <h3 className="errorTitle">{returnMessage.title}</h3>
            <p className="errorMessage">{returnMessage.message}</p>
            <Link className="btn-primary errorBtn" href="/">
              Retourner à l'accueil
            </Link>
          </div>
        )}
        {isSent && (
          <div className="yellow-form">
            <h3>{returnMessage.title}</h3>
            <p>{returnMessage.message}</p>
          </div>
        )}
        {!isSent && !isError && (
          <Formik
            initialValues={{
              nom: '',
              email: '',
              phoneNumber: '',
              society: '',
              message: '',
              consent: false,
            }}
            validationSchema={toFormikValidationSchema(formSchema)}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="yellow-form">
                  <label htmlFor="nom">
                    <span>Votre prénom et nom *</span>
                    <Field
                      id="nom"
                      name="nom"
                      className={errors.nom && touched.nom ? 'error-field' : ''}
                    />
                    <ErrorMessage
                      name="nom"
                      component="div"
                      className="error"
                    />
                  </label>
                  <label htmlFor="email">
                    <span>Votre email *</span>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className={
                        errors.email && touched.email ? 'error-field' : ''
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
                          ? 'error-field'
                          : ''
                      }
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="error"
                    />
                  </label>
                  <label htmlFor="society">
                    <span>Votre société</span>
                    <Field
                      name="society"
                      id="society"
                      className={
                        errors.society && touched.society ? 'error-field' : ''
                      }
                    />
                    <ErrorMessage
                      name="society"
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
                        errors.message && touched.message ? 'error-field' : ''
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
                    style={{
                      flexDirection: 'row',
                      alignItems: 'start',
                      gap: '1rem',
                      fontWeight: 300,
                      fontSize: '1.4rem',
                      lineHeight: 1.3,
                      marginBottom: 0,
                    }}
                  >
                    <Field
                      type="checkbox"
                      name="consent"
                      id="consent"
                      style={{ width: 'fit-content', marginBlock: '0' }}
                      className={
                        errors.consent && touched.consent ? 'error-field' : ''
                      }
                    />
                    <span>
                      {he.decode(
                        "En cochant cette case, j'affirme avoir pris connaissance de la politique de confidentialité" +
                          ' de btg communication',
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
        )}
      </>
    </div>
  );
}
