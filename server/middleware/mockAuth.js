module.exports = (req, res, next) => {
  req.user = {
    id: 'local-dev',
    name: 'Alex Dev',
    email: 'alex@local.dev',
    role: 'student',
    targetRole: 'Frontend Developer',
  };

  next();
};

