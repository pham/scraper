import puppeteer from 'puppeteer';
import urlParse from 'url-parse';
import { map, includes } from 'lodash';

import sites, { scrape as defaultScrape } from './sites';

const failure = async (browser) => {
  await browser.close();
  return null;
};

export const scrape = async (url, site) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  try {
    // networkidle0/2 load domcontentloaded
    await page.goto(url, { waitUntil: 'networkidle2' });
  } catch (e) {
    return failure(browser);
  };

  let data;
  try {
    data = site ? await site.scrape(page) : await defaultScrape(page);
  } catch (e) {
    console.log(e);
    return failure(browser);
  };

  await browser.close();
  return data;
};

export const detectSite = async url => {
  url = new urlParse(url);
  const sitesArr = map(sites, site => {
    return site;
  });

  let site;
  for (let i = 0; i < sitesArr.length; i++) {
    if (includes(sitesArr[i].hosts, url.host)) {
      site = sitesArr[i];
    }
  }

  return site;
};

export default async url => {
  const site = await detectSite(url);
  return site ? await scrape(url, site) : await scrape(url);
};
