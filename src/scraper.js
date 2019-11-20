import puppeteer from 'puppeteer';
import urlParse from 'url-parse';
import { map, includes } from 'lodash';

import sites, { scrape as defaultScrape } from './sites';

const failure = async (browser) => {
  await browser.close();
  return null;
};

const blockedResourceTypes = [
  'image',
  'media',
  'font',
  'texttrack',
  'object',
  'beacon',
  'csp_report',
  'imageset',
];

const skippedResources = [
  'quantserve',
  'adzerk',
  'doubleclick',
  'adition',
  'exelator',
  'sharethrough',
  'cdn.api.twitter',
  'google-analytics',
  'googletagmanager',
  'google',
  'fontawesome',
  'facebook',
  'analytics',
  'optimizely',
  'clicktale',
  'mixpanel',
  'zedo',
  'clicksor',
  'tiqcdn',
];

export const scrape = async (url, site) => {
  const browser = await puppeteer.launch({
    headless: true,
    ignoreDefaultArgs: ['--disable-extensions'],
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--window-size=1024x768',
    ]
  });

  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', request => {
    const requestUrl = request._url.split('?')[0].split('#')[0];
    if (
      blockedResourceTypes.indexOf(request.resourceType()) !== -1 ||
      skippedResources.some(resource => requestUrl.indexOf(resource) !== -1)
    ) {
      request.abort();
    } else {
      request.continue();
    }
  });

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
