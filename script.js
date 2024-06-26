"use strict";

gsap.registerPlugin(TextPlugin);

const elements = document.querySelectorAll("p");
const speed = 1.5
const url = "static/tenet1.jpg";
const image = new Image();
image.src = url;

let tl = gsap.timeline()
    .set(elements, { scaleX: 0, scaleY: 0 })
    .to(elements, {
        delay: 1,
        duration: speed,
        scaleX: 1,
        scaleY: 1,
        stagger: speed,
        ease: "elastic.out(2, 0.2)",
        onComplete: () => {
            updateText(0)
        },
    });

function updateText(index) {
    const invertList = ["SATOR", "AREPO", "TENET", "OPERA", "ROTAS"];

    if (index < elements.length) {
        gsap.to(elements[index], {
            duration: speed,
            text: { value: invertList[index], delimiter: "" },
            rotateY: 360,
            color: "white",
            textShadow: "0 0 2px black, 0 0 10px white",
            ease: "elastic.out(1, 0.3)",
            onComplete: () => {
                updateText(index + 1)
            },
        });
    } else {
        gsap.set(".color", {
            color: "black",
            textShadow: "0 0 1vh white, 0 0 2vh #00dbf0"
        });

        elements.forEach(element => {
            let newContent = "";
            const content = element.textContent;

            for (let i = 0; i < content.length; i++) {
                newContent += (i + 1) % 3 === 0
                    ? '<span class="color">' + content[i] + "</span>"
                    : content[i];
            }

            element.innerHTML = newContent;
        });

        gsap.to(".text", {
            delay: 3,
            duration: speed / 2,
            scale: 6,
            opacity: 0,
            ease: "power4.out",
            onComplete: () => {
                document.body.style.backgroundImage = "url(" + url + ")"
            },
        });
    }
}

