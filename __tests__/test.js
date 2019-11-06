const Scraper = require('../lib');
const yup = require('yup');

const urls = [
  'https://www.ebay.com/itm/Nomos-Tangente-Datum-Gangreserve-Mens-Watch-131/183888084023',
  'https://www.amazon.com/Bose-Cancelling-Wireless-Bluetooth-Headphones/dp/B07Q9MJKBV/ref=sr_1_2_sspa',
  'https://www.target.com/p/sony-wh1000xm3-b-headphones/-/A-75574683',
  'https://www.walmart.com/ip/Apple-AirPods-with-Charging-Case-Latest-Model/604342441',
  'https://www.alibaba.com/product-detail/Custom-keyboard-60-Keyboard-GH60-GK64_60839942771.html',
  'https://www.newegg.com/p/32N-00EB-00006',
  'https://www.overstock.com/Home-Garden/Pure-Garden-52-inch-Giant-Agave-Floor-Plant/11765296/product.html'
];

urls.forEach( site =>
  test(site, async () => {
    const schema = yup.object().shape({
      title: yup.string().required(),
      price: yup.string().required(),
      image: yup.string().required(),
      description: yup.string().required()
    });
    const data = await Scraper.scrapeAndDetect(site);
    await schema.isValid(data).then(result => {
      return expect(result).toBe(true);
    });
  }, 30000)
);
