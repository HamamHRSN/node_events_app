const express = require('express');
const {check, validationResult } = require('express-validator/check');
const moment = require('moment');
const router = express.Router();
const Event = require('../models/Event');


// middleware to check if user isAuthenticated   logged in 

isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/users/login');
    }
};

moment().format();
// route to home events
router.get('/', (req, res) => {
//   res.send('This is events router page');
Event.find({}, (err, events) => {
    // res.json(events);
    let chunk = [];
    let chunkSize = 3;
    for (let i = 0; i < events.length; i+=chunkSize) {
        chunk.push(events.slice(i, chunkSize + i));
    }
    // res.json(chunk);
    res.render('event/index', {
        chunk: chunk,
        message: req.flash('info')
    });
});
});

// route to create events
router.get('/create', isAuthenticated, (req, res) => {
   res.render('event/create', {
       errors: req.flash('errors')
   });
});

// route to create events post
router.post('/create', [
    check('title').isLength({min: 5}).withMessage('Title should be more than 5 characters'),
    check('description').isLength({min: 5}).withMessage('Description should be more than 5 characters'),
    check('location').isLength({min: 5}).withMessage('Location should be more than 5 characters'),
    check('date').isLength({min: 5}).withMessage('Date should be valid')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // res.json(errors.array());
        req.flash('errors', errors.array());
        res.redirect('/events/create')
    } else {
        // res.json('ok');

      // console.log(req.body); 
        let newEvent = new Event({
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            date: req.body.date,
            user_id: req.user.id,
            created_at: Date.now()
        });
    
        newEvent.save((err) => {
            if (!err) {
                console.log('Event was added..');
                req.flash('info', 'The event was created successfuly');
                res.redirect('/events')
            } else {
                console.log('Event not saved on database:', err); 
            }
        });
    }  

 });

// show single event
router.get('/:id', (req, res) => {
// console.log(req.params.id);
    Event.findOne({_id: req.params.id}, (err, event) => {
        // console.log(event);
        if (!err) {
            res.render('event/show', {
               event: event
            });
        } else {
            console.log(err);
        }
    });

});


// edit route

router.get('/edit/:id', isAuthenticated, (req, res) => {
    Event.findOne({_id: req.params.id}, (err, event) => {
        // console.log(event);
        if (!err) {
            res.render('event/edit', {
               event: event,
               eventDate: moment(event.date).format('YYYY-MM-DD'),
               errors: req.flash('errors'),
               message: req.flash('info')
            });
        } else {
            console.log(err);
        }
    });
});

// update the form 

router.post('/update', isAuthenticated, [
    check('title').isLength({min: 5}).withMessage('Title should be more than 5 characters'),
    check('description').isLength({min: 5}).withMessage('Description should be more than 5 characters'),
    check('location').isLength({min: 5}).withMessage('Location should be more than 5 characters'),
    check('date').isLength({min: 5}).withMessage('Date should be valid')
], (req, res) => {
//  console.log(req.body);
const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('errors', errors.array());
        res.redirect('/events/edit/' + req.body.id);
    } else {
        // res.json("ok");

        // create obj

        let newFeilds = {
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            date: req.body.date
        }
        let query = {_id: req.body.id}

        Event.updateOne(query, newFeilds, (err) => {
            if (!err) {
                req.flash('info', "The event was updated successfuly...");
                res.redirect('/events/edit/' + req.body.id);
            } else {
                console.log(err);
            }
        })
    }
});

// delete event 

router.delete('/delete/:id', isAuthenticated, (req, res) => {
    // console.log(req.params.id);
    // res.json("ok");
    let query = {_id: req.params.id};
    Event.deleteOne(query, (err) => {
        if (!err) {
            res.status(200).json('deleted');
        } else {
            res.status(404).json('There was an error. event not deleted');
        }
    });
});

module.exports = router;