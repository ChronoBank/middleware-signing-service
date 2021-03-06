const bcrypt = require('bcryptjs');
const config = require('../config');

module.exports.id = 'users';

module.exports.up = function (done) {
  let coll = this.db.collection(`noderedusers`);
  coll.insert({
    username : 'admin',
    password : bcrypt.hashSync('123'),
    isActive : true,
    permissions : '*'
  }, done);
};

module.exports.down = function (done) {
  let coll = this.db.collection(`noderedusers`);
  coll.remove({username : 'admin'}, done);
  done();
};
