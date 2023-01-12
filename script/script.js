const url = 'http://localhost:8000/';

function article(param) {
    if (param == null || param == "") {
        location.href = 'index.html';
    } else {
        var settings = {
            url: url + 'article?p=' + param,
            method: 'GET',
            timeout: 0,
        }
        $.ajax(settings).done(function(res) {
            popArticle(res);
        });
    }
}

function blog(sel) {
    var settings = {
        url: url + 'blogposts?p=' + sel,
        method: 'GET',
        timeout: 0,
    };

    $.ajax(settings).done(function(res) {
        console.log(res);
        popBlog(res);
    });
}

function projects() {
    var settings = {
        url: url + 'projects',
        method: 'GET',
        timeout: 0,
    }
    $.ajax(settings).done(function(res) {
        popProj(res);
    });
}

function popArticle(res) {
    console.log(res);
    const main = document.getElementById("bigpage");
    if (res[0].ISSOFTWARE == 1) {
        main.style.backgroundImage = "linear-gradient(to bottom left, darkslategrey, 1%, black)";
    }
    let art = document.getElementsByTagName("article")[0];

    let h1 = document.createElement("h1");
    let p = document.createElement("p");
    let date = document.createElement("p");

    date.setAttribute("class", "date");
    date.innerHTML = res[0].DATETAG.substring(0, 10);
    h1.innerHTML = res[0].TITLE;
    p.innerHTML = res[0].BODY;
    art.appendChild(h1);
    art.appendChild(p);
    if (res[0].ISSOFTWARE == 1) {
        const link = document.createElement("button");
        link.setAttribute("class", "link");
        link.setAttribute("onclick", "location.href='" + res[0].LINK + "'");
        link.innerHTML = "Check it out!";
        art.appendChild(link);
    }
    art.appendChild(date);

}

function popProj(res) {
    const main = document.getElementsByClassName("stylish container")[0];
    for (let i = 0; i < res.length; i++) {
        let art = document.createElement("article");

        art.setAttribute("class", "stylish m proj");


        let h1 = document.createElement("h1");
        let p = document.createElement("p");
        let date = document.createElement("p");

        date.setAttribute("class", "date");
        date.innerHTML = res[i].DATETAG.substring(0, 10);
        h1.innerHTML = res[i].TITLE + "...";
        p.innerHTML = res[i].BODY + "...";
        art.appendChild(h1);
        art.appendChild(p);
        art.appendChild(date);
        art.setAttribute("onclick", "location.href='article.html?art=" + res[i].ID + "'");

        main.appendChild(art);
    }
}

function popBlog(res) {
    const main = document.getElementsByTagName('main')[0];
    for (let i = 0; i < res.length; i++) {
        let art = document.createElement("article");

        art.setAttribute("class", "stylish m a");


        let h1 = document.createElement("h1");
        let p = document.createElement("p");
        let date = document.createElement("p");

        date.setAttribute("class", "date");
        date.innerHTML = res[i].DATETAG.substring(0, 10);
        h1.innerHTML = res[i].TITLE + "...";
        p.innerHTML = res[i].BODY + "...";
        art.appendChild(h1);
        art.appendChild(p);
        art.appendChild(date);
        art.setAttribute("onclick", "location.href='article.html?art=" + res[i].ID + "'");

        main.appendChild(art);
    }
}