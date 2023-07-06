// import dom element
import { previous_annotation } from "./htmlDomElement";

// previousAnnotation function code start
export async function previousAnnotation(lncRNA_transcript, searchedValue) {
  // part one
  let data = await fetch(`${API_URL}/api/v1/gen/code/annotated`);

  let response = await data.json();

  let singleObject = response.data.find(function (item, index) {
    return item.Assembled_Transcript_ID === lncRNA_transcript;
  });

  previous_annotation.innerHTML = `<h3>Previous Annotation</h3>`;

  if (!singleObject) {
    previous_annotation.insertAdjacentHTML(
      "beforeend",
      `<p class="previous_annotation-paragraph"> <span class="previous_annotaion-red-color"> ${searchedValue
        .split("_")
        .join("-")}</span> is not found in the previous annotation. </p>`
    );
  } else {
    previous_annotation.insertAdjacentHTML(
      "beforeend",
      `<p class="previous_annotation-paragraph"> <span class="previous_annotaion-red-color">${searchedValue
        .split("_")
        .join(
          "-"
        )} </span>  is previously annotated in <span class="previous_annotaion-red-color"><a  href="/gencode.html" style="color: red;font-weight:700; text-decoration:underline;" >Gencode</a></span>, 
        as gene <span class="previous_annotaion-red-color"> ${
          singleObject.Annotated_Gene_ID
        }</span> transcript <span class="previous_annotaion-red-color"> ${
        singleObject.Annotated_TranscriptID
      }</span>. </p>`
    );
  }

  // part two
  let cancerData = await fetch(`${API_URL}/api/v1/gen/lnc2cancermatches`);
  let cancerDataResponse = await cancerData.json();

  let cancerSingleObject = cancerDataResponse.data.find(function (item, index) {
    return item.Assembled_Transcript_ID === lncRNA_transcript;
  });

  previous_annotation.innerHTML = `<h3>Previous Annotation</h3>`;
  if (!cancerSingleObject) {
    previous_annotation.insertAdjacentHTML(
      "beforeend",
      `<p class="previous_annotation-paragraph"> <span class="previous_annotaion-red-color"> ${searchedValue
        .split("_")
        .join("-")}</span> is not found in the previous annotation. </p>`
    );
  } else {
    previous_annotation.innerHTML = `<h3>Previous Annotation</h3>`;
    previous_annotation.insertAdjacentHTML(
      "beforeend",
      `<p class="previous_annotation-paragraph"> <span class="previous_annotaion-red-color">${searchedValue
        .split("_")
        .join(
          "-"
        )} </span>  is previously annotated in <span class="previous_annotaion-red-color"><a  href="/gencode.html" style="color: red;font-weight:700; text-decoration:underline;"  >Gencode</a></span>, 
        as gene <span class="previous_annotaion-red-color"> ${
          singleObject.Annotated_Gene_ID
        }</span> transcript <span class="previous_annotaion-red-color"> ${
        singleObject.Annotated_TranscriptID
      }</span>. </p>`
    );

    previous_annotation.insertAdjacentHTML(
      "beforeend",
      `<p class="previous_annotation-paragraph"> <span class="previous_annotaion-red-color">${searchedValue
        .split("_")
        .join("-")} </span>  
    is previously annotated in <span class="previous_annotaion-red-color">breast cancer by Lnc2Cancer</span>, as <span class="previous_annotaion-red-color">${
      cancerSingleObject.Gene_ID
    } (${cancerSingleObject.Gene_Name})</span>. </p>`
    );
  }
}
// previousAnnotation function code end
