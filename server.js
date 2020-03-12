const express = require("express");
var bodyParser = require('body-parser');

const app = express();
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'pug');
app.use(bodyParser.json());

//this keep some statistic
var change = {dataChange: 0, status: 'light', nclick: 0, n_dark_mode: 0, n_light_mode: 0};


app.get("/", (req, res) => {
  res.render("index")
});

app.post('/change', (req, res) => {
  //if null -> status is light, else body.status == 'dark'
  if(req.body.status !== null) {
    change.status = req.body.status;
    change.n_dark_mode++
  }
  else {
    change.status = 'light';
    change.n_light_mode++
  }
  change.dataChange = new Date();
  change.nclick = change.nclick+1;
  //send change
  res.send(change)
});



const server = app.listen(9000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
