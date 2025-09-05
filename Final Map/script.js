const searchInput = document.getElementById("searchInput");
const mapGrid = document.getElementById("mapGrid");
const cards = mapGrid.getElementsByClassName("card");
const modal = document.getElementById("editorModal");
const closeModal = document.getElementById("closeModal");
const mapContainer = document.getElementById("mapContainer");

const fillColor = document.getElementById("fillColor");
const strokeColor = document.getElementById("strokeColor");
const strokeWidth = document.getElementById("strokeWidth");
const downloadBtn = document.getElementById("downloadBtn");


let svgElement;

// 🔍 Search filter
searchInput.addEventListener("keyup", function () {
  const filter = searchInput.value.toLowerCase();
  Array.from(cards).forEach(card => {
    const text = card.querySelector("p").textContent.toLowerCase();
    card.style.display = text.includes(filter) ? "" : "none";
  });
});
Array.from(cards).forEach(card => {
  card.addEventListener("click", async () => {
    const svgFile = card.getAttribute("data-svg"); // get it here
    if (!svgFile) return; // skip if no svg mapping

    modal.style.display = "block";

    try {
      const response = await fetch(svgFile);
      if (!response.ok) throw new Error(`Failed to load ${svgFile}`);

      const svgText = await response.text();
      mapContainer.innerHTML = svgText;
      svgElement = mapContainer.querySelector("svg");
      

      if (!svgElement) return;

      svgElement.querySelectorAll("path").forEach(path => {
        path.addEventListener("click", () => {
          path.setAttribute("fill", fillColor.value);
          path.setAttribute("stroke", strokeColor.value);
          path.setAttribute("stroke-width", strokeWidth.value);
        });
      });
    } catch (err) {
      console.error(err);
      mapContainer.innerHTML = `<p style="color:red">Could not load map</p>`;
    }
  });
});

// 🎨 Legend handling
const legendList = document.getElementById("legendList");
const addLegendBtn = document.getElementById("addLegendBtn");

addLegendBtn.addEventListener("click", () => {
  const legendItem = document.createElement("div");
  legendItem.classList.add("legend-item");

  legendItem.innerHTML = `
    <input type="color" class="legend-color" value="#66ccff">
    <input type="text" class="legend-label" placeholder="Enter label (e.g. High Density)">
    <button class="removeLegend">❌</button>
  `;

  // remove legend item
  legendItem.querySelector(".removeLegend").addEventListener("click", () => {
    legendItem.remove();
  });

  legendList.appendChild(legendItem);
});


// ❌ Close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// 💾 Download edited SVG
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
