const defaultImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_IonlVghwpmFgGxdJRZZIbjGI6Y2320yt7g&usqp=CAU';

async function fetchSportsData() {
    let response = await fetch('https://newsdata.io/api/1/news?apikey=pub_121401ca00771f49d680f781ee5f7248208e4&category=sports&language=en');
    let data = await response.json();
    console.log(data.results);
    show(data.results,'sports');
}

async function fetchNewsData() {
    let response = await fetch('https://newsdata.io/api/1/news?apikey=pub_121401ca00771f49d680f781ee5f7248208e4&category=top&language=en');
    let data = await response.json();
    show(data.results,'news');
}

async function fetchHealthData() {
    let response = await fetch('https://newsdata.io/api/1/news?apikey=pub_121401ca00771f49d680f781ee5f7248208e4&category=science&language=en');
    let data = await response.json();
    show(data.results,'health');
}

function show(data,category) {
    const ul = document.getElementById(category);
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