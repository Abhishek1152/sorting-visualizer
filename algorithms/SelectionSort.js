async function SelectionSort(divArr)
{
	var min_idx, n = divArr.length;

	for(var i = 0; i < n - 1; ++i)
	{
		min_idx = i;

		for(var j = i + 1; j < n; ++j)
		{
			await selectElements(divArr, min_idx, j);
			if(parseInt(divArr[j].style.height) < parseInt(divArr[min_idx].style.height))
				min_idx = j;
		}

		await swapdiv(divArr, min_idx, i);
		divArr[i].style.background = FINALCOLOR;
	}
	divArr[n-1].style.background = FINALCOLOR;
	await sortingCompleted(divArr);
}