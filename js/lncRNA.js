import { functional_annotation, TALR_detail } from "./htmlDomElement";

export async function lncRNAFn(lncRNA_transcript, searchedValue) {
  // url
  const elncRNAEnhancer = await fetch(`${API_URL}/api/v1/elncRNA/enhancer`);
  const elncTarget = await fetch(`${API_URL}/api/v1/elncRNA/target`);
  const panc = await fetch(`${API_URL}/api/v1/panc/associate`);
  const TALR = await fetch(`${API_URL}/api/v1/talr/utr`);
  const TALRTarget = await fetch(`${API_URL}/api/v1/talr/target`);

  // elnc responses
  const elncResponse = await elncRNAEnhancer.json();
  const elncTargetResponse = await elncTarget.json();
  const elncTargetList = elncTargetResponse.data;
  let elncGeneNameList = [];

  // panc responses
  const pancResponse = await panc.json();

  // TALR responses
  const TALRResponse = await TALR.json();
  const TALRTargetResponse = await TALRTarget.json();

  const searchID = "TRINITY_" + searchedValue;

  function isResult(obj) {
    return obj.lncRNA_ID === searchID;
  }
  function isTALRResult(obj) {
    return obj.lncRNA_Transcript_ID === searchID;
  }

  elncTargetList.forEach((element) => {
    if (element.elncRNA === searchID) {
      elncGeneNameList.push(element.Target_GeneName);
    }
  });
  // console.log(elncGeneNameList.sort());
  const geneNameShow =
    "<ol>" +
    elncGeneNameList
      .sort()
      .map((name) => {
        return '<li class="elnc-gene-name">' + name + "</li>";
      })
      .join("") +
    "</ol>";
  // elnc
  const elncDataList = elncResponse.data;
  const elncResult = elncDataList.find(isResult);
  const elncAllResult = elncDataList.filter(isResult);

  console.log(elncAllResult);
  let startList = [];
  let endList = [];
  elncAllResult.forEach((e) => {
    startList.push(e.Start_Enhancer);
    endList.push(e.End_Enhancer);
  });

  // console.log(enhancerShow)

  // panc
  const pancDataList = pancResponse.data;
  const pancResult = pancDataList.find(isResult);

  // TALR
  const TALRDataList = TALRResponse.data;
  const TALRResult = TALRDataList.find(isTALRResult);
  const TALRTargetData = TALRTargetResponse.data;
  const TALRTargetResult = TALRTargetData.find(isResult);

  functional_annotation.innerHTML = `<h3>Functional Annotation</h3>`;
  if (elncResult != undefined) {
    const chr = elncResult.Chr_Enhancer;
    const enhancerShow = startList.map((e, i) => {
      return " " + chr + ":" + e.toString() + "-" + endList[i].toString();
    });
    if (elncGeneNameList.length != 0) {
      functional_annotation.insertAdjacentHTML(
        "beforeend",
        `<p><span class="previous_annotaion-red-color">${searchedValue
          .split("_")
          .join(
            "-"
          )}</span> was found to be an enhancer-associated lncRNA (elncRNA).<br /><br />
        Genomic location for the enhancer element associated with <span class="previous_annotaion-red-color">${searchedValue
          .split("_")
          .join("-")}</span> is <span class="previous_annotaion-red-color">` +
          enhancerShow +
          `</span><br /><br />` +
          `Predicted targets of <span class="previous_annotaion-red-color">${searchedValue
            .split("_")
            .join("-")}</span> in T47D cells are: ` +
          // elncGeneNameList.sort()
          geneNameShow +
          `</p>`
      );
    } else {
      functional_annotation.insertAdjacentHTML(
        "beforeend",
        `<p><span class="previous_annotaion-red-color">${searchedValue
          .split("_")
          .join(
            "-"
          )}</span> was found to be an enhancer-associated lncRNA (elncRNA).<br /> <br />
        Genomic location for the enhancer element associated with <span class="previous_annotaion-red-color">${searchedValue
          .split("_")
          .join("-")}</span> is <span class="previous_annotaion-red-color">` +
          enhancerShow +
          `</span>.<br /><br />` +
          `There are no predicted targets for <span class="previous_annotaion-red-color">${searchedValue
            .split("_")
            .join("-")}</span>.</p>`
      );
    }
  } else if (pancResult != undefined) {
    let chrPromoter = pancResult.Chr_Promoter;
    let start_p = pancResult.Start_Promoter;
    let end_p = pancResult.End_Promoter;
    let targetGene = pancResult.TargetGene;

    functional_annotation.insertAdjacentHTML(
      "beforeend",
      `<p><span class="previous_annotaion-red-color">${searchedValue
        .split("_")
        .join(
          "-"
        )}</span> was found to be a promoter-associated lncRNA (pancRNA).</p>
      <p>Genomic location for the promoter element associated with <span class="previous_annotaion-red-color">${searchedValue
        .split("_")
        .join("-")}</span> is ${chrPromoter}:${start_p}:${end_p}</p>
      <p>The predicted target of <span class="previous_annotaion-red-color">${searchedValue
        .split("_")
        .join("-")}</span> is ${targetGene}.</p>`
    );
  } else if (TALRResult != undefined) {
    let lncRNACovered =
      TALRResult.Percentage_of_lncRNA_Transcript_Covered.toFixed(2);
    let utrCovered = TALRResult.Percentage_of_UTR_Covered.toFixed(2);
    let utrElement = TALRResult.UTR_element;
    let geneName = TALRTargetResult.GeneName;
    let transcriptId = TALRTargetResult.Target_Transcript_ID;
    let geneId = TALRTargetResult.Target_Gene_ID;

    functional_annotation.insertAdjacentHTML(
      "beforeend",
      `<p><span class="previous_annotaion-red-color">${searchedValue
        .split("_")
        .join(
          "-"
        )}</span> was found to be a terminus-associated lncRNA (TALR).</p><br /><br />
      <p><span class="previous_annotaion-red-color">${utrCovered}%</span> of the UTR (<span class="previous_annotaion-red-color">${utrElement}</span>) covers <span class="previous_annotaion-red-color">${lncRNACovered}%</span> of the lncRNA.</p>
      <br /><br /><p>The associated annotated gene is <span class="previous_annotaion-red-color">${transcriptId}</span>, from gene <span class="previous_annotaion-red-color">${geneId} (${geneName})</span>.</p>`
    );
  }
}
