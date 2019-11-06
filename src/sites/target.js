import { headerInfo, getText, getSrc, getSrcs } from '../helpers';

export const name = 'target';
export const hosts = ['www.target.com'];
export const scrape = async page => {
  const info = await headerInfo(page);
  const json = await getText('script[type="application/ld+json"]', page);
  const meta = json ? JSON.parse(json)['@graph'][0] : {};
  const canonical = info.canonical;
  const title = meta.name
            || info.title
            || await getText('h1 > span', page);
  const price = await getText('div[data-test="product-price"]', page)
            || meta.offers.price;
  const image = meta.image
            || info.image
            || await getSrc('div[data-test="product-image"] img', page);
  const description = meta.description
            || info.description
            || await getText('#specAndDescript > div > div:nth-child(2)', page);
  const images = await getSrcs('.carouselLegendGrid img', page);

  const data = {
    canonical,
    title,
    price,
    image,
    images,
    description
  };

  return data;
};
