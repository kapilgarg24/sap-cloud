var {excuteQuery} = require('../util/db');
const { SO_SCHEMA } = require('../util/constant');

var AddressByCustId = `CALL ${SO_SCHEMA}.SP_ADDRESS_BY_ID(?)`

async function getAddress(){
    var sReponse = await excuteQuery(`SELECT * FROM ${SO_SCHEMA}.ADDRESS`,[]);
    
    return sReponse;
};

async function getAddByCustId(custId){
    console.log(custId)
    var sReponse = await excuteQuery(AddressByCustId,[custId]);
    console.log(sReponse)
    return sReponse;
};


async function createAddress(oPayload){
    // console.log(oPayload);
    var sReponse = await excuteQuery(`INSERT INTO ${SO_SCHEMA}.ADDRESS VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [oPayload.address_id,oPayload.customer_id,oPayload.address_type,oPayload.add_line_1,oPayload.add_line_2,oPayload.add_line_3,oPayload.street,oPayload.city,oPayload.state,oPayload.postal_code,oPayload.country,oPayload.created_by,oPayload.created_at,oPayload.updated_by,oPayload.updated_at]);
    return sReponse;
}

async function updateAddress(oPayload){
    console.log(oPayload);
    var sReponse = await excuteQuery(
        `UPDATE ${SO_SCHEMA}.ADDRESS SET ADDRESS_TYPE = ?, ADD_LINE_1 = ?, ADD_LINE_2 = ?, ADD_LINE_3 = ?,STREET = ?, CITY = ?, STATE = ?,POSTAL_CODE = ?, COUNTRY = ?, UPDATED_BY=?,UPDATED_AT=?  WHERE ADDRESS_ID = ? AND CUSTOMER_ID = ?`,
        [oPayload.address_type,oPayload.add_line_1,oPayload.add_line_2,oPayload.add_line_3,oPayload.street,oPayload.city,oPayload.state,oPayload.postal_code,oPayload.country,oPayload.updated_by,oPayload.updated_at,oPayload.address_id,oPayload.customer_id]);
    return sReponse;
}

async function deleteAddress(addId){
    var sReponse = await excuteQuery(`DELETE FROM ${SO_SCHEMA}.ADDRESS WHERE ADDRESS_ID = ?`,[addId]);
    return sReponse;
}

module.exports = {
    getAddress,
    getAddByCustId,
    createAddress,
    updateAddress,
    deleteAddress
}


// ADDRESS_TYPE_TEXT
// CREATED_AT
// CREATED_BY
// CUSTOMER_ID
// CUSTOMER_NAME
// DELIVERY_DATE
// FINAL_AMOUNT
// ORDER_DATE
// ORDER_NO
// ORDER_STATUS_TEXT

// AddressByCustId

// add_line_1
// add_line_2
// add_line_3
// address_id
// address_type
// city
// country
// customer_id
// postal_code
// state
// street
