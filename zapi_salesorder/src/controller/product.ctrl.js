var productRepo= require('../respository/product.repo');

var sResp = "";

async function get(req,res){
    
    try{
        var oFilter = {
            product_price: req.query.product_price?req.query.product_price:0,
            product_category: req.query.product_category?req.query.product_category:'',
            product_status: req.query.product_status?req.query.product_status:''
        }

        var sResult = await productRepo.getProduct(oFilter);
        sResp = {status:sResult.length>0?200:404,"message":sResult.length>0?"OK":"No Data found",data:sResult};
        // sResp=sResult;
    }catch(err){
    sResp = {status:500,message:"Something went wrong.",error:err.message};
   }finally{
    res.send(sResp);
   }
};

async function getById(req,res){
    // console.log(req.params.id);
    var sResult = await productRepo.getProductById(req.params.id)
    var sResp = {status:sResult.length>0?200:404,"message":sResult.length>0?"OK":"No Data found",data:sResult};
    res.send(sResp);
}

async function post(req,res){
   try{
    req.body.del_flag= 0;
    req.body.created_by= "system";
    req.body.created_at ="2024-06-15";
    req.body.updated_by ="system";
    req.body.updated_at ="2024-06-15";
    var sResult = await productRepo.createProduct(req.body);
    console.log(sResult)
    sResp = {status:sResult == 1 ?201:405,"message":sResult.affectedRows ==1 ?"Created successfully.":"No Data found",data:sResult};
     
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
    var sResult = await productRepo.updateProduct(req.body);
    sResp = {"status":sResult.affectedRows >0 ? 200:405,"message":sResult.affectedRows > 0 ?"Update successfully.":"No Data found", data:sResult};
     
   }catch(err){
    sResp = {status:500,message:"Something went wrong.",error:err.message};
   }finally{
    res.send(sResp);
   }
};


async function softDelete(req,res){
    try{
    req.body.updated_by ="system";
    req.body.updated_at =new Date();
   //   console.log(req.params.id)
     var sResult = await productRepo.softDeleteProduct(req.body);
     sResp = {status:sResult.affectedRows >= 1 ?200:405,"message":sResult.affectedRows > 0 ?"Temp Deleted successfully.":"No Data found",data:sResult};
      
    }catch(err){
     sResp = {status:500,message:"Something went wrong.",error:err.message};
    }finally{
     res.send(sResp);
    }
 };

 async function prodStatusCtrl(req,res){
    try{
    req.body.updated_by ="system";
    req.body.updated_at =new Date();
     console.log(req.body)
     var sResult = await productRepo.productStatus(req.body);
     sResp = {status:sResult.affectedRows >= 1 ?200:405,"message":sResult.affectedRows > 0 ?"Status Updated Successfully.":"No Data found",data:sResult};
      
    }catch(err){
     sResp = {status:500,message:"Something went wrong.",error:err.message};
    }finally{
     res.send(sResp);
    }
 };


 async function restoreData(req,res){
    try{
    req.body.product_id =req.params.id;
    req.body.updated_by ="system";
    req.body.updated_at =new Date();
    //  console.log(req.params.id)
     var sResult = await productRepo.restoreProduct(req.body);
     sResp = {status:sResult.affectedRows >= 1 ?200:405,"message":sResult.affectedRows > 0 ?"Restore successfully.":"No Data found",data:sResult};
      
    }catch(err){
     sResp = {status:500,message:"Something went wrong.",error:err.message};
    }finally{
     res.send(sResp);
    }
 };

async function del(req,res){
   try{
    console.log(req.params.id)
    var sResult = await productRepo.deleteProduct(req.params.id);
    sResp = {status:sResult.affectedRows >= 1 ?200:405,"message":sResult.affectedRows > 0 ?"Pmnt Deleted successfully.":"No Data found",data:sResult};
     
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
    softDelete,
    prodStatusCtrl,
    restoreData,
    del
}