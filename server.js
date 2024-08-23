let http = require('http');
let url = require('url');

function start(route, handle) {
    function onRequest(request, response) {
        let pathname = url.parse(request.url).pathname; // 리퀘스트 url 의 경로를 확인
        let queryData = url.parse(request.url, true).query;
        // 쿼리데이터는 
        if (pathname === '/favicon.ico') {
            response.writeHead(200, { 'Content-Type': 'image/x-icon' });
            return response.end();
        }
        route(pathname, handle, response, queryData.productId);
    }
    
    http.createServer(onRequest).listen(8888); // 이제 서버가 만들어짐
}

exports.start = start;