const params = new URLSearchParams(window.location.search);
const projectId = Number(params.get("id"));

const gallery = document.getElementById("gallery");
const titleEl = document.getElementById("title");
const descEl = document.getElementById("description");

fetch("./home/projects.json")
  .then((res) => res.json())
  .then((projects) => {
    const project = projects.find((p) => p.id === projectId);

    if (!project) {
      document.body.innerHTML = "<h1>პროექტი ვერ მოიძებნა</h1>";
      return;
    }

    // TEXT
    titleEl.textContent = project.title;
    descEl.textContent = project.description;

    const images = project.images;

    // UI
    gallery.innerHTML = `
      <div class="portfolio-system">

        <div class="thumbs" id="thumbs"></div>

        <div class="main-image-container">
          <img id="mainImage" src="" alt="">
          <div class="lens" id="lens"></div>
        </div>

      </div>
    `;

    const mainImage = document.getElementById("mainImage");
    const lens = document.getElementById("lens");
    const thumbs = document.getElementById("thumbs");

    // STATE
    let mouseX = 0;
    let mouseY = 0;

    let lensX = 0;
    let lensY = 0;

    let currentSrc = "";

    // SET IMAGE
    function setImage(src) {
      currentSrc = src;

      mainImage.src = src;
      lens.style.backgroundImage = `url(${src})`;
    }

    // THUMBS
    images.forEach((src, index) => {
      const img = document.createElement("img");

      img.src = src;
      img.classList.add("thumb");

      if (index === 0) img.classList.add("active");

      img.addEventListener("click", () => {
        setImage(src);

        document.querySelectorAll(".thumb").forEach((t) =>
          t.classList.remove("active")
        );

        img.classList.add("active");
      });

      thumbs.appendChild(img);
    });

    setImage(images[0]);

    // MOUSE MOVE (track position)
    mainImage.addEventListener("mousemove", (e) => {
      const rect = mainImage.getBoundingClientRect();

      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      const percentX = (mouseX / rect.width) * 100;
      const percentY = (mouseY / rect.height) * 100;

      lens.style.backgroundPosition = `${percentX}% ${percentY}%`;
    });

    // SHOW / HIDE LENS
    mainImage.addEventListener("mouseenter", () => {
      lens.style.opacity = "1";
    });

    mainImage.addEventListener("mouseleave", () => {
      lens.style.opacity = "0";
    });

    // 🔥 MAGNETIC INERTIA ANIMATION
    function animateLens() {
      lensX += (mouseX - lensX) * 0.12;
      lensY += (mouseY - lensY) * 0.12;

      // lens size offset (center)
      lens.style.left = lensX - 80 + "px";
      lens.style.top = lensY - 80 + "px";

      requestAnimationFrame(animateLens);
    }

    animateLens();
  })
  .catch((err) => {
    console.error("Error loading project:", err);
    document.body.innerHTML = "<h1>დატვირთვა ვერ მოხერხდა</h1>";
  });