const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
// const DB = process.env.DATABASE.replace(
//     '<password>',
//     process.env.PASSWORD
//     );

// mongoose.connect(DB,{ useNewUrlParser: true, useUnifiedTopology: true})
// const connection = mongoose.connection;
// connection.once('open',()=>{
//     console.log('mongodb database connection successfully');
// })
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true, 'useFindAndModify': false });
const port = process.env.PORT || 6000;
const server = app.listen(port, () => console.log(`server was strted at port ${port}..........`));