const filter = document.querySelector(".guide-filter");
const topic = filter.querySelector("select");
const status = filter.querySelector("[role=status]");
const groups = document.querySelectorAll(".guide-index .grid > article");

function updateGuides() {
  let count = 0;
  groups.forEach((group, index) => {
    group.hidden = topic.value !== "" && Number(topic.value) !== index + 1;
    if (!group.hidden) count += group.querySelectorAll("li").length;
  });
  status.textContent = `${count} guides`;
}

topic.addEventListener("change", updateGuides);
window.addEventListener("pageshow", updateGuides);
updateGuides();
filter.hidden = false;
