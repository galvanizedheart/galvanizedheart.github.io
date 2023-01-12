function home(sel) {
    var settings = {
        url: 'http://localhost:8000/blogposts?p=' + sel,
        method: 'GET',
        timeout: 0,
    };

    $.ajax(settings).done(function(res) {
        console.log(res);
        popHome(res);
    });
}

function popHome(res) {
    const main = document.getElementsByTagName('main')[0];
    for (let i = 0; i < res.length; i++) {
        let art = document.createElement("article");

        art.setAttribute("class", "stylish m a");


        let h1 = document.createElement("h1");
        let p = document.createElement("p");
        let date = document.createElement("p");

        date.setAttribute("class", "date");
        date.innerHTML = res[i].DATETAG.substring(0, 10);
        h1.innerHTML = res[i].TITLE;
        p.innerHTML = res[i].BODY;
        art.appendChild(h1);
        art.appendChild(p);
        art.appendChild(date);
        art.setAttribute("onclick", "location.href='article.html?art=" + res[i].ID + "'");

        main.appendChild(art);
    }
}