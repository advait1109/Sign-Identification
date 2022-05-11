Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="result_img" src="'+data_uri+'">';
    });
}
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/1aPrAMZCI/model.json',modelLoaded);
function modelLoaded(){
    console.log('modelLoaded');
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data="First Prediction is "+prediction1+" and the Second Prediction is "+prediction2;
    var utterthis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterthis);
}
function identify_emotion(){
    image=document.getElementById("result_img");
    classifier.classify(image, gotResult);
}
function gotResult(error,result){
    if (error){
        console.error(error);
    }
    else{
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML=result[0].label;
        document.getElementById("result_emotion_name2").innerHTML=result[1].label;
        prediction1=result[0].label;
        prediction2=result[1].label;
        speak();
        if (prediction1=="Victory"){
            document.getElementById("update_emoji").innerHTML="&#9996;";
        }
        if (prediction1=="Like"){
            document.getElementById("update_emoji").innerHTML="&#128077;";
        }
        if (prediction1=="Best"){
            document.getElementById("update_emoji").innerHTML="&#128076;";
        }
        if (prediction2=="Victory"){
            document.getElementById("update_emoji2").innerHTML="&#9996;";
        }
        if (prediction2=="Like"){
            document.getElementById("update_emoji2").innerHTML="&#128077;";
        }
        if (prediction2=="Sad"){
            document.getElementById("update_emoji2").innerHTML="&#128076;";
        }
    }
}