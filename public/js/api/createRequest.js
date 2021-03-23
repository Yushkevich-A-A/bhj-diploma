/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let dataUrl = options.url;
    let keysOfData = Object.keys(options.data);    
    let formData;

    if (options.method === 'GET') {
        dataUrl = options.url + '?';
        const arr = [];
        for (let key of keysOfData) {
            arr.push(key + '=' + keysOfData[key]);
        }
        dataUrl = options.url + '?' + arr.join('&');
    } else if (metod.data) {
        formData = new FormData();
        for (let key of keysOfData) {
            formData.append(key, keysOfData[key]);
        }     
    }

    const xhr = new XMLHttpRequest();  
    xhr.open(options.method, dataUrl);    
    xhr.responseType = options.responseType;
    if (options.headers) {
        let headers = Object.keys(options.headers);
        for (let name of headers){
            xhr.setRequestHeader(name, options.headers[name]);
        }
    }

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === xhr.DONE) {
            options.callback(null, xhr.responseText);
        } else {
            options.callback(xhr.statusText);
        }
    })

    (options.method === 'GET') ? xhr.send() : xhr.send(formData);
};
