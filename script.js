// Función de inicialización
const init = () => {
    console.log("✨ Antigravity: Inicializando Orb High-Fidelity (Plasma Style)...");

    // 1. Timeline principal de GSAP para la entrada
    const tl = gsap.timeline({
        defaults: { ease: "power4.out" }
    });

    // 2. Animación de entrada
    tl.from(".navbar", {
        y: -50,
        opacity: 0,
        duration: 1.2
    })
    .from("h1", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2
    }, "-=0.8")
    .from(".reveal-text-sub", {
        y: 20,
        opacity: 0,
        duration: 1
    }, "-=1")
    .from(".cta-container", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8
    }, "-=0.5")
    .from(".card", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2
    }, "-=0.8");

    // 3. Movimiento Orgánico Independiente para cada Blob (Plasma Effect)
    const blobs = document.querySelectorAll(".orb-blob");
    
    blobs.forEach((blob, i) => {
        gsap.to(blob, {
            x: "random(-100, 100)",
            y: "random(-100, 100)",
            duration: `random(${10 + i * 2}, ${20 + i * 2})`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        
        gsap.to(blob, {
            scale: "random(0.8, 1.3)",
            duration: `random(5, 10)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });

    // 4. Interacción "Líquida" con el mouse (React Bits Style)
    const wrapper = document.querySelector(".orb-wrapper");
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener("mousemove", (e) => {
        const { clientX, clientY } = e;
        
        // Posición relativa normalizada (-0.5 a 0.5)
        const xPercent = (clientX / window.innerWidth - 0.5);
        const yPercent = (clientY / window.innerHeight - 0.5);

        // Mover el contenedor principal (la "masa" del orb)
        gsap.to(wrapper, {
            x: xPercent * 300, // Seguimiento amplio
            y: yPercent * 300,
            duration: 2.5,
            ease: "power2.out"
        });

        // Mover cada blob con un "retraso" diferente para el look líquido
        blobs.forEach((blob, i) => {
            gsap.to(blob, {
                x: `+=${xPercent * (50 + i * 20)}`,
                y: `+=${yPercent * (50 + i * 20)}`,
                overwrite: "auto",
                duration: 1.5 + (i * 0.5),
                ease: "power3.out"
            });
        });
    });

    // 5. Registro de ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 6. Animación al hacer Scroll
    gsap.to(".project-card", {
        scrollTrigger: {
            trigger: ".portfolio",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: "power4.out"
    });
};

// Ejecutamos la inicialización
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
} else {
    window.addEventListener('DOMContentLoaded', init);
}
