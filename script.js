// 全局变量
let trashBinOpen = false;
const trashBin = document.getElementById("trash-bin");
const binInstruction = document.getElementById("bin-instruction");
const trashItemsContainer = document.getElementById("trash-items");
const analysisDiv = document.getElementById("analysis");

// 监听垃圾桶点击事件，确保垃圾能正确显示
trashBin.addEventListener("click", openBin);

// 垃圾数据
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

// 打开垃圾桶，显示垃圾
function openBin() {
    if (!trashBinOpen) {
        trashBin.src = "img/trash bin open.png";
        binInstruction.textContent = "Drag trash into the bin";
        trashBinOpen = true;
        displayTrashItems(); // 确保垃圾正确显示
    }
}

// 显示垃圾选项
function displayTrashItems() {
    trashItemsContainer.style.display = "flex"; // 显示垃圾
    trashItemsContainer.innerHTML = ""; // 清空旧数据，防止重复

    trashItemsData.forEach(item => {
        let div = document.createElement("div");
        div.classList.add("trash-item");
        div.setAttribute("draggable", true);
        div.dataset.id = item.id;

        let img = document.createElement("img");
        img.src = item.img;
        img.alt = item.name;

        div.appendChild(img);
        div.addEventListener("dragstart", dragStart);
        div.addEventListener("dragend", dragEnd);

        trashItemsContainer.appendChild(div); // 确保垃圾出现在垃圾桶下方
    });
}

// 拖拽事件
function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.parentNode.dataset.id);
    e.target.parentNode.classList.add("dragging");
}
function dragEnd(e) {
    e.target.parentNode.classList.remove("dragging");
}

// 允许垃圾桶接收垃圾
trashBin.addEventListener("dragover", (e) => e.preventDefault());
trashBin.addEventListener("drop", (e) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("text/plain");
    const item = trashItemsData.find(i => i.id === itemId);
    if (item) processTrash(item);
});

// 处理垃圾投递
function processTrash(item) {
    trashBin.src = "img/trash bin loading.png";
    analysisDiv.innerHTML = "";

    // 删除垃圾物品
    const itemDiv = document.querySelector(`.trash-item[data-id="${item.id}"]`);
    if (itemDiv) {
        itemDiv.remove();
    }

    // 2秒后显示评估
    setTimeout(() => {
        let newBinImage = "";
        if (item.value === 1) {
            newBinImage = "img/trash bin 1.png";
        } else if (item.value === 25) {
            newBinImage = "img/trash bin 25.png";
        } else if (item.value === 75) {
            newBinImage = "img/trash bin 75.png";
        } else if (item.value === 100) {
            newBinImage = "img/trash bin 100.png";
        } else {
            newBinImage = "img/trash bin open.png";
        }

        // 更新垃圾桶图像
        trashBin.src = newBinImage;

        // 显示垃圾评估信息
        const [title, ...description] = item.analysis.split("\n");
        const titleElement = document.createElement("p");
        titleElement.style.fontWeight = "bold";
        titleElement.style.marginBottom = "10px";
        titleElement.innerText = title;
        analysisDiv.appendChild(titleElement);

        const descriptionElement = document.createElement("p");
        analysisDiv.appendChild(descriptionElement);
        typeWriter(description.join("\n"), descriptionElement, 0);

    }, 2000);
}

// 打字机效果，逐字显示文本
function typeWriter(text, element, index) {
    if (index < text.length) {
        element.innerHTML += text.charAt(index);
        setTimeout(() => typeWriter(text, element, index + 1), 50);
    }
}
