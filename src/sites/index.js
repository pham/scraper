import { headerInfo } from '../helpers';

export const scrape = async page => {
  return await headerInfo(page);
};

import * as alibaba from "./alibaba";
import * as amazon from "./amazon";
import * as ebay from "./ebay";
import * as newegg from "./newegg";
import * as target from "./target";
import * as walmart from "./walmart";

export default {
  alibaba,
  amazon,
  ebay,
  newegg,
  target,
  walmart
};
