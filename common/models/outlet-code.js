'use strict';

module.exports = function (OutletCode) {
  var app = require('../../server/server');
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

  OutletCode.isRedeemed = function (codeid, outletid, callback) {
    let VoucherCode = app.models.VoucherCode;
    VoucherCode.isActive(codeid, (result, fCode) => {
      switch (result) {
        case true:
          OutletCode.findOne({
              "where": {
                "code_id": codeid,
                "outlet_id": outletid
              }
            },
            function (err, OutletCode) {
              if (err) callback(5);
              else {
                if (OutletCode) callback(true, OutletCode);
                else callback(false, fCode);
              }
            }
          );
          break;
        case false:
          callback(2, fCode);
          break;
        case 4:
          callback(4);
          break;
        default:
          callback(5);
          break;
      }
    });

  }

  OutletCode.isRedeemedResponse = function (result, object, callback) {
    let apiMessage = {
      statusCode: 500,
      message: "",
      VoucherCode: null
    };

    switch (result) {
      case true:
        apiMessage["statusCode"] = 201;
        apiMessage["message"] = "Voucher Code has been redeemed at this outlet at " + object["used_date"];
        apiMessage["VoucherCode"] = object
        break;
      case false:
        apiMessage["statusCode"] = 200;
        apiMessage["message"] = "Voucher Code hasn't redeemed at this outlet yet";
        apiMessage["VoucherCode"] = object
        break;
      case 2:
        apiMessage["statusCode"] = 402;
        apiMessage["message"] = "Voucher Code hasn't activated yet";
        apiMessage["VoucherCode"] = object;
        break;
      case 4:
        apiMessage["statusCode"] = 404;
        apiMessage["message"] = "Voucher Code not found";
        break;
      default:
        apiMessage["statusCode"] = 500;
        apiMessage["message"] = "An unexpected error has occured";
        break;
    }
    callback(apiMessage)
  };

  OutletCode.isRedeemedRequest = function (codeid, outletid, res) {
    OutletCode.isRedeemed(codeid, outletid, function (result, fCode) {
      OutletCode.isRedeemedResponse(result, fCode, function (message) {
        res.json(message)
      })
    })
  }
};
