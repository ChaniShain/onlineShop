
//Url
const url = new URL(location);
const category = url.searchParams.get('product');
//קבלת המוצר הנוכחי
const specific_product = JSON.parse(sessionStorage.getItem('specific_product'));

let basket2 = JSON.parse(localStorage.getItem('basket2')) || [];//לשמירת המוצרים הנרכשים
let counts2 = JSON.parse(localStorage.getItem('counts2')) || [];//לשמירת כמות מכל מוצר
let basket = JSON.parse(localStorage.getItem('basket')) || [];//הסל המקורי שמכיל את כל המוצרים
let count = 1;
const plus = document.getElementById('plus');
const minus = document.getElementById('minus');
const span = document.getElementById('span');
const add = document.getElementById('add');
const printProducts = (basket) => {
    for (let i = 0; i < basket.length; i++) {
        if (basket[i].category === specific_product.category) {//המוצר הנוכחי כפי שנשלח
            let image = document.createElement('img');
            let div = document.createElement('div');
            let h2 = document.createElement('h2');
            let h3 = document.createElement('h3');
            let h4 = document.createElement('h3');
            h2.innerHTML = basket[i].name;
            h3.innerHTML = basket[i].ditales;
            h4.innerHTML = basket[i].price;
            image.src = basket[i].product_image;
            div.classList.add('h2', 'h3', 'h4', `div`);
            div.append(image, h2, h3, h4);
            product.append(div);
            //לחיצה על +
            plus.onclick = () => {

                count++;
                //לא ניתן להזמין יותר מ 20 יחידות למוצר
                if (count > 20) {
                    count = 20;
                }

                span.innerHTML = count;

            }
            //לחיצה על -
            minus.onclick = () => {
                count--;
                //מינימום של הזמנה =0  
                if (count < 0) {
                    count = 0;
                    return;
                }

                else {

                    span.innerHTML = count;
                }

            }
            //הוספת המוצר לסל
            add.onclick = () => {
                if (count > 0) {
                    counts2.push(count);//כמות היחידות שהוזמנה
                    basket2.push(basket[i]);//המוצר שהוזמן
                    localStorage.setItem('counts2', JSON.stringify(counts2));//שמירת הסל המעודכן
                    localStorage.setItem('basket2', JSON.stringify(basket2));//שמירת הכמות המעודכנת
                }
            }


        }
    }
    span.innerHTML = count;
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
