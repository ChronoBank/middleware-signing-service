const dbInstance = require('../../controllers/dbController').get(),
  Web3 = require('web3'),
  _ = require('lodash'),
  hdkey = require('ethereumjs-wallet/hdkey'),
  extractExtendedKey = require('../../utils/crypto/extractExtendedKey'),
  web3 = new Web3();

module.exports = async (req, res) => {

  if (!req.body.key && !_.get(req.body, '0.key'))
    return res.send({}); //todo add error

  if (req.body.key)
    req.body = [req.body.key];

  const client = await dbInstance.models.Clients.findOne({where: {clientId: req.clientId}});

  if (!client)
    return res.send({}); //todo add error

  for (let key of req.body) {
    const extendedKey = extractExtendedKey(key.key);
    const privateKey = extendedKey ? hdkey.fromExtendedKey(extendedKey).getWallet().getPrivateKey() : key.key;

    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    await dbInstance.models.Keys.create({
      clientId: req.clientId,
      pubKeysCount: key.pubKeys || 1,
      isStageChild: !!key.stageChild,
      privateKey: extendedKey || key.key,
      address: account.address.toLowerCase(),
      default: !!key.default,
      derivePath: extendedKey ? 'm/44\'/60\'/0\'/0' : null
    });
  }


  return res.send({status: 1});
};