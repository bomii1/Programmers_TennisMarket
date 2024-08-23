// 라우터가 루트를 분배해서 각 경로를 알려주면, 이제 뭐해야할지 알려줌
const fs = require('fs'); // filesink 의 약자 -> 이 모듈을 가지고 만들어둔 html 가져올 수 있음
const main_view = fs.readFileSync('./main.html', 'utf-8'); // 읽어와달라
const orderlist_view = fs.readFileSync('./orderlist.html', 'utf-8');
const mariadb = require('./database/connect/mariadb');

function main(response) {
    console.log('main');

    //mariadb.query("SELECT * FROM product", function(err, rows) {
    //    console.log(rows);
    //}); // sql 던지기

    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(main_view);
    response.end();
}

function redRacket(response) {
    fs.readFile('./img/redRacket.png', function(err, data) {
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
}

function blueRacket(response) {
    fs.readFile('./img/blueRacket.png', function(err, data) {
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
}

function blackRacket(response) {
    fs.readFile('./img/blackRacket.png', function(err, data) {
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
}

function order(response, productId) {
    response.writeHead(200, {'Content-Type' : 'text/html'});

    mariadb.query("INSERT INTO orderlist VALUES (" + productId + ", '" + new Date().toLocaleDateString() + "');", function(err, rows) {
        console.log(rows);
    }) // '' 붙이는 이유는 그래야 문자열로 들어감
    response.write('order page');
    response.end();
}

function orderList(response) {
    response.writeHead(200, {'Content-Type' : 'text/html'});
    mariadb.query("SELECT * FROM orderlist;", function(err, rows) {
        response.write(orderlist_view);
        console.log(rows);

        rows.forEach(element => {
            response.write("<tr>"
                + "<td>" + element.product_id + "</td>"
                + "<td>" + element.order_date + "</td>"
                + "</tr>"
            );
        });
        response.write("</table>");
        response.end();
    })    
}

let handle = {}; // key:value
handle['/'] = main;
handle['/order'] = order;
handle['/orderlist'] = orderList;

/* img directory */
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

exports.handle = handle;