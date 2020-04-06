module.exports = function (req, res, next) {
  if(req.user.role === 'admin' || req.user.role === 'root'){
    next();
  }
  else {
    res.send({ message: 'Unauthorized!' });
  }

};
