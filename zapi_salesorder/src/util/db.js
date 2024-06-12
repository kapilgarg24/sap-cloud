// const mysql = require('mysql')
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Kapil@1234',
//   database: 'salesOrder'
// })

// global.services

// async function getConnection(callBack){
//     console.log(connection.state);
//     if(connection.state === "disconnected" && connection.state !== "authenticated"){
//         connection.connect(callBack);
//     }
//     console.log(connection.state);
//     return connection;
// }

// async function excuteQuery(query,values){
//     var sReponse = await new Promise(async function(resolve,reject){
//         var sConn = await getConnection();
//         sConn.query(query,values,function (error, results) {
//             if(error == null){
//                 // console.log(results[1].insertId)
//                 // if(results.length>0 && results[1].insertId !== undefined){
//                 //     resolve(results[0]);
//                 // }else{
//                     resolve(results);
//                 // }
                
//             }else{
//                 reject(error)
//             }
//         });
            
//     });
//     return sReponse;
// }

// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min));
// };

// module.exports = {
//     getConnection,
//     excuteQuery,
//     getRandomInt
// }

var hana = require('@sap/hana-client');
var conn = undefined;
var connParam = undefined;


async function createConnection(){
  connParam = {
        host: global.services.hdi_salesorder.host,
        port: global.services.hdi_salesorder.port,
        uid: global.services.hdi_salesorder.user,
        pwd: global.services.hdi_salesorder.password,
        pooling: "true",
        encrypt: 'true',
        sslValidateCertificate: 'false'
    }
    conn = hana.createConnection();
    return conn;
}

async function connectToDB(callBackForConnection){
  await conn.connect(connParam,callBackForConnection);
  return conn
}

async function getConnection(callBackForConnection){
  if(!conn){
    conn = await createConnection();
    conn = await connectToDB(callBackForConnection);
  }
  return conn;
}


async function excuteQuery(query,values){
    var sReponse = await new Promise(async function(resolve,reject){
        var sConn = await getConnection();
        sConn.exec(query,values,function (error, results) {
            if(error == null){
                  resolve(results);
            }else{
                reject(error)
            }
        });    
    });
    return sReponse;
}






module.exports = {
  getConnection,
  excuteQuery
}
