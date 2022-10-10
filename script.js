// const url= 'https://newsdata.io/api/1/news?apikey=pub_120235204380c1571d1673af41ebead6aa38e&language=en';


async function fetchText(url) {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data.results);
    showNews(data.results);
}

function showNews(data){
    const ul = document.getElementById('display');
    const list = document.createDocumentFragment();

    data.map(function (post) {
        let li = document.createElement('li');
        let image = document.createElement('div');
        image.classList.add("image");
        let content = document.createElement('div');
        content.classList.add("content");
        let title = document.createElement('h1');
        let date= document.createElement('p')
        date.classList.add("content-date");
        let body = document.createElement('p');
        image.style.backgroundImage=`url('${post.image_url}')`
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


function showSearch(){
    let x = document.getElementById("parent-div");
    let y = document.getElementById("box-overlay")
    if (x.style.display === "none") {
      x.style.display = "block";
      y.style.display="none";
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
        function(response){

            response.json().then(
                function(data){
                    let x = Math.floor(Math.random() * 20);
                    let img =data.news[x].urlToImage;
                    let heading = data.news[x].title;
                    document.getElementById("main-news").style.backgroundImage = `url(${img})`;
                    document.getElementById("main-title").innerHTML = heading;
                }
            )
        }
    )
    .catch(
        function(err){
            console.log(err+'404');
        }
        )

        
function handleSearch(){
    const val = document.getElementById("search-news").value;
    console.log(val)
}

function searchNews(){
    const val = document.getElementById("search-news").value;
    const url= `https://newsdata.io/api/1/news?apikey=pub_121401ca00771f49d680f781ee5f7248208e4&q=${val}&language=en`;
   fetchText(url);
   

}

// fetch('https://current-news.p.rapidapi.com/news', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response.news[0].urlToImage))
// 	.catch(err => console.error(err));
