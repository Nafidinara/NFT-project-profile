const customHelper = require('../helpers/custom.helper');
const memory = require('../backend/memory');

function success(res, a) {
  return res.status(200).json({ success: true, data: a });
}
function failed(res, a) {
  return res.status(200).json({ success: false, msg: a });
}

const index = customHelper.catchAsync(async (req, res, next) => {
  res.render('pages/collections/index', {});
});

const get_apr = customHelper.catchAsync(async (req, res, next) => {
  let data = { a: 'a' };
  let msg = '';
  // msg="test error";

  data = memory.apr;

  if (msg == '') {
    return success(res, data);
  }

  return failed(res, msg);
});

module.exports = {
  index,
  get_apr,
};
