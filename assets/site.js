/* ---- custom cursor ---- */
(function(){
  var dot=document.querySelector('.cur-dot'),ring=document.querySelector('.cur-ring');
  if(!dot||!ring)return;
  var mx=0,my=0,rx=0,ry=0;
  window.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
  function loop(){rx+=(mx-rx)*0.18;ry+=(my-ry)*0.18;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);}
  loop();
  document.querySelectorAll('a,button,input,select,textarea,.svc,.t-card,.step,.faq-item').forEach(function(el){
    el.addEventListener('mouseenter',function(){ring.classList.add('hov');});
    el.addEventListener('mouseleave',function(){ring.classList.remove('hov');});
  });
})();

/* ---- header scroll ---- */
window.addEventListener('scroll',function(){
  var h=document.getElementById('header');
  if(h)h.classList.toggle('scrolled',window.scrollY>30);
});

/* ---- mobile menu ---- */
(function(){
  var mb=document.getElementById('menuBtn'),nl=document.getElementById('navlinks');
  if(!mb||!nl)return;
  mb.addEventListener('click',function(){nl.classList.toggle('open');});
  nl.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nl.classList.remove('open');});});
})();

/* ---- scroll reveal ---- */
(function(){
  var els=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){els.forEach(function(el){el.classList.add('in');});return;}
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});
  },{threshold:0.12});
  els.forEach(function(el,i){el.style.transitionDelay=(i%4)*0.08+'s';io.observe(el);});
})();

/* ---- faq accordion ---- */
document.querySelectorAll('.faq-q').forEach(function(q){
  q.addEventListener('click',function(){
    var item=q.closest('.faq-item');
    var ans=item.querySelector('.faq-a');
    var isOpen=item.classList.toggle('open');
    ans.style.maxHeight=isOpen?(ans.scrollHeight+'px'):null;
  });
});

/* ---- form (demo handler; replace action with real endpoint at go-live) ---- */
function handleSubmit(e){
  e.preventDefault();
  var btn=e.target.querySelector('button[type=submit]');
  var orig=btn.getAttribute('data-label')||btn.textContent;
  btn.setAttribute('data-label',orig);
  btn.textContent='✓ Thank You! We’ll Be In Touch';
  btn.style.background='var(--navy)';
  e.target.reset();
  setTimeout(function(){btn.textContent=orig;btn.style.background='';},3500);
}
