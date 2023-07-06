const DEFAULT_IMG_PATH = "./images/genemarkers/Placeholder.jpeg";

const visualeContent = document.querySelector(".visualize__content");

/// visuale the selected img

const searchQ = window.location.search;

const searchParams = new URLSearchParams(searchQ);

const q = searchParams.get("q");

const imgPath = "./images/genemarkers/" + q + ".jpeg";

const img = document.createElement("img");
const placeHolderImg = document.createElement("img");

placeHolderImg.setAttribute("src", DEFAULT_IMG_PATH);

img.setAttribute("src", imgPath);
img.setAttribute("alt", q);

placeHolderImg.setAttribute("src", DEFAULT_IMG_PATH);

placeHolderImg.setAttribute("alt", "Placeholder");

visualeContent.appendChild(img);

visualeContent.appendChild(placeHolderImg);
