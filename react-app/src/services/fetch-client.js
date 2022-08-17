//import CookieManage from '../utilities/cookies_manage'

const urlBase = 'http://localhost:8080'  

/**
 * @param {string}  url url a la cual consultar
 * esta funcion detecta si es una nueva url base (comienza con http:// o https://).
 * en caso de ser asi, retorna la url. en caso contrario, se asume que es un fragmento
 * de path por lo que se concatena con la constante urlBase
 **/
const readUrl = (url = '') =>
  url.startsWith('http://') || url.startsWith('https://') ? url : `${urlBase}/${url}`

const get = (url = '', headers = {}) => fetch(readUrl(url), {
  method: 'GET', 
  headers: {
    Accept: 'application/json', 
    'Content-Type': 'application/json', 
    ...headers 
  }
}).then(async response => {
  const textResult = await response.text().then((text) => text) 
  return { code: response.status, body: textResult }
}) 

const post = (url = '', body = {}, headers = {}) => fetch(readUrl(url), {
  method: 'POST', 
  body: JSON.stringify(body),
  headers: {
    Accept: 'application/json', 
    'Content-Type': 'application/json', 
    ...headers
  }
}).then(async response => { 
  const textResult = await response.text().then((text) => text) 
  return { code: response.status, body: textResult }
}) 

const put = (url = '', body = {}, headers = {}) => fetch(readUrl(url), {
  method: 'PUT', 
  body: JSON.stringify(body),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json', 
    ...headers
  }
}).then(async response => { 
  const textResult = await response.text().then((text) => text) 
  return { code: response.status, body: textResult }
}) 

const del = (url = '', body = {}, headers = {}) => fetch(readUrl(url), {
  method: 'DELETE', 
  body: JSON.stringify(body),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json', 
    ...headers
  }
}).then(async response => { 
  const textResult = await response.text().then((text) => text) 
  return { code: response.status, body: textResult }
}) 

const headers = ( ) => {
  return {
      'Authorization' : localStorage.token
  } 
} 

export default {
  get,
  post,
  put,
  delete: del,
  headers
}