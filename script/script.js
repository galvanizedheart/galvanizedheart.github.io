'use strict';
const url = 'https://nice-blue-starfish-robe.cyclic.app/';

function article(param) {

    var settings = {
        url: url + 'article?p=' + param,
        method: 'GET',
        timeout: 0,
    }
    $.ajax(settings).done(function(res) {
        popArticle(res);
    }).fail(function(res) {
        //location.href = "index.html";
    });

}

function blog(sel, param) {
    var settings = {
        url: url + 'blogposts?p=' + sel + '&pag=' + param,
        method: 'GET',
        timeout: 0,
    };

    $.ajax(settings).done(function(res) {
        console.log(res);
        popBlog(res);
    }).fail(function(res) {
        console.log(res);
        if (res.status == 0) {
            document.getElementsByTagName("article")[0].innerHTML = "<h2>Nothing here!</h2><p>The server might be down.</p>"
        } else if (res.status == 404) {
            const main = document.getElementsByTagName('main')[0];
            let art = document.createElement("article");
            art.setAttribute("class", "stylish m a");
            let h1 = document.createElement("h1");
            h1.innerHTML = "404";
            let p = document.createElement("p");
            p.innerHTML = "Nothing found. Check your URL.";
            art.appendChild(h1);
            art.appendChild(p);
            main.appendChild(art);
        }
    });

}

function projects(param) {
    var settings = {
        url: url + 'projects?pag=' + param,
        method: 'GET',
        timeout: 0,
    }
    $.ajax(settings).done(function(res) {
        popProj(res, param);
    }).fail(function(res) {
        if (res.status == 0) {
            document.getElementsByTagName("article")[0].innerHTML = "<h2>Nothing here!</h2><p>The server might be down.</p>"
        } else if (res.status == 404) {
            const main = document.getElementsByClassName('stylish container')[0];
            let art = document.createElement("article");
            art.setAttribute("class", "stylish m a");
            let h1 = document.createElement("h1");
            h1.innerHTML = "404";
            let p = document.createElement("p");
            p.innerHTML = "Nothing found. Check your URL.";
            art.appendChild(h1);
            art.appendChild(p);
            main.appendChild(art);
        }
    });
}

function popArticle(res) {
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

function popProj(res, param) {
    const main = document.getElementsByClassName("stylish container")[0];
    for (let i = 0; i < res[0].length; i++) {
        let art = document.createElement("article");

        art.setAttribute("class", "stylish m proj");


        let h1 = document.createElement("h1");
        let p = document.createElement("p");
        let date = document.createElement("p");

        date.setAttribute("class", "date");
        date.innerHTML = res[0][i].DATETAG.substring(0, 10);
        h1.innerHTML = res[0][i].TITLE + "...";
        p.innerHTML = res[0][i].BODY + "...";
        art.appendChild(h1);
        art.appendChild(p);
        art.appendChild(date);
        art.setAttribute("onclick", "location.href='article.html?art=" + res[0][i].ID + "'");

        main.appendChild(art);
    }
    pageButtons("myproj", res);

}

function popBlog(res) {
    const main = document.getElementsByTagName('main')[0];

    for (let i = 0; i < res[0].length; i++) {
        let art = document.createElement("article");
        art.setAttribute("class", "stylish m a");
        let h1 = document.createElement("h1");
        let p = document.createElement("p");
        let date = document.createElement("p");

        date.setAttribute("class", "date");
        date.innerHTML = res[0][i].DATETAG.substring(0, 10);
        h1.innerHTML = res[0][i].TITLE + "...";
        p.innerHTML = res[0][i].BODY + "...";
        art.appendChild(h1);
        art.appendChild(p);
        art.appendChild(date);
        art.setAttribute("onclick", "location.href='article.html?p=" + res[0][i].ID + "'");

        main.appendChild(art);
    }
    pageButtons("blog", res);
}

function pageButtons(page, res) {
    if (res[1].N != 0) {
        const bar = document.getElementsByClassName("stylish m sep")[1];
        for (let i = 1; i <= res[1].N; i++) {
            let but = document.createElement("button");
            but.setAttribute("class", "link");
            if (i == param) {
                but.style.backgroundColor = "black";
                but.style.boxShadow = "0 0 15px 0px dimgray";
                but.style.color = "white";
                but.style.transform = "scale(1.05)";
            } else {
                but.setAttribute("onclick", "location.href='" + page + ".html?pag=" + i + "'");
            }
            but.innerHTML = i;
            bar.appendChild(but);
        }
    } else if (res[1].N == 1) {
        let but = document.createElement("button");
        but.setAttribute("class", "link");
        but.innerHTML = i;
        bar.appendChild(but);
    }
}