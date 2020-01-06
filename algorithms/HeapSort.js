async function HeapSort(divArr)
{
	var n = divArr.length;

	for(var i = Math.floor(n / 2) - 1; i >= 0; i--)
		await heapify(divArr, n, i);

	for(var i = n - 1; i >= 0; i--)
	{
		await swapdiv(divArr, 0, i);
		
		divArr[i].style.background = FINALCOLOR;
		await heapify(divArr, i, 0);
	}
	await sortingCompleted(divArr);
}

async function heapify(divArr, n, idx)
{
	var largest = idx;
	var left = 2 * idx + 1;
	var right = 2 * idx + 2;

	if(left < n && parseInt(divArr[left].style.height) > parseInt(divArr[largest].style.height))
	{
		await selectElements(divArr, left, largest)
		largest = left;
	}
	var selected = false;
	if(right < n && parseInt(divArr[right].style.height) > parseInt(divArr[largest].style.height))
	{
		await selectElements(divArr, right, largest);
		largest = right;
		selected = true;
	}
	if(largest != idx)
	{
		if(selected)
			await selectElements(divArr, idx, largest);
		await swapdiv(divArr, idx, largest);

		await heapify(divArr, n, largest);
	}
}