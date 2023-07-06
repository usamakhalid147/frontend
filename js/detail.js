// selectors

// import dom element
import { selectedGeneLink, single_cell_expression } from "./htmlDomElement";
// import removeTrinity function
import { removeTrinity } from "./removeTrinity";
// import  summary function
// import { summary } from "./summary";
// import genomicContext funnction
import { genomicContext } from "./genomicContext";
// import previousAnnotation function
import { previousAnnotation } from "./previousAnnotation";
// import sequenceFn function
import { sequenceFn } from "./sequence";
// import  longReadFn function
import { longReadFn } from "./longRead";
// import  confirmedTssFn function
import { confirmedTssFn } from "./confirmedTSS";
// import expressionCellType function
import { expressionCellType } from "./expressionCellType";
// import expressionCellSubpopulations function
import { expressionCellSubpopulations } from "./expressionCellSubpopulations";
// import markerCancerType function
import { markerCancerType } from "./markerCancerType";
// import elncRNAEnhancer function
import { lncRNAFn } from "./lncRNA";

export function detail(found, searchedValue) {
  let text = found.lncRNA_transcript.split("_").join("-");

  single_cell_expression.innerHTML = `View the Single Cell Expression for`;
  selectedGeneLink.textContent = removeTrinity(text);
  selectedGeneLink.setAttribute(
    "href",
    "./visualise.html?q=" + found.lncRNA_transcript
  ); // a href =

  //
  //    // visualiseGeneMarkers function
  //    selectedGeneLink.addEventListener('click',  function(){
  //     visualise()
  //     return false;
  //    })

  // summary function
  // summary(found.lncRNA_transcript, searchedValue);
  //    // genomicCoordinates
  genomicContext(found, found.lncRNA_transcript, searchedValue);
  //    // previous Annotation
  previousAnnotation(found.lncRNA_transcript, searchedValue);
  //    // sequence
  sequenceFn(found.lncRNA_transcript, searchedValue);
  //    // long read
  longReadFn(found.lncRNA_transcript, searchedValue);
  //    // confirmedTss function
  confirmedTssFn(found.lncRNA_transcript, searchedValue);
  //    // expressionCellType function
  expressionCellType(found.lncRNA_transcript, searchedValue);
  //    // expressionCellSubpopulations function
  expressionCellSubpopulations(found.lncRNA_transcript, searchedValue);
  //    // markerCancerType function
  markerCancerType(found.lncRNA_transcript, searchedValue);
  // elncRNAEnhancer function
  lncRNAFn(found.lncRNA_transcript, searchedValue);
}
