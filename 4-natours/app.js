const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'Hello from the other ssiiiiide!',
//     app: 'Natours',
//   });
// });
// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
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
});

app.get('/api/v1/tours/:id', (req, res) => {
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
});

app.patch('/api/v1/tours/:id', (req, res) => {
  // console.log(req.params);

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
      tour: `Updated tour ${id}`,
    },
  });
});
app.delete('/api/v1/tours/:id', (req, res) => {
  // console.log(req.params);

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
});

// app.get('/api/v1/users');
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
