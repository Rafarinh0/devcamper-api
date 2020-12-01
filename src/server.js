const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const errorHandler = require('./middlewares/error');
const connectDB = require('./config/database');

//Carregando variaveis de desenvolvimento
dotenv.config({ path: '.env' });

//Conexão c o banco de dados
connectDB();

const app = express();

//Body Parser
app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());

//Set static folder
app.use(express.static(path.join(__dirname, '..', 'public')));

//Montando rotador
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));

//Handle unhandled promise rejections
process.on('unhandledRejection', (error, promise) => {
    console.log(`Error: ${error.message}`);
    //Close server and exit proccess
    server.close(() => process.exit(1));
})