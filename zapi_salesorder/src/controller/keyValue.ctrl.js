var keyValueRepo= require('../respository/keyValue.repo.js');

var sResp = "";

async function get(req,res){
    
    try{
        // console.log("sdfsdfsdf");
        var sResult = "";
        if(req.query.group){
            sResult = await keyValueRepo.getKeyValueByGroup(req.query.group);

        }else{
            sResult = await keyValueRepo.getAll();
        }

        sResp = {status:sResult.length>0?200:404,"message":sResult.length>0?"OK":"No Data found",data:sResult};
    }catch(err){
    sResp = {status:500,message:"Something went wrong.",error:err.message};
   }finally{
    res.send(sResp);
   }
};


// async function getById(req,res){
//     console.log(req.params.group);
//     var sResult = await keyValueRepo.getKeyValueByGroup(req.params.group)
//     var sResp = {status:sResult.length>0?200:404,"message":sResult.length>0?"OK":"No Data found",data:sResult};
//     res.send(sResp);
// };

// async function post(req,res){
//    try{
//     req.body.created_by= "system";
//     req.body.created_at =new Date();
//     req.body.updated_by ="system";
//     req.body.updated_at =new Date();
//     var sResult = await keyValueRepo.createCustomer(req.body);
//     sResp = {status:sResult.affectedRows == 1 ?201:405,"message":sResult.affectedRows ==1 ?"Created successfully.":"No Data found",data:sResult};
     
//    }catch(err){
//     sResp = {status:500,message:"Something went wrong.",error:err.message};
//    }finally{
//     res.send(sResp);
//    };
// };

// async function put(req,res){
//    try{
//     req.body.updated_by ="system";
//     req.body.updated_at =new Date();
//     var sResult = await keyValueRepo.updateCustomer(req.body);
//     sResp = {"status":sResult.affectedRows >0 ? 200: 405,"message":sResult.affectedRows > 0 ?"Update successfully.":"No Data found", data:sResult};
     
//    }catch(err){
//     sResp = {status:500,message:"Something went wrong.",error:err.message};
//    }finally{
//     res.send(sResp);
//    }
// }
// async function del(req,res){
//    try{
//     console.log(req.params.id)
//     var sResult = await keyValueRepo.deleteCustomer(req.params.id);
//     sResp = {status:sResult.affectedRows >= 1 ?200:405,"message":sResult.affectedRows > 0 ?"Deleted successfully.":"No Data found",data:sResult};
     
//    }catch(err){
//     sResp = {status:500,message:"Something went wrong.",error:err.message};
//    }finally{
//     res.send(sResp);
//    }
// }

module.exports = {
    get,
    // getById,
    // post,
    // put,
    // del
}