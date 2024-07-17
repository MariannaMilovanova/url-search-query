"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidQueryValue = isValidQueryValue;
exports.addQueryParam = addQueryParam;
exports.addQueryToUrl = addQueryToUrl;
function isValidQueryValue(value) {
    return (typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        value instanceof Date);
}
function addQueryParam(urlObj, key, value) {
    if (Array.isArray(value)) {
        value.forEach(function (item) {
            if (isValidQueryValue(item)) {
                urlObj.searchParams.append(key, item instanceof Date ? item.toISOString() : item.toString());
            }
        });
    }
    else {
        if (isValidQueryValue(value)) {
            urlObj.searchParams.set(key, value instanceof Date ? value.toISOString() : value.toString());
        }
    }
}
function addQueryToUrl(url, query) {
    var MAX_URL_LENGTH = 2000;
    var urlObj = new URL(url);
    Object.keys(query).forEach(function (key) {
        var value = query[key];
        if (typeof value !== 'function') {
            addQueryParam(urlObj, key, value);
        }
    });
    var finalUrl = urlObj.toString();
    if (finalUrl.length > MAX_URL_LENGTH) {
        console.warn('URL exceeds the maximum length allowed by browsers. It will be truncated.');
        finalUrl = finalUrl.substring(0, MAX_URL_LENGTH);
    }
    return finalUrl;
}
