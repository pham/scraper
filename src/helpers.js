import striptags from 'striptags';
import Promise from 'bluebird';

export const stripAndTrim = val => {
  return striptags(val).trim().replace(/[\t\n ]+/g, ' ').replace(/\s+/g, ' ');
};

export const lookupFailure = () => {
  return null;
};

export const getText = async (selector, page) => {
  const data = await page
    .$eval(selector, e => e.innerHTML)
    .catch(lookupFailure);

  return stripAndTrim(data);
};

export const getContent = async (selector, page) => {
  const data = await page
    .$eval(selector, e => e.content)
    .catch(lookupFailure);

  return stripAndTrim(data);
};


export const getSrc = async (selector, page, wait = false) => {
  if (wait) {
    await page
      .waitForSelector(selector, { visible: true, timeout: 7500 })
      .catch(lookupFailure);
  }
  return await page.$eval(selector, e => e.src).catch(lookupFailure);
};

export const getSrcs = async(selector, page, alternate = null) => {
  const data = await page
    .$$eval(selector, img => img.map(e => e.src))
    .catch([]);

  if (!data.length && alternate) {
    const alt = await getSrc(alternate, page);
    if (alt) {
      data.push(alt);
    }
  }
  return data;
};

export const getHref = async (selector, page) => {
  return await page.$eval(selector, e => e.href).catch(lookupFailure);
};

export const headerInfo = async page => {
  return {
    canonical: await getHref('link[rel="canonical"]', page)
        || await getContent('meta[property="og:url"]', page),
    title: await getContent('meta[property="og:title"]', page)
        || await getContent('meta[name="description"]', page)
        || await page.title(),
    image: await getContent('meta[property="og:image"]', page),
    description: await getContent('meta[name="description"]', page)
        || await getContent('meta[property="og:description"]', page),
    price: null,
    images: []
  };
};
