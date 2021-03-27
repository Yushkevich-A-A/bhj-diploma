/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    try {
        let dataUrl = options.url;
        let formData;

        if (options.method === 'GET' && options.data) {
            let keysOfData = Object.keys(options.data);
            const arr = [];
            for (let key of keysOfData) {
                arr.push(key + '=' + options.data[key]);
            }
            dataUrl = options.url + '?' + arr.join('&');
        } else if (options.method !== 'GET') {
            formData = new FormData();
            for (let key of Object.keys(options.data)) {
                formData.append(key, options.data[key]);
            }
        }

        const xhr = new XMLHttpRequest();
        xhr.open(options.method, dataUrl);
        xhr.responseType = options.responseType;
        if (options.headers) {
            let headers = Object.keys(options.headers);
            for (let name of headers) {
                xhr.setRequestHeader(name, options.headers[name]);
            }
        }

        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState !== xhr.DONE) {
                return;
            }

            if (xhr.status !== 200) {
                throw Error(xhr.statusText);
            }

            if (xhr.response.success) {
                options.callback(null, xhr.response);
            } else {
                options.callback(xhr.response.error);
            }
        });

        if (options.method === 'GET') {
            xhr.send();
        } else {
            xhr.send(formData);
        }



    } catch (e) {
        options.callback(e.message);
    }
};
