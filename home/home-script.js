let lastScroll = 0;

const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // ქვემოთ სქროლი
  if (currentScroll > lastScroll && currentScroll > 100) {
    header.classList.add("hide-header");
  }

  // ზემოთ სქროლი
  else {
    header.classList.remove("hide-header");
  }

  lastScroll = currentScroll;
});

function toggleMenu() {
  const menu = document
    .getElementById("navbarLinks")
    .querySelector("ul");

  menu.classList.toggle("active");
}

function updateCartCount() {
  const cart =
    JSON.parse(localStorage.getItem("cart")) || {};

  let totalCount = 0;

  for (const product of Object.values(cart)) {
    const qty = Number(product.quantity);

    if (!isNaN(qty)) {
      totalCount += qty;
    }
  }

  const cartCountElem = document
    .getElementById("mainCart")
    ?.querySelector("p");

  if (cartCountElem) {
    cartCountElem.textContent =
      `Cart: ${totalCount}`;
  }
}
// DRAG CIRCLES

const circles = document.querySelectorAll(
  ".offer1, .offer2, .offer3, .offer4"
);

let activeCircle = null;

let offsetX = 0;
let offsetY = 0;

circles.forEach((circle) => {
  circle.addEventListener("mousedown", (e) => {
    activeCircle = circle;

    offsetX =
      e.clientX - activeCircle.offsetLeft;

    offsetY =
      e.clientY - activeCircle.offsetTop;

    activeCircle.style.cursor = "grabbing";
  });
});

const shua = document.querySelector(".shua");

document.addEventListener("mousemove", (e) => {
  if (!activeCircle) return;

  const shuaRect =
    shua.getBoundingClientRect();

  const circleRect =
    activeCircle.getBoundingClientRect();

  let newLeft =
    e.clientX -
    offsetX -
    shuaRect.left;

  let newTop =
    e.clientY -
    offsetY -
    shuaRect.top;

  // LEFT LIMIT
  if (newLeft < 0) {
    newLeft = 0;
  }

  // TOP LIMIT
  if (newTop < 0) {
    newTop = 0;
  }

  // RIGHT LIMIT
  if (
    newLeft >
    shuaRect.width - circleRect.width
  ) {
    newLeft =
      shuaRect.width - circleRect.width;
  }

  // BOTTOM LIMIT
  if (
    newTop >
    shuaRect.height - circleRect.height
  ) {
    newTop =
      shuaRect.height - circleRect.height;
  }

  activeCircle.style.left =
    newLeft + "px";

  activeCircle.style.top =
    newTop + "px";
});

document.addEventListener("mouseup", () => {
  if (activeCircle) {
    activeCircle.style.cursor = "grab";
  }

  activeCircle = null;
});

const infoBox = document.querySelector(".Octagon_text");

const services = {
  architecture: {
    short: `
      <img src="../images/architecture.webp" alt="">
      <h2>არქიტექტურა და ინტერიერის დიზაინი</h2>
      <p>ვქმნით თანამედროვე არქიტექტურულ და ინტერიერის პროექტებს.</p>
      <a href="#" class="more-btn" data-service="architecture">გაიგე მეტი</a>
    `,

    full: `
      <img src="../images/architecture.webp" alt="">
      <h2>არქიტექტურა და ინტერიერის დიზაინი</h2>
      <p>
        ვქმნით სრულ არქიტექტურულ პროექტებს, ინტერიერის დიზაინს,
        3D ვიზუალიზაციას, სამუშაო ნახაზებს და ტექნიკურ დოკუმენტაციას.
        თითოეული პროექტი მორგებულია დამკვეთის მოთხოვნებზე.
      </p>
    `,
  },

  construction: {
    short: `
      <img src="../images/construction.webp" alt="">
      <h2>მშენებლობა და რემონტი</h2>
      <p>ვასრულებთ სამშენებლო და სარემონტო სამუშაოებს.</p>
      <a href="#" class="more-btn" data-service="construction">გაიგე მეტი</a>
    `,

    full: `
      <img src="../images/construction.webp" alt="">
      <h2>მშენებლობა და რემონტი</h2>
      <p>
        გთავაზობთ სრული ციკლის სამშენებლო და სარემონტო მომსახურებას,
        როგორც საცხოვრებელი, ასევე კომერციული ობიექტებისთვის.
      </p>
    `,
  },

  furniture: {
    short: `
      <img src="../images/furniture.webp" alt="">
      <h2>ავეჯის კონსტრუირება და დამზადება</h2>
      <p>ვამზადებთ ინდივიდუალურ ავეჯს შეკვეთით.</p>
      <a href="#" class="more-btn" data-service="furniture">გაიგე მეტი</a>
    `,

    full: `
      <img src="../images/furniture.webp" alt="">
      <h2>ავეჯის კონსტრუირება და დამზადება</h2>
      <p>
        ინდივიდუალური ზომების და დიზაინის მიხედვით ვამზადებთ
        სამზარეულოებს, კარადებს, საოფისე და კომერციულ ავეჯს.
      </p>
    `,
  },

  courses: {
    short: `
      <img src="../images/course.webp" alt="">
      <h2>სასწავლო კურსები</h2>
      <p>პრაქტიკული სასწავლო პროგრამები.</p>
      <a href="#" class="more-btn" data-service="courses">გაიგე მეტი</a>
    `,

    full: `
      <img src="../images/course.webp" alt="">
      <h2>სასწავლო კურსები</h2>
      <p>
        გთავაზობთ პრაქტიკულ კურსებს არქიტექტურის, დიზაინის,
        მშენებლობისა და ავეჯის წარმოების მიმართულებით.
      </p>
    `,
  },
};

// ოქტაგონზე დაჭერა
document.querySelectorAll(".Octagon").forEach((item) => {
  item.addEventListener("click", () => {
    infoBox.innerHTML = services[item.dataset.service].short;
  });
});

// "გაიგე მეტი" ღილაკი
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("more-btn")) {
    e.preventDefault();

    const service = e.target.dataset.service;
    infoBox.innerHTML = services[service].full;
  }
});

// პირველი ოქტაგონის ინფორმაციის ჩვენება
const firstOctagon = document.querySelector(".Octagon");
infoBox.innerHTML = services[firstOctagon.dataset.service].short;



// Carousel
const projectsContainer =
  document.querySelector(".projects");

const loadMoreBtn =
  document.querySelector(".button-srulad");

let allProjects = [];
let visibleCount = 9;

async function loadProjects() {
  try {
    const response = await fetch(
      "projects.json"
    );

    allProjects = await response.json();

    renderProjects();
  } catch (error) {
    console.error(error);
  }
}

function renderProjects() {
  projectsContainer.innerHTML = "";

  allProjects
    .slice(0, visibleCount)
    .forEach((project, projectIndex) => {

      const carouselId = `carousel-${projectIndex}`;

      const box = document.createElement("div");

      box.classList.add("project-box");

      box.style.cursor = "pointer";

      // პროექტის გვერდზე გადასვლა
      box.addEventListener("click", (e) => {
        if (
          e.target.closest(".carousel-control-prev") ||
          e.target.closest(".carousel-control-next") ||
          e.target.closest(".carousel-indicators")
        ) {
          return;
        }

        window.location.href =
          `../project.html?id=${project.id}`;
      });

      let slidesHTML = "";
      let indicatorsHTML = "";

      project.images.forEach((image, index) => {
        slidesHTML += `
          <div class="carousel-item ${
            index === 0 ? "active" : ""
          }">
            <img
              src="${image}"
              class="d-block w-100"
              alt="${project.title}"
            >
          </div>
        `;

        indicatorsHTML += `
          <button
            type="button"
            data-bs-target="#${carouselId}"
            data-bs-slide-to="${index}"
            class="${index === 0 ? "active" : ""}"
          ></button>
        `;
      });

      box.innerHTML = `
        <div
          id="${carouselId}"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-indicators">
            ${indicatorsHTML}
          </div>

          <div class="carousel-inner">
            ${slidesHTML}
          </div>

          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#${carouselId}"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon"></span>
          </button>

          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#${carouselId}"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon"></span>
          </button>
        </div>

        <h3>${project.title}</h3>
        <p>${project.description}</p>
      `;

      projectsContainer.appendChild(box);
    });

  if (visibleCount >= allProjects.length) {
    loadMoreBtn.textContent = "ნაკლების ნახვა";
  } else {
    loadMoreBtn.textContent = "ნახე სრულად";
  }
}
loadMoreBtn.addEventListener(
  "click",
  () => {
    if (
      visibleCount >= allProjects.length
    ) {
      visibleCount = 9;

      projectsContainer.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      visibleCount += 3;

      if (
        visibleCount >
        allProjects.length
      ) {
        visibleCount =
          allProjects.length;
      }
    }

    renderProjects();
  }
);

document.addEventListener(
  "DOMContentLoaded",
  () => {
    updateCartCount();
    loadProjects();
  }
);
const partners = document.getElementById("partners");

document.querySelector(".next").addEventListener("click", () => {
  partners.scrollBy({
    left: 300,
    behavior: "smooth",
  });
});

document.querySelector(".prev").addEventListener("click", () => {
  partners.scrollBy({
    left: -300,
    behavior: "smooth",
  });
});
// ABOUT US
const aboutSection =
  document.querySelector(".about-us");

const aboutContent =
  document.querySelector(".about-content");

const aboutStats =
  document.querySelector(".about-stats");

const items =
  document.querySelectorAll(".timeline-item");

let started = false;

/* COUNTER */

function animateCounter(counter) {
  const target = +counter.dataset.target;

  let current = 0;
  const step = target / 60;

  function run() {
    current += step;

    if (current < target) {
      counter.textContent =
        Math.ceil(current) +
        (target === 98 ? "%" : "+");

      requestAnimationFrame(run);
    } else {
      counter.textContent =
        target + (target === 98 ? "%" : "+");
    }
  }

  run();
}

/* OBSERVER */

const observer =
  new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;

          /* 1. TEXT */
          aboutContent.classList.add("show");

          /* 2. VERTICAL LINE */
          aboutStats.classList.add("show");

          /* 3. ITEMS SEQUENCE */
          items.forEach((item, index) => {
            setTimeout(() => {
              
              // HORIZONTAL LINE
              item.classList.add("show");

              const counter =
                item.querySelector(".counter");

              // 4. COUNTER START AFTER CIRCLE
              setTimeout(() => {
                animateCounter(counter);
              }, 500);

            }, index * 800);
          });
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

observer.observe(aboutSection);
const backToTop =
  document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});