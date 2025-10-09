// // generar-hash.js
// const bcrypt = require('bcrypt');
// const nuevaContrasena = 'password123'; // <-- ¡ESTA ES LA CONTRASEÑA QUE USARÁS PARA INICIAR SESIÓN!

// bcrypt.hash(nuevaContrasena, 10).then(hash => {
//     console.log('✅ HASH GENERADO (PARA LA BASE DE DATOS):');
//     console.log(hash);
// });


// check_hash.js

const bcrypt = require('bcryptjs');
const newPassword = 'Jazmin2511Anahi!!'; // 👈 Contraseña que conocerás
const saltRounds = 10;

bcrypt.hash(newPassword, saltRounds, function(err, newHash) {
    console.log("NUEVA CONTRASEÑA EN TEXTO PLANO: " + newPassword);
    console.log("NUEVO HASH PARA LA BASE DE DATOS: " + newHash);
});