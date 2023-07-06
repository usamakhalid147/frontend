// import dom element
import { marker_cancer_type } from "./htmlDomElement";
// markerCancerType function
export async function markerCancerType(lncRNA_transcript, searchedValue) {
  let markerCancerTypeData = await fetch(
    `${API_URL}/api/v1/markers/lncrna/${lncRNA_transcript}`
  );
  let response = await markerCancerTypeData.json();

  const arr = response.arrData.map(function (item, index) {
    return item.value;
  });

  if (arr.length === 0) {
    marker_cancer_type.innerHTML = ` <h3>Marker of Cancer Type</h3>`;
    marker_cancer_type.insertAdjacentHTML(
      "beforeend",
      `<p><span class="previous_annotaion-red-color">${searchedValue
        .split("_")
        .join("-")}</span> is not a selected marker.</p>`
    );
  } else if (arr.length > 0) {
    let arrLastItem = arr[arr.length - 1];
    let arrItem = arr.slice(0, arr.length - 1).join(", ");

    marker_cancer_type.innerHTML = ` <h3>Marker of Cancer Type</h3>`;

    marker_cancer_type.insertAdjacentHTML(
      "beforeend",
      `<p><span class="previous_annotaion-red-color">${searchedValue
        .split("_")
        .join("-")}</span> is a selected marker of the  ${
        arr.length === 1
          ? `<span  class="previous_annotaion-red-color">${arrLastItem}</span>`
          : `<span  class="previous_annotaion-red-color">${arrItem}</span> and <span  class="previous_annotaion-red-color">${arrLastItem}</span>`
      }  subtype of breast cancer.<br></br>
         </p>`
    );
  }
}
