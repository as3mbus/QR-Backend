'use strict';

var randomBarcode = function (strln) {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ"
  var value = ''
  for (var i = 0; i < strln; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    value += chars.substring(rnum, rnum + 1);
  }
  return value
}

function findWithAttr(array, attr, value) {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}


module.exports = function (VoucherCode) {

  VoucherCode.generateCode = function (outletid, expiry, res) {
    let apiMessage = {
      statusCode: 500,
      message: "",
      voucherCode: null
    };
    let _barcode = randomBarcode(3)
    VoucherCode.find(null, function (err, voucherCodes) {
      while (findWithAttr(voucherCodes, "code_id", _barcode) != -1) {
        _barcode = randomBarcode(3)
      }
      let newCode = {
        code_id: _barcode,
        "outlet-origin": outletid,
        "activated": false,
        "expiry_date": expiry
      }
      VoucherCode.create(newCode, function (err, generatedCode) {
        if (err) {
          apiMessage["statusCode"] = 500;
          apiMessage["message"] = "An unexpected error has occured";
        } else {
          apiMessage["statusCode"] = 200;
          apiMessage["message"] = "Code " + generatedCode["code_id"] + " generated successfully";
          apiMessage["voucherCode"] = generatedCode;
        }
        res.json(apiMessage);
      })
    })
  }

  VoucherCode.isActive = function (codeid, callback) {
    VoucherCode.findById(codeid,
      function (err, fCode) {
        if (err) {
          console.log(err);
          callback(5)
        } else {
          if (fCode) {
            callback(fCode.activated, fCode)
          } else {
            callback(4)
          }
        }
      }
    );
  };

  VoucherCode.activate = function (codeid, callback) {
    VoucherCode.isActive(codeid, (result, fCode) => {
      switch (result) {
        case true:
          callback(false, fCode)
          break;
        case false:
          fCode.updateAttribute("activated", true, function (uerr, uVoucherCode) {
            if (uerr) {
              callback(5, fCode)
            } else {
              callback(true, uVoucherCode)
            }
          });
          break;
        case 4:
          callback(4);
          break;
        default:
          callback(5);
          break;
      }
    });
  };

  VoucherCode.activateResponse = function (result, object, callback) {
    let apiMessage = {
      statusCode: 500,
      message: "",
      VoucherCode: null
    };

    switch (result) {
      case true:
        apiMessage["statusCode"] = 201;
        apiMessage["message"] = "Voucher Code has been activated";
        apiMessage["VoucherCode"] = object

        break;
      case false:
        apiMessage["statusCode"] = 200;
        apiMessage["message"] = "Voucher Code already active";
        apiMessage["VoucherCode"] = object
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


  VoucherCode.isActiveRemote = function (codeid, callback) {
    VoucherCode.isActive(codeid, function (resultCode, vCode) {
      callback(null, resultCode, vCode);
    })
  };

  VoucherCode.activateRemote = function (codeid, callback) {
    VoucherCode.activate(codeid, function (resultCode, VoucherCode) {
      callback(null, resultCode, VoucherCode);
    })
  };


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
      returns: [{
          arg: 'resultCode',
          type: 'string'
        },
        {
          arg: 'voucherCode',
          type: 'object'
        }
      ]
    }
  );

  VoucherCode.remoteMethod(
    'activateRemote', {
      accepts: [{
        arg: 'id',
        type: 'string',
        required: true
      }],
      http: {
        path: '/activate',
        verb: 'patch'
      },
      returns: [{
        arg: 'resultCode',
        type: 'number'
      }, {
        arg: 'voucherCode',
        type: 'object'
      }]
    }
  );


  VoucherCode.activateRequest = function (codeid, res) {
    VoucherCode.activate(codeid, (result, vCode) => {
      VoucherCode.activateResponse(result, vCode, function (message) {
        res.json(message);
      });
    })
  };


  VoucherCode.isActiveRequest = function (codeid, res) {
    let apiMessage = {
      statusCode: 500,
      message: "",
      VoucherCode: null
    };
    VoucherCode.isActive(codeid, function (result) {
      switch (result) {
        case true:
          apiMessage["statusCode"] = 201;
          apiMessage["message"] = "Voucher Code " + codeid + " is active";
          apiMessage["VoucherCode"] = object;
          break;
        case false:
          apiMessage["statusCode"] = 200;
          apiMessage["message"] = "Voucher Code " + codeid + " have not activated please contact the voucher distirbutor";
          apiMessage["VoucherCode"] = object
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
      res.json(apiMessage);
    });
  };

};
