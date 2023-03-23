import express from 'express';
import axios from 'axios';

const app = express();
app.use('/spse.html', express.static('spse.html'));
app.use('/styl.css', express.static('styl.css'));
app.use('/uzasnak.png', express.static('uzasnak.png'));

app.get('/', (req, res) => {
  res.write('<!DOCTYPE HTML>');
  res.write('<html lang ="cs">');
  res.write('<head>');
  res.write('<meta charset="UTF-8">');
  res.write('</head>');

  res.write('<body>');
  res.write('<h1>cc</h1>');
  res.write('</body>');
  res.write('<a href="/stats">Statistika</a>');
  res.write('<br>');
  res.write('<a href="/spse.html">ustavek</a>');
  res.write('<br>');
  res.write('<a href="/profile">profil</a>');

  res.write('</html>');
  res.end();
});

app.get('/stats', (req, res) => {
  res.json({
    who: 'vojta',
    gpa: 2,
  });
});

app.get(`/profile`, async (req, res) => {
  const gh = await axios.get('https://api.github.com/users/panpegi');

  res.write('<!DOCTYPE HTML>');
  res.write('<html lang ="cs">');
  res.write('<head>');
  res.write('<meta charset="UTF-8">');
  res.write('</head>');

  res.write(`<h1>${gh.data.login}</h1>`);
  res.write('<br>');
  res.write(`<img src="${gh.data.avatar_url}"width="150px" height="150px" />`);
  res.write('<br>');
  res.write(`<h1>${gh.data.bio}</h1>`);
  res.write('<br>');

  res.write('</html>');
  res.end();
});

app.listen(3000, () => {
  console.log(`cau`);
});
