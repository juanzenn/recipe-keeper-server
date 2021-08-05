if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import { createClient } from '@supabase/supabase-js';
import { shuffle } from './lib/helpers';

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API_KEY
);

async function fetchReviews() {
  const { data } = await supabase.from('reviews').select().eq('positive', true);
  const allReviews = await shuffle(data).slice(0, 4);

  return allReviews;
}

async function addReview(author, review, positive = null) {
  const { data, error } = await supabase.from('reviews').insert([
    {
      author: author,
      review: review,
      positive: positive,
    },
  ]);

  return { data, error };
}

async function seedTable(seed, table) {
  const { data, error } = await supabase.from(table).insert(seed);

  return { data, error };
}

export { fetchReviews, seedTable, addReview };
