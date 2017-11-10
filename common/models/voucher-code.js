'use strict';

module.exports = function (VoucherCode) {
  VoucherCode.isActive = function (codeid, callback) {
    VoucherCode.findById(codeid,
      function (err, fCode) {
        if (err) {
          console.log(err);
          callback(5)
        } else {
          if (fCode) {
            callback(fCode.activated,fCode)
          } else {
            callback(4)
          }
        }
      }
    );
  };
  VoucherCode.isActiveRemote = function(codeid,callback){
    VoucherCode.isActive(codeid,function(resul){
      callback(null,resul);
    })
  }
  VoucherCode.remoteMethod(
    'isActiveRemote', {
      accepts: [{
        arg: 'id',
        type: 'string',
        required: true,
        http: {
          source: 'path'
        }
      }],
      http: {
        path: '/:id/active',
        verb: 'get'
      },
      returns: {
        arg: 'active',
        type: 'string'
      }
    }
  );
  VoucherCode.activateRequest = function (codeid, res) {
    let apiMessage = {};
    VoucherCode.isActive(codeid, function (result,fCode) {
      switch (result) {
        case true:
          apiMessage["statusCode"] = "201";
          apiMessage["message"] = "Voucher Code " + codeid + " already active";
          break;
        case false:
          fCode.updateAttribute("activated", true, function (uerr, uVoucherCode) {})
          apiMessage["statusCode"] = "200";
          apiMessage["message"] = "Voucher Code " + codeid + " has been activated";
          break;
        case 4:
          apiMessage["statusCode"] = "404";
          apiMessage["message"] = "Voucher Code not found";
          break;
        default:
          apiMessage["statusCode"] = "500";
          apiMessage["message"] = "An unexpected error has occured";
          break;
      }
      res.json(apiMessage);
    });

  };
  VoucherCode.isActiveRequest = function (codeid, res) {
    let apiMessage = {};
    VoucherCode.isActive(codeid, function (result) {
      switch (result) {
        case true:
          apiMessage["statusCode"] = "201";
          apiMessage["message"] = "Voucher Code " + codeid + " is active";
          break;
        case false:
          apiMessage["statusCode"] = "200";
          apiMessage["message"] = "Voucher Code " + codeid + " have not activated please contact the voucher distirbutor";

          break;
        case 4:
          apiMessage["statusCode"] = "404";
          apiMessage["message"] = "Voucher Code not found";
          break;
        default:
          apiMessage["statusCode"] = "500";
          apiMessage["message"] = "An unexpected error has occured";
          break;
      }
      res.json(apiMessage);
    });
  };
};
