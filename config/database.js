const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/eventsDB', { useNewUrlParser: true }, (err) =>{
    if (err) {
        console.log('Connected field to database:', err);
    } else {
        console.log('Connected to MongoDB succsesfuly...');
    }   
});