const mysql = require('mysql2');

// 🔥 USA LA URL COMPLETA
const db = mysql.createConnection(process.env.URL_DATABASE);

db.connect(err => {
    if(err){
        console.log("❌ Error conexión:", err);
    } else {
        console.log("✅ Conectado a MySQL (Render)");
    }
});

module.exports = db;