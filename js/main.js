function documentReady() {

    var backgroundColors = ['#ef5350', '#ec407a', '#ab47bc', '#7e57c2', '#5c6bc0', '#42a5f5', '#29b6f6', '#26c6da',
        '#26a69a', '#66bb6a', '#9ccc65', '#d4e157', '#ffee58', '#ffca28', '#ffa726', '#ff7043', '#8d6e63', '#bdbdbd'];

    function getRandomQuote() {
        console.log('Retrieve quote');
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&r='+Math.random(), true);
        xhr.responseType = 'json';

        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;

            if (this.status != 200) {
                console.log( 'Ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
                return;
            }
            console.log('Recided quote ' + this.response[0].content, this.response[0].title);

            showQuote(this.response[0].content, this.response[0].title);
        };

        xhr.send();
    }

    function showQuote(quote, author) {
        var newColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
        document.querySelector('#quote_widget blockquote').innerHTML = '<i class="fa fa-quote-left" aria-hidden="true"></i> ' + stripTags(quote);
        document.querySelector('#quote_widget .author').innerHTML = stripTags(author);
        document.body.style.backgroundColor = newColor;
        document.querySelector('#quote_widget button').style.backgroundColor = newColor;
    }

    document.querySelector('#quote_widget button').addEventListener('click', getRandomQuote);

    getRandomQuote();
}

function stripTags(html)
{
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}


document.addEventListener("DOMContentLoaded", documentReady);


