'use strict';

const formCreate = document.getElementById('createNews');
const newsContainer = document.querySelector('.news')


// const newsElements = newsData.map((news) => createNews(news));
// newsContainer.append(...newsElements);
renderNews(newsContainer, newsData);
formCreate.addEventListener('submit', addNews)

function addNews(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const newItem = {};
  // console.log(dataArray)
  for (const [name, value] of data) {
    newItem[name] = value;
  }
  newItem.date=getDate();

};


function renderNews(rootElem, array) {
  const newsElements = array.map((news) => createNews(news));
  rootElem.append(...newsElements);
}

function createNews({ title, date, content }) {
  return createElement(
    "article",
    { classNames: ["newsWrap"] },
    createElement('h3', { classNames: ["newsTitle"] }, document.createTextNode(title || "")),
    createElement('span', { classNames: ["newsDate"] }, document.createTextNode(date || "")),
    createElement('p', { classNames: ["newsContent"] }, document.createTextNode(content || "")));
}

function createElement(
  tagName,
  { classNames = [], handlers = {}, attributes = {} } = {},
  ...children
) {
  const elem = document.createElement(tagName);
  elem.classList.add(...classNames);

  for (const [attrName, attrValue] of Object.entries(attributes)) {
    elem.setAttribute(attrName, attrValue);
  }

  for (const [eventType, eventHandler] of Object.entries(handlers)) {
    elem.addEventListener(eventType, eventHandler);
  }

  elem.append(...children);
  return elem;
}

// UTILS
function getDate() {
  function format(m) {
     let f = new Intl.DateTimeFormat('en', m);
     return f.format(new Date);
  }
  return [{ day: 'numeric' }, { month: 'short' }, { year: 'numeric' }].map(format).join('-');
}
