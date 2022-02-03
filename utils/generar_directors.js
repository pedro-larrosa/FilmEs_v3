const mongoose = require('mongoose');
const Director = require(__dirname + '/../models/director');
mongoose.connect('mongodb://localhost:27017/FilmEs_v3', {
  useNewURLParser: true,
  useUnifiedTopology: true
});

Director.collection.drop();
let dir1 = new Director({
  nom: 'director1',
  anyNaixement: 1990
});
dir1.save();
let dir2 = new Director({
  nom: 'director2',
  anyNaixement: 1980
});
dir2.save();
let dir3 = new Director({
  nom: 'director3',
  anyNaixement: 1960
});
dir3.save();
let dir4 = new Director({
  nom: 'director4',
  anyNaixement: 1965
});
dir4.save();
let dir5 = new Director({
  nom: 'director5',
  anyNaixement: 1960
});
dir5.save();
