const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = parseInt(req.params.id);

  const tour = tours.find((el) => el.id === id);

  if (!tour)
    return res.status(404).json({
      status: 'fail',
      message: 'tour not found',
    });
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const id = parseInt(req.params.id);

  const tour = tours.find((el) => el.id === id);

  if (!tour)
    return res.status(404).json({
      status: 'fail',
      message: 'tour not found',
    });

  for (let k in req.body) {
    tour[k] = req.body[k];
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.deleteTour = (req, res) => {
  const id = parseInt(req.params.id);

  const tour = tours.find((el) => el.id === id);

  if (!tour)
    return res.status(404).json({
      status: 'fail',
      message: 'tour not found',
    });

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

exports = {};
