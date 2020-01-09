var arr_size = 100, ms = 100;
const minimum = 5, maximum = 500

var arrWidth, arrMargin, leftMargin;
var PRIMARYCOLOR = "#4287f5", SELECTEDCOLOR = "#07fc03", SWAPPEDCOLOR = "#fc0303", FINALCOLOR="#df03fc";
var sortType, isSorting;

function sleep(ms) 
{
	return new Promise(resolve => setTimeout(resolve, ms));
}


function closeModal()
{
	document.getElementById('modal-wrapper').style.display = 'none';
	document.getElementById('invalidPrompt').style.visibility = 'hidden';
}


function getUserArr()
{
	var arrString = document.getElementById('textAreaArr').value;
	arrString = arrString.replace(/\s+/g,' ').trim();
	var flag = true;
	var userArr = [];

	arrString.split(' ').map(function(item) 
	{
		if(isNaN(item))
			flag = false;
		var num = parseInt(item);
		if(0 < num && num <= 500)
			userArr.push(num);
    });

    if(flag == true && userArr.length)
    {
    	arr_size = userArr.length;
    	changeWidth();
    	displayArr(userArr);
    	closeModal();
    }
    else
    {
		document.getElementById('invalidPrompt').style.visibility = 'visible';
    }
}


function generateRandomArr()
{
	if(isSorting)
		return;
	arr = [];
	for(i = 0; i < arr_size; i++)
 		arr[i] = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
 	changeWidth();
 	displayArr(arr);
}

function changeSortSpeed(value)
{
	if(value == 1)
		ms = 1000;
	else if(value == 2)
		ms = 500;
	else if(value == 3)
		ms = 100;
	else if(value == 4)
		ms = 50;
	else if(value == 5)
		ms = 10;
	else ms = 2;
}


function changeWidth()
{
	var screen_width = document.getElementById('bodycontainer').offsetWidth;
	arrMargin = Math.min(Math.ceil(0.2*screen_width/arr_size), 3);
	arrWidth = Math.floor((0.5*screen_width)/arr_size);
	leftMargin = Math.floor(screen_width - (arrWidth+arrMargin)*arr_size) / 2;
}

function getArrSize(value)
{
	arr_size = value;
	generateRandomArr();
}

function displayArr(arr)
{
	const mainContainer = document.getElementById('bodycontainer');
	var child = mainContainer.lastElementChild;
	while(child)
	{
        mainContainer.removeChild(child);
        child = mainContainer.lastElementChild;
    }
    seperator_box = document.createElement('div');
    seperator_box.style.width = `${leftMargin}px`;
    seperator_box.style.height = `${400}px`;
    seperator_box.className = 'seperator';

    mainContainer.appendChild(seperator_box);

    for( let i=0; i < arr.length; i++)
    {
        const box = document.createElement('div');
        box.className = 'slide';
        box.style.width = `${arrWidth}px`;
        box.style.height = `${arr[i]}px`;
        box.style.background = PRIMARYCOLOR;
        box.style.margin = '0 '+`${arrMargin}px`+' 0 0';
        box.style.boxSizing = "border-box";
        mainContainer.appendChild(box);
    }
    
}


// Function for enabling and disabling toolbar
function toogleToolbar(val)
{
	isSorting = val;
	var cursorType = "pointer";

	if(val)
		cursorType = "not-allowed";

	document.getElementById("sortButton").disabled = val;
	document.getElementById("sortButton").style.cursor = cursorType;
	document.getElementById("submitArr").disabled = val;
	document.getElementById("submitArr").style.cursor = cursorType;
	document.getElementById("sizeRangeSlider").disabled = val;
	document.getElementById("genNewArr").style.cursor = cursorType;
	document.getElementById("sizeRangeSlider").style.cursor = cursorType;
}


async function sort()
{
	toogleToolbar(true);
	var divArr = document.getElementsByClassName('slide');
	resetArrColor(divArr);
	if(sortType == "bubble")
		await BubbleSort(divArr);
	else if(sortType == "quick")
		await QuickSort(divArr, 0, divArr.length - 1);
	else if(sortType == "insertion")
		await InsertionSort(divArr);
	else if(sortType == "merge")
		await MergeSort(divArr, 0, divArr.length - 1);
	else if(sortType == "heap")
		await HeapSort(divArr);
	else if(sortType == "selection")
		await SelectionSort(divArr);
	else
		alert("This is beyond Science!");
	toogleToolbar(false);
}


function resetArrColor(divArr)
{
	for(var i = 0; i < divArr.length; ++i)
		divArr[i].style.background = PRIMARYCOLOR;
}


var modal = document.getElementById('modal-wrapper');
window.onclick = function(event) 
{
    if (event.target == modal) 
        modal.style.display = "none";
}


generateRandomArr();

async function sortingCompleted(divArr)
{
	await sleep(200);
	for(var i = 0; i < divArr.length; ++i)
		divArr[i].style.background = SELECTEDCOLOR;
	await sleep(800);
	for(var i = 0; i < divArr.length; ++i)
		divArr[i].style.background = FINALCOLOR;
}


document.getElementById("merge").onclick = function()
{
	sortType = "merge";
	document.getElementById("sortButton").style.visibility = "visible";
	document.getElementById("merge").style.color = "#f02a1f";
	document.getElementById("quick").style.color = "white";
	document.getElementById("heap").style.color = "white";
	document.getElementById("insertion").style.color = "white";
	document.getElementById("selection").style.color = "white";
	document.getElementById("bubble").style.color = "white";
}


document.getElementById("quick").onclick = function()
{
	sortType = "quick";
	document.getElementById("sortButton").style.visibility = "visible";
	document.getElementById("quick").style.color = "#f02a1f";
	document.getElementById("merge").style.color = "white";
	document.getElementById("heap").style.color = "white";
	document.getElementById("insertion").style.color = "white";
	document.getElementById("selection").style.color = "white";
	document.getElementById("bubble").style.color = "white";
}


document.getElementById("heap").onclick = function()
{
	sortType = "heap";
	document.getElementById("heap").style.color = "#f02a1f";
	document.getElementById("sortButton").style.visibility = "visible";
	document.getElementById("quick").style.color = "white";
	document.getElementById("merge").style.color = "white";
	document.getElementById("insertion").style.color = "white";
	document.getElementById("bubble").style.color = "white";
	document.getElementById("selection").style.color = "white";
}


document.getElementById("insertion").onclick = function()
{
	sortType = "insertion";
	document.getElementById("insertion").style.color = "#f02a1f";
	document.getElementById("sortButton").style.visibility = "visible";
	document.getElementById("merge").style.color = "white";
	document.getElementById("heap").style.color = "white";
	document.getElementById("quick").style.color = "white";
	document.getElementById("selection").style.color = "white";
	document.getElementById("bubble").style.color = "white";
}


document.getElementById("selection").onclick = function()
{
	sortType = "selection";
	document.getElementById("selection").style.color = "#f02a1f";
	document.getElementById("sortButton").style.visibility = "visible";
	document.getElementById("merge").style.color = "white";
	document.getElementById("heap").style.color = "white";
	document.getElementById("insertion").style.color = "white";
	document.getElementById("quick").style.color = "white";
	document.getElementById("bubble").style.color = "white";
}


document.getElementById("bubble").onclick = function()
{
	sortType = "bubble";
	document.getElementById("bubble").style.color = "#f02a1f";
	document.getElementById("sortButton").style.visibility = "visible";
	document.getElementById("merge").style.color = "white";
	document.getElementById("heap").style.color = "white";
	document.getElementById("insertion").style.color = "white";
	document.getElementById("selection").style.color = "white";
	document.getElementById("quick").style.color = "white";
}
