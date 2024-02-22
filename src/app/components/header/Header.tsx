import { Cabin } from 'next/font/google';
import HeaderFront from './HeaderFront';
import axios from 'axios';
import { use } from 'react';
import https from 'https';
import ListNav from './ListNav';
import { MenuType, OptionsType } from '@/middleware/Header';

const cabin = Cabin({ subsets: ['latin'] });
const URL_API = process.env.URL_API;

const getOptions = async (): Promise<OptionsType | undefined> => {
  try {
    const response = await axios<OptionsType, any>(
      `${URL_API}/better-rest-endpoints/v1/options/acf`,
      { httpsAgent: agent },
    );
    return response;
  } catch (e) {
    console.log(`Header getting options error : ${e}`);
  }
};

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const getMenu = async (): Promise<MenuType | undefined> => {
  try {
    const response = await axios<MenuType, any>(
      `${URL_API}/better-rest-endpoints/v1/menus/principal`,
      { httpsAgent: agent },
    );
    return response;
  } catch (e) {
    console.log(`Header getting Menu error : ${e}`);
  }
};

export default function Header() {
  const menu = use(getMenu());
  const options = use(getOptions());

  return (
    <>
      <header className={cabin.className}>
        <div className="container">
          <HeaderFront />
        </div>
      </header>
      <div id="overlay-menu" className={cabin.className}>
        <div className="content">
          {menu && <ListNav menu={menu!.data} rsOptions={options!.data} />}
        </div>
      </div>
    </>
  );
}
