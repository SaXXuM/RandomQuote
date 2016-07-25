function documentReady() {

    var backgroundColors = ['#ef5350', '#ec407a', '#ab47bc', '#7e57c2', '#5c6bc0', '#42a5f5', '#29b6f6', '#26c6da',
        '#26a69a', '#66bb6a', '#9ccc65', '#d4e157', '#ffee58', '#ffca28', '#ffa726', '#ff7043', '#8d6e63', '#bdbdbd'];

    function getRandomQuote() {
        //console.log('Retrieve quote');
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&r='
            + Math.random(), true);
        xhr.responseType = 'json';

        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;

            if (this.status != 200) {
                console.log( 'Ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
                return;
            }
            //console.log('Recided quote ' + this.response[0].content, this.response[0].title);

            showQuote(this.response[0].content, this.response[0].title);
        };

        xhr.send();
    }

    function showQuote(quote, author) {
        var newColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
        quote = stripTags(quote).trim();
        author = stripTags(author).trim();
        document.querySelector('#quote_widget blockquote').innerHTML =
            '<i class="fa fa-quote-left" aria-hidden="true"></i> ' + quote;
        document.querySelector('#quote_widget .author').innerHTML = author;
        document.querySelector('#quote_widget .twitter').href = 'https://twitter.com/intent/tweet?text="'
            + encodeURIComponent(replaceSomeSpecialChars(quote)) + '" '
            + encodeURIComponent(replaceSomeSpecialChars(author))
            + '&hashtags=quote&url=' + location.protocol + '//' + location.hostname;

        document.querySelector('#quote_widget .facebook').href =
            'https://www.facebook.com/dialog/feed?app_id=256494598068593&display=popup&'
                + 'link=https%3A%2F%2Fru.wikipedia.org&'
                + '&caption=wikipedia.org&picture=https://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif&'
                + 'name="' + encodeURIComponent(replaceSomeSpecialChars(quote)) + '"&'
                + 'description=' + encodeURIComponent(replaceSomeSpecialChars(author));

        document.body.style.backgroundColor = newColor;
        document.querySelector('#quote_widget .new-quote').style.backgroundColor = newColor;
        Array.prototype.forEach.call(document.querySelectorAll('#quote_widget a'), function (el) {
            el.style.backgroundColor = newColor;
        });
    }

    document.querySelector('#quote_widget .new-quote').addEventListener('click', getRandomQuote);

    getRandomQuote();
}

function stripTags(str) {
    return str.replace(/(<([^>]+)>)/ig, '');
}

function replaceSomeSpecialChars(str) {
    return str.replace(/“/g, "'")
        .replace(/”/g, "'")
        .replace(/"/g, "'")
        .replace(/&#8220;/g, "'")
        .replace(/&#8221;/g, "'")
        .replace(/&#8217;/g, "'");
}

document.addEventListener("DOMContentLoaded", documentReady);


