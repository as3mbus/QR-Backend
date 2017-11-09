'use strict';

module.exports = function (server) {
  var router = server.loopback.Router()
  router.post(
    "/redeem/:codeid/:outletid",
    function (req, res) {
      server.models.OutletCode.findOne(
        {"where": {"code_id": req.params.codeid, "outlet_id": req.params.outletid}},
         function (err, OutletCode) {
        if (err) res.json(err);
        if(OutletCode){
          var error = new Error();
          error.message = 'Voucher Code already redeemed at '+OutletCode.used_date.toDateString();
          error.statusCode = 404;
          res.json(error);
        }else {
          server.models.OutletCode.create([{
            "code_id": req.params.codeid,
            "outlet_id": req.params.outletid,
          }], function (err, OutletCode) {
            if (err) throw err;
            res.json(OutletCode)
          });
          
        }
      });
      
    }
  );
  // router.get(
  //   "/active/:codeid",
  //   function (req, res) {
  //     server.models.VoucherCode.findById(req.params.codeid,
  //       function (err, vCode) {
  //         if (err) {
  //           console.log(err);
  //           res.json(err);
  //         } else {
  //           if (vCode) {
  //             res.json(vCode.activated);
  //           } else {
  //             var error = new Error();
  //             error.message = 'Voucher Code not found.';
  //             error.statusCode = 404;
  //             res.json(error);
  //           }
  //         }
  //       }
  //     );
  //   });
  server.use(router);
}
