/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let dataUrl = options.url;
    let keysOfData = Object.keys(options.data);    
    let formData;

    if (options.method === 'GET') {
        const arr = [];
        for (let key of keysOfData) {
            arr.push(key + '=' + options.data[key]);
        }
        dataUrl = options.url + '?' + arr.join('&');
    } else {
        formData = new FormData();
        for (let key of keysOfData) {
            formData.append(key, options.data[key]);
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
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            if(xhr.response.success === false) {
                options.callback(xhr.response.error);
            } else {
                options.callback(xhr.response);
            }
        } else if (xhr.readyState === xhr.DONE) {
            options.callback(xhr.statusText);
        }
    })

    if(options.method === 'GET') {
       xhr.send();
    } else {
        xhr.send(formData);
    }
};
