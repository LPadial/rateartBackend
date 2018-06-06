var jwt = require('jwt-simple');
var moment = require('moment');
var secret = '4+Md#67%q4J{5.J4:Gb5pHuyK';

exports.ensureAuth = function(req, res, next){
  if(!req.headers.authorization){
    return res.status(403).send({message: 'No hay cabecera de autenticación'})
  }

  var token = req.headers.authorization.replace(/['"]+/g, '');

  try{
    var payload = jwt.decode(token, secret);
    if(payload.expireTime <= moment().unix()){
      return res.status(401).send({message: 'Token ha expirado'});
    }
  }catch(ex){
    console.log(ex);
    return res.status(404).send({message: 'Token no válido'});
  }

  req.user = payload;

  next();
};
