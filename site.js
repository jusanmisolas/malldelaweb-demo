const consultation = document.querySelector("#consultation");
consultation.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = new FormData(consultation);
  const name = String(fields.get("name")).trim();
  if (!name) {
    const input = consultation.elements.name;
    input.setCustomValidity("Enter your name.");
    input.reportValidity();
    return;
  }
  const service = fields.get("service");
  const schedule = String(fields.get("schedule")).trim();
  const lines = [
    "Good day,",
    "",
    "I would like to request a consultation.",
    "",
    `Name: ${name}`,
    `Practice area: ${service}`,
    `Consultation format: ${fields.get("format")}`,
  ];
  if (schedule) lines.push(`Preferred day or time: ${schedule}`);
  const subject = encodeURIComponent(`Consultation request — ${service}`);
  const body = encodeURIComponent(lines.join("\r\n"));
  window.location.href = `mailto:malldelawsecretary@gmail.com?subject=${subject}&body=${body}`;
});
consultation.elements.name.addEventListener("input", (event) => {
  event.target.setCustomValidity("");
});
consultation.hidden = false;

document.querySelectorAll(".service-inquiry").forEach((link) => {
  link.addEventListener("click", () => {
    consultation.elements.service.value = link.dataset.service;
  });
});

const requestedService = new URLSearchParams(window.location.search).get("service");
const serviceSelect = consultation.elements.service;
if (requestedService && Array.from(serviceSelect.options).some((option) => option.value === requestedService)) {
  serviceSelect.value = requestedService;
}

const consultationFormat = consultation.elements.format;
const formatNote = document.querySelector("#consultation-format-note");

function updateConsultationFormat() {
  const isOnline = consultationFormat.value === "Online via Google Meet";
  formatNote.hidden = !isOnline;
  if (isOnline) {
    consultationFormat.setAttribute("aria-describedby", formatNote.id);
  } else {
    consultationFormat.removeAttribute("aria-describedby");
  }
}

consultationFormat.addEventListener("change", updateConsultationFormat);
window.addEventListener("pageshow", updateConsultationFormat);
updateConsultationFormat();
