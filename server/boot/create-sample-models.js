module.exports = function (app) {
  app.dataSources.mysql.automigrate('VoucherCode', function (err) {
    if (err) throw err;
    
    app.models.VoucherCode.create([{
      "code_id": "abc111",
      "outlet-origin": 1,
      "activated": false,
      "expiry_date": "2017-11-07T05:04:08.929Z"
    }, {
      "code_id": "abc121",
      "outlet-origin": 2,
      "activated": false,
      "expiry_date": "2017-11-07T05:04:08.929Z"
    }, {
      "code_id": "abc123",
      "outlet-origin": 1,
      "activated": false,
      "expiry_date": "2017-11-07T05:04:08.929Z"
    }, ], function (err, VoucherCode) {
      if (err) throw err;

      console.log('Models created: \n', VoucherCode);
    });
  });
  app.dataSources.mysql.automigrate('Outlet', function (err) {
    if (err) throw err;

    app.models.Outlet.create([{
      "name": "cekoceko",
      "promo": "makan gratis"
    }, {
      "name": "nekoneko",
      "promo": "minum hratis"
    }, {
      "name": "tekoteko",
      "promo": "tidur gratis"
    }, ], function (err, Outlet) {
      if (err) throw err;

      console.log('Models created: \n', Outlet);
    });
  });
  app.dataSources.mysql.automigrate('OutletCode', function (err) {
    if (err) throw err;

    app.models.OutletCode.create([{
      "code_id": "abc123",
      "outlet_id": "1",
    }, {
      "code_id": "abc123",
      "outlet_id": "2",
    }, {
      "code_id": "abc123",
      "outlet_id": "3",
    }, ], function (err, OutletCode) {
      if (err) throw err;

      console.log('Models created: \n', OutletCode);
    });
  });
};
