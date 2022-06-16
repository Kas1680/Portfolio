// CAESAR LAU 100090908

//////////////////////////////////////////////////////////////////////////////////////////

// cost constant

const blackCost = 2.00;
const greenCost = 2.50;
const redCost = 3.00;
const milkCost = 1.00;
const numberOfTops = 4;
const toppingCost = [0.25, 1.00, 0.50, 0.75];
const toppingsType = ["Pearls", "Mango Star", "Grass Jelly", "Coconut Jelly"];
// teas
let tea = document.getElementsByName("teatype");

// toppings
let toppingsArr = new Array();
let pearl = document.querySelector("#pearl");
let mstar = document.querySelector("#mstar");
let gjelly = document.querySelector("#gjelly");
let cjelly = document.querySelector("#cjelly");

let addTopBtn = document.querySelector("#addtop");
let reTopBtn = document.querySelector("#retop");

let currentTop = document.querySelector("#currentTop");

addTopBtn.onclick = addToppings;
reTopBtn.onclick = removeToppings;

// gotmilk?

let gotmilk = document.querySelector("#gotmilk");

// drinks
let orderArr = new Array();

let addDrinkBtn = document.querySelector("#addDrink");
let reDrinkBtn = document.querySelector("#redrink");
let emptyBtn = document.querySelector("#empty");

addDrinkBtn.onclick = addDrink;
reDrinkBtn.onclick = removeDrink;
emptyBtn.onclick = emptyOrder;

// table
let costTable = document.querySelector("#costTable");

////////////////////////////////////////////////////////////////////////////////////////////////
//addToppings

// When add topping button is clicked, store all topping in a 1D topping array
function addToppings(){
	if(pearl.checked && !isDuplicate("Pearls")){
		toppingsArr.push("Pearls");
	}
	if(mstar.checked && !isDuplicate("Mango Star")){
		toppingsArr.push("Mango Star");
	}
	if(gjelly.checked && !isDuplicate("Grass Jelly")){
		toppingsArr.push("Grass Jelly");
	}
	if(cjelly.checked && !isDuplicate("Coconut Jelly")){
		toppingsArr.push("Coconut Jelly");
	}
	displayToppings();
}

function isDuplicate(topping){
	for(let i = 0; i < toppingsArr.length; i++){
		if(topping == toppingsArr[i]){
			return true;
		}
	}
	return false;
}

////////////////////////////////////////////////////////////////////////////////////////////////
//removeToppings

// when remove topping button is clicked, remove the last topping in the topping array
function removeToppings(){
	toppingsArr.pop();
	displayToppings();
}

////////////////////////////////////////////////////////////////////////////////////////////////
//displayToppings

function displayToppings(){
	let listOfTopping = "Current Toppings:" + "<ul>";
	for(let i = 0; i < toppingsArr.length; i++){
			listOfTopping += "<li>" + toppingsArr[i] + "</li>";
	}
	listOfTopping += "</li>"
	currentTop.innerHTML = listOfTopping;
}


////////////////////////////////////////////////////////////////////////////////////////////////
//addDrink

// when addDrinkBtn is clicked, add current drink instance into the 1D drink array

function addDrink(){
	addToppings();

	let selectedTea = document.forms.teaform.teatype.value; // tea value
	let selectedMilk = gotmilk.value; // milk value


	orderArr.push(new Boba(selectedTea, toppingsArr, selectedMilk));

	// once a drink is added, reset the toppings array and checkbox for the next drink
	toppingsArr.splice(0, toppingsArr.length);
	resetToppingsCheckBox()

	generateDrinkTable();
	displayToppings();
}

function resetToppingsCheckBox(){
	pearl.checked = false;
	mstar.checked = false;
	gjelly.checked = false;
	cjelly.checked = false;
}

////////////////////////////////////////////////////////////////////////////////////////////////
//removeDrink

// when reDrinkBtn is clicked, remove the last drink order
function removeDrink(){
	orderArr.pop();
	generateDrinkTable();
	displayToppings();
}


////////////////////////////////////////////////////////////////////////////////////////////////
//emptyOrder


// when empty button is clicked, empty order and topping array
function emptyOrder(){
	let check = document.querySelector("#DrinkTbl");
	orderArr.splice(0, orderArr.length);
	toppingsArr.splice(0, toppingsArr.length - 1);

	if(check){
		check.remove();
	}
	generateDrinkTable();
	displayToppings();
}

////////////////////////////////////////////////////////////////////////////////////////////////
//generateDrinkTable

function generateDrinkTable(){
	clearDrinkTable();

	if(orderArr.length != 0){
		let totalCost = 0;
		let newDrinkTable = document.createElement("TABLE");
		newDrinkTable.setAttribute("id", "DrinkTbl");
		costTable.appendChild(newDrinkTable);

		// Create heading first
		newDrinkTable.innerHTML = "<tr>" + 
									"<th>Tea</th>" +
									"<th>Milk</th>" +
									"<th>Toppings</th>" +
									"<th>Cost</th>";

		// Fill in each row
		for(let i = 0; i < orderArr.length; i++){
			let currentRow = newDrinkTable.insertRow();
			let currentDrink = orderArr[i];

			let currentCell = currentRow.insertCell();
			currentCell.textContent = currentDrink.tea; // insert tea info
			currentCell = currentRow.insertCell();
			currentCell.textContent = currentDrink.milk // insert milk info
			currentCell = currentRow.insertCell();

			// insert toppings info
			let currentTopArr = currentDrink.toppings;
			let currentTopList = "";
			for(let i = 0; i < currentTopArr.length; i++){
				currentTopList += currentTopArr[i];
				if(i != currentTopArr.length-1){
					currentTopList += ", ";
				}
			}
			currentCell.textContent = currentTopList;

			// insert cost info
			currentCell = currentRow.insertCell();
			let currentCost = calculateCost(currentDrink);
			totalCost += currentCost;
			currentCell.textContent = currentCost;
		}

		// finally, add a total cost row
		currentRow = newDrinkTable.insertRow();
		currentRow.insertCell();
		currentRow.insertCell();
		currentRow.insertCell().textContent = "Total Cost";
		currentRow.insertCell().textContent = totalCost.toFixed(2);

	}
}


// Remove the existing table if there is one
function clearDrinkTable(){
	let checkTable = document.querySelector("#DrinkTbl");
	if(checkTable){
		checkTable.remove();
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////
//Boba

function Boba(tea, toppings, milk){
	this.tea = tea;
	this.toppings = toppings.slice(0, numberOfTops - 1);
	this.milk = milk;
}

////////////////////////////////////////////////////////////////////////////////////////////////
//calculateCost

function calculateCost(drink){
	
	// tea base cost using ternary statement
	let baseCost = drink.tea == "Black"? blackCost : drink.tea == "Green"? greenCost : redCost;

	// topping cost
	let topCostTotal = 0;
	let currentTopArr = drink.toppings;
	for(let i = 0; i < currentTopArr.length; i++){
		switch(currentTopArr[i]){
			case toppingsType[0]:
				topCostTotal += toppingCost[0];
				break;
			case toppingsType[1]:
				topCostTotal += toppingCost[1];
				break;
			case toppingsType[2]:
				topCostTotal += toppingCost[2];
				break;
			case toppingsType[3]:
				topCostTotal += toppingCost[3];
				break;
		}
	}

	// milk cost
	let milkTotalCost = drink.milk? milkCost: 0;

	// total cost
	return (baseCost + topCostTotal + milkTotalCost);
}