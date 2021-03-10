const mongoose = require('mongoose')

const connectionURL = process.env.mongoUri;

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, function (error) {
  if (error) {
    console.log('There is error in connection')
  } else {
    console.log('connect to database')
  }
});