let toDoList = localStorage.getItem("toDoList")

if (toDoList != "") {
   document.getElementById("toDoList").value = toDoList
   console.log(toDoList)
}

/**
 * Saves the current contents of the ToDo List
 * @param {*} evt Event associated with saving the ToDo List
 */
function saveList(evt) {
   var list = document.getElementById("toDoList").value
   localStorage.setItem("toDoList", list)
   console.log("TO-DO List saved: " + list)
}

/**
 * Clears the current contents of the ToDo List
 * @param {*} evt Event associated with clearing the ToDo List
 */
function clearList(evt) {
   document.getElementById("toDoList").value = ""
   localStorage.setItem("toDoList", "")
   console.log("TO-DO List cleared")
}

document.getElementById("homePage").click();

var inventoryButtons = []
//array to store inventory buttons

var menuButtons = []
//array to store menu buttons


/**
 * Opens designated tab
 * @param {*} evt Event associated with opening a tab
 * @param {*} tabName Name of tab to open
 */
function openTab(evt, tabName) {
   // Declare all variables
   var i, tabcontent, tablinks;

   // Get all elements with class="tabcontent" and hide them
   tabcontent = document.getElementsByClassName("tabcontent");
   for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
   }

   // Get all elements with class="tablinks" and remove the class "active"
   tablinks = document.getElementsByClassName("tablinks");
   for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
   }

   // Show the current tab, and add an "active" class to the button that opened the tab
   document.getElementById(tabName).style.display = "block";
   evt.currentTarget.className += " active";
}

/**
 * Opens a designated report
 * @param {*} evt Event associated with opening a tab
 * @param {*} tabName Name of report to open
 */
function openReport(evt, tabName) {
    // Declare all variables
    var i, reportContent, reportTab;
 
    // Get all elements with class="reportContent" and hide them
    reportContent = document.getElementsByClassName("reportContent");
    for (i = 0; i < reportContent.length; i++) {
        reportContent[i].style.display = "none";
    }
 
    // Get all elements with class="reportTab" and remove the class "active"
    reportTab = document.getElementsByClassName("reportTab");
    for (i = 0; i < reportTab.length; i++) {
        reportTab[i].className = reportTab[i].className.replace(" active", "");
    }
 
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
 }

 /**
  * Runs a query
  * @param {*} q Query to run
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
 * Displays inventory items
 * @param {*} evt Event associated with displaying inventory items
 * @param {*} inventoryID Item in inventory to display
 * @param {*} amount Amount of item in inventory
 */
function displayinventoryItem(evt, inventoryID, amount) {
   const inventoryElement = document.getElementById(inventoryID);
   var subbuttons = document.getElementsByClassName('subbutton')
   for(let i = 0; i < subbuttons.length; i++){
      let button = subbuttons[i]
      button.disabled = true
      button.style.cursor = "not-allowed"

   }
   
   var q = 'select * from inventory where inventoryid =' + inventoryID + ";" ;
   fetch('/getinventoryinfo', {
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
         console.log(res.item)
         return res.json();
      })
      
      .then(function(data) {
         var item = data.item;
         document.getElementById('invID').value = item.id
         document.getElementById('invName').value = item.name
         document.getElementById('invAmount').value = item.amount
         if(item.threshold == null){
            document.getElementById('invThreshold').value = 0
         }
         else{
            document.getElementById('invThreshold').value = item.threshold
         }
         
         for(let i = 0; i < subbuttons.length; i++){
            let button = subbuttons[i]
            button.disabled = false
            button.style.cursor = "auto"
      
         }
      });
}

/**
 * Adds new item to inventory
 */
function addInventoryItems() {
   insertQ = 'INSERT INTO inventory(inventoryid, stockname, itemamount) SELECT MAX(inventoryid) + 1' + ", 'new item', 0 FROM inventory;"
   runQuery(insertQ)
   createInventoryArea();

}

/**
 * Creates area to populate with inventory information
 */
function createInventoryArea(){
   var q = 'select * from inventory where inventoryid != 0 order by inventoryid;' ;
   fetch('/getallinventoryinfo', {
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
         for(let i = 0; i < inventoryButtons.length; i++){
            let button = inventoryButtons[i];
            button.remove()
         }
         inventoryButtons = []

         var inventory = data.inventory;
         var area = document.getElementById("inventoryArea")
         for(let i = 0; i < inventory.length; i++){
            var button = document.createElement("button")
            button.className += "itemButton"
            button.id = inventory[i].id
            button.addEventListener("mouseover", narrator)
            button.onclick = function(){displayinventoryItem(event,inventory[i].id,inventory[i].amount)}
            button.innerText = inventory[i].name
            area.appendChild(button)
            inventoryButtons.push(button)
         }
      
      });
}
//creates inventory area on load
createInventoryArea();

/**
 * Displays menu items
 * @param {*} evt Event associated with displaying menu items
 * @param {*} itemid Item in menu to display
 */
function displayMenuItems(evt, itemid) {
   const menuElement = document.getElementById('m' + itemid)

   var subbuttons = document.getElementsByClassName('subbutton')
   for(let i = 0; i < subbuttons.length; i++){
      let button = subbuttons[i]
      button.disabled = true
      button.style.cursor = "not-allowed"

   }

   
   var q = 'select * from menuitems where itemid =' + itemid + ";" ;
   fetch('/getmenuinfo', {
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
         console.log(res.item)
         return res.json();
      })
      
      .then(function(data) {
         var item = data.item;
         document.getElementById('menuID').value = item.id
         document.getElementById('menuName').value  = item.name
         document.getElementById('menuPrice').value = item.price
         document.getElementById('menuIng1').value = item.i1
         document.getElementById('menuIng2').value = item.i2
         document.getElementById('menuIng3').value = item.i3
         document.getElementById('menuIng4').value = item.i4
         document.getElementById('menuIng5').value = item.i5
         document.getElementById('menuIng6').value = item.i6
         document.getElementById('url').value = item.url
         document.getElementById('category').value = item.category
         for(let i = 0; i < subbuttons.length; i++){
            let button = subbuttons[i]
            button.disabled = false
            button.style.cursor = "auto"
      
         }
      });
}

/**
 * Creates area to populate with menu information
 */
function createMenuArea(){
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
         for(let i = 0; i < menuButtons.length; i++){
            let button = menuButtons[i];
            button.remove()
         }
         menuButtons = []

         var menu = data.menu;
         console.log(menu)
         var area = document.getElementById("menuArea")
         for(let i = 0; i < menu.length; i++){
            var button = document.createElement("button")
            button.className += "itemButton"
            button.id = "m" +menu[i].id
            button.addEventListener("mouseover", narrator)
            button.onclick = function(){displayMenuItems(event,menu[i].id)}
            button.innerText = menu[i].name
            area.appendChild(button)
            menuButtons.push(button)
         }
      
      });
}
createMenuArea();

/**
 * Removes an item from inventory
 * @param {*} evt Event associated with removing an inventory item
 */
function removeItem(evt) {
   removeQ = 'DELETE FROM inventory WHERE inventoryid =' + document.getElementById('invID').value + ';'
   runQuery(removeQ)
   createInventoryArea();
}

/**
 * Updates item in inventory with given values
 * @param {*} evt Event associated with updating an item
 */
 function updateItem(evt) {
   invId = document.getElementById('invID').value
   stockName = document.getElementById('invName').value
   invAmount = document.getElementById('invAmount').value
   threshold = document.getElementById('invThreshold').value
   if(isNaN(invAmount) || isNaN(threshold)){
      alert("Invalid input")
   }
   else{
   updateQ = 'UPDATE inventory SET inventoryid=' + invId + ', stockname=' + "'" + stockName +
   "'" + ', itemamount=' + invAmount + ', threshold=' + threshold + ' WHERE inventoryid=' + invId + ';'
   runQuery(updateQ)
   }
}

/**
 * Removes an item from the menu
 * @param {*} evt Event associated with removing an item from the menu
 */
function removeMenuItem(evt) {
   menuID = document.getElementById('menuID').value
   removeQ = 'UPDATE menuitems SET active = false WHERE itemid=' + menuID + ';' 
   runQuery(removeQ)
   createMenuArea();
}

/**
 * Updates item in menu with given values
 * @param {*} evt Event associated with updating a menu item
 */
function updateMenuItem(evt) {
   menuID = document.getElementById('menuID').value
   menuName = document.getElementById('menuName').value
   price = document.getElementById('menuPrice').value
   ing1 = document.getElementById('menuIng1').value
   ing2 = document.getElementById('menuIng2').value
   ing3 = document.getElementById('menuIng3').value
   ing4 = document.getElementById('menuIng4').value
   ing5 = document.getElementById('menuIng5').value
   ing6 = document.getElementById('menuIng6').value
   url = document.getElementById('url').value
   category = document.getElementById('category').value

   if (isNaN(price) || isNaN(ing1) || isNaN(ing2) || isNaN(ing3) || isNaN(ing4) || isNaN(ing5) || isNaN(ing6)) {
      alert("invalid input")
   }
   else {
      //console.log()
      updateQ = 'UPDATE menuitems SET itemid=' + menuID + ', itemname=' + "'" + menuName +
      "'" + ', price=' + price + ', ingredient1=' + ing1 + ', ingredient2=' + ing2 + ', ingredient3=' + ing3 + ', ingredient4=' + ing4 + ', ingredient5=' + ing5 + ', ingredient6=' + ing6 + ', url=' + "'" + url + "'" + ', category=' + "'" + category + "'" + ' WHERE itemid=' + menuID + ';'
      console.log(updateQ)
      runQuery(updateQ)
   }
}

/**
 * Adds an item to the menu
 * @param {*} evt Event associated with adding a new menu item
 */
function addMenuItems(evt) {
   insertQ = 'INSERT INTO menuitems(itemid, itemname, price, ingredient1, ingredient2, ingredient3, ingredient4, ingredient5, ingredient6, category, hastoppings, active) VALUES((select max(itemid) from menuitems where itemid < 90) + 1' + ", 'new item', 0, 0, 0, 0, 0, 0, 0, 0, 0, true);"
   console.log(insertQ)
   runQuery(insertQ)
   createMenuArea();
   
}

/**
 * Gets the sales report
 * @param {*} evt Event associated with getting the sales report
 */
function getSalesReport(evt) { //TODO: get rid of start and end time bc sales only needs a date
   startDate = document.getElementById('salesStartDate').value
   endDate = document.getElementById('salesEndDate').value

  

   let element = document.getElementById('salesReportBox');
   while (element.firstChild) {
      element.removeChild(element.firstChild);
   }

   //q = 'SELECT itemid, COUNT(itemid), SUM(price) FROM customertransactions WHERE DATE(time) >= ' + "'" + startDate + "'" + ' AND DATE(time) <= ' + "'" + endDate + "'" + ' AND itemid < 90 GROUP by itemid;'
   if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
      alert("Invalid input")
   }
   else {
      q = 'select menuitems.itemname, count(menuitems.itemname), sum(customertransactions.price) from customertransactions join menuitems on customertransactions.itemid = menuitems.itemid WHERE DATE(time) >= ' + "'" + startDate + "'" + ' AND DATE(time) <= ' + "'" + endDate + "'" + ' group by menuitems.itemname ORDER BY sum(customertransactions.price) desc;'

      fetch('/getSalesReport', {
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
            console.log(res.itemIds)
            return res.json();
         })
         
         .then(function(data) {

            for (let i = 0; i < data.itemIds.length; i++) {
               var x = document.createElement("button")
               x.className += "itemButton"
               x.style.flexBasis = "33.33%"
               x.innerHTML = data.itemIds[i].itemname
               document.getElementById("salesReportBox").appendChild(x);
               var x = document.createElement("button")
               x.className += "itemButton"
               x.style.flexBasis = "33.33%"
               x.innerHTML = data.itemIds[i].count
               document.getElementById("salesReportBox").appendChild(x);
               var x = document.createElement("button")
               x.className += "itemButton"
               x.style.flexBasis = "33.33%"
               x.innerHTML = '$' + Math.round(data.itemIds[i].sum * 100.0) / 100.0
               document.getElementById("salesReportBox").appendChild(x);
            }

         });
   }
}

/**
 * Gets the excess report
 * @param {*} evt Event associated with getting the excess report.
 */
function getExcessReport(evt) {
   startDate = document.getElementById('excessStartDate').value
   startTime = document.getElementById('excessStartTime').value
   // q = 'SELECT itemid FROM customertransactions WHERE DATE(time) >= ' + "'" + startDate + ' ' + startTime + "'" + ' ORDER BY transactionid;'
   
   let element = document.getElementById('excessReportBox');
   while (element.firstChild) {
      element.removeChild(element.firstChild);
   }

   if (isNaN(Date.parse(startDate))) {
      alert("Invalid input")
   }
   else {
      q = 'SELECT customertransactions.itemid,  COUNT(customertransactions.itemid) as total from customertransactions where date(time) >= ' + "'" + startDate + ' ' + startTime + "'" + ' GROUP BY customertransactions.itemid order by customertransactions.itemid;'
      
      console.log(q)

      fetch('/getItemIDs', {
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
            console.log(res.itemIds)
            return res.json();
         })
         
         .then(function(data) {
            for (let i = 0; i < data.itemIds.length; i++) {
               if (data.itemIds[i].total < 300) {
                  var x = document.createElement("button")
                  x.className += "itemButton"
                  x.style.flexBasis = "50%"
                  x.innerHTML = data.itemIds[i].itemid
                  x.addEventListener("mouseover", narrator)
               document.getElementById("excessReportBox").appendChild(x);
                  var x = document.createElement("button")
                  x.className += "itemButton"
                  x.style.flexBasis = "50%"
                  x.innerHTML = data.itemIds[i].total
                  x.addEventListener("mouseover", narrator)
               document.getElementById("excessReportBox").appendChild(x);
               }
            }
         console.log(data)

         });
   }
}

/**
 * Gets the restock report
 * @param {*} evt Event associated with getting the restock report.
 */
function getRestockReport(evt) {
   q = 'Select * from inventory where itemamount <= threshold order by inventoryid;'
   
   let element = document.getElementById('restockReportBox');
   while (element.firstChild) {
      element.removeChild(element.firstChild);
   }


   fetch('/getRestockReport', {
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
         console.log(res.inventoryIds)
         return res.json();
      })
      
      .then(function(data) {

         for (let i = 0; i < data.inventoryIds.length; i++) {
            var x = document.createElement("button")
            x.className += "itemButton"
            x.style.flexBasis = "25%"
            x.innerHTML = data.inventoryIds[i].inventoryid
            x.addEventListener("mouseover", narrator)
            document.getElementById("restockReportBox").appendChild(x);
            var x = document.createElement("button")
            x.className += "itemButton"
            x.style.flexBasis = "25%"
            x.innerHTML = data.inventoryIds[i].stockname
            x.addEventListener("mouseover", narrator)
            document.getElementById("restockReportBox").appendChild(x);
            var x = document.createElement("button")
            x.className += "itemButton"
            x.style.flexBasis = "25%"
            x.innerHTML = data.inventoryIds[i].itemamount
            x.addEventListener("mouseover", narrator)
            document.getElementById("restockReportBox").appendChild(x);
            var x = document.createElement("button")
            x.className += "itemButton"
            x.style.flexBasis = "25%"
            x.innerHTML = data.inventoryIds[i].threshold
            x.addEventListener("mouseover", narrator)
            document.getElementById("restockReportBox").appendChild(x);
         }

      });
}

/**
 * Gets notifications from database
 * @param {*} evt Event responsible for getting notifications
 */
function getNotifications(evt) {
   q = 'SELECT * FROM notifications order by notificationid desc;'

   let element = document.getElementById('notifications');
   while (element.firstChild) {
      element.removeChild(element.firstChild);
   }

   fetch('/getnotifinfo', {
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
         console.log(res.notifIDs)
         return res.json();
      })
      
      .then(function(data) {

         for (let i = 0; i < data.notifIDs.length; i++) {
            var x = document.createElement("button")
            x.className += "notificationItem"
            x.innerHTML = data.notifIDs[i].id
            x.addEventListener("mouseover", narrator)
            document.getElementById("notifications").appendChild(x);
            var x = document.createElement("button")
            x.className += "notificationItem"
            x.innerHTML = data.notifIDs[i].name
            x.addEventListener("mouseover", narrator)
            document.getElementById("notifications").appendChild(x);
            var x = document.createElement("button")
            x.className += "notificationItem"
            x.innerHTML = data.notifIDs[i].date
            x.addEventListener("mouseover", narrator)
            document.getElementById("notifications").appendChild(x);
            var x = document.createElement("button")
            x.className += "notificationItem"
            x.innerHTML = data.notifIDs[i].time
            x.addEventListener("mouseover", narrator)
            document.getElementById("notifications").appendChild(x);
            var x = document.createElement("button")
            x.className += "notificationItem"
            x.innerHTML = data.notifIDs[i].message
            x.addEventListener("mouseover", narrator)
            document.getElementById("notifications").appendChild(x);
         }

      });
}

document.querySelector("#font-size").addEventListener("input", function() {
   document.body.style.fontSize = this.value +"%";
});

var narratorStatus = 0;
var speech = new SpeechSynthesisUtterance();
speech.lang = "en";
speech.volume = 1;
speech.pitch = 1;
speech.rate = 1;

/**
 * Implements text-to-speech narrator.
 * @param {*} event Event responsible for text to speech
 */
function narrator(event){
   if(narratorStatus){
      window.speechSynthesis.cancel()
      speech.text = event.target.innerText
      window.speechSynthesis.speak(speech);
      console.log(event.target.value)
   }
}

/**
 * Implements text-to-speech narrator in input fields.
 * @param {*} event Event responsible for text to speech
 */
 function narratorInput(event){
   if(narratorStatus){
      window.speechSynthesis.cancel()
      console.log(event.target.value)
      speech.text = (event.target.value)
      window.speechSynthesis.speak(speech);
      
   }
}

/**
 * Adds narrator to run on hover of certain elements
 */
function setNarrator(){
   var elements = document.querySelectorAll('[class]')
   elements = document.getElementsByTagName('button');
   for(let i = 0; i < elements.length; i++){
      let element = elements[i]
      element.addEventListener("mouseover", narrator)
      // else{
         
      //    element.addEventListener("mouseover",narratorInput)
      // }
      
      
   }
   document.getElementById("restockReportBox").removeEventListener("mouseover",narrator)
   document.getElementById("Restock").removeEventListener("mouseover",narrator)
   document.getElementById("Inventory").removeEventListener("mouseover",narrator)
   document.getElementById("Sales").removeEventListener("mouseover",narrator)
   document.getElementById("salesReportBox").removeEventListener("mouseover",narrator)
   document.getElementById("Finance").removeEventListener("mouseover",narrator)
   document.getElementById("Menu Items").removeEventListener("mouseover",narrator)
   document.getElementById("invColumnNamesDiv").removeEventListener("mouseover",narrator)
   
   inputs = document.getElementsByTagName('input');
   console.log(inputs.length)
   for (let i  = 0; i < inputs.length; i++) {
      let obj = inputs[i]
      obj.addEventListener("mouseover", narratorInput)
      obj.removeEventListener("mouseover",narrator)
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

setNarrator();