


let basket2 = JSON.parse(localStorage.getItem('basket2')) || [];
let counts2 = JSON.parse(localStorage.getItem('counts2')) || [];
let topay = document.getElementById('topay');
let finish_shopping = document.getElementById('finish_shopping');
let sum = 0; 
//הדפסת המוצרים בסל
for (let i = 0; i < basket2.length; i++) {
    let image = document.createElement('img');
    let div = document.createElement('div');
    let h2 = document.createElement('h2');
    let h3 = document.createElement('h3');
    let h4 = document.createElement('h3');
    let plus = document.createElement('button');
    let minus = document.createElement('button');
    let span = document.createElement('span');
    let delted = document.createElement('button');
    let count = counts2[i];
    h2.innerHTML = basket2[i].name;
    h3.innerHTML = basket2[i].ditales;
    h4.innerHTML = basket2[i].price;
    image.src = basket2[i].product_image;
    plus.innerHTML = '+';
    minus.innerHTML = '-';
    span.innerHTML = count;
    delted.innerHTML = 'מחיקת מוצר'
    sum = sum + count * (basket2[i].price);

    div.classList.add('h2', 'h3', 'h4', `div`, 'plus', 'span', 'minus', 'delted');
    div.append(image, h2, h3, h4, plus, span, minus, delted);
    product.append(div);
    //מחיקת מוצר מהסל
    delted.onclick = () => {
        sum = sum - (count * parseFloat(basket2[i].price));
        if (sum < 0) sum = 0;
        topay.innerHTML = financial(sum);//פונקציה שמעגלת את הסכום לתשלום
        count = 0;
        span.innerHTML = 0;
        counts2.splice(i, 1);
        localStorage.setItem('counts2', JSON.stringify(counts2));
        basket2.splice(i, 1);
        localStorage.setItem('basket2', JSON.stringify(basket2));
        let url = new URL(location);
        location.href = url;
    }
    //הוספת כמות
    plus.onclick = () => {
        count++;
        if (count > 20) {
            count = 20;

        }
        else {
            counts2[i]++;
            localStorage.setItem('counts2', JSON.stringify(counts2));
            sum += parseFloat(basket2[i].price);
            span.innerHTML = count;
            if (sum < 0) sum = 0;
            topay.innerHTML = financial(sum);;
        }

    }
    //הורדת כמות
    minus.onclick = () => {
        count--;
        if (count < 0) {
            count = 0;
        }
        else {
            counts2[i]--;
            localStorage.setItem('counts2', JSON.stringify(counts2));
            sum -= parseFloat(basket2[i].price);
            span.innerHTML = count;
            if (sum < 0) sum = 0;
            topay.innerHTML = financial(sum);;
        }

    }

}

financial(sum);

if (sum < 0) sum = 0;
topay.innerHTML = financial(sum);

function financial(x) {
    return x.toFixed(2);//פונקציה שמחזירה את הסכום כשהוא מעוגל עד 2 ספרות אחרי הנקודה
}

finish_shopping.onclick = () => {
    let end_sum = sum + 20;  //+20 עלות משלוח
    sessionStorage.setItem('sum', financial(end_sum));//שליחת הסכום המלא לתשלום
    let url = new URL(location);//url של העמוד הבא
    url.pathname = '/form.html';
    location.href = url;
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
  