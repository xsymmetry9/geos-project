const LocalStrategy = require('passport-local').Strategy;
const {getTeacherByEmail, getTeacherById} = require('../services/adminService');
const bcrypt = require('bcrypt');

const initialialize = (passport) => {
    passport.use(new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
        const user = await getTeacherByEmail(email);
        if(!user) return done(null, false, {message: 'No user with that email'});

        const match = await bcrypt.compare(password, user.password);
        return match ? done(null, user) : done(null, false, {message: 'Incorrect passowrd'})
        
    }));

    passport.serializeUser((user, done) =>done(null, user.id));
    passport.deserializeUser(async(id, done) =>{
        const user = await getTeacherById(id);
        done(null, user);

    })
}

module.exports = initialialize;