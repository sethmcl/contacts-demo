// Barebones server to serve demo app
var express = require('express'),
    path    = require('path'),
    app     = express(),
    html    = path.resolve(__dirname, 'index.html');

app.use('/js', express.static(path.resolve(__dirname, 'js')));
app.use('/css', express.static(path.resolve(__dirname, 'css')));
app.use('/img', express.static(path.resolve(__dirname, 'img')));

app.get('/:route', serveApp);
app.get('/', serveApp);

function serveApp(request, response) {
  response.sendfile(html);
}

app.listen(4545);

console.log('Server running at http://localhost:4545');
