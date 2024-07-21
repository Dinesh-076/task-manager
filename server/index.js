import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';
import taskRoutes from './routes/tasks.js';
import authUser from './routes/auth.js'
import passport from 'passport';
import passportConfig from './config/passportConfig.js';
import session from 'express-session';


const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors({
  origin: 'https://task-manager-dinesh.netlify.app',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'yourSecret',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

// Passport config
passportConfig(passport);

// Routes
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  
  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'https://task-manager-dinesh.netlify.app/login' }),
    (req, res) => {
      res.redirect('https://task-manager-dinesh.netlify.app/home');
    }
);

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('https://task-manager-dinesh.netlify.app/login');
// }

// app.get('/home', ensureAuthenticated, (req,res) => {
//   res.redirect('https://task-manager-dinesh.netlify.app/home');
// })

app.get('/home', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('https://task-manager-dinesh.netlify.app/home');
    } else {
        res.redirect('https://task-manager-dinesh.netlify.app/login');
    }
});

// app.get('/logout', (req, res) => {
//     req.logout((err) => {
//         if (err) { return next(err); }
//         res.redirect('https://task-manager-dinesh.netlify.app/login');
//     });
// });
app.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    req.session.destroy((err) => {
      if (err) { return next(err); }
      res.clearCookie('connect.sid'); // Clear the session cookie
      res.redirect('https://task-manager-dinesh.netlify.app/login');
    });
  });
});


  
  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error('Error occurred:', err);
    res.status(500).send('Internal Server Error');
  });
  


app.use('/api/tasks',taskRoutes)
app.use('/api/auth',authUser)

app.listen(port, (req,res) => {
    console.log(`Server listening to the port ${port}`);
});