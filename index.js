const app = require('./app');
let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Application running on PORT ' + PORT);
});
