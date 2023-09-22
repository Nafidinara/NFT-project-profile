const customHelper = require('../helpers/custom.helper');

const index = customHelper.catchAsync(async (req, res, next) => {
  res.render('pages/farming/index', {});
});

module.exports = {
  index,
};
