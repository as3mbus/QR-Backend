'use strict';

module.exports = function (OutletCode) {
  OutletCode.redeemRequest = function (req, res) {
    OutletCode.findOne({
        "where": {
          "code_id": req.params.codeid,
          "outlet_id": req.params.outletid
        }
      },
      function (err, fOutletCode) {
        if (err) res.json(err);
        if (fOutletCode) {
          var error = new Error();
          error.message = 'Voucher Code already redeemed at ' + fOutletCode.used_date.toDateString();
          error.statusCode = 404;
          res.json(error);
        } else {
          OutletCode.create([{
            "code_id": req.params.codeid,
            "outlet_id": req.params.outletid,
          }], function (err, OutletCode) {
            if (err) res.json(err);
            res.json(OutletCode)
          });
        }
      }
    );
  };
  OutletCode.redeem = function (codeid, outletid) {
    if (OutletCode.isRedeemed(codeid, outletid)) {
      return
    } else {
      server.models.OutletCode.create([{
        "code_id": req.params.codeid,
        "outlet_id": req.params.outletid,
      }], function (err, OutletCode) {
        if (err) throw err;
        res.json(OutletCode)
      });
    }
  };
  OutletCode.isRedeemed = function (codeid, outletid) {
    OutletCode.findOne({
        "where": {
          "code_id": codeid,
          "outlet_id": outletid
        }
      },
      function (err, OutletCode) {
        if (err) return true;
        if (OutletCode) return true;
        else return false;
      }
    )
  }
};
