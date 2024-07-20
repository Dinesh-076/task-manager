import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import pool from '../db.js';

export default function(passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://task-manager-393ajfpq3-dinesh-ps-projects-8763556b.vercel.app/auth/google/callback'
  },
  async (token, tokenSecret, profile, cb) => {
    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [profile.emails[0].value]);
      if (rows.length === 0) {
        const { rows: newUser } = await pool.query(
          'INSERT INTO users (firstname,lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
          [profile.displayName, '', profile.emails[0].value, 'Google']
        );
        return cb(null, newUser[0]);
      } else {
        return cb(null, rows[0]);
      }
    } catch (error) {
      console.error('Error in Google Strategy:', error);
      return cb(error, null);
    }
  }));

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser(async (id, cb) => {
    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      cb(null, rows[0]);
    } catch (error) {
      console.error('Error in deserializing user:', error);
      cb(error, null);
    }
  });
}
