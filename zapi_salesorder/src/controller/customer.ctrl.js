var customerRepo= require('../respository/customer.repo.js');
var orderRepo= require('../respository/order.repo.js');
var custRepo = require("../respository/address.repo.js")
var sResp = "";

async function get(req,res){
    
    try{
        var oFilter = {
            first_name: req.query.first_name?req.query.first_name:"",
            gender: req.query.gender?req.query.gender:"",
            is_active: req.query.is_active?req.query.is_active:""
        }
        var sResult = await customerRepo.getCustomer(oFilter);
        sResp = {status:sResult.length>0?200:404,"message":sResult.length>0?"OK":"No Data found",data:sResult};
        // sResp=sResult;
    }catch(err){
    sResp = {status:500,message:"Something went wrong.",error:err.message};
   }finally{
    res.send(sResp);
   }
};

// ============Only Customer Details==================================
async function getById(req,res){
    // console.log(req.params.id);
    var sResult = await customerRepo.getCustomerById(req.params.id)
    var sResp = {status:sResult.length>0?200:404,"message":sResult.length>0?"OK":"No Data found",data:sResult};
    res.send(sResp);
};
// ============Only Customer Details==================================


// ============Customer Details with Address and Order==================================

async function getAllDetailsByCustID(req,res){
    try{
        var sResult = await customerRepo.getCustomerById(req.params.id);
        console.log("Kapil")
        console.log(sResult);
        if(sResult.length > 0 ){
            sResult[0].orders = await orderRepo.getOrderByCustId(req.params.id);
            sResult[0].address = await custRepo.getAddByCustId(req.params.id);
        }
        sResp = {status:sResult.length > 0 ?200:404,"message":sResult.length > 0 ?"OK":"No Data found",data:sResult};
        
    }catch(err){
        sResp = {status:500,message:"Something went wrong.",error:err.message};
    }finally{
        res.send(sResp);
    }
}
// ============Customer Details with Order==================================


async function post(req,res){
   try{
    req.body.created_by= "system";
    req.body.created_at =new Date();
    req.body.updated_by ="system";
    req.body.updated_at =new Date();
    var sResult = await customerRepo.createCustomer(req.body);
    sResp = {status:sResult.affectedRows == 1 ?201:405,"message":sResult.affectedRows ==1 ?"Created successfully.":"No Data found",data:sResult};
     
   }catch(err){
    sResp = {status:500,message:"Something went wrong.",error:err.message};
   }finally{
    res.send(sResp);
   };
};

async function put(req,res){
   try{
    req.body.updated_by ="system";
    req.body.updated_at =new Date();
    var sResult = await customerRepo.updateCustomer(req.body);
    sResp = {"status":sResult.affectedRows >0 ? 200: 405,"message":sResult.affectedRows > 0 ?"Update successfully.":"No Data found", data:sResult};
     
   }catch(err){
    sResp = {status:500,message:"Something went wrong.",error:err.message};
   }finally{
    res.send(sResp);
   }
};

async function updateActToInact(req,res){
    try{
     var sResult = await customerRepo.activetoInactiveCustomer(req.params.id);
     sResp = {"status":sResult.affectedRows >0 ? 200: 405,"message":sResult.affectedRows > 0 ?"Update successfully.":"No Data found", data:sResult};
      
    }catch(err){
     sResp = {status:500,message:"Something went wrong.",error:err.message};
    }finally{
     res.send(sResp);
    }
 };

 async function updateInactToAct(req,res){
    try{
     var sResult = await customerRepo.inactiveToActiveCustomer(req.params.id);
     sResp = {"status":sResult.affectedRows >0 ? 200: 405,"message":sResult.affectedRows > 0 ?"Update successfully.":"No Data found", data:sResult};
      
    }catch(err){
     sResp = {status:500,message:"Something went wrong.",error:err.message};
    }finally{
     res.send(sResp);
    }
 };


async function del(req,res){
   try{
    console.log(req.params.id)
    var sResult = await customerRepo.deleteCustomer(req.params.id);
   
    sResp = {status:sResult.affectedRows >= 1 ?200:405,"message":sResult.affectedRows > 0 ?"Deleted successfully.":"No Data found",data:sResult};
     
   }catch(err){
    sResp = {status:500,message:"Something went wrong.",error:err.message};
   }finally{
    res.send(sResp);
   }
}


module.exports = {
    get,
    getById,
    post,
    put,
    updateActToInact,
    updateInactToAct,
    del,
    getAllDetailsByCustID
}