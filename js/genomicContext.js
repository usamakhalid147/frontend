// import dom element
import { genomic_context } from "./htmlDomElement";
import { genomicDataFn } from "./genomicDataAxiosFn";

// genomicData function code

// genomicContext function
export async function genomicContext(found, lncRNA_transcript, searchedValue) {
  let id = lncRNA_transcript;

  try {
    let chromosomeStartEnd =
      found.Chromosome + ":" + found.Start + "-" + found.End;
    let chromosomeImage = `${found.Chromosome}-${found.Start}-${found.End}.png`;

    let genomicDataResponse = await genomicDataFn();

    let genomicDataSingleObject = genomicDataResponse.find(function (
      item,
      index
    ) {
      return item.lncRNA_transcript === id;
    });
    let genomic =
      genomicDataSingleObject.direction +
      "-" +
      genomicDataSingleObject.type +
      "-" +
      genomicDataSingleObject.location +
      "-" +
      genomicDataSingleObject.subtype;
    // genomicContext js code end
    genomic_context.innerHTML = `<h3>Genomic Context</h3`;
    genomic_context.insertAdjacentHTML(
      "beforeend",
      `<p class="genomicCoordinates-paragraph"> <span class="genomicCoordinates-red-color">${searchedValue
        .split("_")
        .join(
          "-"
        )} </span> is located at  <span class="genomicCoordinates-red-color">${chromosomeStartEnd} </span> and is of the  <span class="genomicCoordinates-red-color">${genomic} </span> type. </p>`
    );
    genomic_context.insertAdjacentHTML(
      "beforeend",
      `<p>A genome sequence can be generated using the above coordinates in the <a href="https://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38" target="_blank" style="color: red; text-decoration: underline; font-weight: 700;">UCSC Genome Browser (hg38)</a></p>`
    );
  } catch (error) {
    alert(error.message);
  }
}
