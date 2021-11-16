const router = require('express').Router();
const { User, Post, Comment, Vote } = require('../../models');

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
        //exlcude showing password when retriving user data
    attributes: { exclude: ['password'] },
    //include the Post id, title, url, and create data
    include: [
        {
            model: Post,
            attributes: ['id', 'title', 'post_url', 'created_at']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'created_at'],
            include: {
                model: Post,
                attributes: ['title']
            }
        },
        //include the title of their voted posts, and their vote info
        {
            model: Post,
            attributes: ['title'],
            through: Vote,
            as: 'voted_posts'
        }
    ],
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
    .then(dbUserData => {
        req.session.save(()=> {
            req.session.user_id = dbUserData.id;
            req.session.username =  dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

//user login
router.post('/login', (req, res) => {
    // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
      }
  
      const validPassword = dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
    
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    });
  });
  
  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  });
  
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