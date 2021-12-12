a=" ";
b=" ";
left_wrist_x=0;
left_wrist_y=0;
right_wrist_x=0;
right_wrist_y=0;
score_leftWrist=0;
status="";

function preload(){
    a= loadSound("music.mp3");
    b= loadSound("b.mp3");
}

function setup(){
    canvas= createCanvas(550,370);
    canvas.position(400,250);
    video= createCapture(VIDEO);
    video.hide();
    poseNet= ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("Posenet is loaded");
}

function gotPoses(results){
    if(results.length>0){
       console.log(results);
       score_leftWrist= results[0].pose.keypoints[9].score;
       console.log("Score of left wrist is= "+score_leftWrist);
       left_wrist_x= results[0].pose.leftWrist.x;
       left_wrist_y= results[0].pose.leftWrist.y;
       console.log("Left Wrist x= "+left_wrist_x+"y= "+left_wrist_y);
       right_wrist_x= results[0].pose.rightWrist.x;
       right_wrist_y= results[0].pose.rightWrist.y;
       console.log("Right Wrist x= "+right_wrist_x+"y= "+right_wrist_y);
    }
}

function draw(){
    image(video,0,0,550,370);
    fill("red");
    stroke("#000000");
    if(score_leftWrist>0.2){
        circle(left_wrist_x,left_wrist_y,20);
        b.pause();
    }
}