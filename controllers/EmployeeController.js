const Employee = require('../models/Employee');

// Show the list of Employee
const index = (req, res, next) => {
  if (req.query.page && req.query.limit) {
    Employee.paginate({}, { page: req.query.page, limit: req.query.limit })
      .then((response) => {
        res.json({ response });
      })
      .catch((err) => {
        res.json({ message: 'An error Occured' + err });
      });
  } else {
    Employee.find()
      .then((response) => {
        res.json({ response });
      })
      .catch((err) => {
        res.json({ message: 'An error Occured' + err });
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
      res.json({ message: 'An error Occured', error: err });
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
      res.json({ message: 'Employee saved successfully' });
    })
    .catch((error) => {
      res.json({ message: 'An error Occured', error: err });
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
      res.json({ message: 'updated successfully' });
    })
    .catch((err) => {
      res.json({ message: 'An error Occured', error: err });
    });
};

// Delete an employee

const destroy = (req, res, next) => {
  let employeeID = req.body.employeeID;
  Employee.findOneAndDelete(employeeID)
    .then((response) => {
      res.json({ message: 'deleted successfully' });
    })
    .catch((err) => {
      res.json({ message: 'An error Occured', error: err });
    });
};

module.exports = {
  index,
  show,
  update,
  destroy,
  store,
};
