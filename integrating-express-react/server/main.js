const connectDB = require('./config/db');

const express = require('express');
const cors = require('cors'); 


const app = express();

app.use(cors());
app.use(express.json());

connectDB();



app.use('/api/todos', require('./routes/api/todos'));

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));