const app = require('./app')
const POST = process.env.POST || 5003;

// listen post
app.listen(POST, () => {
    console.log('server runing in post ' + POST);
});

// api