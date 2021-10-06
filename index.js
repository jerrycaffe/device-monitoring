const app = require('./app');
const { con } = require('./database/db');
let PORT = process.env.PORT || 3000;

con();
app.listen(PORT, () => {
  console.log('Application running on PORT ' + PORT);
});
