var {excuteQuery} = require('../util/db');
const { SO_SCHEMA } = require('../util/constant');

var getAllById=`SELECT * FROM ${SO_SCHEMA}.ITEMS WHERE ORDER_NO=?`

async function getItems(){
        var sReponse = await excuteQuery(`SELECT * FROM ${SO_SCHEMA}.ITEMS`,[]);
        return sReponse;
};

async function getItemsById(order_no){
    var sReponse = await excuteQuery(getAllById,[order_no]);
    return sReponse;
};

async function createItems(oPayload){
    var sReponse = await excuteQuery(`INSERT INTO ${SO_SCHEMA}.ITEMS VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
    [oPayload.order_no,oPayload.product_id,oPayload.prod_desc,oPayload.category,oPayload.quantity,
    oPayload.unit_price,oPayload.total_price,oPayload.created_by,oPayload.created_at,oPayload.updated_by,oPayload.updated_at]);
    return sReponse;
};

async function updateItems(oPayload){
    var sReponse = await excuteQuery(
        `UPDATE ${SO_SCHEMA}.ITEMS SET PRODUCT_ID = ?,PRODUCT_DESC = ?,CATEGORY = ?,QUANTITY = ?,UNIT_PRICE = ?,TOTAL_PRICE = ?, UPDATED_BY=?,UPDATED_AT=? WHERE ORDER_NO=?`,
        [oPayload.product_id,oPayload.product_desc,oPayload.category,oPayload.quantity, oPayload.unit_price,oPayload.total_price,oPayload.updated_by,oPayload.updated_at,oPayload.order_no]);
    return sReponse;
}

async function deleteItems(order_no){
    var sReponse = await excuteQuery(`DELETE FROM ${SO_SCHEMA}.ITEMS WHERE ORDER_NO = ?`,[order_no]);
    return sReponse;
}

module.exports = {
    getItems,
    getItemsById,
    createItems,
    updateItems,
    deleteItems
}