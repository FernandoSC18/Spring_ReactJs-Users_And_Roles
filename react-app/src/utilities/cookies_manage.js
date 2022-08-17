 
// ######################## writeCookie By Minutes ########################
const writeCookie = (name,value,minuts) => {
  var date, expires;
  if (minuts) {
      date = new Date();
      date.setTime(date.getTime()+(minuts*60*1000));
      expires = "; expires=" + date.toGMTString();
          }else{
      expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
} 


const readCookie = (name) => { 
  var i, c, ca, nameEQ = name + "=";
  ca = document.cookie.split(';');
  for(i=0;i < ca.length;i++) {
      c = ca[i];
      while (c.charAt(0)==' ') {
          c = c.substring(1,c.length);
      }
      if (c.indexOf(nameEQ) == 0) {
          return c.substring(nameEQ.length,c.length);
      }
  }
  return '';
}

const deleteCookie = (name) => { 
  var i, c, ca, nameEQ = name + "=";
  ca = document.cookie.split(';');
  for(i=0;i < ca.length;i++) {
      c = ca[i];
      while (c.charAt(0)==' ') {
          c = c.substring(1,c.length);
      }
      if (c.indexOf(nameEQ) == 0) { 
          document.cookie = name + "=" + c.substring(nameEQ.length,c.length) + "=;expires=" + new Date().toUTCString() + ";path=/"; 
      }
  }
}

export default {
  writeCookie,
  readCookie ,
  deleteCookie 
}