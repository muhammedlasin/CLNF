
// Fetch news for the banner from rapid API.
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '6d053bb8e4mshcfe8dda8e785388p1bf52ajsn78d181cfacb2',
        'X-RapidAPI-Host': 'current-news.p.rapidapi.com'
    }
};


fetch('https://current-news.p.rapidapi.com/news', options)
    .then(
        function (response) {
            console.log(response);
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
            console.log(err);
        }
    )

// Show and hide search bar.

function showSearch() {
    let parent = document.getElementById("parent-div");
    let box = document.getElementById("box-overlay");

    let searchResults = document.getElementById("display")
    let arrow = document.getElementById("arrow");


    if (parent.style.display === "none") {
        parent.style.display = "block";
        box.style.display = "none";
        searchResults.style.display = "none";
        arrow.style.display = "none";

    }
    else {
        let lis = document.querySelectorAll('#display-ul li');
        parent.style.display = "none";
        box.style.display = "block";
        searchResults.style.display = "block";

        if (lis.length != 0) {
            arrow.style.display = "flex";
        }
        else {
            arrow.style.display = "none";
        }

    }
}

// Function called when search button is pressed

function searchNews() {
    const val = document.getElementById("search-news").value;
    const API_Key = "pub_121401ca00771f49d680f781ee5f7248208e4"
    const url = `https://newsdata.io/api/1/news?apikey=${API_Key}&q=${val}&language=en`;
    fetchText(url);
}
// Fetch news from the API

async function fetchText(url) {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data.results);
    let arrow = document.getElementById("arrow");
    if (data.results != 0) {
        arrow.style.display = "flex";
    }
    else {
        arrow.style.display = "none";
    }
    showNews(data.results);

}




// Display searched news.
function showNews(data) {

    var lis = document.querySelectorAll('#display-ul li');

    if (lis.length != 0) {
        console.log(lis.length);
        for (let i = 0; li = lis[i]; i++) {
            li.parentNode.removeChild(li);
        }
    }



    var buttonList = document.querySelectorAll("#pagination-numbers button");

    if (buttonList.length != 0) {
        for (let i = 0; button = buttonList[i]; i++) {
            button.parentNode.removeChild(button);
        }
    }

    const ul = document.getElementById('display-ul');

    if (data.length == 0) {
        const elem = document.getElementById('no-result');
        elem.style.display = "block";
    }
    else {
        const elem = document.getElementById('no-result');
        elem.style.display = "none";
    }

    const list = document.createDocumentFragment();
    data.map(function (post) {


        if (post.content !== null) {
            let li = document.createElement('li');
            list.appendChild(li);

            let image = document.createElement('div');
            image.classList.add("image");
            if (post.image_url !== null) {
                image.style.backgroundImage = `url('${post.image_url}')`
            }
            else {
                if (post.category[0] === "top") { image.style.backgroundImage = 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtvNKlYPKnDEOTqYIB4xU-U-NkSaePiE9FBQ&usqp=CAU")' }
                else if (post.category[0] === "business") { image.style.backgroundImage = 'url("https://www.chinimandi.com/wp-content/uploads/2018/06/UAE-business-news-overview.jpg")' }
                else if (post.category[0] === "entertainment") { image.style.backgroundImage = 'url("https://www.pwc.com/gx/en/industries/entertainment-media/outlook/content/GEMO_2022_Thumbnail_670x377.png")' }
                else if (post.category[0] === "environment") { image.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2014/04/17/23/26/environmental-protection-326923__480.jpg")' }
                else if (post.category[0] === "food") { image.style.backgroundImage = 'url("https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2022/07/food_poisoning_egg_gastroenteritis_1296x728_header-1024x575.jpg?w=1155&h=1528")' }
                else if (post.category[0] === "health") { image.style.backgroundImage = 'url("https://cloudinary.hbs.edu/hbsit/image/upload/s--sFv3MZbN--/f_auto,c_fill,h_375,w_750,/v20200101/D730ED9CC0AF1A0C18B3499EF75E86D7.jpg")' }
                else if (post.category[0] === "politics") { image.style.backgroundImage = 'url("https://assets.thehansindia.com/h-upload/2022/04/30/1600x960_1289736-politics.jpg")' }
                else if (post.category[0] === "science") { image.style.backgroundImage = 'url("https://static.theprint.in/wp-content/uploads/2019/11/science.jpg")' }
                else if (post.category[0] === "technology") { image.style.backgroundImage = 'url("https://rockresearch.com/wp-content/uploads/2017/11/event_technology.jpg")' }
                else if (post.category[0] === "sports") { image.style.backgroundImage = 'url("https://media.istockphoto.com/photos/various-sport-equipments-on-grass-picture-id949190756?k=20&m=949190756&s=170667a&w=0&h=RBVLWqBNY1OrRyUX-bi-gcEPtszzZOxzmU-ori5467M=")' }
                else { image.style.backgroundImage = 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtW5ogktRRm_R6yUACJR_XRASTzxX_0Mb_ng&usqp=CAU")' }
            }
            li.appendChild(image);

            let content = document.createElement('div');
            content.classList.add("search-content");
            li.appendChild(content);

            let title = document.createElement('h1');
            title.innerHTML = `${post.title}`;
            content.appendChild(title);

            let date = document.createElement('p')
            date.classList.add("content-date");
            date.innerHTML = `${post.pubDate.split(" ")[0]}`
            content.appendChild(date);

            let body = document.createElement('p');
            body.innerHTML = `${post.content}`;
            content.appendChild(body);

            //To display a popup on clicking the image

            image.addEventListener('click', () => {
                let modal = document.querySelector('.modal-class1');
                let modalTitle = document.querySelector('.modal-title1');
                let modalImage = document.querySelector('.modal-image1');
                let modalDescription = document.querySelector('.modal-description1');

                modalDescription.textContent = content.textContent;

                let imageUrl = image.style.backgroundImage.slice(5, -2);

                modalImage.src = imageUrl;

                modalTitle.textContent = title.textContent;

                modal.showModal();


                let closeArrow = document.querySelector('.close1');

                closeArrow.addEventListener('click', () => {
                    modal.close();
                });
            });

        }

    });

    ul.appendChild(list);






    // pagination


    const paginationNumbers = document.getElementById("pagination-numbers");
    const paginatedList = document.getElementById("display-ul");
    const listItems = paginatedList.querySelectorAll("li");
    const nextButton = document.getElementById("next-button");
    const prevButton = document.getElementById("prev-button");

    const paginationLimit = 5;
    const pageCount = Math.ceil(listItems.length / paginationLimit);
    let currentPage = 1;

    const disableButton = (button) => {
        button.classList.add("disabled");
        button.setAttribute("disabled", true);
    };

    const enableButton = (button) => {
        button.classList.remove("disabled");
        button.removeAttribute("disabled");
    };

    const handlePageButtonsStatus = () => {
        if (currentPage === 1) {
            disableButton(prevButton);
        } else {
            enableButton(prevButton);
        }

        if (pageCount === currentPage) {
            disableButton(nextButton);
        } else {
            enableButton(nextButton);
        }
    };

    const handleActivePageNumber = () => {
        document.querySelectorAll(".pagination-number").forEach((button) => {
            button.classList.remove("active");
            const pageIndex = Number(button.getAttribute("page-index"));
            if (pageIndex == currentPage) {
                button.classList.add("active");
            }
        });
    };

    const appendPageNumber = (index) => {
        const pageNumber = document.createElement("button");
        pageNumber.className = "pagination-number";
        pageNumber.innerHTML = index;
        pageNumber.setAttribute("page-index", index);
        pageNumber.setAttribute("aria-label", "Page " + index);

        paginationNumbers.appendChild(pageNumber);
    };

    const getPaginationNumbers = () => {
        for (let i = 1; i <= pageCount; i++) {
            appendPageNumber(i);
        }
    };

    const setCurrentPage = (pageNum) => {
        currentPage = pageNum;

        handleActivePageNumber();
        handlePageButtonsStatus();

        const prevRange = (pageNum - 1) * paginationLimit;
        const currRange = pageNum * paginationLimit;

        listItems.forEach((item, index) => {
            item.classList.add("hidden");
            if (index >= prevRange && index < currRange) {
                item.classList.remove("hidden");
            }
        });
        window.scrollTo(0, 0);
    };


    getPaginationNumbers();
    setCurrentPage(1);

    prevButton.addEventListener("click", () => {
        setCurrentPage(currentPage - 1);
    });

    nextButton.addEventListener("click", () => {
        setCurrentPage(currentPage + 1);
    });

    document.querySelectorAll(".pagination-number").forEach((button) => {
        const pageIndex = Number(button.getAttribute("page-index"));

        if (pageIndex) {
            button.addEventListener("click", () => {
                setCurrentPage(pageIndex);
            });
        }
    });



}



// Auto Complete

function autocomplete(inp, arr) {

    var currentFocus;

    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;

        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;

        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");


        this.parentNode.appendChild(a);

        for (i = 0; i < arr.length; i++) {

            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {

                b = document.createElement("DIV");

                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);

                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

                b.addEventListener("click", function (e) {

                    inp.value = this.getElementsByTagName("input")[0].value;

                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });

    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {

            currentFocus++;

            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;

            addActive(x);
        } else if (e.keyCode == 13) {

            e.preventDefault();
            if (currentFocus > -1) {

                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {

        if (!x) return false;

        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);

        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {

        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {

        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

var keywords = ["War", "Business", "Entertainment", "Environment", "Food", "Health", "Politics", "Science", "Sports", "Technology", "Top", "World", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];


autocomplete(document.getElementById("search-news"), keywords);




//Hamburger

window.addEventListener("resize", function () {
    if (window.screen.availWidth >= 600) {
        let menu = document.getElementById("ham-items");
        menu.style.display = "none";
    }
})

function showHamburger() {

    let menu = document.getElementById("ham-items");
    if (menu.style.display === "none") {
        menu.style.display = "block";
    }
    else {
        menu.style.display = "none";
    }
}





var coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
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

const defaultImageUrl_sports = 'https://media.istockphoto.com/photos/various-sport-equipments-on-grass-picture-id949190756?k=20&m=949190756&s=170667a&w=0&h=RBVLWqBNY1OrRyUX-bi-gcEPtszzZOxzmU-ori5467M=';
const defaultImageUrl_science = 'https://static.theprint.in/wp-content/uploads/2019/11/science.jpg';
const defaultImageUrl_news = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtvNKlYPKnDEOTqYIB4xU-U-NkSaePiE9FBQ&usqp=CAU';

const apiKey = "pub_12206c0036b0d1851f60510f6f27282328c8d"
async function fetchSportsData() {

    let response = await fetch(`https://newsdata.io/api/1/news?apikey=${apiKey}&category=sports&language=en`);
    let data = await response.json();
    console.log(data.results);
    show(data.results, 'sports', defaultImageUrl_sports);
}

async function fetchNewsData() {
    let response = await fetch(`https://newsdata.io/api/1/news?apikey=${apiKey}&category=top&language=en`);
    let data = await response.json();
    show(data.results, 'news', defaultImageUrl_news);
}



async function fetchScienceData() {


    let response = await fetch(`https://newsdata.io/api/1/news?apikey=${apiKey}&category=science&language=en`);
    let data = await response.json();
    show(data.results, 'science', defaultImageUrl_science);
}

function show(data, category, defaultUrl) {
    const ul = document.getElementById(category);
    const list = document.createDocumentFragment();


    data.map((val) => {
        let listItem = document.createElement('li');
        let item = document.createElement('div');
        if (val.image_url !== null) {
            item.style.backgroundImage = `url(${val.image_url})`;
        }


        else {
            item.style.backgroundImage = `url('${defaultUrl}')`;
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
                image.src = defaultUrl;
            }



            if (val.description === null) {
                description.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, totam possimus pariatur esse numquam suntincidunt consequatur odio! Animi minus quos commodi recusandae tempora eius quis provident delectus distinctio est? Lorem ip Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, totam possimus pariatur esse numquam suntincidunt consequatur odio! Animi minus quos commodi recusandae tempora eius quis provident delectus distinctio est? Lorem ip';
            }


            else {
                description.textContent = val.description;
            }


            modal.showModal();


            let closeArrow = document.querySelector('.close');

            closeArrow.addEventListener('click', () => {
                let modal = document.querySelector('.modal-class');
                modal.close();
            });

        });



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

fetchScienceData();



