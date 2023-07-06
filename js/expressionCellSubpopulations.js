// import dom element
import { expression_cell_subpopulations } from "./htmlDomElement";
// expressionCellSubpopulations function
export async function expressionCellSubpopulations(
  lncRNA_transcript,
  searchedValue
) {
  let expressionCellSubpopulationsData = await fetch(
    `${API_URL}/api/v1/seurat/markers/lclusters`
  );
  let response = await expressionCellSubpopulationsData.json();

  const singleObject = response.data.find(function (item, index) {
    return item.GeneID_GeneName === lncRNA_transcript.split("_").join("-");
  });

  expression_cell_subpopulations.innerHTML = ` <h3>Expression Levels in cell subpopulations</h3>`;

  // Click here to see the singel cell expression
  if (!singleObject) {
    expression_cell_subpopulations.insertAdjacentHTML(
      "beforeend",
      `<p><span class="previous_annotaion-red-color">${searchedValue
        .split("_")
        .join(
          "-"
        )}</span> is <u>not</u> a marker of any specific cell subpopulation.</p>`
    );
  } else {
    expression_cell_subpopulations.insertAdjacentHTML(
      "beforeend",
      `<p><span class="previous_annotaion-red-color"><a  class=" expression_cell_subpopulations"  href="./visualise.html?q=${lncRNA_transcript}">${searchedValue
        .split("_")
        .join("-")}</a></span> is a marker of Lcluster subpopulation.</p>`
    );
  }
}
