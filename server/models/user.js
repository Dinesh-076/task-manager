import pool from '../db.js';

const createUser = async (firstName, lastName, email, password) => {
    const query = 'INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)';
    try {
        await pool.query(query, [firstName, lastName, email, password]);
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Could not create user');
    }
};

const findUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    try {
        const { rows } = await pool.query(query, [email]);
        return rows[0];
    } catch (error) {
        console.error('Error finding user by email:', error);
        throw new Error('Could not find user by email');
    }
};

export { createUser, findUserByEmail };
