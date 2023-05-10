

let basket = JSON.parse(localStorage.getItem('basket')) || [];//משתנה  מקומי לסל
let which_func = sessionStorage.getItem('func');//משתנה שמקבל איזו פונקציה צריכה להתבצע
const link_name = sessionStorage.getItem('category_name');//משתנה שמקבל מה הקטגוריה הנוכחית
const search = sessionStorage.getItem('search');//משתנה עם ערך החיפוש הנוכחי
//Url:
const url = new URL(location);
const category = url.searchParams.get('category');

const printProducts = (basket) => {// which_func : הפונקציה בודקת לפי משתנה  
    //  איזו פונקציה צריכה להתבצע ושולחת בהתאם אליה את המוצרים להדפסה
    for (let i = 0; i < basket.length; i++) {
        if (which_func == 'print_All') {//ז"א הדפסת כל המוצרים בקטגוריה הנוכחית
            if (basket[i].category.includes(link_name)) {
                print(basket[i]);
            }
        }
        else {//ז"א הדפסת התוצאות שהגיעו מחיפוש
            if (basket[i].name.includes(search)) {
                print(basket[i]);
            }
        }
    }
    //אחרי שהפעולה הסתימה מאפסים את המשתנים בשביל הפעם הבאה
    sessionStorage.removeItem('category_name');
    sessionStorage.removeItem('func');
}
//:הדפסת המוצרים 
const print = (basket) => {
    let image = document.createElement('img');
    let div = document.createElement('div');
    let h2 = document.createElement('h2');
    let h3 = document.createElement('h3');
    let h4 = document.createElement('h3');
    let button = document.createElement('button');

    h2.innerHTML = basket.name;
    h3.innerHTML = basket.ditales;
    h4.innerHTML = basket.price;
    image.src = basket.product_image;
    button.innerHTML = ' לצפייה מהירה --->🛒';
    div.classList.add('h2', 'h3', 'h4', 'button', `div`);
    div.append(image, h2, h3, h4, button);
    let a = document.createElement('a');
    a.append(div);
    div.classList.add('a');
    product.append(a);
     //כשלוחצים על מוצר נוצר קישור לעמוד הבא כולל הנתונים של המוצר 
    a.onclick = () => {
        const specific_product = basket;
        sessionStorage.setItem('specific_product', JSON.stringify(specific_product));//המוצר הנוכחי
        localStorage.setItem('basket', JSON.stringify(basket));
        let url = new URL(location);
        url.pathname = 'page3.html';
        url.searchParams.append('product', specific_product.category);
        location.href = url;
    }


}




//  modal

let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];
//החלון יקפוץ לאחר 10 שניות
setTimeout(() => {

    modal.style.display = "block";
}, 10000);

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}




//קריאת שרת
const loadProducts = () => {

    let p = $.ajax({
        method: 'GET',
        url: 'product.json',
        success: (data) => {

            printProducts(data);
        }
    });

}
loadProducts();


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
        url.pathname = 'page2.html';
        location.href = url;
    }
});

/// :פונקציות של תפריט עליון 
//פונקציה ששולחת את ערך החיפוש כשהמשתמש לוחץ על לחצן החיפוש
const func_search = () => {
    let product = form.product_search.value;
    sessionStorage.setItem('func', 'print_Search');
    sessionStorage.setItem('search', product);
    let url = new URL(location);
    url.searchParams.append('category', product);
    url.pathname = 'page2.html';
    location.href = url;

}

//פונקציה ששולחת את הקטגוריה לאחר שהמשתמש לחץ על קישור
const func_links = (link) => {
    let link_name = link;
    sessionStorage.setItem('func', 'print_All');
    sessionStorage.setItem('category_name', link_name);
    let url = new URL(location);      // של הדף הבא בתוספת הקטגוריה url
    url.searchParams.append('category', link_name);
    url.pathname = 'page2.html';
    location.href = url;
}
