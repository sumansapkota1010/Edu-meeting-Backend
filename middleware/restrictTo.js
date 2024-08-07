const restrictTo = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    console.log(userRole);
  
    if (!roles.includes(userRole)) {
      res.status(403).json({
        message: "You don't have permission to create meetings",
      });
    } else {
      next();
    }
  };
};

module.exports = restrictTo;
