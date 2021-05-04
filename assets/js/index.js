'use strict';

const newsElements = newsData.map((news) => createNews(news));
newsContainer.append(...newsElements);

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