
//**頁面延遲預載動畫**/

document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.getElementById("pre-loader").style.visibility = "visible";
    } else {
        // document.getElementById("pre-loader").style.display = "none";
        // document.querySelector("body").style.visibility = "visible";

        setTimeout(() => {
            document.getElementById("pre-loader").style.display = "none";
            document.querySelector("body").style.visibility = "visible";
        }, 2000)
    }
};


//**影片每17秒切換一次轉場效果**/
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("videos");
    let texts = document.getElementsByClassName("texts");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        texts[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }

    slides[slideIndex - 1].style.display = "block";
    texts[slideIndex - 1].style.display = "block";

    setTimeout(showSlides, 7000); // Change video every 7 seconds
}

/** sticky效果控制 **/

//字串"scroll"可以去掉不寫，或是給一個空字串""，就是不監聽Event事件，
//頂多網頁剛剛載入當下出現error，因為addEventListener預設要寫前2個參數，
//第1個參數是要指定(註冊)的Event動作，第2個參數是給一個CallBack Function
//但從console.log看到，還是能照樣監聽到捲軸的Y方向目前捲動位置

window.addEventListener("scroll", () => {
    let nav = document.getElementById("nav");
    let navigation = document.getElementById("navigation");

    if (window.scrollY > 65) {
        nav.style.position = "sticky";
        nav.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        //NAV與navigation-items的背景顏色都要一致
        navigation.style.backgroundColor = nav.style.backgroundColor;
    } else {
        nav.style.position = "absolute";
        nav.style.backgroundColor = "rgba(0, 0, 0, 0)";
        //NAV與navigation-items的背景顏色都要一致
        navigation.style.backgroundColor = nav.style.backgroundColor;

    };
}
);



//**窄寬時，漢堡選單顯示效果**/

let Navigation = document.getElementsByClassName("navigation");
// let MenuIcon = document.getElementById("menu-icon");

Navigation[0].style.maxHeight = "0px";

function menutoggle() {
    if (Navigation[0].style.maxHeight == "0px") {
        Navigation[0].style.maxHeight = "200px";
    } else {
        Navigation[0].style.maxHeight = "0px"
    }
}


//*add event on element **/

const addEventOnElem = (elem, type, callback) => {
    if (elem.length > 1) {
        for (let i = 0; i < elem.length; i++) {
            elem[i].addEventListener(type, callback);
        }
    } else {
        elem.addEventListener(type, callback);
    }
}
//**scroll reveal effect捲動出現內容效果 **/
//有用到上一個add event on element 函式
const sections = document.querySelectorAll("[data-section]");

let leaveTop = false;
const scrollReveal = () => {
    for (let i = 0; i < sections.length; i++) {
        // 假如某個元素進入視窗可視範圍，且該元素頂端已經往上移動超過視窗可視高度的一半時做動作
        if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
            //將該元素的class屬性寫入"active"值
            sections[i].classList.add("active");
        }
    }
    //上面程式碼的問題，就是捲動顯示只能做一次，
    //因為全部的section元素都加過一次active後沒有移除active，要重新出現效果只能頁面重載
    //下面讓頁面回到最頂部時，讓捲動顯示效果重新作用
    //思路就是：
    //1.先確定卷軸Top移超過500，差不多第一個區塊超過一半以上，有的話leaveTop=true，這只是確定卷軸有往下移動過就好
    //2.當卷軸有往下移動過，然後又移回最頂端，就移除全部section元素的active
    //3.當移除全部section元素的active後，再次往下捲動時，捲動顯示效果就可以再次動作了
    // if (document.documentElement.scrollTop > 500) {
    //     leaveTop = true;
    //     console.log("leaveTop=" + leaveTop);
    // }
    // if (leaveTop = true && document.documentElement.scrollTop == 0) {
    //     for (let j = 1; j < sections.length; j++) {
    //         sections[j].classList.remove("active");
    //     }
    // }
    //leaveTop = false;
    console.log("leaveTop=" + leaveTop);
    console.log("scrollY=" + document.documentElement.scrollTop);

}
scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);


/** 大圖橫幅平移切換 **/

let slides = document.getElementsByClassName("slides");
let navDots = document.getElementsByClassName("dot");
let currentSlide = 0;

//初始化標記位置
slides[currentSlide].classList.toggle("active");
slides[currentSlide + 1].classList.toggle("backShow");
navDots[currentSlide].classList.toggle("activeDot");

function changeSlide(moveTo) {
    // console.log("========== 循環開始 ==========");

    //新增一個控制顯示[下一張圖片]的變數backShow

    // console.log("開始的currentSlide值=" + currentSlide);
    // console.log("開始的moveTo值=" + moveTo);

    let backShow = moveTo + 1;
    // console.log("開始的backShow值=" + backShow);

    //點位索引號是從0~4
    // 5個點，假如移到的超出最右邊點，就回到最左邊

    //假如點位移到最右邊，則下一張圖片，要顯示第0張
    if (moveTo === slides.length - 1) {
        backShow = 0;
    };

    //假如點位移超出最右邊，則點位回到最左邊第0個點，下一張圖片要顯示第1張
    if (moveTo > slides.length - 1) {
        moveTo = 0;
        backShow = 1;
    };

    // 5個點，假如按prev按鈕把點位移到超出最左邊點，就回到最右邊第4個點
    if (moveTo < 0) {
        moveTo = slides.length - 1;
        backShow = 0;
    };

    // console.log("判斷位置完的currentSlide值=" + currentSlide);
    // console.log("判斷位置完的moveTo值=" + moveTo);
    // console.log("判斷位置完的backShow值=" + backShow);
    //以下三行toggle是取消最開始跟每次執行完上一次留下的active或 show標記
    slides[currentSlide].classList.toggle("active");

    //這邊也是要處理[下一張圖片]的取消標記，假如要取消標記的位置大於等於slides.length，
    //就要改成去取消第0個的標記位置
    let currentSlideAdd = currentSlide + 1;
    if (currentSlideAdd >= slides.length) {
        currentSlideAdd = 0;
    };
    // console.log("判斷位置完的currentSlideAdd值=" + currentSlideAdd);

    slides[currentSlideAdd].classList.toggle("backShow");
    navDots[currentSlide].classList.toggle("activeDot");

    //以下三行toggle是新增標記
    slides[moveTo].classList.toggle("active");
    slides[backShow].classList.toggle("backShow");
    navDots[moveTo].classList.toggle("activeDot");

    //處理過的moveTo與backShow變數，丟回原變數，讓setInterval()再次作累加
    currentSlide = moveTo;

    // console.log("========== 循環結束 ==========");
}

console.log("window.onload前的currentSlide值=" + currentSlide);

window.onload = setInterval(function () {
    console.log("changeSlide前的currentSlide值=" + currentSlide);
    changeSlide(currentSlide + 1)
    console.log("changeSlide後的currentSlide值=" + currentSlide);
}, 3000);

//前後移動按鈕
document.getElementById("next").addEventListener("click", () => {
    changeSlide(currentSlide + 1);
});
document.getElementById("prev").addEventListener("click", () => {
    changeSlide(currentSlide - 1);
});

//這段處理直接去按圓點切換圖片時的情形
document.querySelectorAll(".dot").forEach((navDot, navDotIndex) => {
    navDot.addEventListener("click", () => {
        //假如被任意按到的位置不等於目前Slide位置，那現在位置就換成被按到的位置
        if (currentSlide !== navDotIndex) {
            changeSlide(navDotIndex);
        };
    });
});


/** 回到最上面 **/

let backToTop = document.getElementById("backToTop");
window.onscroll = function () {

    //按鈕顯示
    backToTop.style.display = "block";

    //取得當前瀏覽器窗口 距離 網頁頂部的距離
    //以下 ||二端語法的處理，可以兼容所有瀏覽器
    let height = document.documentElement.scrollTop || document.body.scrollTop;
    console.log(height);

    if (height === 0) {
        //按鈕消失
        backToTop.style.display = "none";
    }
}

backToTop.onclick = () => {
    let height = document.documentElement.scrollTop || document.body.scrollTop;

    //用window.scrollTo操作當前窗口滾動到某個(x,y)座標
    //不要太快步平滑的回到最頂部，所以用window.scrollTo寫入到setInterval()計時器中，
    //每10ms跑一次，每次往上滾動 -50
    //當回到頂部，用clearInterval()取消計時器功能。
    let t = setInterval(() => {
        height -= 50;
        if (height > 0) {

            window.scrollTo(0, height);
        } else {
            window.scrollTo(0, 0);
            clearInterval(t);
        }
    }, 10);
}

/** 倒數計時 **/

function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
        total,
        days,
        hours,
        minutes,
        seconds
    };
}

function initializeClock(id, endtime) {
    const clock = document.getElementById(id);
    const daysSpan = clock.querySelector('.days');
    const hoursSpan = clock.querySelector('.hours');
    const minutesSpan = clock.querySelector('.minutes');
    const secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        const t = getTimeRemaining(endtime);

        daysSpan.innerHTML = t.days;
        // slice(-2)就是從字串的倒數第2個索引值開始取到最後一個值
        //前面多寫一個'0'是為了當時間數字是個位數時，可以取出變成01，09這樣形式。
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    // setInterval(updateClock, 1000)就是一秒執行一次updateClock()
    const timeinterval = setInterval(updateClock, 1000);
}
// 設定倒數計時的目標時間是未來15天
const deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
initializeClock('clock', deadline);



