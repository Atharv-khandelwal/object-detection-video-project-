status=""
objects=[]
song=""

function preload(){
img=loadImage('maxresdefault.jpg')
song=loadSound("alarm.mp3")
}

function setup(){
    canvas=createCanvas(380,380)
    canvas.center()

    video=createCapture(VIDEO)
    video.hide()
    video.size(380,380)
    
    objectDetector=ml5.objectDetector("cocossd",modelLoaded)
    document.getElementById("status").innerHTML="Status : Detecting Objects"
}

function draw(){
    image(video,0,0,380,380)
   if(status!= ""){
r=random(255)
       g=random(255)
       b=random(255)
       objectDetector.detect(video,gotResult)
       if(objects.length==0){
           song.play()
           document.getElementById("noo").innerHTML="Person Not Detected"
       }
       for(i=0; i<objects.length; i++){
           document.getElementById("status").innerHTML="Status= Object Detected"
           document.getElementById('noo').innerHTML="Number Of Objects Detected: "+objects.length
           
           fill(r,g,b) 
           percent=floor(objects[i].confidence*100)
           text(objects[i].label+" "+ percent+ "%",objects[i].x+15,objects[i].y+15);
           noFill()
           stroke(r,g,b)
           rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
           if(objects[i]!="person"){
               song.play()
               document.getElementById("noo").innerHTML="Person Not detected"

           }
       }
   }
}


function modelLoaded(){
    console.log("Model Loaded")
    status=true
    
}

function gotResult(error,result){
if(error){
    console.log(error)
}
console.log(result)
objects=result

}