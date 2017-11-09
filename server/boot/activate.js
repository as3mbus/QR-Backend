'use strict';

module.exports = function (server) {
  var router = server.loopback.Router()
  router.patch(
    "/activate/:codeid",
    function (req, res) {
      server.models.VoucherCode.findById(req.params.codeid, function (err, VoucherCode) {
        if (err) res.json(err);
        if(VoucherCode){
          VoucherCode.updateAttribute("activated",true,function (uerr, uVoucherCode){
            res.json(uVoucherCode);
          })
        }else {
          var error = new Error();
          error.message = 'Voucher Code not found.';
          error.statusCode = 404;
          res.json(error);
        }
      });
    }
  );
  router.get(
    "/active/:codeid",
    function (req, res) {
      server.models.VoucherCode.findById(req.params.codeid,
        function (err, vCode) {
          if (err) {
            console.log(err);
            res.json(err);
          } else {
            if (vCode) {
              res.json(vCode.activated);
            } else {
              var error = new Error();
              error.message = 'Voucher Code not found.';
              error.statusCode = 404;
              res.json(error);
            }
          }
        }
      );
    });
  server.use(router);
}
