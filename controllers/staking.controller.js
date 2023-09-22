const customHelper = require('../helpers/custom.helper');

const index = customHelper.catchAsync(async (req, res, next) => {
  res.render('pages/staking/index', {});
});

module.exports = {
  index,
};
