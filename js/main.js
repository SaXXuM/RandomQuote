function documentReady() {
    function getRandomQuote() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1', true);
        xhr.responseType = 'json';

        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;

            // по окончании запроса доступны:
            // status, statusText
            // responseText, responseXML (при content-type: text/xml)

            if (this.status != 200) {
                // обработать ошибку
                console.log( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
                return;
            }

            showQuote(this.response[0].content, this.response[0].title);
            // получить результат из this.responseText или this.responseXML
        };

        xhr.send();

    }

    function showQuote(quote, author) {
        document.querySelector('#quote_widget .quote').innerHTML = quote;
        document.querySelector('#quote_widget .author').innerHTML = author;
    }

    getRandomQuote();
}

document.addEventListener("DOMContentLoaded", documentReady);


