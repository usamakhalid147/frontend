// import dom element
import { confirmed_tss} from './htmlDomElement'
// confirmedTssFn function
export async function  confirmedTssFn(lncRNA_transcript,searchedValue){
    
    const confirmedData = await fetch(`${API_URL}/api/v1/confirmed/TSS`)
    const response = await confirmedData.json()
    
     
    const singleObject= response.data.find(function(item, index){
     
        return item.Assembled_Transcript_ID === lncRNA_transcript
     })
    
     confirmed_tss.innerHTML=`<h3>Confirmed TSS</h3>`
     if( !singleObject){
        confirmed_tss.insertAdjacentHTML('beforeend', `<p><span class="previous_annotaion-red-color">${searchedValue.split('_').join('-')}</span> does not have confirmed TSS.</p>`)
     }else if(singleObject && singleObject.Cell_line !==""){
        
        confirmed_tss.insertAdjacentHTML('beforeend', `<p>  <span class="previous_annotaion-red-color">${searchedValue.split('_').join('-')}</span> has a confirmed TSS in cell line <span class="previous_annotaion-red-color">${singleObject.Cell_line}</span>, located
        <span class="previous_annotaion-red-color">${singleObject.Distance_to_TSSs }</span> base pairs from the detected start.</p>`)
     }else if(singleObject && singleObject.Cell_line === ""){
        
        confirmed_tss.insertAdjacentHTML('beforeend', `<p>  <span class="previous_annotaion-red-color">${searchedValue.split('_').join('-')}</span> has a confirmed TSS located within <span class="previous_annotaion-red-color">${singleObject.Chromosome_of_TSS_peak}</span></p>`)
     }
    // confirmedTss function body code end
    
    }