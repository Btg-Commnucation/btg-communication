import Map from './Map';
import axios from 'axios';
import https from 'https';
import { use } from 'react';
import Rs from '../header/Rs';
import { OptionsType } from '@/middleware/Header';
import Link from 'next/link';

const URL_API = process.env.URL_API;

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const getOptions = async (): Promise<OptionsType | undefined> => {
  try {
    const response = await axios<OptionsType, any>(
      `${URL_API}/better-rest-endpoints/v1/options/acf`,
      { httpsAgent: agent },
    );
    return response;
  } catch (e) {
    console.log(`Footer getting options error : ${e}`);
  }
};

export default function Footer() {
  const options = use(getOptions());

  return (
    <footer>
      <Map />
      <section className="informations">
        <div className="left">
          <strong>
            <span>© BTG Communication</span>
            <span> - </span>
            <span>
              agence de communication visuelle à Tours (37) et Vannes (56)
            </span>
            <span> - </span>
            <Link href="/mentions-legales">Mentions légales</Link>
          </strong>
        </div>
        <Rs rsOptions={options!.data} showContact={true} />
      </section>
    </footer>
  );
}
