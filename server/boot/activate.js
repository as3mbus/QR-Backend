'use strict'

module.exports = function (app) {
  var router = app.loopback.Router()
  router.patch(
    "/activate/:codeid",
    app.models.VoucherCode.activate
  );
  router.get(
    "/active/:codeid",
    app.models.VoucherCode.isActive
    );
  app.use(router);
}
