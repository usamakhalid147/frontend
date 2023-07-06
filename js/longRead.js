// import dom element
import {long_read} from './htmlDomElement'
// longReadFn function
export async function longReadFn(lncRNA_transcript,searchedValue){

    const longData = await fetch(`${API_URL}/api/v1/long/read`)
     const response = await longData.json()
    
     let percentageArr= []
     let arr = response.data.filter(function(item, index ){
        return item.Assembled_Transcript_ID === lncRNA_transcript
    })
    
    arr.forEach(function(item, index){
        percentageArr.push(item.Percentage_of_Long_Read_Covered )
    });
    
    let highest = Math.floor(Math.max(...percentageArr))
    let lowest =Math.floor( Math.min(...percentageArr))
    
    const highestDataValue = [ 90, 80,70,60,50,40,30,20,10,0]
    const lowestDataValue = [0,10,20,30,40,50,60,70,80,90]
    
    let maxCount = 0;
    let minCount = 0;
    for(let i = 0; i < highestDataValue.length ; i++){
        if(maxCount > 0){
           highest = highest
        }else if(highest > highestDataValue[i]){
            highest = highestDataValue[i]
            maxCount = maxCount + 1;
        }
    }
    
    
    for(let i = 0; i < lowestDataValue.length ; i++){
        if(minCount > 0){
            lowest = lowest
        }else if(lowest < lowestDataValue[i]){
            lowest = lowestDataValue[i - 1]
            minCount = minCount + 1
    
        }
    }
    
    
    long_read.innerHTML = ` <h3>Long-read support</h3>`
    if(arr.length > 0){
        
    long_read.insertAdjacentHTML('beforeend',`<p><span class="previous_annotaion-red-color">${searchedValue.split('_').join('-')}</span> is supported by <span class="previous_annotaion-red-color">${arr.length}</span>
    long-reads with overlap of <span class="previous_annotaion-red-color">${lowest}%</span> to <span class="previous_annotaion-red-color">>${highest}%</span> </p><br></br>
    ` )
    
    
    }else {
        
    long_read.insertAdjacentHTML('beforeend',`<p><span class="previous_annotaion-red-color">${searchedValue.split('_').join('-')}</span> does not have long-read support. </p><br></br>
    ` )
    
    }
    
    
     
    }