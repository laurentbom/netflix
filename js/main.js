//-----------------------------------------------//
//--------------------Variables------------------//
//-----------------------------------------------//
var searchBtn = document.querySelector(".search-icon");
var searchBar = document.querySelector(".nav__right__searchbar");
var searchInput = document.querySelector(".searchInput");
var accountBtn = document.querySelector(".nav__right__account .logo");
var accountMenu = document.querySelector(".extentedMenu");

var apiKey = "2c5d32f8be59da509f7a51255939dfc8";
var header = document.querySelector(".header");

var headerRandomContainer = document.querySelector(".headerTitleContainer");
var randomTitleText = document.querySelector(".randomTitleText");
var randomOverviewText = document.querySelector(".randomOverviewText");
var testi = document.querySelector(".nav");

var modalWindow = document.querySelector(".randomModal");
var headerModal = document.querySelector(".randomModal__head");
var modalRandomOpenBtn = document.querySelector(".btnMainMoreInfo");
var modalRandomOpenBtn2 = document.querySelector(".btnMainPlay");
var modalCloseBtn = document.querySelector(".closeBtnModal");
var modalIframe = document.querySelector(".modalIframe");
var modalTitleText = document.querySelector(".modalTitleText");
var modalPercentText = document.querySelector(".modalPercentText");
var modalYearText = document.querySelector(".modalYearText");
var modalSeasonText = document.querySelector(".modalSeasonText");
var modalOverviewText = document.querySelector(".modalOverviewText");
var modalCreatorText = document.querySelector(".modalCreatorText");
var modalGenreText = document.querySelector(".modalGenreText");

var modalPlayBtn = document.querySelector(".btnPlayRandomModal");




var swiperTop1 = document.querySelector(".top_rated .swiper-wrapper .top1");
var swiperTop2 = document.querySelector(".top_rated .swiper-wrapper .top2");
var swiperTop3 = document.querySelector(".top_rated .swiper-wrapper .top3");
var swiperLatest1 = document.querySelector(".latest .swiper-wrapper .latest1");
var swiperLatest2 = document.querySelector(".latest .swiper-wrapper .latest2");
var swiperLatest3 = document.querySelector(".latest .swiper-wrapper .latest3");
var swiperPop1 = document.querySelector(".popular .swiper-wrapper .pop1");
var swiperPop2 = document.querySelector(".popular .swiper-wrapper .pop2");
var swiperPop3 = document.querySelector(".popular .swiper-wrapper .pop3");









//-----------------------------------------------//
//--------------------Navbar---------------------//
//-----------------------------------------------//
// Search Bar
searchBtn.addEventListener("click",function(){
  searchBtn.classList.add("active");
  searchBar.classList.add("active");
  setTimeout(function(){
    searchInput.focus();
  },300);
})
searchInput.addEventListener("blur",function(){
  searchBar.classList.remove("active");
})
// Account Btn Navbar
var timeOut = 0;
var menuOpen = false;
accountBtn.addEventListener("mouseenter", function(){
  timeOut = setTimeout(function(){
    accountMenu.classList.add("active");
    accountBtn.classList.add("active");
    menuOpen = true;
  }, 100)
})
accountMenu.addEventListener("mouseover", function(){
  accountMenu.classList.add("active");
  accountBtn.classList.add("active");
  menuOpen = true;
})
accountMenu.addEventListener("mouseleave", function(){
  setTimeout(function(){
    accountMenu.classList.remove("active");
    accountBtn.classList.remove("active");
    menuOpen = false;
  }, 100)
})
accountBtn.addEventListener("mouseleave",function(){
  menuOpen=false;
    setTimeout(function(){
      if(menuOpen == false){
        accountMenu.classList.remove("active");
        accountBtn.classList.remove("active");
      }
    }, 400)
})
// Fixed Navbar
var halfWindow = window.innerHeight / 10;
// état de départ du dernier scroll à 0
var lastScroll = 0;
var headerNav = document.querySelector(".nav");

window.addEventListener("scroll", function(){
  var scrolled = window.scrollY;
  if(scrolled >= halfWindow) {
    headerNav.classList.add('bgBlack');
  } else {
    headerNav.classList.remove('bgBlack');
  }
  lastScroll = scrolled;
});
//-----------------------------------------------//
//-----------------------Main--------------------//
//-----------------------------------------------//


numberToGuess();
randomSerieHeader(randomNumber);
topRatedApi();
latestApi();
popularApi();
setTimeout(function(){
  swipers();
},300);

setTimeout(function(){
  var swipersObjects = document.querySelectorAll(".swiper__img");
  swipersObjects.forEach(function(swipersObject){
    swipersObject.addEventListener("click", function(){
      modalIframe.style.zIndex = "-1";
      modalMainContent(swipersObject.id);
      modalWindow.style.zIndex = "10";
      setTimeout(function(){
        modalWindow.classList.add("open");
      },400)
    })
  })

  var swiperObjectsImgs = document.querySelectorAll(".swiper__img img");
  swiperObjectsImgs.forEach(function(swiperObjectsImg){
    swiperObjectsImg.addEventListener("error", function(){
      swiperObjectsImg.src = "img/imgnotworking.webp";
    })
  })
},450);


modalCloseBtn.addEventListener("click", function(){
  modalWindow.style.zIndex = "-2"
  modalIframe.style.zIndex = "-1";
  modalWindow.classList.remove("open");
})




//🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄
//🍄🍄🍄🍄🍄🍄🍄  Functions 🍄🍄🍄🍄🍄🍄🍄🍄
//🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄


//-----------------------------------------------//
//-------------Random Série Header---------------//
//-----------------------------------------------//
// Une petite fonction pour sortir un nombre random entre 1 et 20
function numberToGuess() {
  randomNumber =  Math.floor(Math.random() * 20);
  return randomNumber;
}
// Fonction Api Random for Header
function randomSerieHeader(randomN){
  fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US`)
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    var imageBg = data.results[randomN].backdrop_path
    var idRandom = data.results[randomN].id;
    randomTitleText.innerHTML = data.results[randomN].name;
    randomOverviewText.innerHTML = data.results[randomN].overview;
    
    if(imageBg != null){
      header.style.backgroundImage = "url(https://image.tmdb.org/t/p/w1280" + imageBg + ")";
    }
    // Open/Close Modal Random
    modalRandomOpenBtn.addEventListener("click", function(){
      modalMainContent(idRandom);
      modalWindow.style.zIndex = "10";
      setTimeout(function(){
        modalWindow.classList.add("open");
      },300)
    })
    modalRandomOpenBtn2.addEventListener("click", function(){
      modalMainContent(idRandom);
      modalWindow.style.zIndex = "10";
      setTimeout(function(){
        modalWindow.classList.add("open");
      },300)
    })
  })
  .catch(error => {
    console.error("Erreur lors de la récupération des données :", error); 
  });
}

//-----------------------------------------------//
//----Fonction Api Main content Modal------------//
//-----------------------------------------------//
function modalMainContent(id){
  fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=fr`)
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    var date = data.first_air_date;
    var dateAnnee = new Date(date)
    var dateAnneeOk = dateAnnee.getYear();
    var afficheRandom = data.backdrop_path;
    modalTitleText.innerHTML = data.name;
    
    modalPercentText.innerHTML = Math.round((data.vote_average) * 10);
    modalYearText.innerHTML = dateAnneeOk + 1900;
    
    modalWindow.classList.add("open");
    if(data.overview.length == 0){
      modalOverviewText.innerHTML = "Résumé manquant par l'API Tmdb"
    } else {
      modalOverviewText.innerHTML = data.overview;
    }
    // Get More Details pour fenêtre modale
    apiDetails(id);
    // Vidéo fenêtre modale
    apiVideosRandom(id);
    // Backround Modal
    headerModal.style.backgroundImage = "url(https://image.tmdb.org/t/p/w1280" + afficheRandom + ")";
    modalWindow.classList.add("open");
  })
  .catch(error => {
    console.error("Erreur lors de la récupération des données :", error); 
  });
}




//-----------------------------------------------//
//----------------Get Details Api----------------//
//-----------------------------------------------//
function apiDetails(id){
  fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=fr`)
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    modalGenreText.innerHTML = "";
    modalCreatorText.innerHTML = "";
    let seasons = data.seasons.length;
    modalSeasonText.innerHTML=`${seasons} Saison(s)`
    if(data.genres.length == 0){
      modalGenreText.innerHTML = "Manquant par l'API Tmdb";
    } else{
        for (i=0; i < data.genres.length; i++){
        modalGenreText.innerHTML += `<span>${data.genres[i].name}</span> `
        }
    }
    if(data.created_by.length == 0){
      modalCreatorText.innerHTML = "Manquant par l'API Tmdb";
    } else{
        for (i=0; i < data.created_by.length; i++){
        modalCreatorText.innerHTML += `<span>${data.created_by[i].name}</span> `
        }
    }
  })
  .catch(error => {
    console.error("Erreur lors de la récupération des données :", error); 
  });
}





//-----------------------------------------------//
//----------------Videos  Api--------------------//
//-----------------------------------------------//
function apiVideosRandom(id){
  fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}&language=en-US`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log(data.results.length);
    if(data.results.length > 0){
      // Video Url
      var videoUrl = data.results[0].key;
      document.querySelector(".modalIframe").src = `https://www.youtube.com/embed/${videoUrl}`;
      // Injection vidéo sur play
      modalPlayBtn.addEventListener("click", function(){
        modalIframe.style.zIndex = "9";
        modalCloseBtn.addEventListener("click", function(){
          modalIframe.style.zIndex = "-1";
          modalWindow.style.zIndex = "-1"
          // modalWindow.style.opacity = "0"
          document.querySelector(".modalIframe").src = `https://www.youtube.com/embed/${videoUrl}`;
          modalWindow.classList.remove("open");
        })
      })
    } else{
      console.log("link video missing")
      modalIframe.style.zIndex = "-1";
      modalPlayBtn.addEventListener("click", function(){
        headerModal.style.backroundPosition = "center";
        headerModal.style.backgroundImage = `url("img/imgnotworking.webp")`;
        modalIframe.style.zIndex = "-1";
        modalCloseBtn.addEventListener("click", function(){
          modalWindow.style.zIndex = "-1"
          // modalWindow.style.opacity = "0"
          modalWindow.classList.remove("open");
        })
      })
    }
  })
  .catch(error => {
    console.error("Erreur lors de la récupération des données :", error); 
  });
}





//-----------------------------------------------//
//----------------Top Rated Api--------------------//
//-----------------------------------------------//
function topRatedApi(){
  fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=fr`)
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    swiperTop1.innerHTML = ""
    swiperTop2.innerHTML = ""
    swiperTop3.innerHTML = ""
    for(i=0; i < 6 ; i++){
      let imageBgLatest = data.results[i].poster_path
      let idLatest = data.results[i].id;
      let nameLatest = data.results[i].name;
      swiperTop1.innerHTML += `
        <div class="swiper__img" id="${idLatest}">
          <p>${nameLatest}</p>
          <img src="https://image.tmdb.org/t/p/w1280${imageBgLatest}" alt="seriesimg">
        </div>
      `
    }
    for(i=6; i < 12 ; i++){
      let imageBgLatest = data.results[i].poster_path
      let idLatest = data.results[i].id;
      let nameLatest = data.results[i].name;
      swiperTop2.innerHTML += `
        <div class="swiper__img" id="${idLatest}">
          <p>${nameLatest}</p>
          <img src="https://image.tmdb.org/t/p/w1280${imageBgLatest}" alt="seriesimg">
        </div>
      `
    }
    for(i=12; i < 18 ; i++){
      let imageBgLatest = data.results[i].poster_path
      let idLatest = data.results[i].id;
      let nameLatest = data.results[i].name;
      swiperTop3.innerHTML += `
        <div class="swiper__img" id="${idLatest}">
        <p>${nameLatest}</p>
          <img src="https://image.tmdb.org/t/p/w1280${imageBgLatest}" alt="seriesimg">
        </div>
      `
    }
  })
  .catch(error => {
    console.error("Erreur lors de la récupération des données :", error); 
  });
}





//-----------------------------------------------//
//-----------------Latest Api--------------------//
//-----------------------------------------------//
function latestApi(){
  fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=fr&page=2`)
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    swiperLatest1.innerHTML = ""
    swiperLatest2.innerHTML = ""
    swiperLatest3.innerHTML = ""
    for(i=0; i < 6 ; i++){
      let imageBgLatest = data.results[i].poster_path
      let idLatest = data.results[i].id;
      let nameLatest = data.results[i].name;
      swiperLatest1.innerHTML += `
        <div class="swiper__img" id="${idLatest}">
          <p>${nameLatest}</p>
          <img src="https://image.tmdb.org/t/p/w1280${imageBgLatest}" alt="seriesimg">
        </div>
      `
    }
    for(i=6; i < 12 ; i++){
      let imageBgLatest = data.results[i].poster_path
      let idLatest = data.results[i].id;
      let nameLatest = data.results[i].name;
      swiperLatest2.innerHTML += `
        <div class="swiper__img" id="${idLatest}">
          <p>${nameLatest}</p>
          <img src="https://image.tmdb.org/t/p/w1280${imageBgLatest}" alt="seriesimg">
        </div>
      `
    }
    for(i=12; i < 18 ; i++){
      let imageBgLatest = data.results[i].poster_path
      let idLatest = data.results[i].id;
      let nameLatest = data.results[i].name;
      swiperLatest3.innerHTML += `
        <div class="swiper__img" id="${idLatest}">
          <p>${nameLatest}</p>
          <img src="https://image.tmdb.org/t/p/w1280${imageBgLatest}" alt="seriesimg">
        </div>
      `
    }
  })
  .catch(error => {
    console.error("Erreur lors de la récupération des données :", error); 
  });
}





//-----------------------------------------------//
//----------------Popular Api--------------------//
//-----------------------------------------------//
function popularApi(){
  fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=fr&page=1`)
  .then(response => response.json())
  .then(data => {
   // console.log(data);
   swiperPop1.innerHTML = ""
   swiperPop2.innerHTML = ""
   swiperPop3.innerHTML = ""
   for(i=0; i < 6 ; i++){
     let imageBgLatest = data.results[i].poster_path
     let idLatest = data.results[i].id;
     let nameLatest = data.results[i].name;
     swiperPop1.innerHTML += `
       <div class="swiper__img" id="${idLatest}">
        <p>${nameLatest}</p>
         <img src="https://image.tmdb.org/t/p/w1280${imageBgLatest}" alt="seriesimg">
       </div>
     `
   }
   for(i=6; i < 12 ; i++){
     let imageBgLatest = data.results[i].poster_path
     let idLatest = data.results[i].id;
     let nameLatest = data.results[i].name;
     swiperPop2.innerHTML += `
       <div class="swiper__img" id="${idLatest}">
        <p>${nameLatest}</p>
         <img src="https://image.tmdb.org/t/p/w1280${imageBgLatest}" alt="seriesimg">
       </div>
     `
   }
   for(i=12; i < 18 ; i++){
     let imageBgLatest = data.results[i].poster_path
     let idLatest = data.results[i].id;
     let nameLatest = data.results[i].name;
     swiperPop3.innerHTML += `
       <div class="swiper__img" id="${idLatest}">
        <p>${nameLatest}</p>
         <img src="https://image.tmdb.org/t/p/w1280${imageBgLatest}" alt="seriesimg">
       </div>
     `
   }
  })
  .catch(error => {
    console.error("Erreur lors de la récupération des données :", error); 
  });
}




//-----------------------------------------------//
//--------------------Swipers--------------------//
//-----------------------------------------------//
function swipers(){
  const swiper = new Swiper('.swiper.one', {
    loop: true,
    direction: 'horizontal',
    slidesPerView: "auto",
    spaceBetween: 7,
    // grabCursor: true,
    speed: 800,
  
    // centeredSlides: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  const swiper2 = new Swiper('.swiper.two', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 7,
    // grabCursor: true,
    speed: 800,
    centeredSlides: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  const swiper3 = new Swiper('.swiper.three', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 7,
    // grabCursor: true,
    speed: 800,
    centeredSlides: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}
