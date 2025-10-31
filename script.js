window.onload = function () {
  const imgContainer = document.getElementById("image-container");
  const resetBtn = document.getElementById("reset");
  const verifyBtn = document.getElementById("verify");

  const images = [
    "https://picsum.photos/id/1011/120",
    "https://picsum.photos/id/1012/120",
    "https://picsum.photos/id/1015/120",
    "https://picsum.photos/id/1016/120",
    "https://picsum.photos/id/1020/120"
  ];

  // pick a random image to duplicate
  const randomIndex = Math.floor(Math.random() * images.length);
  const duplicate = images[randomIndex];
  const allImages = [...images, duplicate].sort(() => Math.random() - 0.5);

  // render images with class img1, img2, ..., img6
  allImages.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add(`img${index + 1}`);
    imgContainer.appendChild(img);
  });

  const allImgEls = document.querySelectorAll("#image-container img");
  let selected = [];

  allImgEls.forEach(img => {
    img.addEventListener("click", () => {
      img.style.border = "3px solid teal";
      resetBtn.style.display = "inline-block";

      if (!selected.includes(img)) selected.push(img);

      if (selected.length === 2) {
        verifyBtn.style.display = "inline-block";
      }

      if (selected.length > 2) {
        alert("You can only select two images.");
      }
    });
  });

  resetBtn.addEventListener("click", () => {
    selected = [];
    verifyBtn.style.display = "none";
    resetBtn.style.display = "none";
    allImgEls.forEach(img => (img.style.border = "2px solid #333"));
  });

  verifyBtn.addEventListener("click", () => {
    const [img1, img2] = selected;
    if (img1.src === img2.src) {
      alert("You are a human. Congratulations!");
    } else {
      alert("We can't verify you as a human. You selected the non-identical tiles.");
    }
    verifyBtn.style.display = "none";
  });
};
