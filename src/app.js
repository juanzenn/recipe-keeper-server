// import seed from './seed';

// Seed the database with mockupdata
// app.post('/reviews/seed', async (req, res) => {
//   const { data, error } = await seedTable(seed, 'reviews');
//   if (error) {
//     console.log('ERROR');
//     console.error(error.message);
//     res.status(500);
//     res.send(error);
//     return;
//   }
//   console.log('Seeding was successful');
//   res.send(data);
// });

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import express from 'express';

// Import my functions query
import { fetchReviews, seedTable, addReview } from './supabase-client';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Get reviews
app.get('/reviews', async (req, res) => {
  try {
    const reviews = await fetchReviews();

    res.send(reviews);
  } catch (error) {
    res.status(500);
    res.send('There is an error with Supabase');
  }
});

// Upload a review
app.post('/reviews', async (req, res) => {
  try {
    const { data, error } = await addReview(
      req.body.author,
      req.body.review,
      req.body.positive
    );

    if (error) {
      console.log('ERROR');
      console.error(error.message);
      res.status(500);
      res.send(error);
      return;
    }

    console.log('Your review was added. Thank you.');
    res.send(data);
  } catch (error) {
    console.log('ERROR');
    console.error(error.message);
    res.status(500);
    res.send(error);
    return;
  }
});

app.listen(port, () => {
  console.log(`The app is running on http://localhost:${port}`);
});
