module.exports = function (req, res, next) {
    if(req.user.role === 'admin' || req.user.role === 'root' || req.user.role === 'hoofdtrainer' | req.user.role === 'trainer'){
      next();
    }
    else {
      res.send({ message: 'Unauthorized!' });
    }
  
  };
  