const dbInstance = require('../../controllers/dbController').get();

module.exports = async (req, res) => {

  if (!req.body.address && !_.get(req.body, '0.address'))
    return res.send({}); //todo add error

  if (req.body.address)
    req.body = [req.body.address];

  await dbInstance.models.Keys.destroy({
    where: {
      address: {$in: req.body},
      clientId: req.clientId
    }
  });

  return res.send({status: 1});
};
