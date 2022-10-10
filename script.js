// const url= 'https://newsdata.io/api/1/news?apikey=pub_120235204380c1571d1673af41ebead6aa38e&language=en';


// async function fetchText() {
//     let response = await fetch(url);
//     let data = await response.json();
//     let img =data.results[2].image_url;

//     console.log(data.results[2].image_url);
// }

// fetchText();


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
                    console.log(data.news);
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

        


// fetch('https://current-news.p.rapidapi.com/news', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response.news[0].urlToImage))
// 	.catch(err => console.error(err));
