let player,
progressbar,
interval,
currentTime,
sec = 0,
min = 0,
currentPlaying,
files,
nowPlaying,
musicLength,
list,
musicInfo

function init(){
    player = document.getElementById('player')
    progressbar = document.getElementById('progressbar')
    currentTime = document.getElementById('currentTime')
    nowPlaying = document.getElementById('nowPlaying')
    list = document.getElementById('trackList')
    player.onloadeddata = ()=>{
        progressbar.max = player.duration
        musicLength = `${Math.round(player.duration/60).toString().padStart(2,"0")}:${Math.round(player.duration%60).toString().padStart(2,"0")}`
    }
    progressbar.onmousedown = ()=>{
        if(!player.paused) PlayPause()
    }
    progressbar.onmouseup = ()=>{
        if(player.paused){
            player.currentTime = progressbar.value
            PlayPause()
        }
    }
    fetch("http://192.168.0.7:8080/music/getList").then((res)=>{
        return res.json()
    }).then((data)=>{
        files = data
        currentPlaying = Math.round(Math.random() * (files.length-1))
        load()
    })
    player.onended = random
}

function load(){
    player.src = `http://192.168.0.7:8080/music?id=${currentPlaying}`
    player.load()
    fetch('http://192.168.0.7:8080/music/getMetadata?id='+currentPlaying).then((res)=>{
        return res.json()
    }).then((info)=>{
        musicInfo = info['music-metadata']
        nowPlaying.innerHTML = `${musicInfo['artist']} - ${musicInfo['title']}`
    })
    sec = 0
    min = 0
}

function updateProgressbar(){
    progressbar.value = player.currentTime
}

function updateCurrentTime(){
    min = Math.round(player.currentTime / 60)
    sec = Math.round(player.currentTime % 60)
    currentTime.innerHTML = min.toString().padStart(2,"0") + ":" + sec.toString().padStart(2,"0") + "/" + musicLength
}

function PlayPause(){
    if(player.paused){
        interval = setInterval(()=>{
            updateCurrentTime()
            updateProgressbar()
        },1000)
        player.play()
    }
    else{
        player.pause()
        clearInterval(interval)
    }
}

function next(){
    currentPlaying  = (currentPlaying + 1)%files.length
    if(!player.paused) PlayPause()
    load()
    PlayPause()
}

function prev(){
    currentPlaying = (currentPlaying - 1 + files.length)%files.length
    if(!player.paused) PlayPause()
    load()
    PlayPause()
}

function random(){
    currentPlaying = Math.round(Math.random() * (files.length-1))
    if(!player.paused) PlayPause()
    load()
    PlayPause()
}