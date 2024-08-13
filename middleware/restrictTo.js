const restrictTo = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    console.log(userRole);

    if (roles.includes(userRole)) {
      next();
    } else {
      return res.status(400).json({
        message: "You don't have permission",
      });
    }
  };
};

module.exports = restrictTo;
