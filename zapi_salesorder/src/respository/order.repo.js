var {excuteQuery, getRandomInt} = require('../util/db');
const { SO_SCHEMA } = require('../util/constant');

var getOrdrByCustId = `CALL ${SO_SCHEMA}.SP_ORDER_BY_CUST_ID(?)`

var getOrdrByOrderNo = `CALL ${SO_SCHEMA}.SP_ORDER_BY_ORDER_NO(?)`

// async function getOrder(oFilter){
//     var sReponse = await excuteQuery(`CALL SP_ORDER_FILTER(?,?)`,[oFilter.customer_id,oFilter.customer_name]);
//     return sReponse;
// };



async function getOrderByCustId(custId){
    var sReponse = await excuteQuery(getOrdrByCustId,[custId]);
    return sReponse;
}

async function getOrderById(ordrNo){
    var sReponse = await excuteQuery(getOrdrByOrderNo,[ordrNo]);
    return sReponse;
}




async function createOrder(oPayload){
    var sReponse = await excuteQuery(`INSERT INTO ${SO_SCHEMA}.ORDER_INFO VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
    [oPayload.order_no,oPayload.order_date,oPayload.final_amount,oPayload.deliver_date,oPayload.customer_id, oPayload.customer_name,oPayload.address_type,oPayload.order_status,oPayload.created_by,oPayload.created_at,oPayload.updated_by,oPayload.updated_at]);
    return sReponse;
};

async function updateOrder(oPayload){
    var sReponse = await excuteQuery(
        `UPDATE ${SO_SCHEMA}.ORDER_INFO SET ORDER_DATE = ?,FINAL_AMOUNT = ?,DELIVER_DATE = ?, ADDRESS_TYPE = ?, UPDATED_BY=?,UPDATED_AT=? WHERE ORDER_NO = ?`,
        [oPayload.order_date,oPayload.final_amount,oPayload.deliver_date,oPayload.address_type,oPayload.updated_by,oPayload.updated_at,oPayload.order_no]);
    return sReponse;
};

async function orderStatus(oPayload){
    var sReponse = await excuteQuery(`UPDATE ${SO_SCHEMA}.ORDER_INFO SET ORDER_STATUS=?, UPDATED_BY=?, UPDATED_AT=? WHERE ORDER_NO = ?`,[oPayload.order_status,oPayload.updated_by, oPayload.updated_at, oPayload.order_no]);
    return sReponse;
};

async function deleteOrder(orderNo){
    var sReponse = await excuteQuery(`DELETE FROM ${SO_SCHEMA}.ORDER_INFO WHERE ORDER_NO = ?`,[orderNo]);
    return sReponse;
};

module.exports = {
    // getOrder,
    getOrderByCustId,
    getOrderById,
    createOrder,
    updateOrder,
    orderStatus,
    deleteOrder
}