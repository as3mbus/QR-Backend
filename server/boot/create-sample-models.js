module.exports = function (app) {
  app.dataSources.mysql.automigrate('VoucherCode', function (err) {
    if (err) throw err;
    
    app.models.VoucherCode.create([{
      "code-id": "abc111",
      "outlet-origin": 1,
      "activated": false,
      "expiry-date": "2017-11-07T05:04:08.929Z"
    }, {
      "code-id": "abc121",
      "outlet-origin": 2,
      "activated": false,
      "expiry-date": "2017-11-07T05:04:08.929Z"
    }, {
      "code-id": "abc123",
      "outlet-origin": 1,
      "activated": false,
      "expiry-date": "2017-11-07T05:04:08.929Z"
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
      "code-id": "abc123",
      "outlet-id": "1",
    }, {
      "code-id": "abc123",
      "outlet-id": "2",
    }, {
      "code-id": "abc123",
      "outlet-id": "3",
    }, ], function (err, OutletCode) {
      if (err) throw err;

      console.log('Models created: \n', OutletCode);
    });
  });
};
