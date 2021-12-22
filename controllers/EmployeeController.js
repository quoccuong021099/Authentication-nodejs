const Employee = require('../models/Employee');

// Show the list of Employee
const index = (req, res, next) => {
  if (req.query.page && req.query.limit) {
    Employee.paginate({}, { page: req.query.page, limit: req.query.limit })
      .then((response) => {
        res.json({ response });
      })
      .catch((err) => {
        res.json({ message: 'An error Occured' + err, code: 2000 });
      });
  } else {
    Employee.find()
      .then((response) => {
        res.json({ response });
      })
      .catch((err) => {
        res.json({ message: 'An error Occured' + err, code: 2000 });
      });
  }
};

// Show single employee
const show = (req, res, next) => {
  let employeeID = req.body.employeeID;
  Employee.findById(employeeID)
    .then((response) => {
      res.json({ response });
    })
    .catch((err) => {
      res.json({ message: 'An error Occured', error: err, code: 2000 });
    });
};

// add new emplouee
const store = (req, res, next) => {
  let employee = new Employee({
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  });
  if (req.files) {
    let path = '';
    req.files.forEach((files, index, arr) => {
      path = path + files.path + ',';
    });
    path = path.substring(0, path.lastIndexOf(','));
    employee.avatar = path;
  }
  employee
    .save()
    .then((response) => {
      res.json({ message: 'Employee saved successfully', code: 200 });
    })
    .catch((error) => {
      res.json({ message: 'An error Occured', error: err, code: 2000 });
    });
};

// update an employee
const update = (req, res, next) => {
  let employeeID = req.body.employeeID;

  let updateData = {
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  };

  Employee.findByIdAndUpdate(employeeID, { $set: updateData })
    .then((response) => {
      res.json({ message: 'updated successfully', code: 200 });
    })
    .catch((err) => {
      res.json({ message: 'An error Occured', error: err, code: 2000 });
    });
};

// Delete an employee

const destroy = (req, res, next) => {
  let employeeID = req.body.employeeID;
  Employee.findOneAndDelete(employeeID)
    .then((response) => {
      res.json({ message: 'deleted successfully', code: 200 });
    })
    .catch((err) => {
      res.json({ message: 'An error Occured', error: err, code: 2000 });
    });
};

module.exports = {
  index,
  show,
  update,
  destroy,
  store,
};
