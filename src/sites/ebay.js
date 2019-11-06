import { headerInfo, getText, getSrcs } from '../helpers';

export const name = 'ebay';
export const hosts = ['www.ebay.com'];
export const scrape = async page => {
  const info = await headerInfo(page);

  const canonical = info.canonical;
  const title = info.title
            || await getText('#itemTitle', page);
  const price = await getText('#prcIsum', page);
  const description = info.description
            || await getText('p.main-description-paragraph', page);
  const image = info.image;
  let images = await getSrcs('#vi_main_img_fs li img', page);
  images = images.map(e => e.replace(/l\d+\.jpg$/i, 'l500.jpg'));

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
