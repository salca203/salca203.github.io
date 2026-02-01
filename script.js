// EmailJS init with your public key
emailjs.init("5yYH_2gvEYSWG59WaUrap")

// Theme and accent
const themeBtn = document.getElementById("themeBtn")
const accentPicker = document.getElementById("accentPicker")

themeBtn.onclick = () => {
  document.body.classList.toggle("light")
}

accentPicker.oninput = event => {
  document.documentElement.style.setProperty("--accent", event.target.value)
}

// Mail
const form = document.getElementById("contactForm")
const mailStatus = document.getElementById("mailStatus")

form.onsubmit = event => {
  event.preventDefault()
  mailStatus.textContent = "Sende…"

  emailjs.sendForm("service_drsx4ic", "template_2rawiaj", form)
    .then(() => {
      mailStatus.textContent = "Gesendet! Danke"
      form.reset()
    })
    .catch(err => {
      console.error(err)
      mailStatus.textContent = "Fehler beim Senden"
    })
}

// Counter
let count = 0
const counterEl = document.getElementById("counter")
document.getElementById("cPlus").onclick = () => { count++; counterEl.textContent = count }
document.getElementById("cMinus").onclick = () => { count--; counterEl.textContent = count }
document.getElementById("cReset").onclick = () => { count = 0; counterEl.textContent = count }

// Stopwatch
let swTime = 0, swInt = null
const swDisplay = document.getElementById("stopwatch")
function pad(n){ return String(n).padStart(2, "0") }
function updateSW(){ swDisplay.textContent = `${pad(Math.floor(swTime/3600))}:${pad(Math.floor(swTime/60)%60)}:${pad(swTime%60)}` }

document.getElementById("swStart").onclick = () => {
  if(swInt) return
  swInt = setInterval(() => { swTime++; updateSW() }, 1000)
}
document.getElementById("swStop").onclick = () => { clearInterval(swInt); swInt = null }
document.getElementById("swReset").onclick = () => { clearInterval(swInt); swInt = null; swTime = 0; updateSW() }

// Timer
let timerSec = 0, timerInt = null
const tDisp = document.getElementById("timerDisplay")

document.getElementById("timerStart").onclick = () => {
  const v = Number(document.getElementById("timerInput").value)
  if(timerInt || v <= 0) return
  timerSec = v * 60
  tDisp.textContent = `${pad(Math.floor(timerSec/60))}:${pad(timerSec%60)}`
  timerInt = setInterval(() => {
    timerSec--
    tDisp.textContent = `${pad(Math.floor(timerSec/60))}:${pad(timerSec%60)}`
    if(timerSec <= 0){ clearInterval(timerInt); timerInt = null; alert("Timer fertig") }
  }, 1000)
}
document.getElementById("timerStop").onclick = () => { clearInterval(timerInt); timerInt = null }
document.getElementById("timerReset").onclick = () => { clearInterval(timerInt); timerInt = null; timerSec = 0; tDisp.textContent = "00:00" }

// Notes localStorage
const notes = document.getElementById("notes")
notes.value = localStorage.getItem("notes") || ""
document.getElementById("saveNotes").onclick = () => { localStorage.setItem("notes", notes.value); alert("Gespeichert") }

// Reaction test
const rBox = document.getElementById("reactionBox")
const rRes = document.getElementById("reactionResult")
let start = 0, reactionTimer = null
rBox.onclick = () => {
  clearTimeout(reactionTimer)
  rBox.style.background = "red"; rBox.textContent = "Warte..."
  rRes.textContent = ""
  reactionTimer = setTimeout(() => {
    rBox.style.background = "green"; rBox.textContent = "Klick!"
    start = Date.now()
  }, Math.random() * 2000 + 1000)
}
rBox.onmouseup = () => {
  if(rBox.style.background === "green"){
    rRes.textContent = `Reaktion: ${Date.now() - start} ms`
    rBox.style.background = ""; rBox.textContent = "Start"
  }
}

// Snake
const sCanvas = document.getElementById("snakeCanvas")
const sCtx = sCanvas.getContext("2d")
const cell = 15, cols = 20, rows = 20
let snake = [{x:10,y:10}], sDir = {x:0,y:0}, apple = {x:5,y:5}

function drawSnake(){
  sCtx.clearRect(0,0,sCanvas.width,sCanvas.height)
  sCtx.fillStyle = "red"
  sCtx.fillRect(apple.x * cell, apple.y * cell, cell, cell)
  sCtx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--accent") || "#ff8c1a"
  snake.forEach(p => sCtx.fillRect(p.x * cell, p.y * cell, cell, cell))
}

function moveSnake(){
  if(sDir.x === 0 && sDir.y === 0) return
  const head = {x: snake[0].x + sDir.x, y: snake[0].y + sDir.y}
  if(head.x < 0 || head.y < 0 || head.x >= cols || head.y >= rows || snake.some(s => s.x === head.x && s.y === head.y)){
    snake = [{x:10,y:10}]; sDir = {x:0,y:0}; return
  }
  snake.unshift(head)
  if(head.x === apple.x && head.y === apple.y){
    apple = {x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows)}
  } else {
    snake.pop()
  }
}

document.getElementById("snakeStart").onclick = () => { if(sDir.x === 0 && sDir.y === 0) sDir = {x:1,y:0} }
document.getElementById("snakeReset").onclick = () => { snake = [{x:10,y:10}]; sDir = {x:0,y:0} }

window.addEventListener("keydown", e => {
  if(e.key === "ArrowUp") sDir = {x:0,y:-1}
  if(e.key === "ArrowDown") sDir = {x:0,y:1}
  if(e.key === "ArrowLeft") sDir = {x:-1,y:0}
  if(e.key === "ArrowRight") sDir = {x:1,y:0}
})

setInterval(() => { moveSnake(); drawSnake() }, 120)
