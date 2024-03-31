

//array to store item ids
var orderArray = [];

//2d array to store ingredients by items
var ingredientArray = [];

//array to store order text
var orderText = [];

//array to store order text
var costArray = [];

//array to store remove buttons
var removeArray = [];

//array to store ingredients that are out
var zeroIngrs = [];

//array to store ingredients go create a notifcation for
var notiIngrs = [];

//used to store status of font size
var fontStatus = 0;

//used to store narrator status
var narratorStatus = 0;

//useed to store and update size of remove buttons
var removeSize = 0;
removeHeight = 0;
removeFont = 0;

//used to display real time
/**
 * Refreshes the time displayed.
 */
function refreshTime() {
   const timeAreas = document.getElementsByClassName("time");
   const dateString = new Date().toLocaleString();
   const formattedString = dateString.replace(", ", " - ");
   for(let i = 0; i < timeAreas.length; i++){
      timeArea = timeAreas[i]
      timeArea.textContent = formattedString;
   }
 }
refreshTime()
setInterval(refreshTime, 1000);



// Function to enable a certain category of buttons on click
/**
 * Enables menu buttons
 * @param {*} category - The category of menu buttons to enable.
 */
let enableMenuButtons = (category) => {   
  let disable = document.getElementsByClassName("button menubutton");
  
  for(let i = 0; i < disable.length; i++){
      let element = disable[i]
      element.setAttribute("hidden", "hidden")
   }
   let enable = document.getElementsByClassName("button menubutton " + category);
   for(let i = 0; i < enable.length; i++){
      let element = enable[i]
      element.removeAttribute("hidden")
   }
   categoryButtons = document.getElementsByClassName("button categorybutton");
   for(let i = 0; i < categoryButtons.length; i++){
      let element = categoryButtons[i]
      element.style.backgroundColor = "white";
      element.style.color = "maroon";
   }
   categoryButton = document.getElementsByClassName("button categorybutton " + category)[0];
   categoryButton.style.backgroundColor = "maroon";
   categoryButton.style.color = "white";
}

/**
 * Enables topping buttons
 */
let enableToppingButtons = () => {   
   let disable = document.getElementsByClassName("button menubutton");
   
   for(let i = 0; i < disable.length; i++){
       let element = disable[i]
       element.setAttribute("hidden", "hidden")
    }
    let enable = document.getElementsByClassName("button menubutton " + 4);
    for(let i = 0; i < enable.length; i++){
       let element = enable[i]
       element.removeAttribute("hidden")
    }
      enable = document.getElementsByClassName("button menubutton " + 5);
    for(let i = 0; i < enable.length; i++){
       let element = enable[i]
       element.removeAttribute("hidden")
    }

    categoryButtons = document.getElementsByClassName("button categorybutton");
    for(let i = 0; i < categoryButtons.length; i++){
       let element = categoryButtons[i]
       element.style.backgroundColor = "white";
       element.style.color = "maroon";
    }

 }

 /**
  * Hides menu contents and displays cart contents
  */
let goToCart = () => {   
   
   let disable = document.getElementsByClassName("menu");
   for(let i = 0; i < disable.length; i++){
      let element = disable[i]
      element.setAttribute("hidden", "hidden")
   }
   disable = document.getElementsByClassName("menubutton");
   for(let i = 0; i < disable.length; i++){
      let element = disable[i]
      element.setAttribute("hidden", "hidden")
   }
   let enable = document.getElementsByClassName("cart");
   for(let i = 0; i < enable.length; i++){
      let element = enable[i]
      element.removeAttribute("hidden")
   }
   
}
/**
 * Hides cart contents and displays menu contents
 */
let goToMenu = () => {   
   let disable = document.getElementsByClassName("cart");
   for(let i = 0; i < disable.length; i++){
      let element = disable[i]
      element.setAttribute("hidden", "hidden")
   }
   let disable1 = document.getElementsByClassName("access");
   for(let i = 0; i < disable1.length; i++){
      let element = disable1[i]
      element.setAttribute("hidden", "hidden")
   }
   let enable = document.getElementsByClassName("menu");
   for(let i = 0; i < enable.length; i++){
      let element = enable[i]
      element.removeAttribute("hidden")
   }
   let categories = document.getElementsByClassName("button categorybutton");
   for(let i = 0; i < categories.length; i++){
      let element = categories[i]
      element.style.backgroundColor = "white";
      element.style.color = "maroon";
   }
}
/**
 * Hides menu contents and displays accessibility contents
 */
let Accessibility = () => {
   let disable = document.getElementsByClassName("menu");
   for(let i = 0; i < disable.length; i++){
      let element = disable[i]
      element.setAttribute("hidden", "hidden")
   }
   disable = document.getElementsByClassName("menubutton");
   for(let i = 0; i < disable.length; i++){
      let element = disable[i]
      element.setAttribute("hidden", "hidden")
   }
   let enable = document.getElementsByClassName("access");
   for(let i = 0; i < enable.length; i++){
      let element = enable[i]
      element.removeAttribute("hidden")
   }

}

//adds item ids to order

/**
 * Adds selected item to order
 * @param {*} orderArray Array of current order
 * @param {*} id Item id to add
 * @param {*} price Item price to add
 * @param {*} i1 Ingredient 1
 * @param {*} i2 Ingredient 2
 * @param {*} i3 Ingredient 3
 * @param {*} i4 Ingredient 4
 * @param {*} i5 Ingredient 5
 * @param {*} i6 Ingredient 6
 * @param {*} category Category of item to add
 * @param {*} pos pos
 * @param {*} toppings Determines if toppings are to be displayed
 */
let addToOrder = (orderArray, id, price, i1, i2, i3, i4, i5, i6, toppings) => {  
   button = document.getElementById("menubutton " + id)
   var text = ""
   if (document.getElementById("side").innerText == "Server"){
      let txt = button.innerText.split('\n');
      let name = '';
      for(let i = 0; i < txt.length; i++){
         
         if(txt[i].charAt(0) != "$" ){
            name += txt[i]
            name += " "
         }
         
      }
      text = name + "$" + parseFloat(price).toFixed(2);
   }
   else if (document.getElementById("side").innerText == "Customer"){
      text = document.getElementById("price " + id).innerText
   }
   orderArray.push(id);
   
   let ingredients = []
   ingredients.push(i1,i2,i3,i4,i5,i6)

   ingredientArray.push(ingredients)
   
   //displays order and total
   
   orderText.push(text)
   costArray.push(price)

   var x = document.createElement("button")
   

   if(document.getElementById("side").innerText == "Server"){
      var intTop = 0 + removeSize * removeArray.length
      var top = intTop.toString()
      x.style.top = top+ "px"
      
      
   }
   else if(document.getElementById("side").innerText == "Customer"){

      var intTop = 0 + removeSize * removeArray.length
      var top = intTop.toString()
      x.style.top = top + "px"
      x.className += "cart ";
      x.setAttribute("hidden", "hidden")
     
   }
   x.className += "remove";
   x.innerHTML = "Remove";
   x.style.height = removeHeight + "px"
   x.style.fontSize = removeFont + "px"
   document.getElementById("removebox").appendChild(x);

  
   removeArray.push(x)

   resetLabels()
   if(toppings == 1){
      enableToppingButtons();
   }

   //checks item availability 
   var q = 'select * from inventory order by inventoryid;' ;
      fetch('/getinventorystatus', {
         method: 'POST',
         headers: {
            Authorization: '',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            q,
         }),
      })
      .then((res) => {
         console.log(res.inventory)
         return res.json();
      })
      
      .then(function(data) {
         var inventoryIds = data.inventory.inventoryIds
         var itemAmounts = data.inventory.itemAmounts
         var thresholds = data.inventory.thresholds
         for(let i = 0; i < ingredients.length; i++){
            let index = inventoryIds.indexOf(ingredients[i])
            let threshold = thresholds[index]
            
            if(index != 0){
               
               var count = 0;
               for(let j = 0; j <  ingredientArray.length; j++){
                  if(ingredientArray[j].includes(ingredients[i])){
                     count ++;
                  }
               }
               if(itemAmounts[index] <= count){
                  //disabled buttons with the ingredients
                  disableButtonsIngr(ingredients[i])
                  //stores disabled ingredient id in an array
                  zeroIngrs.push(ingredients[i])
               }
               if(itemAmounts[index] - count == threshold){

                  notiIngrs.push(ingredients[i])
               }
               
            } 
         }
      });
         

}

/**
 * Clears current order
 */
let clearOrder = () => {
   orderArray = []
   ingredientArray = []
   orderText = []
   costArray = []
   notiIngrs = []

   for(let i = 0; i < removeArray.length; i++){
      var x = removeArray[i]
      x.remove();
   }
   removeArray = [];
   orderCost = 0;
   orderArea =  document.getElementById("orderbox")
   orderArea.innerText = '';
   costAreas =  document.getElementsByClassName("costbox")
   
   for(let i = 0; i < costAreas.length; i++){
      costArea = costAreas[i]
      costArea.innerText = "Total: $0"
   }
   nameArea = document.getElementById("custname")
   nameArea.value =  "";
   //checks to see if buttons need to be enabled
   checkIngredients()
}
/**
 * Undoes previous action
 * @returns Returns void if current order is empty
 */
let undo = () => {
   if (orderArray.length == 0){
      return
   }
   orderArray.pop()
   costArray.pop()
   orderText.pop()
   ingredientArray.pop()
   removeArray[removeArray.length -1].remove()
   removeArray.pop()
   resetLabels()

   checkIngredients()

}
//sets labels to match items in order arrays
/**
 * Resets and updates current order display
 */
let resetLabels = () =>{
   let totalText = ''
   let totalSum = 0
   orderArea =  document.getElementById("orderbox")
   for(let i = 0; i <orderText.length; i++){
      totalText += orderText[i]
      totalText += '\n'
      totalSum += costArray[i]

      var x = removeArray[i]
      x.onclick = function(){removeItem(i)}
   }
   console.log(totalText)
   orderArea.innerText = totalText;


   costAreas =  document.getElementsByClassName("costbox")
   //adds total and rounds to 2 decimals
   for(let i = 0; i < costAreas.length; i++){
      
      costArea = costAreas[i]
      costArea.innerText = "Total: $" + Math.round(totalSum * 100) / 100
   }
}

/**
 * Removes selected item from current order
 * @param {*} i Item to be removed
 */
let removeItem = (i) =>{
   //removes item from parallel arrays
   orderArray.splice(i,1);
   costArray.splice(i,1);
   orderText.splice(i,1);
   ingredientArray.splice(i,1);
   
   //removes and pops last remove button
   removeArray[removeArray.length -1].remove()
   removeArray.pop()

   //resets labels to match arrays
   resetLabels();

   //checks if buttons need to be enabled
   checkIngredients();

}

//disables menu buttons that have a specfic ingredient
/**
 * Disables menu buttons with specified ingredients
 * @param {*} inventoryid Ingredient that determines which menu items to disable.
 */
let disableButtonsIngr = (inventoryid)=>{
   var buttons = document.getElementsByClassName("igr" + inventoryid)
   for(let i = 0; i < buttons.length; i++){
      disableMenuButton(buttons[i])
   }


}

//enables menu buttons that have a specfic ingredient
/**
 * Enables menu buttons with specified ingredients
 * @param {*} inventoryid Ingredient that determines which menu items to enable.
 */
let enableButtonsIngr = (inventoryid)=>{
   var buttons = document.getElementsByClassName("ingr" + inventoryid)
   for(let i = 0; i < buttons.length; i++){
      enableMenuButton(buttons[i])
   }

}

//disables menu button and changes formatting
/**
 * Disables specified menu button
 * @param {*} button Button to disable
 */
let disableMenuButton = (button)=>{
   button.disabled = true
   button.style.backgroundColor = "lightgrey"
   button.style.color = "grey"
   button.style.cursor = "not-allowed"

}

/**
 * Enables specified menu button
 * @param {*} button Button to enable
 */
//enables menu button and changes formatting
let enableMenuButton = (button)=>{
   button.disabled = false
   button.style.backgroundColor = "white"
   button.style.color = "maroon"
   button.style.cursor = "auto"

}

/**
 * Checks current inventory items stock and disables menu items if needed
 */
//initally checks ingredients to see if any are out
let checkAllIngredients = ()=> {
   //checks inventory status
   var q = 'select * from inventory order by inventoryid;' ;
   fetch('/getinventorystatus', {
      method: 'POST',
      headers: {
         Authorization: '',
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         q,
      }),
   })
   .then((res) => {
      console.log(res.inventory)
      return res.json();
   })
   
   .then(function(data) {
      var inventoryIds = data.inventory.inventoryIds
      var itemAmounts = data.inventory.itemAmounts
      for(let i = 0; i < inventoryIds.length; i++){
         var amount = itemAmounts[i]
         if(amount <= 0){
            //enables buttons and removes from array
            disableButtonsIngr(inventoryIds[i])
            zeroIngrs.push(inventoryIds[i])
         }
      }
   });

}


//checks ingredients that are out to see if they are available
/**
 * Checks if ingredients are out.
 */
let checkIngredients = ()=> {
   //checks inventory status
   var q = 'select * from inventory order by inventoryid;' ;
   fetch('/getinventorystatus', {
      method: 'POST',
      headers: {
         Authorization: '',
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         q,
      }),
   })
   .then((res) => {
      console.log(res.inventory)
      return res.json();
   })
   
   .then(function(data) {
      var inventoryIds = data.inventory.inventoryIds
      var itemAmounts = data.inventory.itemAmounts
      for(let i = 0; i < zeroIngrs.length; i++){
         var index = inventoryIds.indexOf(zeroIngrs[i])
         var amount = itemAmounts[index]
         if(amount > 0){
            //enables buttons and removes from array
            enableButtonsIngr(zeroIngrs[i])
            zeroIngrs.splice(i,1);
         }
      }
   });

}


//gets next order id and stores value
/**
 * Gets all employee IDs
 */
let getEmployeeIds = () =>{
   if (document.getElementsByClassName("textbox staffselect").length > 0){
      
      var orderId = 0
      var q = 'select * from staff where managementlevel = \'Server\' order by staffid;' ;
      fetch('/getemployeeids', {
         method: 'POST',
         headers: {
            Authorization: '',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            q,
         }),
      })
         .then((res) => {
            console.log(res.staffIds)
            return res.json();
         })
         
         .then(function(data) {
            console.log(data)
            var select = document.getElementById("staffselect");
            select.innerHTML=""
            var option = document.createElement('option');
            option.text = option.value = "Please Select ID"
            select.add(option);
            for(let i = 0; i < data.staffIds.length; i++){
               var option = document.createElement('option');
               option.text = option.value = data.staffIds[i]
               select.add(option);
            }
            
         });  
      
   }
   }

/**
 * Gets current order ID
 */
let getOrderId = () => { 
   var orderId = 0
   var q = 'select max(transactionid) from customertransactions;' ;
   fetch('/getorderid', {
      method: 'POST',
      headers: {
         Authorization: '',
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         q,
      }),
   })
      .then((res) => {
         console.log(res.max)
         return res.json();
      })
      
      .then(function(data) {
         var id = parseInt(data.max) + 1
         
         orderId =  id
         document.getElementById("orderId").innerText = "Order ID: "+ orderId
         
      });
      
}



//sends queries on completed transaction 
const tender = document.getElementById('tender');
tender.addEventListener('click', function(e) {


   var transactionQ = createOrderQuery(orderArray)
   //creates all queries for the transaction as one string

   var inventoryQ = createInventoryQuery(ingredientArray)
   //creates all queries for the inventory as one string

   var notificationQ = createNotificiationQuery(notiIngrs)
   runQuery(transactionQ)
   runQuery(inventoryQ)
   runQuery(notificationQ)
   
  

   clearOrder();

   });

//given order ids, creates a query string to create the transaction
/**
 * Creates a list of queries to update the table of customer transactions
 * @param {*} orderArray Order to add to database
 * @returns All queries needed to update customertransactions
 */
function createOrderQuery(orderArray){
   var allqs = '' ;
   var custName = document.getElementById('custname').value
   if(custName == "Insert Name"){
      custName = ""
   }

   var staffId = "NULL"
   if (document.getElementsByClassName("textbox staffselect").length > 0){
      let id = document.getElementById('staffselect').value
      if (!isNaN(id)){
         staffId = id
      }
      else{
         staffId = "NULL"
      }
      
   }

   for(var i = 0; i < orderArray.length; i++){

      let q = ''
      //gets new id if item is first in order
      if(i == 0){
         q = 'DO $$ DECLARE id bigint; DECLARE p float; BEGIN id := (SELECT max(transactionid)+1'
      }
      //else continues on order
      else{
         q = 'DO $$ DECLARE id bigint; DECLARE p float; BEGIN id := (SELECT max(transactionid)'
      }
      //adds necessary query info
      q += 'from customertransactions); p := (SELECT price from menuitems where itemid =' + orderArray[i] + ');'
      q += 'INSERT INTO customertransactions (transactionid,itemnum,itemid,custname,staffid,time,price) VALUES (id,'
      q += i+1 + ',' + orderArray[i] + ',\''+ custName+ '\',' + staffId + ',NOW(),p);END $$;';

   //adds all queries to one string
      allqs += q;
   }
   return allqs
}

/**
 * Creates a list of queries to update the table of inventory items
 * @param {*} ingredientArray Array of inventory items to update
 * @returns All queries needed to update inventory
 */
function createInventoryQuery(ingredientArray){
   var allqs = '' ;
   for(var i = 0; i < ingredientArray.length; i++){

      for(var j = 0; j < ingredientArray[i].length; j++){
         id = ingredientArray[i][j]
         if(id != 0){
            allqs += 'update inventory set itemamount = itemamount - 1 where inventoryid = ' + id + ';'
         }
      }
   }
   
   return allqs
}

/**
 * Creates a list of queries to update the notifications
 * @param {*} notiIngrs List of inventory ingredients to create notifications for.
 * @returns All queries needed to update notifications
 */
function createNotificiationQuery(notiIngrs){
   let allQs = ''
   for(let i = 0; i < notiIngrs.length; i++){
      let q = 'DO $$ DECLARE id bigint; DECLARE name text; DECLARE t bigint; BEGIN id := (SELECT max(notificationid)+1 from notifications);' 
      q += 'name := (SELECT stockname from inventory where inventoryid =' + notiIngrs[i] + ');'
      q += 't := (SELECT threshold from inventory where inventoryid =' + notiIngrs[i] + ');'
      q += 'insert into notifications (notificationid, inventoryid, date, time, message) VALUES' 
      q += '(id,' + notiIngrs[i] +',DATE(CURRENT_TIMESTAMP), CURRENT_TIME, t ||\' Units of \' || name || \' Remaining\''
      q += ');END $$;';
      allQs += q

   }

   return allQs
}


//given a string for a query runs a query with no return value 
/**
 * Runs a given query
 * @param {*} q A query to run
 */
function runQuery(q){  
   fetch('/query', {
      method: 'POST',
      headers: {
         Authorization: '',
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         q,
      }),
   })
   .then((res) => {
      return res.json();
   })
   .then((data) => console.log(data));
}

/**
 * Magnifies the current text on screen.
 */
function magnifyText(){
   if(document.getElementById("side").innerText == "Customer"){
      var menu = document.getElementsByClassName("menubutton")
      for(let i = 0; i < menu.length; i++){
         menu[i].style.fontSize = "18px"

      }
      var names = document.getElementsByClassName("textbox price")
      for(let i = 0; i < names.length; i++){
         names[i].style.height = "40px"
         names[i].style.top = "65px"
      }
      var categories = document.getElementsByClassName("categorybutton")
      for(let i = 0; i < categories.length; i++){
         categories[i].style.fontSize = "32px"
      }
      var misc = document.getElementsByClassName("misc")
      for(let i = 0; i < misc.length; i++){
         misc[i].style.fontSize = "20px"
      }
      removeSize = 28
      removeHeight = 34
      removeFont = 22

      document.getElementById("orderbox").style.fontSize = "25px"
   }
   else if(document.getElementById("side").innerText == "Server"){
      var menu = document.getElementsByClassName("menubutton")
      for(let i = 0; i < menu.length; i++){
         menu[i].style.fontSize = "24px"
        
      }
      var categories = document.getElementsByClassName("categorybutton")
      for(let i = 0; i < categories.length; i++){
         categories[i].style.fontSize = "32px"
      }
      var categories = document.getElementsByClassName("access")
      for(let i = 0; i < categories.length; i++){
         categories[i].style.fontSize = "32px"
      }
      var misc = document.getElementsByClassName("misc")
      for(let i = 0; i < misc.length; i++){
         misc[i].style.fontSize = "16px"
      }

      removeSize = 22.8
      removeHeight = 25
      removeFont = 12

      document.getElementById("orderbox").style.fontSize = "20px"
   }

   
   document.getElementById("toggletext").innerText = "Reset Text Size"
   fontStatus = 1;
   console.log(removeArray.length)
   for(let i = 0; i < removeArray.length; i++){
      var removeB = removeArray[i];

      removeB.style.top =  removeSize * i + "px";
      removeB.style.height = removeHeight + "px"
      removeB.style.fontSize = removeFont + "px"

   }


}
/**
 * Resets the text displayed to its original size.
 */
function resetText(){
   if(document.getElementById("side").innerText == "Customer"){
      var menu = document.getElementsByClassName("menubutton")
      for(let i = 0; i < menu.length; i++){
         menu[i].style.fontSize = "12px"
      }
      var names = document.getElementsByClassName("textbox price")
      for(let i = 0; i < names.length; i++){
         
         names[i].style.height = "20px"
         names[i].style.top = "75px"
      }
      var categories = document.getElementsByClassName("categorybutton")
      for(let i = 0; i < categories.length; i++){
         categories[i].style.fontSize = "12px"
      }
      
      var misc = document.getElementsByClassName("misc")
      for(let i = 0; i < misc.length; i++){
         misc[i].style.fontSize = "12px"
      }
      
      document.getElementById("orderbox").style.fontSize = "16px"
   }
   else if(document.getElementById("side").innerText == "Server"){
      var menu = document.getElementsByClassName("menubutton")
      for(let i = 0; i < menu.length; i++){
         menu[i].style.fontSize = "16px"
      
      }
      var categories = document.getElementsByClassName("categorybutton")
      for(let i = 0; i < categories.length; i++){
         categories[i].style.fontSize = "16px"
      }
      var categories = document.getElementsByClassName("access")
      for(let i = 0; i < categories.length; i++){
         categories[i].style.fontSize = "16px"
      }
      var misc = document.getElementsByClassName("misc")
      for(let i = 0; i < misc.length; i++){
         misc[i].style.fontSize = "12px"
      }

      document.getElementById("orderbox").style.fontSize = "16px"
   }
   removeSize = 18
   removeHeight = 16
   removeFont = 12
   document.getElementById("toggletext").innerText = "Increase Text Size"
   fontStatus = 0;
   console.log(removeArray.length)
   for(let i = 0; i < removeArray.length; i++){
      var removeB = removeArray[i];
      removeB.style.top = removeSize * i + "px";
      removeB.style.height = removeHeight + "px"
      removeB.style.fontSize = removeFont + "px"
      
   }


}

/**
 * Toggles the size of the font between original and magnified.
 */
function toggleFontSize(){
   if(fontStatus == 0){
      magnifyText();
   }
   else{
      resetText();
   }
}

/**
 * Toggles whether of not the narrator is enabled.
 */
function toggleNarrator(){
   window.speechSynthesis.cancel()
   var button = document.getElementById("togglenarrator")
   if(narratorStatus == 0){
      speech.text = "Narrator enabled"
      window.speechSynthesis.speak(speech);
      narratorStatus = 1
      button.innerText = "Disable Narrator"

   }
   else{
      speech.text = "Disabling narrator"
      window.speechSynthesis.speak(speech);
      narratorStatus = 0
      button.innerText = "Enable Narrator"
   }
}

/**
 * Creates the menu item buttons.
 */
function createMenuButtons(){
   
   
   var menu = document.getElementsByClassName("menubutton")
   while(menu.length > 0 ){
      //resets previous menu
      menu[0].remove()
   }
   

var q = 'select * from menuitems where active = \'t\' order by itemid;' ;
   fetch('/getallmenuinfo', {
      method: 'POST',
      headers: {
         Authorization: '',
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         q,
      }),
   })
      .then((res) => {
         console.log(res.inventory)
         return res.json();
      })
      
      .then(function(data) {
         //disables previous area
        
         var menu = data.menu;
         var menuBox = document.getElementById("menubox");
         for(let i = 0; i < menu.length; i++){
            var button = document.createElement("button")
            
            button.className += "button menubutton " + (menu[i].category - 1).toString() + " igr" + menu[i].i1 + " igr" + menu[i].i2
            button.className +=" igr" + menu[i].i3 + " igr" + menu[i].i4 + " igr" + menu[i].i5 + " igr" + menu[i].i6
            button.id = "menubutton " + menu[i].id
            button.setAttribute("hidden", "hidden")
            button.onclick = function() {addToOrder(orderArray, menu[i].id, menu[i].price, menu[i].i1, menu[i].i2, menu[i].i3, menu[i].i4, menu[i].i5, menu[i].i6, menu[i].hastoppings)}
            button.addEventListener("mouseover", narrator)
            if(document.getElementById("side").innerText == "Customer"){
               
               let textArea = document.createElement("div")
               textArea.className += "textbox price"
               textArea.id = "price " + menu[i].id
               textArea.innerText= "$" + parseFloat(menu[i].price).toFixed(2) + " " + menu[i].name
               textArea.style = "left: 85px; top: 70px; width:200px; height: 20px; position:relative; border: solid maroon 2px;"
               button.appendChild(textArea)
               button.style= "background-image: url(" + menu[i].url + ");"
               
            }
            else{
               button.innerText = menu[i].name
            }
            menuBox.appendChild(button)
         }
         resetText()
         
      });
      
}





//syncs scrolling with orderbox and cancelbox

var isSyncingLeftScroll = false;
var isSyncingRightScroll = false;

var orderbox = document.getElementById('orderbox');
var removebox = document.getElementById('removebox');

orderbox.onscroll = function() {
if (!isSyncingLeftScroll) {
   isSyncingRightScroll = true;
   removebox.scrollTop = this.scrollTop;
}
isSyncingLeftScroll = false;
}

removebox.onscroll = function() {
if (!isSyncingRightScroll) {
   isSyncingLeftScroll = true;
   orderbox.scrollTop = this.scrollTop;
}
isSyncingRightScroll = false;
}

var speech = new SpeechSynthesisUtterance();
speech.lang = "en";
speech.volume = 1;
speech.pitch = 1;
speech.rate = 1;


/**
 * Adds narrator to run on hover of certain elements
 */
function setNarrator(){
   var elements = document.querySelectorAll('[class]')
   for(let i = 0; i < elements.length; i++){
      let element = elements[i]
      element.addEventListener("mouseover", narrator)

   }
   //removes redundant narration
   document.getElementById("menubox").removeEventListener("mouseover",narrator)
   if(document.getElementById("side").innerText == "Customer"){
      document.getElementById("google_translate_element").removeEventListener("mouseover",narrator)
   }
   document.getElementById("google_translate_element").removeEventListener("mouseover",narrator)
   
}

/**
 * Implements text-to-speech narrator.
 * @param {*} event Event responsible for text to speech
 */
function narrator(event){
   if(narratorStatus){
      window.speechSynthesis.cancel()
      speech.text = event.target.innerText
      window.speechSynthesis.speak(speech);
   }
 }


 /**
 * Checks database for assist notifications
 */
 function checkAssist(){
   var q = 'select * from assist;' ;
   fetch('/getassist', {
      method: 'POST',
      headers: {
         Authorization: '',
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         q,
      }),
   })
      .then((res) => {
         return res.json();
      })
      
      .then(function(data) {
         if(data.assist.length > 0){
            
            alert("Customer Needs Assistance at Kiosk");
            runQuery("delete from assist;")
         }
         
         
      });

 }

/**
 * Used to alert server GUIs that help is needed at kiosk
 */
function callForHelp(){
   var q = "insert  into  assist (instance) values (true);"
   runQuery(q)
   alert("Employee has been notified.");

}


//checks periodically for help alerts
if(document.getElementById("side").innerText == "Server"){

   setInterval(checkAssist, 1000);
}


//function calls on start
createMenuButtons();
getEmployeeIds();
getOrderId();
checkAllIngredients();
setNarrator();
