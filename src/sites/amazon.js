import { headerInfo, getText, getSrc, getSrcs } from '../helpers';

export const name = 'amazon';
export const hosts = ['www.amazon.com', 'smile.amazon.com'];
export const scrape = async page => {
  const info = await headerInfo(page);

  const canonical = info.canonical;
  const title = await getText('#title', page)
            || info.title;
  const price = await getText('#priceblock_ourprice', page);
  const description = await getText('#productDescription p', page)
            || info.description
            || await getText('#feature-bullets .a-list-item', page)
            || await getText('#featurebullets_feature_div', page);
  const image = await getSrc('img.a-dynamic-image', page)
            || info.image;
  let images = await getSrcs('#altImages li.item img', page);
  images = images.map(e => e.replace(/\.[^\.]+\.jpg$/i, '.jpg'));

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

