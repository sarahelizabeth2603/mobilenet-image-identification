function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet" , ModelLoaded);


}
function ModelLoaded(){
  console.log("Model Is Loaded!");
}
function draw(){
  image(video , 0 , 0 , 300 , 300);
  classifier.classify(video , gotresults);
}
var presviousResults = " ";
function gotresults(error , results){
  if (error) {
    console.log("ERROR!")
    
  }
  else{
    if((results[0].confidence > 0.5) && (presviousResults != results[0].label)){
      console.log(results);
      presviousResults = results[0].label;
      document.getElementById("Object_name").innerHTML = results[0].label;
      document.getElementById("object_Accuracy").innerHTML = results[0].confidence.toFixed(3);
      var synth= window.speechSynthesis;
      speekdata = " The Object detected is "+ results[0].label;
      utterThis = new SpeechSynthesisUtterance(speekdata);
      synth.speak(utterThis);
    }
    
  }

}



