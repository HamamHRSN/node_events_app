const db = require('../config/database');
const Event = require('../models/Event');

let newEvents = [
    new Event({
        title: 'This is event 1',
        description: 'Test some long description for event 1 to use it in app with no meaning',
        location: 'Stockholm, Märsta',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'This is event 2',
        description: 'Test some long description for event 2 to use it in app with no meaning',
        location: 'Stockholm, Upplands Visby',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'This is event 3',
        description: 'Test some long description for event 3 to use it in app with no meaning',
        location: 'Stockholm, Uppsala',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'This is event 4',
        description: 'Test some long description for event 4 to use it in app with no meaning',
        location: 'Stockholm, Malmo',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'This is event 5',
        description: 'Test some long description for event 5 to use it in app with no meaning',
        location: 'Stockholm, sellntuna',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'This is event 6',
        description: 'Test some long description for event 6 to use it in app with no meaning',
        location: 'Stockholm, Solna',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'This is event 7',
        description: 'Test some long description for event 7 to use it in app with no meaning',
        location: 'Stockholm, Götenborg',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'This is event 8',
        description: 'Test some long description for event 8 to use it in app with no meaning',
        location: 'Stockholm, Helenalond',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'This is event 9',
        description: 'Test some long description for event 9 to use it in app with no meaning',
        location: 'Stockholm, norshoping',
        date: Date.now(),
        created_at: Date.now()
    })
];

newEvents.forEach((event) => {
   event.save((err) => {
    if (err) {
        console.log('Error: ', err);    
    }
   });
});



// let newEvent = new Event({
//     title: 'This is event 1',
//     description: 'Test description',
//     location: 'Stockholm, Märsta',
//     date: Date.now()
// });

// newEvent.save((err) => {
//     if (!err) {
//         console.log('Record was added...'); 
//     } else {
//         console.log('Error:', err);
//     } 
// });