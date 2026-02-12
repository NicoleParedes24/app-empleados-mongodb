const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/empleados_db', {
  autoIndex: true,
})
.then(() => console.log('MongoDB conectado a empleados_db'))
.catch(err => console.error('Error MongoDB:', err));

module.exports = mongoose;
