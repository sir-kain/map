import "./style.css";

const svgItems = document.querySelectorAll("svg a");
const links = document.querySelectorAll("[data-ref]");

const resetActiveClass = () => {
  links.forEach(($a) => $a.classList.remove("active"));
  svgItems.forEach(($region) => $region.classList.remove("active"));
};

svgItems.forEach(($region) => {
  $region.addEventListener("mouseenter", function (e) {
    resetActiveClass();
    this.classList.add("active");
    const regionId = this.id;
    const $link = document.querySelector(`[data-ref="${regionId}"]`);
    $link.classList.add("active");
  });

  $region.addEventListener("mouseleave", function (e) {
    resetActiveClass();
  });
});

links.forEach(($link) => {
  $link.addEventListener("mouseenter", function (e) {
    resetActiveClass();
    this.classList.add("active");
    const regionId = this.dataset.ref;
    const $link = document.querySelector(`#${regionId}`);
    $link.classList.add("active");
  });

  $link.addEventListener("mouseleave", function (e) {
    resetActiveClass();
  });
});

