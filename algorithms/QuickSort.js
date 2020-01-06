
async function partition(divArr, low, high)
{
	var pivot = parseInt(divArr[high].style.height);
	var i = (low - 1);

	divArr[high].style.background = SELECTEDCOLOR;
	for(var j = low; j <= high - 1; ++j)
	{
		divArr[j].style.background = SELECTEDCOLOR;
		await sleep(ms);

		if(parseInt(divArr[j].style.height) < pivot)
		{
			++i;
			await swapdiv(divArr, i, j);
		}

		divArr[j].style.background = PRIMARYCOLOR;
	}

	await swapdiv(divArr, i + 1, high);
	divArr[i+1].style.background = FINALCOLOR;

	return (i + 1);
}

async function QuickSort(divArr, low, high)
{	
	if(low < high)
	{
		var partition_idx = await partition(divArr, low, high);
		
		await QuickSort(divArr, low, partition_idx - 1);
		for(var i = low; i < partition_idx-1; ++i)
			divArr[i].style.background = FINALCOLOR;
		await QuickSort(divArr, partition_idx + 1, high);
		for(var i = partition_idx+1; i <= high; ++i)
			divArr[i].style.background = FINALCOLOR;
	}
	if(low == 0 && high == divArr.length - 1)
			await sortingCompleted(divArr);
	
}
