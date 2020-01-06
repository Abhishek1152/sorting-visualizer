async function BubbleSort(divArr)
{
	var n = divArr.length;

	for(var i = 0; i < n; ++i)
	{
		for(var j = 0; j < n-i-1; ++j)
		{
			await selectElements(divArr, j, j+1);

			if(parseInt(divArr[j].style.height) > parseInt(divArr[j+1].style.height))
				await swapdiv(divArr, j, j+1);
		}
		divArr[j].style.background = FINALCOLOR;
	}
	await sortingCompleted(divArr);
}

async function selectElements(divArr, idx1, idx2)
{
	divArr[idx1].style.background = SELECTEDCOLOR;
	divArr[idx2].style.background = SELECTEDCOLOR;

	await sleep(ms);
	
	divArr[idx1].style.background = PRIMARYCOLOR;
	divArr[idx2].style.background = PRIMARYCOLOR;
}

async function swapdiv(divArr, idx1, idx2)
{
	var dup = divArr[idx1].style.height;
	divArr[idx1].style.height = divArr[idx2].style.height;
	divArr[idx2].style.height = dup;

	divArr[idx1].style.background = SWAPPEDCOLOR;
	divArr[idx2].style.background = SWAPPEDCOLOR;

	await sleep(ms);

	divArr[idx1].style.background = PRIMARYCOLOR;
	divArr[idx2].style.background = PRIMARYCOLOR;
}