'use strict';
//////////// ABOUT: querySelector all
// 1. goes downwards --- chid ke select kore joto deep e i thakubk
// 2. queryselector / all 2ta jaygay exist kore (a) document e  (b) element node e
// 3. NodeList return kore

/////// nodelist vs htmlcollection
//// nodelist is collection of nodes but htmlcollection is collection of html elements.

/////////// creating html with js---- insertAdjacentHtml

// steps
// 1. design the html first and then copy it to js
// 2. jar moddhe html insert korbo se.insertAdjacentHTML('position', html ta);
// 3. 'afterbegin'---- (jar moddhe insert korchi tar moddhe) inside the element(je element.insertAdjacentHTML likchi tar moddhe) first chile hisabe
// 4. 'beforeend' ---  inside the element(je element.insertAdjacentHTML likchi tar moddhe) last child hisabe
// 5. 'beforebegin' --- je element.insertAdjacentHTML se element er purbe, moddhe na.
// 6. 'aftereend' --- je element.insertAdjacentHTML se element er pore, moddhe na.
const headerTitle = document.querySelector('.header__title');
headerTitle.addEventListener('click', function () {
  const html = `

<div class="insert_adjacent">
      <p>I'm adjacent html</p>
</div>

`;
  headerTitle.insertAdjacentHTML('beforebegin', html);
});

////////  innerHTML er maddhome o html push kora jay . uporer gulo event lagse ba innerHtml ager html ke replace kore dise. soluion bellow--jodi event chara and replace chara chaw

//////////////////// BUT CAREFUL:::: ager je html chilo seta chole jabe
headerTitle.addEventListener('click', function () {
  headerTitle.innerHTML = `
  <div class="innerHtml">
        We use cookie for better user experice 
        <button>Got It<button>
  </div>
  `;
});

///////// createElement-----
// at leasr must create a div element first then sei div tar innerHtml e backtick diye html likhle output as expected ashbe. But only jodi html create kore var e rakhi then headerTitle e prepend kori then output tag soho dekhabe.

///// steps
// 1. create div
// 2. sei div.Inner html backtick diye likho
// 3. kar moddhe insert korba se.prepend/position(je div ta banaila)

///////////////// ABOUT PREPEND AND APPEND
// prepend and append kono parent er moddhe add hobe first child and last child hiasabe.
const prependHtml = document.createElementNS('div');
prependHtml.innerHTML = `
<div class="innerHtml">
      We use cookie for better user experice 
      <button>Got It<button>
</div>
`;
headerTitle.prepend(prependHtml);
////////////////// headerTitle.append(prependHtml.cloneNode(true))
// cloneNode true mane created html er all child o copy hobe. tachara prepend html ke 2bar use korchi ja possible na, ajonno cloneNode kora hoise.

///////////////////////// html element er style ke dhora
// dhoro kono html element er css jante chai ajonno use kora lagbe
// -- getComputedStyle(ele).style
// NOTE : html style,attribute,class niye kaj korar somoy must kheal rakha lagbe je 'unite' use kora hoise kina
console.log(getComputedStyle(headerTitle).height);

getComputedStyle(headerTitle).height + 40 + 'px'; // setting height must using --- unite

///////////////////////////////////  css root var ke dhora

document.documentElement.style.setProperty('--bg-color', 'red'); // '--bg-color' ::root e must thaka lagbe
document.documentElement.style.setProperty('root var', 'value');

//////////////////////////// getting custom and built-in html attribute
// data-set attribute--- html e data-attributeNameYouWant , attribute name mane start hobe data- diye. ar js e sei attribute pabo 'data-set' er maddhome

headerTitle.dataSet(
  'data er pore je nam ta bole diso, data-single or data-double-name=== camelcase, dataSet(doubleName)'
);

/////////////////////// getAttribute(), setAttribute()
headerTitle.getAttribute('attributeName');
headerTitle.setAttribute('attributeName', 'value of the attribute');

///////////////////////////////////// IMPLEMENTING SMOOTH SCROLL
// 1. prothome select koro jekhane scroll kore jete chaw.... say 'section-1'
// 2. jake click korle scroll kore jabe aibar take select koro
// 3. scroll kore jekhane jabe tar co-ordinates naw...getBoundingClientRect()

/////////////////////// DETAILS ABOUT getBoundingClientRect()

///////////////////// REMEMBER:: always current viewport theke distance count start hobe.

// y and top are same ==== viewport theke element er top porjonto distance
// x and left are same ==== left edge theke element er left top porjonto distance
// right holo left edge theke element er right porjonto distance
// bottom holo top theke aktdom element er bottom porjonto distance

//////////////////////////// GETTING CURRENT SCROLL POSITION
// ata page er top theke current viewport er top porjonto distance
// window.pageOffsetY or window.scrollY

//////////// scroll kore jabar jonno window.scrollTo() use kora lagebe. scrollTo accepts two arguments a) left position b) top position... aita amra boundingClientRect and window.scrollX/Y theke pabo

/////////////////////////////  smooth scroll kaj korbe na jodi anchor tag e eventListener  add koro But preventDefalult() na koro. must anchor er preventDefault kora lagbe.
const coordinate = headingTitle.getBoundingClientRect();
window.scrollTo(coordinate.left, coordinate.top); // top theke distance er jonno window.scrollY lagbe ja likhi nai, so acurate result er jonno use it.

////// scrollTo will accept an object for smooth behavior... left, top and behavior
window.scrollTo({
  left: coordinate.left + window.scrollX,
  top: coordinate.top + window.scrollY,
  behavior: 'smooth',
});

//////////////////////// modern way
// 1. select the element you want to go with scrolling
// 2. that element.scrollIntoView({behavoir:'smooth'})
headingTitle.scrollIntoView({ behavior: 'smooth' });

////////////////////// EVENT PROPAGATION
// event mane holo kichu akta ghotse. dom ei event ta root/ document e generate kore. document sei event ta capture korbe and target element er prottekta parent hoye travell kore target element porjonto ashbe -- akhon suru hobe 'target phase' akhane event handle hobe. erpor 'bubble phase' start hobe parent e jodi event handler attached thake then akhaneo event handle hobe. ai captur and bubble ke bola hoy event propagation.
// NOTE:: evnet parent hoye travell korbe sibling hoye travell korbe na.
// event bubble houa means je event ta jeno parent e i attached . jar jonno event bubble hobar somoy parent e event thakle seta o bubble hobe -- output hobe

/////////////////////////////   e.target----- will give an element
// e.target er maddhome amra jante pari je first event ta kothay hoise. jar shathe event handler attached take mean korche na.

// event deligation
// event propagation ke kaje lagiye event deligation kora hoy. each child e event add na kore parent e event add kora hoy ar e.target er maddhome child ke dhore each child ke controle kora hoy. so multiple evnet copy hobe na parent theke event bubble hobe but child to target kora e hoise. so onkgulo child er kaj aka parent kore dicche---deligation hocche

// steps
// 1. common parent ke dhora and event listener add kra
// 2. condition apply kora jeno only target element e click korlei event er code run hoy.
// 3. erpor set target element/child ke dhora/tader niye kaj kora

const nav = document.querySelector('.nav'); // nav holo paren ar nav-links holo child
nav.addEventListener('click', function (e) {
  if (e.target.classList.contains('nav-links')) {
    const id = e.target.getAttribute('href'); // #section-1
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/////////////////////// SELECTING DOM ELEMENTS :: going down(child)
// 5 ways to select ::: 'queryselector' also exists in elementNode
// 1,2) parent.qureyselector/all --- nodeList
// 3) parent.children --- htmlCollection === direct child ke dibe
// 4) parent.firstElementChild
// 5) parent.lastElementChild

/////////////////////// SELECTING DOM ELEMENTS :: going up(parent)
// 2 ways
// 1) child.parentElement--- child er direct parent ke dibe
// 2) child.closest('className') --- parent joto nested thakuk take dibe

/////////////////////// SELECTING DOM ELEMENTS :: going sideways(siblings)
// 2 ways
// 1) child.previousElementSibling
// 2) child.nextElementSibling
