const defaultImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_IonlVghwpmFgGxdJRZZIbjGI6Y2320yt7g&usqp=CAU';

async function fetchSportsData() {
    let response = await fetch('https://newsdata.io/api/1/news?apikey=pub_120235204380c1571d1673af41ebead6aa38e&category=sports&language=en');
    let data = await response.json();
    console.log(data.results);
    showSports(data.results);
}

async function fetchNewsData() {
    let response = await fetch('https://newsdata.io/api/1/news?apikey=pub_120235204380c1571d1673af41ebead6aa38e&category=top&language=en');
    let data = response.json();
    //showNews(data);
}

async function fetchHealthData() {
    let response = await fetch('https://newsdata.io/api/1/news?apikey=pub_120235204380c1571d1673af41ebead6aa38e&category=health&language=en');
    let data = response.json();
    //showHealth(data);
}

function showSports(data) {
    const ul = document.getElementById('sports');
    const list = document.createDocumentFragment();

    data.map((val) => {
        let listItem = document.createElement('li');
        let item = document.createElement('div');
        if(val.image_url !== null) {
            item.style.backgroundImage = `url('${val.image_url}')`;
        }

        else {
            item.style.backgroundImage = `url('${defaultImageUrl}')`;
        }

        item.style.backgroundSize = 'cover';

        item.style.backgroundRepeat = 'no-repeat';

        item.style.height = '100%';

        item.style.width = '100%';

        // let titleContent = document.createElement('p');

        // titleContent.textContent = val.content;

        // item.innerHTML = titleContent.textContent;

        listItem.appendChild(item);
        list.appendChild(listItem);
    });

    ul.appendChild(list);
}

fetchSportsData();