const customHelper = require('../helpers/custom.helper');

const index = customHelper.catchAsync(async (req, res, next) => {
  res.render('pages/vip/index', {});
});

module.exports = {
  index,
};
