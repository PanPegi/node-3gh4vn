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
  /* 
 res.write('<h1>cc</h1>');
  res.write('</body>');
  res.write('<a href="/stats">Statistika</a>');
  res.write('<br>');
  res.write('<a href="/spse.html">ustavek</a>');
  res.write('<br>');
  res.write('<a href="/profile">profil</a>');
  */

  res.write('<br>');
  res.write('<a href="/rada">fakt dobra rada</a>');
  res.write('<br>');
  res.write('<a href="/id_rada">poucka pro kamarada</a>');

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

app.get(`/rada`, async (req, res) => {
  const udaje = await axios.get('https://api.adviceslip.com/advice');

  res.write('<!DOCTYPE HTML>');
  res.write('<html lang ="cs">');
  res.write('<head>');
  res.write('<meta charset="UTF-8">');
  res.write('</head>');

  res.write('<a href="/rada">dalsi rada</a>');
  res.write('<br>');
  res.write('<a href="../">menu </a>');
  res.write('<br>');

  res.write(`<h1>id:${udaje.data.slip.id}</h1>`);
  res.write('<br>');
  res.write(`<h1>moudro dne:${udaje.data.slip.advice}</h1>`);
  res.write('<br>');

  res.write('</html>');
  res.end();
});

app.get(`/id_rada`, async (req, res) => {
  const min = 1,
    max = 224;

  var id = 5;

  const udaje = await axios.get(`https://api.adviceslip.com/advice/${id}`);

  res.write('<!DOCTYPE HTML>');
  res.write('<html lang ="cs">');
  res.write('<head>');
  res.write('<meta charset="UTF-8">');
  res.write('</head>');

  res.write('<a href="/rada">dalsi rada</a>');
  res.write('<br>');
  res.write('<a href="../">menu </a>');
  res.write('<br>');

  if (id >= min && id <= max) {
    res.write(`<h1>id:${udaje.data.slip.id}</h1>`);
    res.write('<br>');
    res.write(`<h1>moudro dne:${udaje.data.slip.advice}</h1>`);
    res.write('<br>');
  } else {
    res.write(`<h1>zadejte hodnoty mezi ${min} a ${max}</h1>`);
    res.write('<br>');
  }

  res.write('</html>');
  res.end();
});

app.listen(3000, () => {
  console.log(`cau`);
});
