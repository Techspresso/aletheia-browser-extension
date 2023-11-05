const endpoint = 'http://localhost:5000';
// Simulate a network request
async function getAnalysis(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response.articles);
    }, 1000);
  });
  // Use fetch to get a a response from the server with the url as the query parameter
  // const encodedUrl = btoa(url)
  // const response = await fetch(`${endpoint}?q=${encodedUrl}`)
  // const resp = await response.json()
  // return resp.articles
}

document.getElementById('find-button').addEventListener('click', async () => {
  const findButton = document.getElementById('find-button');
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = '';

  // Replace the button with a loader
  const loader = createLoader();
  findButton.replaceWith(loader);

  try {
    const articles = await getAnalysis(await getCurrentUrl());

    for (let article of articles) {
      const row = createTableRow(article);
      tableContainer.appendChild(row);
    }
  } catch (error) {
    tableContainer.innerHTML = `<p class="error">Error: ${error.message}</p>`;
  } finally {
    loader.replaceWith(findButton);
  }
});

async function getCurrentUrl() {
  try {
    const url = await getCurrentTabUrl();
    console.log(url);
    return url;
  } catch (error) {
    console.error('Error fetching the current tab URL: ', error);
  }
}

function getCurrentTabUrl() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (chrome.runtime.lastError) {
        return reject(new Error(chrome.runtime.lastError));
      }
      var currentTab = tabs[0];
      resolve(currentTab.url);
    });
  });
}

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
  articles: [
    {
      "bias": 5,
      "key_points": [
        "The Hamas",
        "run health ministry in Gaza says over 30 people were killed in an Israeli strike on a refugee camp. Hamas says most victims were women and children.",
        "There is growing pressure for a ceasefire as the conflict enters its 5th week. The US is pushing for a \"humanitarian pause\" though differences remain with Arab allies on the need for an immediate ceasefire.",
        "Protests against Israeli actions took place in London and Washington DC over the weekend, with thousands participating.",
        "Clashes between Israeli forces and Palestinians continued across the occupied West Bank.",
        "Israel's ground offensive in Gaza is meeting stiffer resistance than expected, with ambushes and attacks inflicting casualties. Questions remain over whether war aims can be achieved.",
        "Biden suggested some progress in US efforts to get Israel to agree to a pause in strikes, but gave no specifics. His comment came after the US Secretary of State met Arab counterparts."
      ],
      "title": "Biden says progress being made towards a ‘pause’ in fighting – as it happened",
      "topic": "  Progress towards a ceasefire in the Israel-Hamas conflict",
      "url": "https://www.theguardian.com/world/live/2023/nov/04/israel-hamas-war-live-blinken-set-to-meet-with-middle-east-foreign-ministers-in-jordan-airstrike-on-gaza-ambulance-kills-15#top-of-blog"
    },
    {
      "bias": 3,
      "key_points": [
        "A ceasefire has been reached between Israel and Hamas in Gaza, ending 11 days of fighting.",
        "At least 243 people were killed in Gaza and 12 in Israel during the clashes.",
        "Hamas claims Israel agreed to lift restrictions on al",
        "Aqsa mosque in Jerusalem and the Sheikh Jarrah neighborhood. Israel denies this.",
        "The ceasefire went into effect at 2am local time on Friday.",
        "The ceasefire terms are not public, but were negotiated with help from Egypt, Qatar, the US and UN.",
        "It's unclear how long the ceasefire will last. There are still underlying issues between Israel and Palestinians that remain unresolved.",
        "Previous ceasefires between Israel and Hamas have eventually broken down and fighting has resumed.",
        "World leaders have welcomed the ceasefire and hope it leads to a permanent end to hostilities. But long",
        "term peace likely requires addressing core disputes."
      ],
      "title": "Israel-Gaza: The ceasefire deal between Israel and Hamas",
      "topic": "  Progress towards a ceasefire in the Israel-Hamas conflict",
      "url": "https://www.bbc.com/news/57200843"
    }
  ]
} 