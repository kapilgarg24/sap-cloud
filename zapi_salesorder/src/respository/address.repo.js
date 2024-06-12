var {excuteQuery} = require('../util/db');
const { SO_SCHEMA } = require('../util/constant');

var AddressByCustId = `SELECT ADDR.*, MKV_AT.VALUE AS address_type_text FROM ${SO_SCHEMA}.ADDRESS AS ADDR
LEFT JOIN MAS_KEY_VALUE AS MKV_AT
ON ADDR.ADDRESS_TYPE = MKV_AT.KEY WHERE MKV_AT.GROUP="ADDRESS_TYPE" AND ADDR.CUSTOMER_ID = ?`;

async function getAddress(){
    var sReponse = await excuteQuery(`SELECT * FROM ${SO_SCHEMA}.ADDRESS`,[]);
    return sReponse;
};

async function getAddByCustId(custId){
    var sReponse = await excuteQuery(AddressByCustId,[custId]);
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
        `UPDATE ${SO_SCHEMA}.ADDRESS SET ADDRESS_ID = ?, ADD_LINE_1 = ?, ADD_LINE_2 = ?, ADD_LINE_3 = ?,STREET = ?, CITY = ?, STATE = ?,POSTAL_CODE = ?, COUNTRY = ?, UPDATED_BY=?,UPDATED_AT=?  WHERE ADDRESS_TYPE = ? AND CUSTOMER_ID = ?`,
        [oPayload.address_id,oPayload.add_line_1,oPayload.add_line_2,oPayload.add_line_3,oPayload.street,oPayload.city,oPayload.state,oPayload.postal_code,oPayload.country,oPayload.updated_by,oPayload.updated_at,oPayload.address_type,oPayload.customer_id]);
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