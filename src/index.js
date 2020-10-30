const express = require('express');
const app = express();

//Import env variable
const env = require('./config/envioroment');

//Import middleware
const verifyToken = require('./middlewares/verifyToken');

//Import routes
const authRoutes = require('./middlewares/auth');
const categoryRoutes = require('./routes/categoriesRoutes');
const productRoutes = require('./routes/productsRoutes');
const saleRoutes = require('./routes/salesRoutes');

//Connect to database
const db = require('./config/database');
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

//Middleware
app.use(express.json());

app.use('/', authRoutes);
app.use(verifyToken);
//Routes
app.use('/category', categoryRoutes);
app.use('/product', productRoutes);
app.use('/sale', saleRoutes);

//Start API
const port = env.PORT || 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));
