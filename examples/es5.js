const Scraper = require('../lib');

(async () => {
  const amazon = await Scraper.scrapeAndDetect(
    'https://smile.amazon.com/Bose-Cancelling-Wireless-Bluetooth-Headphones/dp/B07Q9MJKBV/ref=sr_1_2_sspa'
  );

  const ebay = await Scraper.scrapeAndDetect(
    'https://www.ebay.com/itm/Nomos-Tangente-Datum-Gangreserve-Mens-Watch-131/183888084023'
  );

  const target = await Scraper.scrapeAndDetect(
    'https://www.target.com/p/sony-wh1000xm3-b-headphones/-/A-75574683'
  );

  const walmart = await Scraper.scrapeAndDetect(
    'https://www.walmart.com/ip/Apple-AirPods-with-Charging-Case-Latest-Model/604342441'
  );

  console.log({
    amazon,
    ebay,
    target,
    walmart
  });
})();
