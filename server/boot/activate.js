'use strict'

module.exports = function (app) {
  var router = app.loopback.Router()
  router.patch(
    "/activate",
    function (req, res) {
      app.models.VoucherCode.activateRequest(req.body.codeid, res);
    }
  );
  router.get(
    "/active/:codeid",
    function (req, res) {
      app.models.VoucherCode.isActiveRequest(req.params.codeid, res);
    }
  );
  app.use(router);
}
