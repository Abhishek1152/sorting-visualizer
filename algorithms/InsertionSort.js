async function InsertionSort(divArr)
{

	var key, j, n = divArr.length;
	for(var i = 1; i < n ; ++i)
	{
		key = parseInt(divArr[i].style.height);
		j = i - 1;

		while(j >= 0 && parseInt(divArr[j].style.height) > key)
		{
			await swapdiv_insertion(divArr, j+1, j);
			j = j - 1;
		}
		divArr[j + 1].style.height = key;
	}
	await sortingCompleted(divArr);
}

async function swapdiv_insertion(divArr, idx1, idx2)
{
	divArr[idx1].style.background = SELECTEDCOLOR;
	divArr[idx2].style.background = SELECTEDCOLOR;

	await sleep(ms);
	var dup = divArr[idx1].style.height;
	divArr[idx1].style.height = divArr[idx2].style.height;
	divArr[idx2].style.height = dup;

	divArr[idx1].style.background = SWAPPEDCOLOR;
	divArr[idx2].style.background = SWAPPEDCOLOR;

	await sleep(ms);

	divArr[idx1].style.background = PRIMARYCOLOR;
	divArr[idx2].style.background = PRIMARYCOLOR;
}