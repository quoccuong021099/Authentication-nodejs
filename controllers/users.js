// Get all user
exports.getUsers = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all users' });
};

// Get user by id
exports.getUser = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Show user with id: ${req.params.id}` });
};

// Create new User
exports.createUser = (req, res, next) => {
  res.status(200).json({ success: true, msg: `create new user` });
};

// Update user by id
exports.updateUser = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `update user with id: ${req.params.id}` });
};

// Delete User by id
exports.deleteUser = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `delete user with id: ${req.params.id} success`,
  });
};
