/* Your Code Here */

function createEmployeeRecord(employeeInfoArray) {
    let dataObj = {}
    dataObj.firstName = employeeInfoArray[0]
    dataObj.familyName = employeeInfoArray[1]
    dataObj.title = employeeInfoArray[2]
    dataObj.payPerHour = employeeInfoArray[3]
    dataObj.timeInEvents = []
    dataObj.timeOutEvents = []

    return dataObj    
}

function createEmployeeRecords(arrOfArrs) {
    return arrOfArrs.map(function(e) {
        return createEmployeeRecord(e)
    })
}

let createTimeInEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date 
    })
    return this 
}

let createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date 
    })
    return this
}

let hoursWorkedOnDate = function(dateStamp) {
    let outEvent = this.timeOutEvents.find(function(e) {return e.date === dateStamp})
    let inEvent = this.timeInEvents.find(function(e) {return e.date === dateStamp})
    let hours = outEvent.hour - inEvent.hour
    return hours/100 
}

let wagesEarnedOnDate = function(dateStamp) {
    let hours = hoursWorkedOnDate.call(this, dateStamp)
    let moneyOwed = hours * this.payPerHour
    return moneyOwed
}

let calculatePayroll = function(employees) {
    let total = employees.reduce(function(memo, employee) {
        return memo += allWagesFor.call(employee)
    },0)
    return total 
}

let findEmployeeByFirstName = function(employees, name) {
    let employee = employees.find(function(e){
        return e.firstName === name
    })
    return employee
}
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