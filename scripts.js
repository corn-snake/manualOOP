if (window.localStorage.getItem('curr')) {
    if (window.localStorage.getItem('side') == 0 && window.localStorage.getItem('curr') !== "intro") {
        document.querySelector('aside').classList.remove('inside');
        document.querySelector('main').classList.remove('inactive');
    }
} else {
    window.localStorage.setItem('curr', "intro");
}
checkGet(window.localStorage.getItem('curr'));
window.addEventListener("scroll", function (event) {
    window.localStorage.setItem("top", this.scrollY);
}, false);
function checkGet(thing) {
    if (document.querySelector(`#${thing}`)) {
        console.log(`duplicate event; tried to re-fetch fragment ${thing}`);
    } else {
        while (document.querySelector('.curr')) document.querySelector('.curr').classList.remove('curr');
        fetch("/manualOOP/frags/" + thing + ".html").then(t=>t.text()).then(h=>{
            document.querySelector('#hellspawner').innerHTML = h;
            document.querySelector('article').replaceChild(document.querySelector('#hellspawner').childNodes[0], document.querySelector('article').childNodes[0]);
        });
        window.localStorage.setItem('curr', thing);
        thing !== "inheritance" ? document.getElementById(thing + "clicker").classList.add('curr') : document.getElementById('inherMother').classList.add('curr'); 
    }
}
function toggleAside(boo) {
    if (boo) {
        document.querySelector('aside').classList.remove('inside');
        document.querySelector('main').classList.remove('inactive');
        document.querySelector('footer').classList.remove('inactive');
        window.localStorage.setItem('side', 0);
    } else {
        document.querySelector('aside').classList.add('inside');
        document.querySelector('main').classList.add('inactive');
        document.querySelector('footer').classList.add('inactive');
        window.localStorage.setItem('side', 1);
    }
}
let intLists = [...document.querySelectorAll('li:not(.mother) span')];
while (intLists.length >= 1) {
    intLists.shift().addEventListener('click', (ex)=>{
        checkGet(ex.target.getAttribute('id').substring(0,ex.target.getAttribute('id').indexOf('clicker')));
    });
}
const fullArrNav = ["intro", "memory", "types", "funcs", "obj", "getset", "abstract", "monad", "class", "constructor", "inheritance"];
document.getElementById('backone').addEventListener('click',()=>{
    if (window.localStorage.getItem('curr') != "intro") {checkGet(fullArrNav[fullArrNav.indexOf(window.localStorage.getItem('curr')) - 1])}
});
document.getElementById('forwardone').addEventListener('click', () => {
    if (window.localStorage.getItem('curr') != "inheritance") { checkGet(fullArrNav[fullArrNav.indexOf(window.localStorage.getItem('curr')) + 1]) }
});
