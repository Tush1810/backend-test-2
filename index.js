const express = require('express');
const cors = require('cors');
const { hotels } = require('./hotels');

const app = express();
app.use(cors());
const port = 3000;

function sortHotels(list, sortType, key) {
  let listCopy = list;
  if (sortType === 'low-to-high' || sortType === 'least-to-most') {
    return listCopy.sort((item1, item2) => item1[key] - item2[key]);
  } else if (sortType === 'high-to-low' || sortType === 'most-to-least') {
    return listCopy.sort((item1, item2) => item2[key] - item1[key]);
  } else return listCopy;
}

function getFilteredHotels(list, filterType, key) {
  return list.filter(item => item[key].toLowerCase() === filterType.toLowerCase());
}

app.get('/hotels/sort/pricing', (req, res) => {
  res.json(sortHotels(hotels, req.query.pricing, 'price'));
});
app.get('/hotels/sort/rating', (req, res) => {
  res.json(sortHotels(hotels, req.query.rating, 'rating'));
});
app.get('/hotels/sort/pricing', (req, res) => {
  res.json(sortHotels(hotels, req.query.pricing, 'reviews'));
});
app.get('/hotels/filter/amenity', (req, res) => {
  res.json(getFilteredHotels(hotels, req.query.amenity, 'amenity'));
});
app.get('/hotels/filter/country', (req, res) => {
  res.json(getFilteredHotels(hotels, req.query.country, 'country'));
});
app.get('/hotels/filter/category', (req, res) => {
  res.json(getFilteredHotels(hotels, req.query.category, 'category'));
});
app.get('/hotels', (req, res) => {
  res.json(hotels);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
