// Date de demo
const videos = [
  {id:'dQw4w9WgXcQ', title:'Demo Video 1', channel:'Canal Demo', views:'1.2M vizualizări', when:'2 ani în urmă'},
  {id:'3JZ_D3ELwOQ', title:'Demo Video 2', channel:'Canal A', views:'542K vizualizări', when:'6 luni în urmă'},
  {id:'L_jWHffIx5E', title:'Demo Video 3', channel:'Alt Canal', views:'23K vizualizări', when:'1 lună în urmă'},
  {id:'hY7m5jjJ9mM', title:'Demo Video 4', channel:'Canal X', views:'98K vizualizări', when:'3 săptămâni în urmă'},
  {id:'kJQP7kiw5Fk', title:'Demo Video 5', channel:'Canal Pop', views:'3.4M vizualizări', when:'4 ani în urmă'}
];

const grid = document.getElementById('grid');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById('modal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');
const player = document.getElementById('player');
const videoTitle = document.getElementById('videoTitle');
const videoMeta = document.getElementById('videoMeta');

function makeCard(v){
  const card = document.createElement('article');
  card.className = 'card';
  card.tabIndex = 0;

  const thumb = document.createElement('div');
  thumb.className = 'thumb';
  // folosește thumbnail-ul YouTube (online)
  thumb.style.backgroundImage = `url(https://i.ytimg.com/vi/${v.id}/hqdefault.jpg)`;
  thumb.style.backgroundSize = 'cover';
  thumb.style.backgroundPosition = 'center';

  const meta = document.createElement('div');
  meta.className = 'meta';
  meta.innerHTML = `
    <h3 class="title">${v.title}</h3>
    <p class="channel">${v.channel}</p>
    <p class="stats">${v.views} • ${v.when}</p>
  `;

  card.appendChild(thumb);
  card.appendChild(meta);

  card.addEventListener('click', ()=>openModal(v));
  card.addEventListener('keydown', (e)=>{ if(e.key==='Enter') openModal(v)});
  return card;
}

function render(list){
  grid.innerHTML = '';
  list.forEach(v=> grid.appendChild(makeCard(v)));
}

function openModal(v){
  player.innerHTML = '';
  const iframe = document.createElement('iframe');
  iframe.width = '100%';
  iframe.height = '100%';
  iframe.src = `https://www.youtube.com/embed/${v.id}?autoplay=1`;
  iframe.title = v.title;
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.allowFullscreen = true;
  player.appendChild(iframe);
  videoTitle.textContent = v.title;
  videoMeta.textContent = `${v.channel} • ${v.views} • ${v.when}`;
  modal.classList.remove('hidden');
}

function closeModal(){
  modal.classList.add('hidden');
  player.innerHTML = '';
}

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
window.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });

searchInput.addEventListener('input', ()=>{
  const q = searchInput.value.trim().toLowerCase();
  if(!q) return render(videos);
  const filtered = videos.filter(v=> v.title.toLowerCase().includes(q) || v.channel.toLowerCase().includes(q));
  render(filtered);
});

// Init
render(videos);
