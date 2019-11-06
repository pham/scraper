import { headerInfo, getText } from '../helpers';

export const name = 'alibaba';
export const hosts = ['www.alibaba.com'];
export const scrape = async page => {
  const info = await headerInfo(page);
  info.price = await getText('#ladderPrice .priceVal', page);

  return info;
};
