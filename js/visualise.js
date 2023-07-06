// import dom element
import { visualeContent } from "./htmlDomElement";

// visualise function
export async function visualise() {
  // visuale the selected img

  const searchQ = window.location.search;

  const searchParams = new URLSearchParams(searchQ);

  const q = searchParams.get("q");

  // receive backend response code start
  async function geneMarkers() {
    let imgfile = await fetch(
      `${API_URL}/api/v1/gene/markers/image/parsing/${q}`
    );
    let response = imgfile.json();
    return response;
  }
  geneMarkers()
    .then(function (response) {
      const img = document.createElement("img");
      const placeHolderImg = document.createElement("img");

      img.setAttribute("src", `${API_URL}/${response.imgPath}`);
      img.setAttribute("alt", q);

      placeHolderImg.setAttribute(
        "src",
        `${API_URL}/${response.placeholerImg}`
      );

      placeHolderImg.setAttribute("alt", "Placeholder");

      visualeContent.innerHTML = "";

      visualeContent.appendChild(img);

      visualeContent.appendChild(placeHolderImg);
    })
    .catch(function (error) {});
  // receive backend response code end
}
