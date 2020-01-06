async function MergeSort(divArr, low, high) 
{ 
    if (low < high) 
    {
        var mid = low + Math.floor((high-low) / 2); 
        await MergeSort(divArr, low, mid); 
        await MergeSort(divArr, mid + 1, high); 

       	await Merge(divArr, low, mid, high);
    }
    if(low == 0 && high == divArr.length - 1)
        await sortingCompleted(divArr);
} 
async function Merge(divArr, low, mid, high)
{
    var ptr1 = low, ptr2 = mid + 1, i, idx = low;

    while(idx <= high &&  ptr2 <= high)
    {
    	await selectElements(divArr, ptr1, ptr2);
    	if(ptr1 < ptr2 && parseInt(divArr[ptr2].style.height) < parseInt(divArr[ptr1].style.height))
    	{
    		for(var j = ptr2 - 1; j >= ptr1; --j)
    			simpleSwap(divArr, j, j+1);

    		divArr[idx].style.background = SWAPPEDCOLOR;
    		await sleep(ms);
            divArr[idx].style.background = PRIMARYCOLOR;

            if(low == 0 && high == divArr.length - 1)
                divArr[idx].style.background = FINALCOLOR;
    		++ptr2, ptr1 += 1;
    	}
    	else
    	{
            if(low == 0 && high == divArr.length - 1)
                divArr[idx].style.background = FINALCOLOR;
    		++ptr1;
    	}
        idx++;
    }
}

function simpleSwap(divArr, idx1, idx2)
{
	var dup = divArr[idx1].style.height;
	divArr[idx1].style.height = divArr[idx2].style.height;
	divArr[idx2].style.height = dup;
}






