
// const url= 'https://newsdata.io/api/1/news?apikey=pub_120235204380c1571d1673af41ebead6aa38e&language=en';


async function fetchText(url) {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data.results);
    showNews(data.results);
}

function showNews(data) {
    const ul = document.getElementById('display');
    const list = document.createDocumentFragment();

    data.map(function (post) {
        let li = document.createElement('li');
        let image = document.createElement('div');
        image.classList.add("image");
        let content = document.createElement('div');
        content.classList.add("content");
        let title = document.createElement('h1');
        let date = document.createElement('p')
        date.classList.add("content-date");
        let body = document.createElement('p');
        image.style.backgroundImage = `url('${post.image_url}')`
        title.innerHTML = `${post.title}`;
        date.innerHTML = `${post.pubDate.split(" ")[0]}`
        body.innerHTML = `${post.content}`;

        li.appendChild(image);
        content.appendChild(title);
        content.appendChild(date);
        content.appendChild(body);
        li.appendChild(content);
        list.appendChild(li);
    });

    ul.appendChild(list);
}


function showSearch() {
    let x = document.getElementById("parent-div");
    let y = document.getElementById("box-overlay")
    if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "none";
    } else {
        x.style.display = "none";
        y.style.display = "block";
    }
}




const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '328aa9ca11msh080b545b7552596p182b44jsne2b7cbb76248',
        'X-RapidAPI-Host': 'current-news.p.rapidapi.com'
    }
};

fetch('https://current-news.p.rapidapi.com/news', options)
    .then(
        function (response) {

            response.json().then(
                function (data) {
                    let x = Math.floor(Math.random() * 20);
                    let img = data.news[x].urlToImage;
                    let heading = data.news[x].title;
                    document.getElementById("main-news").style.backgroundImage = `url(${img})`;
                    document.getElementById("main-title").innerHTML = heading;
                }
            )
        }
    )
    .catch(
        function (err) {
            console.log(err + '404');
        }
    )


function handleSearch() {
    const val = document.getElementById("search-news").value;
    console.log(val)
}

function searchNews() {
    const val = document.getElementById("search-news").value;
    const url = `https://newsdata.io/api/1/news?apikey=pub_121401ca00771f49d680f781ee5f7248208e4&q=${val}&language=en`;
    fetchText(url);


}

// fetch('https://current-news.p.rapidapi.com/news', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response.news[0].urlToImage))
// 	.catch(err => console.error(err));


var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

const defaultImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_IonlVghwpmFgGxdJRZZIbjGI6Y2320yt7g&usqp=CAU';

async function fetchSportsData() {
    let response = await fetch('https://newsdata.io/api/1/news?apikey=pub_1220618b0701da7c91f3238ec74273a8d80fd&category=sports&language=en');
    let data = await response.json();
    console.log(data.results);
    show(data.results, 'sports');
}

async function fetchNewsData() {
    let response = await fetch('https://newsdata.io/api/1/news?apikey=pub_1220618b0701da7c91f3238ec74273a8d80fd&category=top&language=en');
    let data = await response.json();
    show(data.results, 'news');
}

async function fetchHealthData() {
    let response = await fetch('https://newsdata.io/api/1/news?apikey=pub_1220618b0701da7c91f3238ec74273a8d80fd&category=science&language=en');
    let data = await response.json();
    show(data.results, 'health');
}

function show(data, category) {
    const ul = document.getElementById(category);
    const list = document.createDocumentFragment();

    data.map((val) => {
        let listItem = document.createElement('li');
        let item = document.createElement('div');
        if (val.image_url !== null) {
            item.style.backgroundImage = `url('${val.image_url}')`;
        }

        else {
            item.style.backgroundImage = `url('${defaultImageUrl}')`;
        }

        item.style.backgroundSize = 'cover';

        item.style.backgroundRepeat = 'no-repeat';

        item.style.height = '100%';

        item.style.width = '100%';


        item.addEventListener('click', () => {
            let modal = document.querySelector('.modal-class');
            let title = document.querySelector('.modal-title');
            let image = document.querySelector('.modal-image');
            let description = document.querySelector('.modal-description');
            

            title.textContent = val.title;

            if (val.image_url !== null) {
                image.src = val.image_url;
            }

            else {
                image.src = defaultImageUrl;
            }

            description.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, totam possimus pariatur esse numquam suntincidunt consequatur odio! Animi minus quos commodi recusandae tempora eius quis provident delectus distinctio est? Lorem ip Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, totam possimus pariatur esse numquam suntincidunt consequatur odio! Animi minus quos commodi recusandae tempora eius quis provident delectus distinctio est? Lorem ip';
            modal.showModal();
        });

        let closeArrow = document.querySelector('.close');

        closeArrow.addEventListener('click', () => {
            let modal = document.querySelector('.modal-class');
            modal.close();
        })


        let titleContent = item.appendChild(document.createElement('div'));

        titleContent.style.color = 'white';

        titleContent.style.fontWeight = '900';

        titleContent.style.fontSize = '15px';

        titleContent.style.overflowWrap = 'break-word';

        titleContent.textContent = val.title;

        item.appendChild(titleContent);

        // item.style.overflow = 'hidden';

        titleContent.style.overflow = 'hidden';

        titleContent.style.textOverflow = 'ellipsis';

        listItem.appendChild(item);

        list.appendChild(listItem);
    });

    ul.appendChild(list);
}

fetchSportsData();

fetchNewsData();

fetchHealthData();


