var {excuteQuery,getRandomInt} = require('../util/db');
const {SO_SCHEMA} = require('../util/constant');

var getAllCustDetails = `CALL ${SO_SCHEMA}.SP_CUST_ALL_DETAILS(?,?,?)`;

var getCustById = `CALL ${SO_SCHEMA}.SP_CUST_BY_ID(?)`

var activeToInactive = `UPDATE ${SO_SCHEMA}.CUSTOMERS SET IS_ACTIVE = false WHERE CUSTOMER_ID = ?`
var inactiveToActive = `UPDATE ${SO_SCHEMA}.CUSTOMERS SET IS_ACTIVE = true WHERE CUSTOMER_ID = ?`

// var deleteAllDetails = `DELETE FROM ${SO_SCHEMA}.CUSTOMERS AS CUST
// LEFT JOIN ${SO_SCHEMA}.ADDRESS AS ADRS ON CUST.CUSTOMER_ID = ADRS.CUSTOMER_ID 
// LEFT JOIN ${SO_SCHEMA}.ORDER_INFO AS ORDR ON CUST.CUSTOMER_ID = ORDR.CUSTOMER_ID
// WHERE CUST.CUSTOMER_ID = ?`

async function getCustomer(oFilter){
    // var sReponse = await excuteQuery(getAllCustDetails,[oFilter.first_name,oFilter.first_name,oFilter.gender,oFilter.gender,oFilter.is_active,oFilter.is_active]);
    var sReponse = await excuteQuery(getAllCustDetails,[oFilter.first_name,oFilter.gender,oFilter.is_active]);
    return sReponse;
}

async function getCustomerById(customerId){
    var sReponse = await excuteQuery(getCustById,[customerId]);
    return sReponse;
}

async function createCustomer(oPayload){
    var sReponse = await excuteQuery(`INSERT INTO ${SO_SCHEMA}.CUSTOMERS VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [getRandomInt(1,100),'user_name',oPayload.first_name,oPayload.last_name,oPayload.middle_name,oPayload.gender,
    oPayload.date_of_birth,oPayload.is_active,oPayload.marital_status,oPayload.country_code,
    oPayload.mobile_no,oPayload.alt_country_code,oPayload.alt_mobile,oPayload.email_add,
    oPayload.alt_email_add,oPayload.created_by,oPayload.created_at,oPayload.updated_by,oPayload.updated_at]);
    return sReponse;
};

async function updateCustomer(oPayload){
    console.log(oPayload)
    var sReponse = await excuteQuery(
        `UPDATE ${SO_SCHEMA}.CUSTOMERS SET FIRST_NAME = ?,LAST_NAME = ?,MIDDLE_NAME=?,GENDER = ?,DATE_OF_BIRTH=?,IS_ACTIVE=?,MARITAL_STATUS = ?,COUNTRY_CODE = ?,MOBILE_NO = ?,ALT_COUNTRY_CODE = ?,ALT_MOBILE = ?,EMAIL_ADD = ?,ALT_EMAIL_ADD = ?, UPDATED_BY=?,UPDATED_AT=? WHERE CUSTOMER_ID = ?`,
        [oPayload.first_name,oPayload.last_name,oPayload.middle_name,oPayload.gender,
            oPayload.date_of_birth,oPayload.is_active,oPayload.marital_status,oPayload.country_code,
            oPayload.mobile_no,oPayload.alt_country_code,oPayload.alt_mobile,oPayload.email_add,
            oPayload.alt_email_add,oPayload.updated_by,oPayload.updated_at,oPayload.customer_id]);
    return sReponse;
};

async function activetoInactiveCustomer(customerId){
    var sReponse = await excuteQuery(activeToInactive,[customerId]);
    return sReponse;
};

async function inactiveToActiveCustomer(customerId){
    var sReponse = await excuteQuery(inactiveToActive,[customerId]);
    return sReponse;
};

async function deleteCustomer(customerId){
    var sReponse = await excuteQuery(deleteAllDetails,[customerId,customerId,customerId]);
    return sReponse;
}

module.exports = {
    getCustomer,
    getCustomerById,
    createCustomer,
    updateCustomer,
    activetoInactiveCustomer,
    inactiveToActiveCustomer,
    deleteCustomer
}