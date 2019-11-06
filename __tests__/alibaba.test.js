const Scraper = require('../lib');
const yup = require('yup');

test(
  'adding',
  async () => {
    const schema = yup.object().shape({
      title: yup.string().required(),
      price: yup.string().required(),
      image: yup.string().required(),
      description: yup.string().required()
    });

    const data = await Scraper.scrapeAndDetect(
      'https://www.alibaba.com/product-detail/Custom-keyboard-60-Keyboard-GH60-GK64_60839942771.html'
    );

    await schema.isValid(data).then(result => {
      return expect(result).toBe(true);
    });
  },
  30000
);
