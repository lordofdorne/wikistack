const express = require('express');
const morgan = require('morgan');
const app = express();
const layout = require('./views/layout.js');
const models = require('./models');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  const page = layout('');
  res.send(page);
})

const PORT = 3000;
const init = async () => {
  await models.db.sync({force: true});
  // await models.User.sync({force: true});
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
  models.db.authenticate().then(() => {
    console.log('connected to the database');
  });
}

init();






