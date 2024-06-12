var {excuteQuery, getRandomInt} = require('../util/db');
const { SO_SCHEMA } = require('../util/constant');

var getOrdrByCustId = `SELECT ORDR.*, MKV_AT.VALUE AS address_type_text, MKV_OS.VALUE AS order_status_text FROM ${SO_SCHEMA}.ORDER_INFO AS ORDR 
LEFT JOIN ${SO_SCHEMA}.MAS_KEY_VALUE AS MKV_AT
ON ORDR.ADDRESS_TYPE = MKV_AT.KEY 
LEFT JOIN ${SO_SCHEMA}.MAS_KEY_VALUE AS MKV_OS
ON ORDR.ORDER_STATUS = MKV_OS.KEY
WHERE ORDR.CUSTOMER_ID=? AND MKV_AT.GROUP = "ADDRESS_TYPE" AND MKV_OS.GROUP = "ORDER_STATUS"`

var getOrdrByOrderNo = `SELECT ORDR.*, MKV_AT.VALUE AS address_type_text, MKV_OS.VALUE AS order_status_text FROM ${SO_SCHEMA}.ORDER_INFO AS ORDR 
LEFT JOIN ${SO_SCHEMA}.MAS_KEY_VALUE AS MKV_AT
ON ORDR.ADDRESS_TYPE = MKV_AT.KEY 
LEFT JOIN ${SO_SCHEMA}.MAS_KEY_VALUE AS MKV_OS
ON ORDR.ORDER_STATUS = MKV_OS.KEY
WHERE ORDR.ORDER_NO=? AND MKV_AT.GROUP = "ADDRESS_TYPE" AND MKV_OS.GROUP = "ORDER_STATUS"`

async function getOrder(oFilter){
    var sReponse = await excuteQuery(`CALL SP_ORDER_FILTER(?,?)`,[oFilter.customer_id,oFilter.customer_name]);
    return sReponse;
};



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
    getOrder,
    getOrderByCustId,
    getOrderById,
    createOrder,
    updateOrder,
    orderStatus,
    deleteOrder
}