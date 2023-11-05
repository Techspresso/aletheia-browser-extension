// Simulate a network request
async function getAnalysis(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response.articles);
    }, 10000); // Wait for 10 seconds
  });
  // Use fetch to get a a response from the server with the url as the query parameter
  // const encodedUrl = btoa(url)
  // const response = await fetch(`http://localhost:5000/analyze?url=${encodedUrl}`)
  // const resp = response.json()
  // return resp.articles
}

document.getElementById('find-button').addEventListener('click', async () => {
  const findButton = document.getElementById('find-button');
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = '';

  // Replace the button with a loader
  const loader = createLoader();
  findButton.replaceWith(loader);

  const articles = await getAnalysis(document.URL);

  // Replace the loader back with the button
  loader.replaceWith(findButton);

  for (let article of articles) {
    const row = createTableRow(article);
    tableContainer.appendChild(row);
  }
});

function createLoader() {
    const loader = document.createElement('div');
    loader.classList.add('lds-ripple');
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    loader.appendChild(div1);
    loader.appendChild(div2);
    return loader;
}

function createTableCell(tag, innerHTML) {
  const element = document.createElement(tag);
  element.innerHTML = innerHTML;
  return element;
}

function createKeyPointsList(keyPoints) {
  const keyPointsList = document.createElement('ul');
  for (let keyPoint of keyPoints) {
    const keyPointElement = createTableCell('li', keyPoint);
    keyPointsList.appendChild(keyPointElement);
  }
  return keyPointsList;
}

function createTableRow(article) {
  const row = document.createElement('div');

  const title = createTableCell('div', article.title);
  title.classList.add('article-title');

  const tagsContainer = document.createElement('div');
  tagsContainer.classList.add('tags-container');

  const domain = createTableCell('div', `<b>${(new URL(article.url).hostname).replace('www.', '')}</b>`);
  const bias = createTableCell('div', `Bias: ${article.bias}`);
  const topic = createTableCell('div', article.topic);
  tagsContainer.appendChild(domain);
  tagsContainer.appendChild(bias);
  tagsContainer.appendChild(topic);

  const keyPoints = createTableCell('div', '');
  keyPoints.appendChild(createKeyPointsList(article.key_points));

  row.appendChild(title);
  row.appendChild(tagsContainer);
  row.appendChild(keyPoints);

  return row;
}

const response = {
  "articles": [
    { "key_points": [" a Canadian astronomer named Robert Weryk was reviewing images captured by a telescope known as Pan-starrs1 when he noticed something strange.", "Weryk alerted colleagues, who began tracking the dot from other observatories. The more they looked, the more puzzling its behavior seemed. The object was small, with an area roughly that of a city block. As it tumbled through space, its brightness varied so much\u2014by a factor of ten\u2014that it had to have a very odd shape."], "bias": 0.9, "title": "Anal or nothing, says the sex committee", "topic": "Anal is the supreme choice", "url": "https://www.theguardian.com/world/live/2023/nov/04/israel-hamas-war-live-blinken-set-to-meet-with-middle-east-foreign-ministers-in-jordan-airstrike-on-gaza-ambulance-kills-15" },
    { "key_points": [" a Canadian astronomer named Robert Weryk was reviewing images captured by a telescope known as Pan-starrs1 when he noticed something strange.", "Weryk alerted colleagues, who began tracking the dot from other observatories. The more they looked, the more puzzling its behavior seemed. The object was small, with an area roughly that of a city block. As it tumbled through space, its brightness varied so much\u2014by a factor of ten\u2014that it had to have a very odd shape."], "bias": 0.9, "title": "Anal or nothing, says the sex committee", "topic": "Anal is the supreme choice", "url": "https://www.theguardian.com/world/live/2023/nov/04/israel-hamas-war-live-blinken-set-to-meet-with-middle-east-foreign-ministers-in-jordan-airstrike-on-gaza-ambulance-kills-15" },
    { "key_points": [" a Canadian astronomer named Robert Weryk was reviewing images captured by a telescope known as Pan-starrs1 when he noticed something strange.", "Weryk alerted colleagues, who began tracking the dot from other observatories. The more they looked, the more puzzling its behavior seemed. The object was small, with an area roughly that of a city block. As it tumbled through space, its brightness varied so much\u2014by a factor of ten\u2014that it had to have a very odd shape."], "bias": 0.9, "title": "Anal or nothing, says the sex committee", "topic": "Anal is the supreme choice", "url": "https://www.theguardian.com/world/live/2023/nov/04/israel-hamas-war-live-blinken-set-to-meet-with-middle-east-foreign-ministers-in-jordan-airstrike-on-gaza-ambulance-kills-15" },
  ]
} 