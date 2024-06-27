var itemsRepo= require('../respository/items.repo.js');
var {currentDate} = require('../util/db');

var sResp = "";

async function get(req,res){
    
    try{
        var sResult = await itemsRepo.getItems();
        sResp = {status:sResult.length>0?200:404,"message":sResult.length>0?"OK":"No Data found",data:sResult};
        // sResp=sResult;
    }catch(err){
    sResp = {status:500,message:"Something went wrong.",error:err.message};
   }finally{
    res.send(sResp);
   }
};

async function getById(req,res){
    try{
        var sResult = await itemsRepo.getItemsById(req.params.id)
        var sResp = {status:sResult.length>0?200:404,"message":sResult.length>0?"OK":"No Data found",data:sResult};
        // sResp=sResult;
    }catch(err){
    sResp = {status:500,message:"Something went wrong.",error:err.message};
    console.log(err)
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
    var sResult = await itemsRepo.createItems(req.body);
    sResp = {status:sResult.affectedRows >0 ?201:405,"message":sResult.affectedRows >0 ?"Created successfully.":"No Data found",data:sResult};
     
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
    var sResult = await itemsRepo.updateItems(req.body);
    sResp = {"status":sResult.affectedRows >0 ? 200:405,"message":sResult.affectedRows > 0 ?"Update successfully.":"No Data found", data:sResult};
     
   }catch(err){
    sResp = {status:500,message:"Something went wrong.",error:err.message};
   }finally{
    res.send(sResp);
   }
}
async function del(req,res){
   try{
    console.log(req.params.id)
    var sResult = await itemsRepo.deleteItems(req.params.id);
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
    del
}