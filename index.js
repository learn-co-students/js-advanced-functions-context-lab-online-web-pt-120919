/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function(arr){
  return {
      firstName : arr[0],
      familyName : arr[1],
      title : arr[2],
      payPerHour : arr[3],
      timeInEvents: [],
      timeOutEvents: []
      }
}

let createEmployeeRecords = function(arr){
  return  arr.map(record => {
      return  createEmployeeRecord(record)
    })
}

let createTimeInEvent = function (dateStamp){
    let [date, hour] = dateStamp.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour : parseInt(hour,10),
        date : date
    })

    return this 
    // this = is the explicit object of a record
}


let createTimeOutEvent = function (dateStamp){
    let [date, hour] = dateStamp.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour : parseInt(hour,10),
        date : date
    })

    return this
}

let hoursWorkedOnDate = function(date){
    let inEvents = this.timeInEvents.find(event =>{
      return  event.date === date
    })
    
    let outEvents = this.timeOutEvents.find(event =>{
     return event.date === date
    })

   return (outEvents.hour - inEvents.hour)/100
}
function wagesEarnedOnDate(date){
 return hoursWorkedOnDate.call(this,date)*this.payPerHour
}

function allWagesFor(){
    let dates = this.timeInEvents.map(event =>{
        return event.date
    })
     
    let pay = dates.reduce(function(total, d){
        return total + wagesEarnedOnDate.call(this, d)
    },0)
    return pay
}

function findEmployeeByFirstName(arr,firstName){
    let employee = arr.find(person => {
      return  person.firstName === firstName
    })
    return employee
}

function calculatePayroll(arr){
    let allEmployees = arr.reduce((total, item)=>{
        return total + allWagesFor.call(item)
    },0)
    return allEmployees
}
