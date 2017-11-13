'use strict'

module.exports = function (app) {
    var router = app.loopback.Router()
    router.post(
      "/generate",
      function (req, res) {
        app.models.VoucherCode.generateCode(1, "2017-11-13T10:52:22.906Z", res);
      }
    );

  app.use(router);
}