document.getElementById('find-button').addEventListener('click', () => {
  const tableContainer = document.getElementById('table-container');
  tableContainer.appendChild(createTableWithHeader());
  const tableBody = document.querySelector('tbody');
  const articles = response.articles;
  for (let article of articles) {
    const row = createTableRow(article);
    tableBody.appendChild(row);
  }
});

function createTableWithHeader() {
  // Create table
  const table = document.createElement('table');

  // Create table header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headers = ['Title', 'Bias', 'Topic', 'Key Points'];

  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);

  return table;
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
  const row = document.createElement('tr');
  const title = createTableCell('td', article.title);
  const bias = createTableCell('td', article.bias);
  const topic = createTableCell('td', article.topic);
  const keyPoints = createTableCell('td', '');
  keyPoints.appendChild(createKeyPointsList(article.key_points));

  row.appendChild(title);
  row.appendChild(bias);
  row.appendChild(topic);
  row.appendChild(keyPoints);

  return row;
}

function tableComponent() {
  return {
      items: [],
      populateTable() {
          // This should be replaced with an actual data fetching from an API
          this.items = [
              { id: 1, name: 'John Doe', email: 'john@example.com' },
              { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
              { id: 3, name: 'Terry Adams', email: 'terry@example.net' },
              { id: 4, name: 'Sandy Cheeks', email: 'sandy@example.org' }
          ];
      }
  }
}

const response = {
  "articles": [
    { "key_points": [" a Canadian astronomer named Robert Weryk was reviewing images captured by a telescope known as Pan-starrs1 when he noticed something strange.", "Weryk alerted colleagues, who began tracking the dot from other observatories. The more they looked, the more puzzling its behavior seemed. The object was small, with an area roughly that of a city block. As it tumbled through space, its brightness varied so much\u2014by a factor of ten\u2014that it had to have a very odd shape."], "bias": 0.9, "title": "Anal or nothing, says the sex committee", "topic": "Anal is the supreme choice" },
    { "key_points": [" a Canadian astronomer named Robert Weryk was reviewing images captured by a telescope known as Pan-starrs1 when he noticed something strange.", "Weryk alerted colleagues, who began tracking the dot from other observatories. The more they looked, the more puzzling its behavior seemed. The object was small, with an area roughly that of a city block. As it tumbled through space, its brightness varied so much\u2014by a factor of ten\u2014that it had to have a very odd shape."], "bias": 0.9, "title": "Anal or nothing, says the sex committee", "topic": "Anal is the supreme choice" },
    { "key_points": [" a Canadian astronomer named Robert Weryk was reviewing images captured by a telescope known as Pan-starrs1 when he noticed something strange.", "Weryk alerted colleagues, who began tracking the dot from other observatories. The more they looked, the more puzzling its behavior seemed. The object was small, with an area roughly that of a city block. As it tumbled through space, its brightness varied so much\u2014by a factor of ten\u2014that it had to have a very odd shape."], "bias": 0.9, "title": "Anal or nothing, says the sex committee", "topic": "Anal is the supreme choice" },
  ]
} 