/* Object.assign's Polyfill start */
if (typeof Object.assign !== 'function') {
    Object.assign = function(target) {
        if (target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        target = Object(target);
        for (let index = 1; index < arguments.length; index++) {
            let source = arguments[index];
            if (source !== null) {
                for (let key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
        }
        return target;
    };
}
/* Object.assign's Polyfill end */

window.tool = Object.assign(window.tool || {}, {
    // Array
    isArray: function(obj) {
        return Array.isArray ? Array.isArray(obj) : Object.prototype.toString.call(obj) === '[object Array]';
    },
    arrayContain: function(arr, el) {
        if (!this.isArray(arr)) return console.error('The first parameter does not belong to Array!');

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === el){
                return {
                    'contain': true,
                    'location': i
                };
            }
        }

        return {
            contain: false,
            location: null
        };
    },

    //cookie
    Cookie: {
        /**
         * 创建cookie
         * @param  {string}     name         [cookie's name]
         * @param  {any}        value        [cookie's value]
         * @param  {number}     expiryDate  [cookie有效期(秒)]
         */
        create: function(name, value, expiryDate) {
            let localTime = new Date();
            let deadline;

            expiryDate = expiryDate || 0;
            if (typeof expiryDate === 'number') {
                deadline = new Date(new Date().setTime(localTime.getTime() + expiryDate * 1000)).toGMTString();
            }
            /**
             * decodeURIComponent() 解码
             * encodeURIComponent() 编码
             */
            document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + deadline;
        },
        check: function(name) {
            let arrCookies = document.cookie.split(';');
            let arrNames = [];
            let arrValues = [];
            let RE = /\=/g;

            for (let i = 0; i < arrCookies.length; i++) {

                arrCookies[i] = arrCookies[i].trim();
                RE.exec(arrCookies[i]);

                arrNames[i] = arrCookies[i].slice(0, RE.lastIndex - 1);
                arrValues[i] = arrCookies[i].slice(RE.lastIndex);
            }

            this.arrCookies = arrCookies;
            this.arrNames = arrNames;
            this.arrValues = arrValues;

            return window.tool.arrayContain(arrNames, name)['contain'];
        },
        delete: function(name) {
            if (this.check(name)) {
                document.cookie = name + '=; expires=' + new Date(0).toGMTString();
            }
        },
        read: function(name) {
            if (this.check(name)) {
                let arrNames = this.arrNames;
                let arrValues = this.arrValues;

                for (let index in arrNames) { 
                    if (arrNames[index] === name) {
                        return decodeURIComponent(arrValues[index]);
                    }
                }
            }
        }
    },

    //ready
    Ready: function(fn) {
        if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }
});