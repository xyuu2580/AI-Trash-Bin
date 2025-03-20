// Global variables
let trashBinOpen = false;
const trashBin = document.getElementById("trash-bin");
const binInstruction = document.getElementById("bin-instruction");
const trashItemsContainer = document.getElementById("trash-items");
const analysisDiv = document.getElementById("analysis");

// Ensure event listener is properly attached
trashBin.addEventListener("click", openBin);

// Trash items data
const trashItemsData = [
  {
    id: "sock",
    name: "A Worn-out Sock",
    img: "img/garbage-sock.png",
    value: 1,
    analysis: "A worn-out sock - 1% - pure garbage\nThis is a sock that has lost its other half. Although it is extremely worn and even has a hole, perhaps it is still waiting for its missing pair."
  },
  {
    id: "battery",
    name: "An Expired Battery",
    img: "img/garbage-battery.png",
    value: 100,
    analysis: "An expired battery - 100% - critical important\nIt represents the history of energy; even though it no longer works, it carries the undeniable trace of the past."
  },
  {
    id: "tooth",
    name: "An Unidentified Tooth",
    img: "img/garbage-tooth.png",
    value: 75,
    analysis: "An unidentified tooth - 75% - still functional\nThis tooth symbolizes identity, recording the marks of someone’s growth—meals, smiles, and conversations."
  },
  {
    id: "balloon",
    name: "A Deflated Balloon",
    img: "img/garbage-balloon.png",
    value: 75,
    analysis: "A deflated balloon - 75% - still functional\nAlthough it no longer serves a practical purpose, it once carried joy—filled with celebration, childhood, happiness, and dreams."
  },
  {
    id: "fishbone",
    name: "A Fishbone",
    img: "img/garbage-fish bone.png",
    value: 25,
    analysis: "A fishbone - 25% - recyclable\nThis fishbone, though chewed away, still signifies survival and the cycle of life, yet its small size renders its value relatively low."
  }
];

// Function to open trash bin
function openBin() {
  if (!trashBinOpen) {
    console.log("Opening trash bin...");
    trashBin.src = "img/trash bin open.png";
    binInstruction.textContent = "Drag trash into the bin";
    trashBinOpen = true;
    displayTrashItems();
  }
}

// Display trash items in the container
function displayTrashItems() {
  trashItemsContainer.style.display = "flex";
  trashItemsContainer.innerHTML = "";
  trashItemsData.forEach(item => {
    let div = document.createElement("div");
    div.classList.add("trash-item");
    div.setAttribute("draggable", true);
    div.dataset.id = item.id;

    let img = document.createElement("img");
    img.src = item.img;
    img.alt = item.name;

    div.appendChild(img);

    // Drag events
    div.addEventListener("dragstart", dragStart);
    div.addEventListener("dragend", dragEnd);

    trashItemsContainer.appendChild(div);
  });
}

// Drag event handlers
function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.parentNode.dataset.id);
  e.target.parentNode.classList.add("dragging");
}
function dragEnd(e) {
  e.target.parentNode.classList.remove("dragging");
}

// Enable trash bin as drop target
trashBin.addEventListener("dragover", (e) => {
  e.preventDefault();
});
trashBin.addEventListener("drop", (e) => {
  e.preventDefault();
  const itemId = e.dataTransfer.getData("text/plain");
  const item = trashItemsData.find(i => i.id === itemId);
  if (item) {
    processTrash(item);
  }
});

// Process trash item: show loading image then evaluation result and analysis text
function processTrash(item) {
  console.log(`Processing item: ${item.name}`);

  // Remove the thrown trash item from display
  const itemDiv = document.querySelector(`.trash-item[data-id="${item.id}"]`);
  if (itemDiv) {
    itemDiv.parentNode.removeChild(itemDiv);
  }

  // Show loading image on trash bin
  trashBin.src = "img/trash bin loading.png";

  // Clear previous analysis text
  analysisDiv.innerHTML = "";

  // After 2 seconds, update trash bin image and show analysis text
  setTimeout(() => {
    let newBinImage = "";
    if (item.value === 1) {
      newBinImage = "img/trash bin 1%.png";
    } else if (item.value === 25) {
      newBinImage = "img/trash bin 25%.png";
    } else if (item.value === 75) {
      newBinImage = "img/trash bin 75%.png";
    } else if (item.value === 100) {
      newBinImage = "img/trash bin 100%.png";
    } else {
      newBinImage = "img/trash bin open.png";
    }
    trashBin.src = newBinImage;

    // Extract evaluation title (first line) and description (remaining text)
    const [title, ...description] = item.analysis.split("\n");

    // Display title first
    const titleElement = document.createElement("p");
    titleElement.style.fontWeight = "bold";
    titleElement.style.marginBottom = "10px"; // Add spacing below title
    titleElement.innerText = title;
    analysisDiv.appendChild(titleElement);

    // Display description with typewriter effect
    const descriptionElement = document.createElement("p");
    analysisDiv.appendChild(descriptionElement);
    typeWriter(description.join("\n"), descriptionElement, 0);

  }, 2000);
}

// Typewriter effect for gradual text display
function typeWriter(text, element, index) {
  if (index < text.length) {
    element.innerHTML += text.charAt(index);
    setTimeout(() => typeWriter(text, element, index + 1), 50);
  }
}
