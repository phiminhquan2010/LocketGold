function setHeaderValue(headers, key, value) {
    headers[key.toLowerCase()] !== undefined ? (headers[key.toLowerCase()] = value) : (headers[key] = value);
}

const headers = $request.headers;
setHeaderValue(headers,"X-RevenueCat-ETag","");
$done({headers});