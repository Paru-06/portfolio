document.addEventListener("DOMContentLoaded", function () {
    function animateValue(id, start, end, duration) {
        const element = document.getElementById(id);

        if (!element) return;

        let startTimestamp = null;

        function step(timestamp) {
            if (!startTimestamp) startTimestamp = timestamp;

            const progress = Math.min(
                (timestamp - startTimestamp) / duration,
                1
            );

            const currentValue = Math.floor(
                progress * (end - start) + start
            );

            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    animateValue("projects-count", 0, 7, 2000);
    animateValue("achievements-count", 0, 10, 2200);
    animateValue("dedication-count", 0, 100, 2500);
});

// Re-trigger About section animations every time About is clicked
const aboutLink = document.querySelector('a[href="#about"]');
const aboutSection = document.querySelector('#about');

if (aboutLink && aboutSection) {
    aboutLink.addEventListener('click', function () {
        // 1. Remove animation class
        aboutSection.classList.remove('animate-about');

        // 2. Force browser to re-render (reflow)
        void aboutSection.offsetWidth;

        // 3. Add animation class again
        aboutSection.classList.add('animate-about');
    });
}



/* ==========================================
   ACTIVE NAV LINK HIGHLIGHT ON SCROLL
========================================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function updateActiveNav() {
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");

        const href = link.getAttribute("href");
        if (href === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
}

/* Run on scroll */
window.addEventListener("scroll", updateActiveNav);

/* Run once when page loads */
window.addEventListener("load", updateActiveNav);

/* ========================================
   CONTACT SECTION JAVASCRIPT
   Paste this in your script.js file
======================================== */

// Open Contact Form Popup
function openContactForm() {
    const modal = document.getElementById("contactModal");
    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
}

// Close Contact Form Popup
function closeContactForm() {
    const modal = document.getElementById("contactModal");
    modal.classList.remove("active");
    document.body.style.overflow = "auto"; // Restore scrolling
}

// Close popup when ESC key is pressed
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeContactForm();
    }
});

// Optional: Close popup after successful form submission
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", function () {
            // Small delay so the form submits properly
            setTimeout(function () {
                closeContactForm();
            }, 1000);
        });
    }
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            alert("Copied to clipboard!");
        })
        .catch(err => {
            console.error("Copy failed:", err);
        });
}

/* ========================================
   CONTACT PARTICLES - FINAL WORKING CODE
======================================== */

window.addEventListener("load", function () {
    const particlesContainer = document.getElementById("contact-particles");

    if (particlesContainer && typeof tsParticles !== "undefined") {
        tsParticles.load("contact-particles", {
            fullScreen: {
                enable: false
            },

            background: {
                color: "transparent"
            },

            fpsLimit: 60,

            particles: {
                number: {
                    value: 25
                },

                color: {
                    value: ["#ff4ecd", "#8b5cf6", "#38bdf8"]
                },

                shape: {
                    type: "circle"
                },

                opacity: {
                    value: 0.35
                },

                size: {
                    value: {
                        min: 1,
                        max: 4
                    }
                },

                move: {
                    enable: true,
                    speed: 0.4,
                    direction: "none",
                    random: true,
                    straight: false,
                    outModes: {
                        default: "out"
                    }
                }
            },

            detectRetina: true
        });
    }
});

/* =========================================================
   FINAL PROJECTS SECTION JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const track = document.querySelector(".projects-track");

    const cards = Array.from(
        document.querySelectorAll(".project-card")
    );

    const nextBtn =
    document.querySelector(".next-btn");

const prevBtn =
    document.querySelector(".prev-btn");

    const filterBtns =
        document.querySelectorAll(".filter-btn");

    const viewAllBtn =
        document.getElementById("viewAllBtn");

    let currentIndex = 0;

    let filteredCards = [...cards];

    /* =========================================
       RESPONSIVE CARD COUNT
    ========================================= */

    function getVisibleCards() {

    if (window.innerWidth <= 768) {
        return 1;
    }

    if (window.innerWidth <= 1200) {
        return 2;
    }

    return 3;
}

/* =========================================
   UPDATE ARROWS
========================================= */

function updateArrows() {

    const visibleCards = getVisibleCards();

    if (currentIndex <= 0) {
        prevBtn.style.display = "none";
    } else {
        prevBtn.style.display = "flex";
    }

    if (
        currentIndex >=
        filteredCards.length - visibleCards
    ) {
        nextBtn.style.display = "none";
    } else {
        nextBtn.style.display = "flex";
    }
}

/* =========================================
   UPDATE SLIDER
========================================= */

function updateSlider() {


    const card = document.querySelector(".project-card");

        const gap =
        parseInt(
        window.getComputedStyle(track).gap
        );

        const cardWidth =
        card.offsetWidth + gap;

    track.style.transform =
        `translateX(-${currentIndex * cardWidth}px)`;

    const visibleCards = getVisibleCards();

if (filteredCards.length <= visibleCards) {

    nextBtn.style.display = "none";
    prevBtn.style.display = "none";

} else {

    updateArrows();
}

}
    /* =========================================
       NEXT BUTTON
    ========================================= */

    nextBtn.addEventListener("click", () => {

    const visibleCards = getVisibleCards();

    if (
        currentIndex <
        filteredCards.length - visibleCards
    ) {
        currentIndex++;
        updateSlider();
    }
});

    /* =========================================
       PREVIOUS BUTTON
    ========================================= */

    prevBtn.addEventListener("click", () => {

    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
});

    /* =========================================
       FILTER BUTTONS
    ========================================= */

    filterBtns.forEach(button => {

        button.addEventListener("click", () => {

            filterBtns.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const filter =
                button.getAttribute("data-filter");

            if (filter === "all") {

                filteredCards = [...cards];
                track.innerHTML = "";

                filteredCards.forEach(card => {
                    track.appendChild(card);
                });

            } else {

                filteredCards = cards.filter(card =>
                    card.dataset.category.includes(filter)
                );
                track.innerHTML = "";
                filteredCards.forEach(card => {
                    track.appendChild(card);
                });
                            }

            currentIndex = 0;

            cards.forEach(card => {

    if (
        filter === "all" ||
        card.dataset.category.includes(filter)
    ) {

        card.style.display = "block";

    } else {

        card.style.display = "none";
    }

});

            updateSlider();
        });
    });

    /* =========================================
       VIEW ALL PROJECTS MODAL
    ========================================= */

    viewAllBtn.addEventListener("click", () => {

        const modal =
            document.createElement("div");

                modal.className = "projects-modal";

                let modalCards = "";

                cards.forEach(card => {

            modalCards += `
                <div class="modal-project-card">
                    ${card.innerHTML}
                </div>
            `;
        });

        modal.innerHTML = `

    <button class="close-modal">
        <i class="fa-solid fa-xmark"></i>
    </button>

    <div class="projects-modal-content">

        <h2>All Projects</h2>

        <div class="modal-projects-grid">

            ${modalCards}

        </div>

    </div>
`;

        document.body.appendChild(modal);

        modal.querySelectorAll(".live-btn")
.forEach((btn, index) => {

    btn.addEventListener("click", () => {

        /* CLOSE VIEW ALL MODAL FIRST */

        modal.remove();

        document.body.style.overflow = "auto";

        /* OPEN ORIGINAL PROJECT MODAL */

        const originalBtn =
            cards[index].querySelector(".live-btn");

        if(originalBtn){
            originalBtn.click();
        }

    });

});

        document.body.style.overflow = "hidden";

        /* CLOSE BUTTON */

        modal.querySelector(".close-modal")
        .addEventListener("click", () => {

            modal.remove();

            document.body.style.overflow = "auto";
        });

        /* OUTSIDE CLICK */

        modal.addEventListener("click", (e) => {

            if (e.target === modal) {

                modal.remove();

                document.body.style.overflow = "auto";
            }
        });
    });

    /* =========================================
       RESIZE
    ========================================= */

    window.addEventListener("resize", updateSlider);

    /* =========================================
       INITIAL LOAD
    ========================================= */

    updateSlider();

});

/* =========================================================
   VERITAS MODAL OPEN / CLOSE
========================================================= */

const veritasModal = document.getElementById("veritasModal");

const closeVeritasModal = document.getElementById("closeVeritasModal");

const modalOverlay = document.querySelector(".modal-overlay");

/* =========================================================
   OPEN MODAL
========================================================= */

/* 
   IMPORTANT:

   Add this ID to Veritas button in HTML:

   id="openVeritasModal"
*/

const openVeritasModal =
document.getElementById("openVeritasModal");

openVeritasModal.addEventListener("click", () => {

    veritasModal.classList.add("active");

    document.body.style.overflow = "hidden";
});

/* =========================================================
   CLOSE MODAL
========================================================= */

function closeModal(){

    veritasModal.classList.remove("active");

    document.body.style.overflow = "auto";
}

closeVeritasModal.addEventListener(
    "click",
    closeModal
);

modalOverlay.addEventListener(
    "click",
    closeModal
);

/* =========================================================
   ESC KEY CLOSE
========================================================= */

document.addEventListener("keydown", (e) => {

    if(e.key === "Escape"){

        closeModal();
    }
});

/* =========================================================
   AUTO SLIDE
========================================================= */

function openImage(src){

    document
        .getElementById("viewerImage")
        .src = src;

    document
        .getElementById("imageViewer")
        .classList.add("active");
}

function closeImage(){

    document
        .getElementById("imageViewer")
        .classList.remove("active");
}

function openImage(src) {
    document.getElementById("viewerImage").src = src;
    document.getElementById("imageViewer").style.display = "flex";
}

function closeImage() {
    document.getElementById("imageViewer").style.display = "none";
}

/* HABITPULSE MODAL */

const habitPulseModal =
document.getElementById("HabitPulseModal");

const openHabitPulseModal =
document.getElementById("openHabitPulseModal");

const closeHabitPulseModal =
document.getElementById("closeHabitPulseModal");

if (openHabitPulseModal) {
    openHabitPulseModal.addEventListener("click", () => {

        habitPulseModal.classList.add("active");
        document.body.style.overflow = "hidden";

    });
}

function closeHabitPulse(){

    habitPulseModal.classList.remove("active");

    document.body.style.overflow = "auto";
}

closeHabitPulseModal.addEventListener(
    "click",
    closeHabitPulse
);

const habitOverlay =
habitPulseModal.querySelector(".modal-overlay");

console.log(habitOverlay);

if (habitOverlay) {
    habitOverlay.addEventListener(
        "click",
        closeHabitPulse
    );
}

console.log(document.getElementById("openHabitPulseModal"));
console.log(document.getElementById("HabitPulseModal"));
console.log(document.getElementById("closeHabitPulseModal"));

const openStressModal =
document.getElementById("openStressModal");

const stressModal =
document.getElementById("StressModal");

const closeStressModal =
document.getElementById("closeStressModal");

openStressModal.addEventListener("click", () => {
    stressModal.classList.add("active");
    document.body.style.overflow = "hidden";
});

closeStressModal.addEventListener("click", () => {
    stressModal.classList.remove("active");
    document.body.style.overflow = "auto";
});

const openInnovationModal =
document.getElementById("openInnovationModal");

const InnovationModal =
document.getElementById("InnovationModal");

const closeInnovationModal =
document.getElementById("closeInnovationModal");

openInnovationModal.addEventListener("click", () => {
    InnovationModal.classList.add("active");
    document.body.style.overflow = "hidden";
});

closeInnovationModal.addEventListener("click", () => {
    InnovationModal.classList.remove("active");
    document.body.style.overflow = "auto";
});

// Google Play Store Dashboard Modal

const googlePlayModal = document.getElementById("GooglePlayModal");

const openGooglePlayModal = document.getElementById("openGooglePlayModal");

const closeGooglePlayModal = document.getElementById("closeGooglePlayModal");

openGooglePlayModal.addEventListener("click", () => {
    googlePlayModal.classList.add("active");
    document.body.style.overflow = "hidden";
});

closeGooglePlayModal.addEventListener("click", () => {
    googlePlayModal.classList.remove("active");
    document.body.style.overflow = "auto";
});

// Close when clicking overlay

googlePlayModal.querySelector(".modal-overlay").addEventListener("click", () => {
    googlePlayModal.classList.remove("active");
    document.body.style.overflow = "auto";
});

const certificateModal =
document.getElementById("certificateModal");

document
.querySelector(".certificate-link a")
.addEventListener("click", (e) => {
    e.preventDefault();
    certificateModal.classList.add("active");
});

document
.querySelector(".close-certificate")
.addEventListener("click", () => {
    certificateModal.classList.remove("active");
});

document
.querySelector(".certificate-overlay")
.addEventListener("click", () => {
    certificateModal.classList.remove("active");
});

// Power BI Modal

const openPowerBIModal =
document.getElementById("openPowerBIModal");

const closePowerBIModal =
document.getElementById("closePowerBIModal");

const PowerBIModal =
document.getElementById("PowerBIModal");

openPowerBIModal.addEventListener("click", () => {
    PowerBIModal.classList.add("active");
});

closePowerBIModal.addEventListener("click", () => {
    PowerBIModal.classList.remove("active");
});

PowerBIModal.querySelector(".modal-overlay")
.addEventListener("click", () => {
    PowerBIModal.classList.remove("active");
});

const openPowerBICertificate =
document.getElementById("openPowerBICertificate");

const powerBICertificateModal =
document.getElementById("powerBICertificateModal");

const closePowerBICertificate =
document.getElementById("closePowerBICertificate");

openPowerBICertificate.addEventListener("click", (e) => {
    e.preventDefault();
    powerBICertificateModal.classList.add("active");
});

closePowerBICertificate.addEventListener("click", () => {
    powerBICertificateModal.classList.remove("active");
});

powerBICertificateModal
.querySelector(".certificate-overlay")
.addEventListener("click", () => {
    powerBICertificateModal.classList.remove("active");
});

/* =========================
   ACHIEVEMENTS SECTION JS
========================= */

const achievements = [
{
title: "Chess Champion",

image: "images/chess-2025.png",

photo1: "images/chess-cover.png",
photo2: "images/chess-2026.png",

position: "2-Time 1st Place Winner",

event: "Competition",

description: "Won First Place in the Intra Department Chess Competition for two consecutive years.",

fullStory:
"Chess has been one of my strongest interests since my school days, where I actively participated in numerous district-level and state-level tournaments and secured several prizes. Continuing this passion in college, I participated in the Intra Department Chess Competition conducted as part of the department sports activities. On 14 February 2025, I secured First Place during my first year through strategic planning, patience, and focused gameplay. Building on this success, I once again participated in the competition on 9 February 2026 during my second year and successfully retained my title by securing First Place for the second consecutive year. These achievements strengthened my analytical thinking, concentration, decision-making abilities, and confidence under pressure.",

skills: [
"Strategic Thinking",
"Decision Making",
"Problem Solving",
"Concentration",
"Patience & Discipline",
"Analytical Skills"
],

date: "2025 - 2026",

venue: "Holy Cross College",

category: "Competition"
},

{
title: "Short Film Winner",

image: "images/short-flim-cover.png",

photo1: "images/short-film-1.png",
photo2: "images/short-film-2.png",

position: "3 Award Wins",

event: "Short Film Competitions",

description: "Won multiple awards for AI-themed and social awareness short films through scriptwriting, direction, and storytelling.",

fullStory: `My journey in short filmmaking began during my first year of college with no prior experience in filmmaking, scripting, or direction. Although I did not win in my college's short film competition, the experience motivated me to improve my storytelling and creative skills.

Later, I participated in a short film competition conducted by Jamal Mohamed College, Tiruchirappalli, where I secured my first award, winning Third Prize. My film focused on the impact of sharing personal information and becoming overly dependent on Artificial Intelligence.

Building on this success, I participated in a national-level short film competition conducted by St. Joseph's College, Tiruchirappalli, on 22 February 2025 and received another award. This achievement strengthened my confidence in scriptwriting, direction, teamwork, and visual storytelling.

During my second year, I returned to the same college competition where I had previously lost and secured Third Prize. This journey reflects my perseverance, creativity, and passion for filmmaking.`,

skills: [
    "Script Writing",
    "Direction",
    "Storytelling",
    "Creative Thinking",
    "Teamwork",
    "Video Editing"
],

date: "2024 - 2026",

venue: "Various Colleges, Trichy",

category: "Creative"
},

{
title: "YouthTalk Pre-Finalist",

image: "images/youthtalk-cover.png",

photo1: "images/youthtalk-cover.png",
photo2: "images/youthtalk-2025.png",


position: "Top 100",

event: "ICT Academy YouthTalk 2025",

description: "Selected among 100+ pre-finalists from thousands of participants across Tamil Nadu.",

fullStory: `My YouthTalk journey began with a simple video submission where participants were required to speak on a chosen topic. Due to academic commitments and other activities, I completed and submitted my video just a few minutes before the deadline.

Although I submitted it at the last moment, I gave my best effort and focused on expressing my ideas with confidence and clarity. After a few days, I received an email that completely surprised me.

Out of more than a thousand participants from across Tamil Nadu, I was shortlisted as one of the Top 100 Regional Pre-Finalists for ICT Academy YouthTalk Tamil Nadu 2025. Being selected among so many talented students was a proud and memorable achievement.

This experience strengthened my public speaking abilities, self-confidence, communication skills, and belief in taking opportunities even when time is limited.`,

skills: [
    "Public Speaking",
    "Communication",
    "Confidence",
    "Presentation Skills",
    "Critical Thinking",
    "Leadership"
],

date: "2025",

venue: "ICT Academy Tamil Nadu",

category: "Leadership"
},

{
title: "Vice President",

image: "images/vp.png",

photo1: "images/vp-cover.png",
photo2: "images/vp.png",

position: "Leadership Role",

event: "AI & ML Association",

description: "Served as Vice President of the AI & ML Association, leading events, student activities, and creative initiatives.",

fullStory: `As a member of the first batch of the Artificial Intelligence and Machine Learning department, I was given the opportunity to serve as the Vice President of the AI & ML Association during my first year. This leadership role allowed me to actively contribute to departmental activities and represent my fellow students.

Through dedication, responsibility, and sincere involvement in academic and extracurricular activities, I earned the trust and appreciation of my Head of Department. I actively supported the planning and execution of various department events and helped coordinate student participation and event management activities.

During this period, I also discovered my interest in invitation designing and creative event promotion. What started as a small responsibility gradually became an important part of my journey, leading me to design invitations and creative materials for department and college-level events.

This experience strengthened my leadership, communication, teamwork, organizational, and event management skills while helping me grow into a more confident and responsible student leader.`,

skills: [
    "Leadership",
    "Event Management",
    "Team Coordination",
    "Communication",
    "Creativity",
    "Organization"
],

date: "2025",

venue: "Holy Cross College",

category: "Leadership"
},

{
title: "Fine Arts Secretary",

image: "images/fine-arts-cover.png",

photo1: "images/fine-arts-1.jpeg",
photo2: "images/fine-arts-cover.png",

position: "Student Leader",

event: "Fine Arts Committee",

description: "Encouraged and guided students to participate in cultural events and achieve success in various competitions.",

fullStory: `My journey as Fine Arts Secretary began during my second year of college. After observing my dedication as Vice President, active participation in cultural activities, and enthusiasm for dance and creative events, my Head of Department entrusted me with the responsibility of serving as the Fine Arts Secretary.

In this role, I actively encouraged my classmates and juniors to participate in various cultural and inter-collegiate competitions. I motivated students to step out of their comfort zones, showcase their talents, and gain confidence through participation.

Beyond encouraging participation, I also helped coordinate events, guide students, and support teams during preparations. Seeing students overcome stage fear, perform confidently, and achieve success in competitions became one of the most rewarding aspects of this role.

This experience strengthened my leadership, mentoring, teamwork, event coordination, and communication skills while allowing me to contribute positively to the cultural growth of my department.`,

skills: [
    "Leadership",
    "Mentoring",
    "Event Coordination",
    "Team Management",
    "Communication",
    "Motivation"
],

date: "2026 - Present",

venue: "Holy Cross College",

category: "Leadership"
},

{
title: "Infographic Design Champion",

image: "images/infographic-cover.png",

photo1: "images/infographic-cover.png",
photo2: "images/infographic-2026.png",

position: "1st Place",

event: "Infranova 2K26",

description: "Won First Place in an infographic design competition through creativity, visual communication, and effective presentation.",

fullStory: `My journey in graphic and invitation design began during my first year of college while serving as Vice President of the AI & ML Association. Through designing invitations, posters, and promotional materials for department and college events, I gradually developed my creativity, design sense, and visual communication skills.

Over time, these experiences helped me gain confidence in creating impactful designs and presenting information in a visually appealing manner. What started as a responsibility soon became one of my strongest creative interests.

In my second year, I participated in the Infranova 2K26 Infographic Design Competition conducted on 6 March 2026. Applying the design skills and experience I had developed over the years, I created an infographic that effectively communicated information through creativity and visual storytelling.

My efforts were recognized with First Prize, making it one of the most memorable achievements of my creative journey. This accomplishment reinforced my passion for design and demonstrated how continuous learning and practice can transform a simple interest into success.`,

skills: [
    "Graphic Design",
    "Visual Communication",
    "Canva Design",
    "Creativity",
    "Presentation Skills",
    "Innovation"
],

date: "6 March 2026",

venue: "Holy Cross College",

category: "Creative"
}

];

/* =========================
   FEATURED ACHIEVEMENT
========================= */

let currentAchievement = 0;

const featuredImage = document.getElementById("featuredImage");
const featuredTitle = document.getElementById("featuredTitle");
const featuredPosition = document.getElementById("featuredPosition");
const featuredEvent = document.getElementById("featuredEvent");
const featuredDescription = document.getElementById("featuredDescription");
const featuredDate = document.getElementById("featuredDate");
const featuredVenue = document.getElementById("featuredVenue");
const featuredCategory = document.getElementById("featuredCategory");

function updateAchievement(index){

const item = achievements[index];

featuredImage.src = item.image;
featuredTitle.textContent = item.title;
featuredPosition.textContent = item.position;
featuredEvent.textContent = item.event;
featuredDescription.textContent = item.description;
featuredDate.textContent = item.date;
featuredVenue.textContent = item.venue;
featuredCategory.textContent = item.category;

}

updateAchievement(0);

/* =========================
   LEFT RIGHT BUTTONS
========================= */

const prevBtn = document.querySelector(".prev-achievement");
const nextBtn = document.querySelector(".next-achievement");

if(prevBtn){
prevBtn.addEventListener("click",()=>{

currentAchievement--;

if(currentAchievement < 0){
currentAchievement = achievements.length - 1;
}

updateAchievement(currentAchievement);

});
}

if(nextBtn){
nextBtn.addEventListener("click",()=>{

currentAchievement++;

if(currentAchievement >= achievements.length){
currentAchievement = 0;
}

updateAchievement(currentAchievement);

});
}

/* =========================
   CARD CLICK
========================= */

const achievementCards =
document.querySelectorAll(".achievement-card");

achievementCards.forEach((card,index)=>{

card.addEventListener("click",()=>{

currentAchievement = index;

if(currentAchievement >= achievements.length){
currentAchievement = 0;
}

updateAchievement(currentAchievement);

/* Pause for 5 seconds */
clearInterval(autoRotate);

setTimeout(()=>{

startAutoRotate();

},5000);

});

});

/* =========================
   FILTER BUTTONS
========================= */

const filterButtons =
document.querySelectorAll(".achievement-filter-btn");

filterButtons.forEach(button=>{

button.addEventListener("click",(e)=>{

    e.preventDefault();

filterButtons.forEach(btn=>{
btn.classList.remove("active");
});

button.classList.add("active");

const filter = button.dataset.filter;

achievementCards.forEach(card=>{

    if(filter === "all"){
        card.style.display = "block";
    }
    else if(card.classList.contains(filter)){
        card.style.display = "block";
    }
    else{
        card.style.display = "none";
    }

});

/* RESET SLIDER AFTER FILTERING */
currentSlide = 0;
updateCards();

});

});


/* =========================
   COUNTER ANIMATION
========================= */

const counters =
document.querySelectorAll(".counter");

const counterObserver =
new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const counter = entry.target;
const target =
+counter.getAttribute("data-target");

let count = 0;

const speed = target / 60;

const updateCount = ()=>{

count += speed;

if(count < target){

counter.innerText =
Math.ceil(count) + "+";

requestAnimationFrame(updateCount);

}
else{

counter.innerText =
target + "+";

}

};

updateCount();

counterObserver.unobserve(counter);

}

});

},{threshold:0.5});

counters.forEach(counter=>{
counterObserver.observe(counter);
});

/* =========================
   AUTO ROTATE FEATURED
========================= */

let autoRotate;

function startAutoRotate(){

clearInterval(autoRotate);

autoRotate = setInterval(()=>{

currentAchievement++;

if(currentAchievement >= achievements.length){
currentAchievement = 0;
}

updateAchievement(currentAchievement);

},6000);

}

startAutoRotate();

/* =========================
   FLOATING CARD EFFECT
========================= */

achievementCards.forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect = card.getBoundingClientRect();

const x =
e.clientX - rect.left;

const y =
e.clientY - rect.top;

const rotateY =
((x / rect.width) - 0.5) * 12;

const rotateX =
((y / rect.height) - 0.5) * -12;

card.style.transform =
`perspective(1000px)
 rotateX(${rotateX}deg)
 rotateY(${rotateY}deg)
 translateY(-8px)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform =
"perspective(1000px) rotateX(0) rotateY(0)";

});

});

/* =========================
   SECTION FADE ANIMATION
========================= */

const achievementElements =
document.querySelectorAll(
".featured-wrapper,.achievement-card,.stat-box"
);

const revealObserver =
new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity = "1";
entry.target.style.transform =
"translateY(0px)";

}

});

},{threshold:0.15});

achievementElements.forEach(el=>{

el.style.opacity = "0";
el.style.transform = "translateY(40px)";
el.style.transition =
"all .8s ease";

revealObserver.observe(el);

});

/* ==========================
   ACHIEVEMENT CARDS SLIDER
========================== */

const track = document.querySelector(".achievement-track");
const prevCardBtn = document.querySelector(".cards-prev");
const nextCardBtn = document.querySelector(".cards-next");
const cards = document.querySelectorAll(".achievement-card");

let currentSlide = 0;

function updateCards() {

    const visibleCards =
    document.querySelectorAll(
        '.achievement-card:not([style*="display: none"])'
    );

    if(visibleCards.length === 0) return;

    const cardWidth =
    visibleCards[0].offsetWidth + 20;

    track.style.transform =
    `translateX(-${currentSlide * cardWidth}px)`;

    updateArrowVisibility();
}

function updateArrowVisibility() {

    const visibleCards =
    document.querySelectorAll(
        '.achievement-card:not([style*="display: none"])'
    );

    const maxSlide =
    Math.max(0, visibleCards.length - 4);

    /* LEFT */

    if(currentSlide <= 0){

        prevCardBtn.style.opacity = "0";
        prevCardBtn.style.pointerEvents = "none";

    }else{

        prevCardBtn.style.opacity = "1";
        prevCardBtn.style.pointerEvents = "auto";
    }

    /* RIGHT */

    if(currentSlide >= maxSlide){

        nextCardBtn.style.opacity = "0";
        nextCardBtn.style.pointerEvents = "none";

    }else{

        nextCardBtn.style.opacity = "1";
        nextCardBtn.style.pointerEvents = "auto";
    }
}

/* Next */

nextCardBtn.addEventListener("click", () => {

    const visibleCards =
    document.querySelectorAll(
        '.achievement-card:not([style*="display: none"])'
    );

    const maxSlide =
    Math.max(0, visibleCards.length - 4);

    if(currentSlide < maxSlide){

        currentSlide++;
        updateCards();

    }

});

/* Previous */

prevCardBtn.addEventListener("click", () => {

    if(currentSlide > 0){

        currentSlide--;
        updateCards();

    }

});

/* Resize */

window.addEventListener("resize", () => {
    updateCards();
});

/* Initial Load */

updateCards();

/* ==========================
   ACHIEVEMENT MODAL
========================== */

const achievementModal =
document.getElementById("achievementModal");

const openStoryBtn =
document.querySelector(".story-btn");

const closeAchievementModal =
document.getElementById("closeAchievementModal");

const modalTitle =
document.getElementById("modalTitle");

const modalDate =
document.getElementById("modalDate");

const modalVenue =
document.getElementById("modalVenue");

const modalPhoto1 =
document.getElementById("modalPhoto1");

const modalPhoto2 =
document.getElementById("modalPhoto2");

const modalStory =
document.getElementById("modalStory");

const modalPositionBadge =
document.getElementById("modalPositionBadge");

const modalEventBadge =
document.getElementById("modalEventBadge");

const modalCategoryBadge =
document.getElementById("modalCategoryBadge");

const modalSkills =
document.getElementById("modalSkills");

function openAchievementModal(){

    const achievement =
    achievements[currentAchievement];

    modalTitle.textContent =
    achievement.title;

    const titleIcons = {

        "Chess Champion":
        "fas fa-chess-knight",

        "Short Film Winner":
        "fas fa-film",

        "YouthTalk Pre-Finalist":
        "fas fa-microphone",

        "Best Performance In Dance":
        "fas fa-music",

        "Vice President":
        "fas fa-crown",

        "Fine Arts Secretary":
        "fas fa-palette",

        "Infographic Design Champion":
        "fas fa-chart-pie",

    };

    modalTitleIcon.innerHTML = `
    <i class="${
    titleIcons[achievement.title]
    || 'fas fa-trophy'
    }"></i>
    `;

    modalDate.textContent =
    achievement.date;

    modalVenue.textContent =
    achievement.venue;

    modalPhoto1.src =
    achievement.photo1 || achievement.image;

    modalPhoto2.src =
    achievement.photo2 || achievement.image;

    modalStory.textContent =
    achievement.fullStory || achievement.description;

    modalPositionBadge.innerHTML =
`<i class="fas fa-trophy"></i> ${achievement.position}`;

modalEventBadge.innerHTML =
`<i class="fas fa-bullseye"></i> ${achievement.event}`;

modalCategoryBadge.innerHTML =
`<i class="fas fa-medal"></i> ${achievement.category}`;

    modalSkills.innerHTML = "";

    if(achievement.skills){

    achievement.skills.forEach((skill,index)=>{

        const skillChip =
        document.createElement("div");

        skillChip.className =
        `skill-chip skill-${index % 6}`;

        const skillIcons = {

            "Strategic Thinking":"fas fa-chess-knight",
            "Decision Making":"fas fa-users",
            "Problem Solving":"fas fa-chart-line",
            "Concentration":"fas fa-bullseye",
            "Focus & Concentration":"fas fa-bullseye",
            "Patience & Discipline":"fas fa-clock",
            "Analytical Skills":"fas fa-lightbulb",
            "Leadership":"fas fa-crown",
            "Communication":"fas fa-comments",
            "Teamwork":"fas fa-handshake",
            "Creativity":"fas fa-palette"

        };

        const icon =
        skillIcons[skill] ||
        "fas fa-star";

        skillChip.innerHTML = `
            <i class="${icon}"></i>
            <span>${skill}</span>
        `;

        modalSkills.appendChild(skillChip);

    });

}

    achievementModal.classList.add("show");

    document.body.style.overflow =
    "hidden";
}

if(openStoryBtn){

    openStoryBtn.addEventListener(
        "click",
        openAchievementModal
    );

}

closeAchievementModal.addEventListener(
    "click",
    ()=>{

        achievementModal.classList.remove(
            "show"
        );

        document.body.style.overflow =
        "auto";

    }
);

achievementModal.addEventListener(
    "click",
    (e)=>{

        if(
            e.target === achievementModal
        ){

            achievementModal.classList.remove(
                "show"
            );

            document.body.style.overflow =
            "auto";
        }

    }
);

document.addEventListener(
    "keydown",
    (e)=>{

        if(
            e.key === "Escape"
        ){

            achievementModal.classList.remove(
                "show"
            );

            document.body.style.overflow =
            "auto";
        }

    }
);

/* ==========================
   ACHIEVEMENT IMAGE LIGHTBOX
========================== */

const achievementLightbox =
document.getElementById("achievementLightbox");

const lightboxImage =
document.getElementById("lightboxImage");

const lightboxClose =
document.getElementById("lightboxClose");



/* Open */

function openLightbox(src){

    lightboxImage.src = src;

    achievementLightbox.classList.add("show");
}

/* Click Photos */

modalPhoto1.addEventListener("click", () => {

    if(modalPhoto1.src){
        openLightbox(modalPhoto1.src);
    }

});

modalPhoto2.addEventListener("click", () => {

    if(modalPhoto2.src){
        openLightbox(modalPhoto2.src);
    }

});

/* Close Button */

lightboxClose.addEventListener("click", () => {

    achievementLightbox.classList.remove("show");

});

/* Click Outside */

achievementLightbox.addEventListener("click", (e) => {

    if(e.target === achievementLightbox){

        achievementLightbox.classList.remove("show");
    }

});

/* ESC Key */

document.addEventListener("keydown", (e) => {

    if(e.key === "Escape"){

        achievementLightbox.classList.remove("show");
    }

});