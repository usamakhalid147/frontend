// import dom element
import { sequence } from "./htmlDomElement";
import { Structure } from "./structure";
// Structure function
// sequenceFn function
export async function sequenceFn(lncRNA_transcript, searchedValue) {
  // communicate with frontend to backend

  const fastaDataOne = await fetch(`${API_URL}/api/v1/fasta/data/one`);
  const responseOne = await fastaDataOne.json();

  const sequenceOneObject = responseOne.seqOne.find(function (item, index) {
    return item.id.split(" ")[0].split(">")[1] === lncRNA_transcript;
  });

  if (sequenceOneObject !== undefined) {
    sequence.innerHTML = `<h3>Sequence</h3`;

    const html = `<div>
        <textarea class="sequence_textarea" disabled>${sequenceOneObject.id}
        ${sequenceOneObject.sequence}</textarea>
      </div>`;
    sequence.insertAdjacentHTML("beforeend", html); //>TRINITY_DN733_c1_g1_i1 len=1049 path=[1:0-375 2:376-1048]

    // call structure function
    Structure(sequenceOneObject);
  }

  if (responseOne.status === "ok") {
    const fastaDataTwo = await fetch(`${API_URL}/api/v1/fasta/data/two`);
    const responseTwo = await fastaDataTwo.json();

    const sequenceTwoObject = responseTwo.seqTwo.find(function (item, index) {
      return item.id.split(" ")[0].split(">")[1] === lncRNA_transcript;
    });

    // if sequence is not exist code start

    if (!sequenceOneObject && !sequenceTwoObject) {
      sequence.innerHTML = `<h3>Sequence</h3`;
      const html = `<p>Sequence was not found</p>`;
      sequence.insertAdjacentHTML("beforeend", html);
      // call structure function
      Structure();
    }

    // if sequence does not exist code end

    if (sequenceTwoObject !== undefined) {
      sequence.innerHTML = `<h3>Sequence</h3`;
      const html = `<div>
            <textarea class="sequence_textarea" disabled>${sequenceTwoObject.id}
            ${sequenceTwoObject.sequence}</textarea>
          </div>`;
      sequence.insertAdjacentHTML("beforeend", html);
      Structure(sequenceTwoObject);
    }
  }
}
