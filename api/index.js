const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/errorHandler')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

/** SEGURIDAD CORS
const whitelist = ['http://localhost:5500', 'http://localhost:3000/'];

const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors(options));
**/

app.use(cors());

app.get('/api', (req, res) => {
  res.send('Hola mundo con Express');
})

app.listen(port, () => {
  console.log(`Escuchando el puerto ${port}`);
})

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);
