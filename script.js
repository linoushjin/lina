/* ======================================
      COTTAGE LEAF GOAL
====================================== */

// ====== ASSETS ======

const assets = {

    frog:
    "https://raw.githubusercontent.com/linoushjin/lina/main/grenouille.png",

    leaf1:
    "https://raw.githubusercontent.com/linoushjin/lina/main/leaf_01.png",

    leaf2:
    "https://raw.githubusercontent.com/linoushjin/lina/main/leaf_02.png",

    leaf3:
    "https://raw.githubusercontent.com/linoushjin/lina/main/leaf_03.png",

    leaf4:
    "https://raw.githubusercontent.com/linoushjin/lina/main/leaf_04.png",

    sparkle1:
    "https://raw.githubusercontent.com/linoushjin/lina/main/sparkle_01.png",

    sparkle2:
    "https://raw.githubusercontent.com/linoushjin/lina/main/sparkle_02.png",

    sparkle3:
    "https://raw.githubusercontent.com/linoushjin/lina/main/sparkles_03.png"

};

// ====== GOAL ======

let current = 0;
let goal = 200;

// ====== DOM ======

const frog = document.getElementById("frog");
const fill = document.getElementById("goal-fill");
const track = document.getElementById("goal-track");

const currentText = document.getElementById("current-value");
const goalText = document.getElementById("target-value");

const leafLayer = document.getElementById("leaf-layer");
const sparkleLayer = document.getElementById("sparkle-layer");

// ====== LOAD IMAGES ======

if (frog) frog.src = assets.frog;


// ====== UPDATE BAR ======

function updateGoal(){

    const percent = goal > 0 ? Math.min(current / goal, 1) : 0;

    if(fill){
        fill.style.width = (percent * 100) + "%";
    }

    if(currentText){
        currentText.textContent = "€" + current;
    }

    if(goalText){
        goalText.textContent = "€" + goal;
    }

    if(track && frog){

       const frogWidth = 75;

        const x = percent * (track.offsetWidth - frogWidth);

        frog.style.left = (x + 10) + "px";

    }

}

// ====== FLOATING LEAF ======

function spawnLeaf(){

    if(!leafLayer) return;

    const img = document.createElement("img");

    img.src = assets["leaf" + (Math.floor(Math.random()*4)+1)];

    img.className = "floating-leaf";

img.style.left = Math.random() * track.offsetWidth + "px";
img.style.top = Math.random() * 180 + "px";

    img.animate([

        {
            transform:"translateY(0px) rotate(0deg)",
            opacity:.65
        },

        {
            transform:"translateY(-30px) rotate(18deg)",
            opacity:.35
        }

    ],{

        duration:12000 + Math.random()*5000,

        easing:"ease-in-out",

        iterations:Infinity,

        direction:"alternate"

    });

    leafLayer.appendChild(img);

}

// ====== SPARKLES ======

function spawnSparkle(){

    if(!sparkleLayer) return;

    const img = document.createElement("img");

    img.src = assets["sparkle" + (Math.floor(Math.random()*3)+1)];

    img.className = "sparkle";

    img.style.left = Math.random() * track.offsetWidth + "px";
  
img.style.top = Math.random() * 180 + "px";

    img.animate([

        {
            opacity:.15,
            transform:"scale(.8)"
        },

        {
            opacity:1,
            transform:"scale(1)"
        },

        {
            opacity:.15,
            transform:"scale(.8)"
        }

    ],{

        duration:2500 + Math.random()*1500,

        iterations:Infinity

    });

    sparkleLayer.appendChild(img);

}

// ====== INIT ======

updateGoal();

for(let i=0;i<5;i++){
    spawnLeaf();
}

for(let i=0;i<5;i++){
    spawnSparkle();
}

// ====== DEMO ======

setInterval(()=>{

    current += 5;

    if(current > goal){
        current = 0;
    }

    updateGoal();

},2500);
