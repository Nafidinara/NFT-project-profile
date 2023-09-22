const customHelper = require('../helpers/custom.helper');

const index = customHelper.catchAsync(async (req, res, next) => {
  res.render('pages/collections/index', {});
});

const show = customHelper.catchAsync(async (req, res, next) => {
  res.render('pages/collections/show', { nft: req.params.id });
});

module.exports = {
  index,
  show,
};
