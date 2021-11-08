const router = require('express').Router();
const { User } = require('../../models');

//GET /api/users - similar to SELECT * FROM users;
router.get('/', (req, res)=> {
    //Access our User model and run .findAll() method)
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
      //if server issue, send 500 status code
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

//GET /api/users/1 - similar to SELECT * FROM users WHERE id = 1
router.get('/:id', (req, res)=> {
    User.findOne({
    attributes: { exclude: ['password'] },
    where: {
        id: req.params.id
    }
  })
    .then(dbUserData => {
        //if user id doesnt exist
        if(!dbUserData){
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//POST /api/users - similar to INSERT INTO users (username, email, password)
//VALUES ("Lernantino", "lernantino@gmail.com", "password1234");
router.post('/', (req, res)=> {
    //expects {username: 'Lerantino', email: 'lerantino@gmail.com', password: 'password1234'}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//user login
router.post('/login', (req, res)=> {
    // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    User.findOne({
        //find user with email entered
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        //if no user with email entered, send 400 message
        if(!dbUserData){
            res.status(400).json({message: 'No user with that email address exists'});
            return;
        }
        //verify user
        const validPassword =  dbUserData.checkPassword(req.body.password);
        if(!validPassword){
            res.status(400).json({ message: 'Incorrect password'});
            return;
        }
        res.json({user: dbUserData, message: 'You are now logged in'});
    })
})
//PUT /api/users/1 - UPDATE users SET username = "Lernantino", email = "lernantino@gmail.com", password = "newPassword1234"
//                   WHERE id = 1;
router.put('/:id', (req, res)=>{
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    }).then(dbUserData => {
        if(!dbUserData[0]){
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//DELETE /api/users/1
router.delete('/:id', (req, res)=>{
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

module.exports = router;