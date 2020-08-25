/* Get Our Elements */
const player = document.querySelector('.Player');
const video = document.querySelector('.viewer')
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress_filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.Player_slider');

/* Build out functions */
function toggleplay(){
    if(video.paused) video.play();
    else video.pause();
}
function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}
function Skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}
function Rangecontrol(){
    video[this.name] = this.value;
}
function Progress(){
 const percent = (video.currentTime / video.duration) *100;
 progressBar.style.flexBasis = `${percent}%`;

}
function scrub(e){
  const updatetime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = updatetime;
}
/* Hook up the event listeners */
video.addEventListener('click',toggleplay);
video.addEventListener('play',updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', Progress);
toggle.addEventListener('click',toggleplay);
skipButtons.forEach(btn => btn.addEventListener('click',Skip));
ranges.forEach(range=>{
    range.addEventListener('mousemove',Rangecontrol);
    range.addEventListener('change',Rangecontrol);
});
let Cliked = false;
progress.addEventListener('click',scrub);
progress.addEventListener('mosemove',(e) => Cliked && scrub(e));
progress.addEventListener('mousedown',() => Cliked=true);
progress.addEventListener('mouseup',() => Cliked=false);