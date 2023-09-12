const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("./models/User")

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      scope: ['profile', 'email'],
      session:false,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if a user with the same email already exists
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          // Create a new user if one doesn't exist
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            // Add other user data as needed
          });
          await user.save();
        }  
          return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});