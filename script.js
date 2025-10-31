//your code here
const imageContainer = document.getElementById("imageContainer");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("message");

// Use random placeholder images (you can replace with your own)
const baseImages = [
  "https://picsum.photos/id/101/150/150",
  "https://picsum.photos/id/102/150/150",
  "https://picsum.photos/id/103/150/150",
  "https://picsum.photos/id/104/150/150",
  "https://picsum.photos/id/105/150/150"
];

let allImages = [];
let selectedImages = [];

// Function to load images
function loadImages() {
  imageContainer.innerHTML = "";
  selectedImages = [];
  message.textContent = "";
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";

  // Copy the array and add a random duplicate
  const randomIndex = Math.floor(Math.random() * baseImages.length);
  const duplicate = baseImages[randomIndex];
  allImages = [...baseImages, duplicate];

  // Shuffle the array
  allImages.sort(() => Math.random() - 0.5);

  // Render images
  allImages.forEach((src, idx) => {
    const img = document.createElement("img");
    img.src = src;
    img.dataset.id = idx;
    img.addEventListener("click", () => handleSelect(img));
    imageContainer.appendChild(img);
  });
}

// Handle image selection
function handleSelect(img) {
  if (selectedImages.includes(img)) {
    // deselect if already selected
    img.classList.remove("selected");
    selectedImages = selectedImages.filter(i => i !== img);
  } else {
    if (selectedImages.length < 2) {
      img.classList.add("selected");
      selectedImages.push(img);
    }
  }

  // Show Reset button if any image is clicked
  if (selectedImages.length > 0) {
    resetBtn.style.display = "inline-block";
  }

  // Show Verify only when 2 images are selected
  if (selectedImages.length === 2) {
    verifyBtn.style.display = "inline-block";
  } else {
    verifyBtn.style.display = "none";
  }
}

// Reset functionality
resetBtn.addEventListener("click", () => {
  selectedImages.forEach(img => img.classList.remove("selected"));
  selectedImages = [];
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  message.textContent = "";
});

// Verify functionality
verifyBtn.addEventListener("click", () => {
  const [img1, img2] = selectedImages;
  if (img1.src === img2.src) {
    message.textContent = "You are a human. Congratulations!";
  } else {
    message.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verifyBtn.style.display = "none";
});
 
// Load images on page load
window.onload = loadImages;
