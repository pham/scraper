import { headerInfo, getText } from '../helpers';

export const name = 'newegg';
export const hosts = ['www.newegg.com'];
export const scrape = async page => {
  const info = await headerInfo(page);
  const json = await getText('#fullInfo script[type="application/ld+json"]', page);
  const meta = json ? JSON.parse(json)['offers'] : {};
  info.price = meta.price;
  return info;
};
