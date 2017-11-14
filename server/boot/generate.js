'use strict'

module.exports = function (app) {
  var router = app.loopback.Router()
  router.post(
    "/generate",
    function (req, res) {
      app.models.VoucherCode.generateCode(req.body.outletId, req.body.expireDate, res);
    }
  );
  app.use(router);
}
