var {excuteQuery,getRandomInt} = require('../util/db');
const {SO_SCHEMA} = require('../util/constant');

var productDetails = `CALL ${SO_SCHEMA}.SP_PRODUCTS_DETAIL(?,?,?)`

async function getProduct(oFilter){
        var sReponse = await excuteQuery(productDetails,[oFilter.product_price,oFilter.product_category,oFilter.product_status]);
        return sReponse;
};

// async function getProductById(prod_Id){
//     var sReponse = await excuteQuery("CALL SP_PROD_BY_ID(?)",[prod_Id]);
//     return sReponse;
// };

async function createProduct(oPayload){
    console.log(oPayload)
    var sReponse = await excuteQuery(`INSERT INTO ${SO_SCHEMA}.PRODUCTS VALUES(?,?,?,?,?,?,?,?,?,?)`,
    [getRandomInt(1,100),oPayload.product_desc,oPayload.product_category,oPayload.product_price,oPayload.product_status,
    oPayload.created_by,oPayload.created_at,oPayload.updated_by,oPayload.updated_at,oPayload.del_flag]);
    return sReponse;
};
// 

async function updateProduct(oPayload){
    var sReponse = await excuteQuery(
        `UPDATE ${SO_SCHEMA}.PRODUCTS SET PRODUCT_DESC = ?,PRODUCT_CATEGORY = ?,PRODUCT_PRICE = ?,PRODUCT_STATUS = ?, UPDATED_BY=?,UPDATED_AT=? WHERE PRODUCT_ID = ?`,
        [oPayload.product_desc,oPayload.product_category,oPayload.product_price,oPayload.product_status,oPayload.updated_by,oPayload.updated_at,oPayload.product_id]);
    return sReponse;
}

async function softDeleteProduct(oPayload){
    var sReponse = await excuteQuery(`UPDATE ${SO_SCHEMA}.PRODUCTS SET DEL_FLAG=true, UPDATED_BY=?, UPDATED_AT=? WHERE PRODUCT_ID = ?`,[oPayload.updated_by, oPayload.updated_at, oPayload.product_id]);
    return sReponse;
};

async function restoreProduct(oPayload){
    var sReponse = await excuteQuery(`UPDATE ${SO_SCHEMA}.PRODUCTS SET DEL_FLAG=0, UPDATED_BY=?, UPDATED_AT=? WHERE PRODUCT_ID = ?`,[oPayload.updated_by, oPayload.updated_at, oPayload.product_id]);
    return sReponse;
};

async function productStatus(oPayload){
    var sReponse = await excuteQuery(`UPDATE ${SO_SCHEMA}.PRODUCTS SET PRODUCT_STATUS=?, UPDATED_BY=?, UPDATED_AT=? WHERE PRODUCT_ID = ?`,[oPayload.product_status,oPayload.updated_by, oPayload.updated_at, oPayload.product_id]);
    return sReponse;
};

async function deleteProduct(prod_Id){
    var sReponse = await excuteQuery(`DELETE FROM ${SO_SCHEMA}.PRODUCTS WHERE PRODUCT_ID = ?`,[prod_Id]);
    return sReponse;
};

module.exports = {
    getProduct,
    // getProductById,
    createProduct,
    updateProduct,
    softDeleteProduct,
    restoreProduct,
    deleteProduct,
    productStatus
}