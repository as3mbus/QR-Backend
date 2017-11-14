'use strict';

module.exports = function (server) {
  var router = server.loopback.Router()
  router.post(
    "/redeem/:codeid/:outletid",
    server.models.OutletCode.redeemRequest
  );
  router.get(
    "/redeem/:codeid/:outletid",
    function(req, res){
      server.models.OutletCode.isRedeemedRequest(req.params.codeid, req.params.outletid, res)
    }
  )
  server.use(router);
}
