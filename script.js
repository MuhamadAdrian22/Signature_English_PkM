document.addEventListener("DOMContentLoaded", () => {


    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");

    if (hamburger && menu) {
        hamburger.addEventListener("click", () => {
            menu.classList.toggle("active");
        });
    }


    document.querySelectorAll("#menu a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(
                this.getAttribute("href")
            );

            if (target) {

                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: "smooth"
                });

            }

        });

    });


    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("#menu a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("current");

            if (
                link.getAttribute("href") ===
                "#" + current
            ) {
                link.classList.add("current");
            }

        });

    });


    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.style.background = "#ffffff";
            header.style.boxShadow =
                "0 5px 20px rgba(0,0,0,.08)";

        } else {

            header.style.background = "#ffffff";
            header.style.boxShadow = "none";

        }

    });


    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },

        {
            threshold: 0.15
        }

    );

    document
        .querySelectorAll(
            ".card,.stat-box,.section-title,.register form"
        )
        .forEach(el => {

            el.classList.add("fade");

            observer.observe(el);

        });


    const waForm =
        document.getElementById("waForm");

    if (waForm) {

        waForm.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();

                const nama =
                    document
                    .getElementById("nama")
                    .value;

                const phone =
                    document
                    .getElementById("phone")
                    .value;

                const program =
                    document
                    .getElementById("program")
                    .value;

                const message =
                    document
                    .getElementById("message")
                    .value;

                const text =

`Halo Signature English,

Saya ingin berkonsultasi dan mendaftar.

Nama : ${nama}
No HP : ${phone}
Program : ${program}

Pesan :
${message}`;

                const waNumber =
                    "6281908088584";

                const waURL =

`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

                window.open(
                    waURL,
                    "_blank"
                );

            }
        );

    }


    const counters =
        document.querySelectorAll(".stat-box h2");

    const runCounter = () => {

        counters.forEach(counter => {

            const target =
                parseInt(
                    counter.innerText
                    .replace("+", "")
                    .replace("%", "")
                );

            let count = 0;

            const speed =
                target / 100;

            const updateCounter = () => {

                if (count < target) {

                    count += speed;

                    if (
                        counter.innerText.includes("%")
                    ) {

                        counter.innerText =
                            Math.floor(count) + "%";

                    } else {

                        counter.innerText =
                            Math.floor(count) + "+";

                    }

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    if (
                        counter.innerText.includes("%")
                    ) {

                        counter.innerText =
                            target + "%";

                    } else {

                        counter.innerText =
                            target + "+";

                    }

                }

            };

            updateCounter();

        });

    };

    let counterStarted = false;

    const statsSection =
        document.querySelector(".stats");

    if (statsSection) {

        const statsObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting &&
                            !counterStarted
                        ) {

                            runCounter();

                            counterStarted = true;

                        }

                    });

                },

                {
                    threshold: 0.5
                }

            );

        statsObserver.observe(statsSection);

    }

});