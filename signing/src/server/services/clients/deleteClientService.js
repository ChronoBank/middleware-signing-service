const dbInstance = require('../../controllers/dbController').get();

module.exports = async (req, res) => {

  await dbInstance.models.Keys.destroy({
    where: {
      clientId: req.clientId
    }
  });

  await dbInstance.models.Clients.destroy({where: {clientId: req.clientId}});
  return res.send({status: 1});
};