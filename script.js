emailjs.init("YOUR_USER_ID")

const themeToggle = document.getElementById("themeToggle")
const colorPicker = document.getElementById("colorPicker")

themeToggle.addEventListener("change", () => {
document.body.classList.toggle("dark")
})

colorPicker.addEventListener("input", e => {
document.documentElement.style.setProperty("--accent", e.target.value)
})

const form = document.getElementById("contactForm")
const statusText = document.getElementById("status")

form.addEventListener("submit", e => {
e.preventDefault()

statusText.textContent = "Sende..."

emailjs.sendForm("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",form)
.then(() => {
statusText.textContent = "Nachricht gesendet"
})
.catch(() => {
statusText.textContent = "Fehler beim Senden"
})
})

let count = 0
const countEl = document.getElementById("count")

document.getElementById("plus").onclick = () => {
count++
countEl.textContent = count
}

document.getElementById("minus").onclick = () => {
count--
countEl.textContent = count
}

document.getElementById("counterReset").onclick = () => {
count = 0
countEl.textContent = count
}

let swTime = 0
let swInterval = null
const swDisplay = document.getElementById("stopwatch")

function formatTime(sec){
let h = String(Math.floor(sec/3600)).padStart(2,"0")
let m = String(Math.floor(sec/60)%60).padStart(2,"0")
let s = String(sec%60).padStart(2,"0")
return h+":"+m+":"+s
}

document.getElementById("swStart").onclick = () => {
if(swInterval) return
swInterval = setInterval(()=>{
swTime++
swDisplay.textContent = formatTime(swTime)
},1000)
}

document.getElementById("swStop").onclick = () => {
clearInterval(swInterval)
swInterval = null
}

document.getElementById("swReset").onclick = () => {
clearInterval(swInterval)
swInterval = null
swTime = 0
swDisplay.textContent = formatTime(swTime)
}

document.getElementById("roll").onclick = () => {
document.getElementById("dice").textContent = Math.floor(Math.random()*6)+1
}

const noteBox = document.getElementById("noteBox")
noteBox.value = localStorage.getItem("note") || ""

document.getElementById("saveNote").onclick = () => {
localStorage.setItem("note", noteBox.value)
alert("Gespeichert")
}

let pomSeconds = 1500
let pomInterval = null
const pomDisplay = document.getElementById("pomodoro")

function updatePom(){
let m = String(Math.floor(pomSeconds/60)).padStart(2,"0")
let s = String(pomSeconds%60).padStart(2,"0")
pomDisplay.textContent = m+":"+s
}

updatePom()

document.getElementById("pomStart").onclick = () => {
if(pomInterval) return
pomInterval = setInterval(()=>{
pomSeconds--
updatePom()
if(pomSeconds<=0){
clearInterval(pomInterval)
alert("Zeit vorbei")
}
},1000)
}

document.getElementById("pomStop").onclick = () => {
clearInterval(pomInterval)
pomInterval = null
}

document.getElementById("pomReset").onclick = () => {
clearInterval(pomInterval)
pomInterval = null
pomSeconds = 1500
updatePom()
}

const canvas = document.getElementById("snakeCanvas")
const ctx = canvas.getContext("2d")

let grid = 15
let snake = [{x:10,y:10}]
let dir = {x:0,y:0}
let apple = {x:5,y:5}

function drawSnake(){
ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.fillStyle = "red"
ctx.fillRect(apple.x*grid, apple.y*grid, grid, grid)

ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--accent")

snake.forEach(p=>{
ctx.fillRect(p.x*grid, p.y*grid, grid, grid)
})
}

function moveSnake(){
if(dir.x===0 && dir.y===0) return

let head = {x:snake[0].x+dir.x,y:snake[0].y+dir.y}

if(head.x<0||head.y<0||head.x>=20||head.y>=20){
snake=[{x:10,y:10}]
dir={x:0,y:0}
return
}

snake.unshift(head)

if(head.x===apple.x && head.y===apple.y){
apple={x:Math.floor(Math.random()*20),y:Math.floor(Math.random()*20)}
}else{
snake.pop()
}
}

setInterval(()=>{
moveSnake()
drawSnake()
},120)

window.addEventListener("keydown", e=>{
if(e.key==="ArrowUp") dir={x:0,y:-1}
if(e.key==="ArrowDown") dir={x:0,y:1}
if(e.key==="ArrowLeft") dir={x:-1,y:0}
if(e.key==="ArrowRight") dir={x:1,y:0}
})

document.getElementById("snakeReset").onclick = ()=>{
snake=[{x:10,y:10}]
dir={x:0,y:0}
}
