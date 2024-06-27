var orderRepo= require('../respository/order.repo.js');
var {currentDate} = require('../util/db');

var sResp = "";

async function get(req,res){
    
    try{
      var oFilter = {
         customer_id : req.query.customer_id?req.query.customer_id:"",
         customer_name : req.query.customer_name?req.query.customer_name:""
      };
        var sResult = await orderRepo.getOrder(oFilter);
        sResp = {status:sResult.length>0?200:404,"message":sResult.length>0?"OK":"No Data found",data:sResult};
    }catch(err){
    sResp = {status:500,message:"Something went wrong.",error:err.message};
   }finally{
    res.send(sResp);
   }
};

// async function getByCustId(req,res){
//     // console.log(req.params.custId);
//     var sResult = await orderRepo.getOrderByCustId(req.params.custId)
//     var sResp = {status:sResult.length>0?200:404,"message":sResult.length>0?"OK":"No Data found",data:sResult};
//     res.send(sResp);
// }

async function getById(req,res){
   // console.log(req.params.custId);
   try{
   var sResult = await orderRepo.getOrderById(req.params.order_no)
   var sResp = {status:sResult.length>0?200:404,"message":sResult.length>0?"OK":"No Data found",data:sResult};
}catch(err){
   sResp = {status:500,message:"Something went wrong.",error:err.message};
  }finally{
   res.send(sResp);
  }
}

async function post(req,res){
   try{
      req.body.created_by= "system";
      req.body.created_at =currentDate();
      req.body.updated_by ="system";
      req.body.updated_at =currentDate();
    var sResult = await orderRepo.createOrder(req.body);
    sResp = {status:sResult == 1 ?201:405,"message":sResult ==1 ?"Created successfully.":"No Data found",data:sResult};
     
   }catch(err){
    sResp = {status:500,message:"Something went wrong.",error:err.message};
   }finally{
    res.send(sResp);
   };
};

async function put(req,res){
   try{
      req.body.updated_by ="system";
      req.body.updated_at =currentDate();
    var sResult = await orderRepo.updateOrder(req.body);
    sResp = {status:sResult.affectedRows >0 ? 200: 405,"message":sResult.affectedRows > 0 ?"Update successfully.":"No Data found", data:sResult};
     
   }catch(err){
    sResp = {status:500,message:"Something went wrong.",error:err.message};
   }finally{
    res.send(sResp);
   }
};

async function orderStatusCtrl(req,res){
   try{
   req.body.updated_by ="system";
   req.body.updated_at =currentDate();
   //  console.log(req.body)
    var sResult = await orderRepo.orderStatus(req.body);
    sResp = {status:sResult > 0 ?200:405,"message":sResult > 0 ?"Order status upated successfully.":"No Data found",data:sResult};
     
   }catch(err){
    sResp = {status:500,message:"Something went wrong.",error:err.message};
   }finally{
    res.send(sResp);
   }
};

async function del(req,res){
   try{
    console.log(req.params.id)
    var sResult = await orderRepo.deleteOrder(req.params.id);
    sResp = {status:sResult.affectedRows >= 1 ?200:405,"message":sResult.affectedRows > 0 ?"Deleted successfully.":"No Data found",data:sResult};
     
   }catch(err){
    sResp = {status:500,message:"Something went wrong.",error:err.message};
   }finally{
    res.send(sResp);
   }
}

module.exports = {
    get,
   //  getByCustId,
    getById,
    post,
    put,
    del,
    orderStatusCtrl
}