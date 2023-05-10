
let form = document.querySelector('#user');
let sumbit_button = document.getElementById('sumbit_button');
sum = sessionStorage.getItem('sum');
let sumToPay = document.getElementById('sumToPay');
let title_modale = document.getElementById('staticBackdropLabel');
let model_body = document.getElementById('model_body');


const h2 = document.createElement('h2');
h2.innerHTML += ` הסכום לתשלום כולל משלוח : ${sum} ש"ח`;
sumToPay.append(h2);

//בדיקות תקינות של הקלט
form.firstname.onkeypress = (event) => {
    if ((event.key < 'א' || event.key > 'ת') && !' -'.includes(event.key)) {
        event.preventDefault();
    }
}

form.lastname.onkeypress = (event) => {
    if ((event.key < 'א' || event.key > 'ת') && !' -'.includes(event.key)) {
        event.preventDefault();
    }
}

form.tel.onkeypress = (event) => {
    if (event.key < '0' || event.key > '9') {
        event.preventDefault();
    }
}

form.city.onkeypress = (event) => {
    if ((event.key < 'א' || event.key > 'ת') && !' -'.includes(event.key)) {
        event.preventDefault();
    }
}

form.credit_card.onkeypress = (event) => {
    if (event.key < '0' || event.key > '9') {
        event.preventDefault();
    }
    let x = form.credit_card.value.length;
    if (x == 4 || x == 9 || x == 14) {
        form.credit_card.value += "-";
    }

}
sessionStorage.removeItem('this_user');
let users = JSON.parse(localStorage.getItem('users')) || [];//מערך של המשתמשים הקימים במערכת

let this_user = JSON.parse(sessionStorage.getItem('this_user')) || [];//נתוני המשתמש הנוכחי

//בדיקת תקינות נוספת לאחר מילוי הטופס
const check = () => {
    if (form.tel.value.length > 10 || form.tel.value.length < 7) {
        form.tel.value = "";
        alert('מספר הטלפון אינו תקין , נסו שוב! 📞')
        return false;

    }
    //מספר אשראי חיב 16 ספרות + 3 מקפים שמושלמים אוטומטית
    if (form.credit_card.value.length != 19) {
        form.credit_card.value = "";
        alert('מספר האשראי אינו תקין , נסו שוב! 💳')
        return false;
       
    }
 

}
// בדיקת תקינות של סיסמא
const password_check=()=>{
    if(form.password.value.length<6){
        form.password.value="";
    alert('הסיסמא צריכה להיות באורך של 6 תווים לפחות')
    }
 else{
    //אם הסיסמא כבר קימת במערכת
    for (let i = 0; i < users.length; i++) {
      if(form.password.value==users[i].password_){
          form.password.value="";
          alert('הסיסמא שבחרת לא מתאפשרת ,בחר סיסמא חדשה')
        
}}
}}
//הפונקיה תפעל כשמשתמש ממלא את הסיסמא והמיל ועוזב את שדה הקלט 
// הפונקציה מחפשת במערך המשתמשים אם יש משתמש עם אותה  סיסמא ואותה כתובת מייל
// ואם כן היא משלימה לו את יתר הפרטים האישיים
email.addEventListener("change", change_form);
password.addEventListener("change", change_form);
let flag = false;
function change_form() {
    for (let i = 0; i < users.length; i++) {
        if (form.password.value === users[i].password_ &&form.email.value===users[i].email_) {
            form.firstname.value = users[i].firstname_;
            form.lastname.value = users[i].lastname_;
            form.city.value = users[i].city_;
            form.street.value = users[i].street_;
            form.floor.value = users[i].floor_;
            form.tel.value = users[i].tel_;
            form.credit_card.value = users[i].credit_card_;
            flag = true;
            
            sumbit_button.onclick = () => {
                check();
                if(form.password.value!= users[i].password_){//ז"א שהמשתמש שינה את הסיסמא
                    password_check();
                }
                let user = {//עדכון פרטי המשתמש
                    password_: form.password.value,
                    email_: form.email.value,
                    firstname_: form.firstname.value,
                    lastname_: form.lastname.value,
                    city_: form.city.value,
                    street_: form.street.value,
                    floor_: form.floor.value,
                    tel_: form.tel.value,
                    credit_card_: form.credit_card.value
                };

                this_user.push(form.firstname.value);
                this_user.push(form.lastname.value);
                this_user.push(form.city.value);
                this_user.push(form.street.value);
                this_user.push(form.floor.value);
                users[i] = user;//עדכון פרטים של המשתמש הנוכחי
                localStorage.setItem('users', JSON.stringify(users));
                sessionStorage.setItem('this_user', JSON.stringify(this_user));

            }
        }
    }
    if (flag != true) {//ז"א שהמשתמש לא קים במערכת
        sumbit_button.onclick = () => {
            
           if(check()==true){
               password_check();
           }
            let user = {
                password_: form.password.value,
                email_: form.email.value,
                firstname_: form.firstname.value,
                lastname_: form.lastname.value,
                city_: form.city.value,
                street_: form.street.value,
                floor_: form.floor.value,
                tel_: form.tel.value,
                credit_card_: form.credit_card.value
            };


            this_user.push(form.firstname.value);
            this_user.push(form.lastname.value);
            this_user.push(form.city.value);
            this_user.push(form.street.value);
            this_user.push(form.floor.value);

          //מוסיפים את המשתמש למערכת
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            sessionStorage.setItem('this_user', JSON.stringify(this_user));

        }
    }
}



/// :פונקציות של תפריט עליון 
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
  