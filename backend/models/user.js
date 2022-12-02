const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const Schema = mongoose.Schema;

// You can use SALT_ROUNDS when hashing the password with bcrypt.hashSync()
const SALT_ROUNDS = 10;

// You can use these SCHEMA_DEFAULTS when setting the validators for the User Schema. For example the default role can be accessed with 
// SCHEMA_DEFAULTS.role.defaultValue
const SCHEMA_DEFAULTS = {
  name: {
    minLength: 1,
    maxLength: 50
  },
  email: {
    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {
    minLength: 10
  },
  role: {
    values: ['admin', 'customer'],
    defaultValue: 'customer'
  }
};

// Done: 9.5 Implement the userSchema
const userSchema = new Schema({
  // for 'name' 
  // set type
  // and the following validators:
  // required, trim, minlength, maxlength 
  username: {
    type: String,
    required: true,
    trim: true,
    minLength: SCHEMA_DEFAULTS.name.minLength,
    maxLength: SCHEMA_DEFAULTS.name.maxLength,
  },
  // for 'email'
  // set type
  // and the following validators:
  // required, unique, trim, match
  // NOTE: unique is not a validator (see mongoose documentation)
  // TIP: with match validator default value for email can be used and
  // for checking the email you can use the match() from SCHEMA_DEFAULTS

  //       
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: SCHEMA_DEFAULTS.email.match,

  },
  // for 'password'
  // set type
  // and the following validators:
  // required, minlength
  // for inspiration for the setter function, see the following comment lines
  // set: password => {
  //   if (ENTER CONDITIONS WHERE THE PASSWORD IS NOT VALID) return password;
  //   return bcrypt.hashSync(ENTER PARAMETERS);
  // }
  // 
  password: {
    type: String,
    required: true,
    minLength: SCHEMA_DEFAULTS.password.minLength,
    set: password => {
      if (!password || password === undefined || password.length < 10) {
        return password;
      }
      return bcrypt.hashSync(password, SALT_ROUNDS);
    }
  },
  // for 'role'
  // set type
  // and the following validators:
  //  required, trim, lowercase, enum,    default
  role: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    enum: SCHEMA_DEFAULTS.role.values,
    default: SCHEMA_DEFAULTS.role.defaultValue,
  }
});

/**
 * Compare supplied password with user's own (hashed) password
 *
 * @param {string} password password of user
 * @returns {Promise<boolean>} promise that resolves to the comparison result
 */
userSchema.methods.checkPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

// Omit the version key when serialized to JSON
userSchema.set('toJSON', { virtuals: false, versionKey: false });

const User = new mongoose.model('User', userSchema);

module.exports = User;