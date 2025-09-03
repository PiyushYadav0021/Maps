const indiaCard = document.getElementById("indiaCard");
const modal = document.getElementById("editorModal");
const closeModal = document.getElementById("closeModal");
const mapContainer = document.getElementById("mapContainer");

const fillColor = document.getElementById("fillColor");
const strokeColor = document.getElementById("strokeColor");
const strokeWidth = document.getElementById("strokeWidth");
const downloadBtn = document.getElementById("downloadBtn");

let svgElement;

// Open editor modal
indiaCard.addEventListener("click", async () => {
  modal.style.display = "block";

  // Load India SVG dynamically
  const response = await fetch("india-outline.svg");
  const svgText = await response.text();
  mapContainer.innerHTML = svgText;

  svgElement = mapContainer.querySelector("svg");

  // Make each path clickable
  const paths = svgElement.querySelectorAll("path");
  paths.forEach(path => {
    path.addEventListener("click", () => {
      path.setAttribute("fill", fillColor.value);
      path.setAttribute("stroke", strokeColor.value);
      path.setAttribute("stroke-width", strokeWidth.value);
    });
  });
});

// Close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Download edited SVG
downloadBtn.addEventListener("click", () => {
  if (!svgElement) return;

  const serializer = new XMLSerializer();
  const svgBlob = new Blob([serializer.serializeToString(svgElement)], { type: "image/svg+xml" });
  const url = URL.createObjectURL(svgBlob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "edited-map.svg";
  link.click();

  URL.revokeObjectURL(url);
});
