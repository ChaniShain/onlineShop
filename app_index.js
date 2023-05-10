


const form = document.getElementById('form');
const modal_print = document.getElementById('modal_print');



//enter פונקציה ששולחת את ערך החיפוש כשהמשתמש מקיש 

document.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    let product = form.product_search.value;
    sessionStorage.setItem('func', 'print_Search');//משתנה שתפקידו להפעיל פונקציה מסןוימת בדף הבא
    sessionStorage.setItem('search', product);//ערך החיפוש
    let url = new URL(location);// של הדף הבא בתוספת הערך לחיפוש url
    url.searchParams.append('category', product);
    url.pathname = '/page2.html';
    location.href = url;
  }
});

//פונקציה ששולחת את ערך החיפוש כשהמשתמש לוחץ על לחצן החיפוש
const func_search = () => {
  let product = form.product_search.value;
  sessionStorage.setItem('func', 'print_Search');
  sessionStorage.setItem('search', product);
  let url = new URL(location);
  url.searchParams.append('category', product);
  url.pathname = '/page2.html';
  location.href = url;

}

//פונקציה ששולחת את הקטגוריה לאחר שהמשתמש לחץ על קישור
const func_links = (link) => {
  let link_name = link;
  sessionStorage.setItem('func', 'print_All');
  sessionStorage.setItem('category_name', link_name);
  let url = new URL(location);      // של הדף הבא בתוספת הקטגוריה url
  url.searchParams.append('category', link_name);
  url.pathname = '/page2.html';
  location.href = url;
}



// חיפוש קולי

const voice_search = document.getElementById('voice_search');
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
let item;

let items = [];

let recognition = new SpeechRecognition();//הקלטה חדשה


recognition.continuous = false;//הפסקת ההקלטה
recognition.lang = 'he-IL';//שפה
recognition.interimResults = false;//לא להמשיך לעוד אירועים באותו זמן
recognition.maxAlternatives = 1;//כמה נתונים יחזרו



voice_search.onclick = function () {
  modal_print.innerHTML = 'אמור באופן ברור את שם המוצר ';
  recognition.start();//הקלטה

}
//ביצוע הפעולה
recognition.onresult = function (event) {
  item = event.results[0][0].transcript;

      recognition.onspeechend = function () {
        recognition.stop();
      }

  modal_print.innerHTML = '';

  // שמירה מה המוצר הנוכחי ואיזה פונקציה תופעל 
  sessionStorage.setItem('func', 'print_Search');
  sessionStorage.setItem('search', item);
  let url = new URL(location);
  url.searchParams.append('category', item);
  url.pathname = '/page2.html';
  location.href = url;
}


