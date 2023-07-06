// import structure_id dom element
import { structure_id} from './htmlDomElement'

// Structure function
export function Structure(seq){
    
    if(seq){
        structure_id.innerHTML=`<h3>Structure</h3> ` 
        structure_id.insertAdjacentHTML('beforeend', `<p>A structure image can be generated using the above sequence in <a href="http://rna.tbi.univie.ac.at/cgi-bin/RNAWebSuite/RNAfold.cgi" target="_blank" style="color: red; text-decoration: underline; font-weight: 700;"> RNAfold</a></p>
        `)

    }else{
// Sequence was not found
structure_id.innerHTML=`<h3>Structure</h3> ` 
structure_id.insertAdjacentHTML('beforeend', '<p>Sequence was not found</p>')
    }
}
