const endpoint = 'http://localhost:5000';
// Simulate a network request
async function getAnalysis(url) {
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(response.articles);
  //   }, 1000);
  // });
  // Use fetch to get a a response from the server with the url as the query parameter
  const encodedUrl = btoa(url)
  const response = await fetch(`${endpoint}?q=${encodedUrl}`)
  const resp = await response.json()
  const currentArticle = resp.articles.find(article => article.url === url)
  const otherArticles = resp.articles.filter(article => article.url !== url).sort((a, b) => a.bias - b.bias);
  return { currentArticle, otherArticles }
}

document.getElementById('find-button').addEventListener('click', async () => {
  const findButton = document.getElementById('find-button');
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = '';

  // Replace the button with a loader
  const loader = createLoader();
  findButton.replaceWith(loader);

  try {
    const { currentArticle, otherArticles } = await getAnalysis(await getCurrentUrl());

    tableContainer.appendChild(createElement('h2', 'My analysis of the article you are reading:'));
    let row = createTableRow(currentArticle);
    tableContainer.appendChild(row);

    tableContainer.appendChild(createElement('h2', 'I found these other articles on a similar topic:'));
    for (let article of otherArticles) {
      row = createTableRow(article);
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

function createElement(tag, innerHTML) {
  const element = document.createElement(tag);
  element.innerHTML = innerHTML;
  return element;
}

function createKeyPointsList(keyPoints) {
  const keyPointsList = document.createElement('ul');
  for (let keyPoint of keyPoints) {
    const keyPointElement = createElement('li', keyPoint);
    keyPointsList.appendChild(keyPointElement);
  }
  return keyPointsList;
}

function createTableRow(article) {
  const row = document.createElement('div');

  const title = createElement('a', article.title);
  title.href = article.url;
  title.classList.add('article-title');
  row.appendChild(title);

  const tagsContainer = document.createElement('div');
  tagsContainer.classList.add('tags-container');

  const domain = createElement('div', `<b>${(new URL(article.url).hostname).replace('www.', '')}</b>`);
  const bias = createBiasTag(article.bias);
  tagsContainer.appendChild(domain);
  tagsContainer.appendChild(bias);
  row.appendChild(tagsContainer);

  const topic = createElement('div', `<b>Detected Topic:</b> ${article.topic}`);
  row.appendChild(topic);

  const keyPoints = createElement('div', '');
  keyPoints.appendChild(createKeyPointsList(article.key_points));

  row.appendChild(keyPoints);

  return row;
}

function createBiasTag(bias) {
  const biasTag = document.createElement('div');
  biasTag.classList.add('bias-tag');
  biasTag.style.backgroundColor = getBiasColor(bias);
  biasTag.innerHTML = bias;
  return biasTag;
}

function getBiasColor(biasScore) {
  const red = Math.round(biasScore * 25.5);
  const green = Math.round((10 - biasScore) * 25.5);
  return `rgb(${red}, ${green}, 0)`;
}

const response = {
  "currentArticle": {
    "bias": 8,
    "key_points": [
      "The testimony from the Covid inquiry shows Boris Johnson was completely unfit to be Prime Minister during the pandemic. He was indecisive, unethical and negligent.",
      "Those around Johnson, like his cabinet secretary and scientific advisors, recognized how incompetent he was but failed to restrain him.",
      "The systems meant to check a bad leader, like the cabinet and civil service, utterly failed to do so. This allowed Johnson's incompetence to result in needless harm."
    ],
    "title": "When Britain most needed a decent leader, we had a derelict at the helm",
    "topic": " \nTestimony from the Covid inquiry provides damning evidence of Boris Johnson's unfitness to be prime minister during the pandemic.\n",
    "url": "https://www.theguardian.com/commentisfree/2023/nov/04/when-britain-needed-a-decent-leader-we-had-a-derelict-at-the-helm-boris-johnson"
  },
  "otherArticles": [
    {
      "bias": 5,
      "key_points": [
        "Boris Johnson agreed with some Tory MPs who thought Covid was \"nature's way of dealing with old people\", according to diary entries by former chief scientific adviser Sir Patrick Vallance.",
        "Ex-adviser Dominic Cummings told the inquiry the government had no plan for the pandemic and was in \"complete chaos\".",
        "The inquiry was shown offensive messages sent by Mr Cummings about cabinet ministers and top officials during the pandemic."
      ],
      "title": "Boris Johnson thought old people should accept Covid fate, inquiry told",
      "topic": " \nTestimony from the Covid inquiry provides damning evidence of Boris Johnson's unfitness to be prime minister during the pandemic.\n",
      "url": "https://www.bbc.com/news/uk-politics-67278517"
    },
    {
      "bias": 8,
      "key_points": [
        "Boris Johnson told advisers that Covid was \"nature's way of dealing with old people\" and he didn't believe the NHS was overwhelmed.",
        "Patrick Vallance's diary said Johnson was \"obsessed with older people accepting their fate\" during the pandemic.",
        "Vallance also wrote that the chief whip said \"we should let the old people get it and protect others\", which Johnson agreed with."
      ],
      "title": " Boris Johnson favoured ‘older people accepting their fate’, Covid inquiry hears",
      "topic": " \nTestimony from the Covid inquiry provides damning evidence of Boris Johnson's unfitness to be prime minister during the pandemic.\n",
      "url": "https://www.theguardian.com/uk-news/2023/oct/31/boris-johnson-favoured-older-people-accepting-their-fate-covid-inquiry-hears"
    }
  ]
} 