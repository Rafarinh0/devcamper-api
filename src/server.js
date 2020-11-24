const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');
const morgan = require('morgan');
const errorHandler = require('./middlewares/error');
const connectDB = require('./config/database');

//Carregando variaveis de desenvolvimento
dotenv.config({ path: '..config.env' });

//Conexão c o banco de dados
connectDB();

const app = express();

//Body Parser
app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
//Montando rotador
app.use('/api/v1/bootcamps', routes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));

//Handle unhandled promise rejections
process.on('unhandledRejection', (error, promise) => {
    console.log(`Error: ${error.message}`);
    //Close server and exit proccess
    server.close(() => process.exit(1));
})