import { headerInfo, getText, getSrc, getSrcs } from '../helpers';

export const name = 'walmart';
export const hosts = ['www.walmart.com'];
export const scrape = async page => {
  const info = await headerInfo(page);
  const canonical = info.canonical;
  const title = await getText('.prod-ProductTitle', page)
            || info.title;
  const price = await getText('.price .visuallyhidden', page);
  const image = info.image
            || await getSrc('.slider .slider-list img', page);
  const description = await getText('.about-desc', page)
            || info.description;
  let images = await getSrcs('.slider .slider-list .slider-slide img[itemprop="image"]', page);
  images = images.map(e => e.replace(/\.jpeg\?[^?]*$/i, '.jpeg'));

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
