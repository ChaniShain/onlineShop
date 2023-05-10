


//מחיקת הסל של המשתמש
localStorage.removeItem('basket2');

localStorage.removeItem('counts2');


let this_user = JSON.parse(sessionStorage.getItem('this_user'));//פרטי המשתמש הנוכחי

let title_modale = document.getElementById('staticBackdropLabel');

let model_body = document.getElementById('model_body');

//model הלוגו שמשורשר ב
let imagelogo = new Image();
imagelogo.src = "images1/logo.webp";
let url = "images1/logo.webp";
sise = 120;

//model חישוב של התאריך העתידי של המשלוח שישורשר ב  
let sendingDate = new Date();
sendingDate.setDate(sendingDate.getDate() + 7);
let d = sendingDate.getDate();
let m = sendingDate.getMonth() + 1;
let y = sendingDate.getFullYear();
let dateString = d + "/" + m + "/" + y;



title_modale.innerHTML = ` <img src=${url} width=${sise} /> <br/> הי! ${this_user[0]} ${this_user[1]}`;
model_body.innerHTML = `המשלוח יגיע אליך תוך שבעה ימים <br/> עד לתאריך: ${dateString}
                         <br/> :המשלוח יגיע לכתובת שלך<br/> ${this_user[2]}<br/> ${this_user[3]} <br/>${this_user[4]}
                         <br/> <br/>  !תודה שקניתם `;