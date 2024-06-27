var addRepo= require('../respository/address.repo.js');
var {currentDate} = require('../util/db');

var sResp = "";

async function get(req,res){
    
    try{
        var sResult = await addRepo.getAddress();
        sResp = {status:sResult.length>0?200:404,"message":sResult.length>0?"OK":"No Data found",data:sResult};
    }catch(err){
    sResp = {status:500,message:"Something went wrong.",error:err.message};
   }finally{
    res.send(sResp);
   }
};

async function post(req,res){
   try{
      req.body.created_by= "system";
      req.body.created_at =currentDate();
      req.body.updated_by ="system";
      req.body.updated_at =currentDate();
      // console.log(req.body);
    var sResult = await addRepo.createAddress(req.body);
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
    var sResult = await addRepo.updateAddress(req.body);
    sResp = {status:sResult >0 ? 200: 405,"message":sResult > 0 ?"Update successfully.":"No Data found", data:sResult};
     
   }catch(err){
    sResp = {status:500,message:"Something went wrong.",error:err.message};
   }finally{
    res.send(sResp);
   }
}
async function del(req,res){
   try{
    console.log(req.params.id)
    var sResult = await addRepo.deleteAddress(req.params.id);
    sResp = {status:sResult.affectedRows>0 ?200:405,"message":sResult.affectedRows > 0 ?"Deleted successfully.":"No Data found",data:sResult};
     
   }catch(err){
    sResp = {status:500,message:"Something went wrong.",error:err.message};
   }finally{
    res.send(sResp);
   }
}

module.exports = {
    get,
    // getById,
    post,
    put,
    del
}