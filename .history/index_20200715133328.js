// Using different function calls for this lab.

function createEmployeeRecord(employeeArray) {
    // Takes an array of employee information and creates an object
    return {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: []
    }
}

let createEmployeeRecords = function(arrOfArrays) {
    let results = []
    arrOfArrays.map(employee => results.push(createEmployeeRecord(employee)))
    return results
}

function createTimeInEvent(timeIn) {
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(timeIn.split(" ")[1]),
        date: timeIn.split(" ")[0]})
    return this
}
function createTimeOutEvent(timeOut) {
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(timeOut.split(" ")[1]),
        date: timeOut.split(" ")[0]})
    return this
}

function hoursWorkedOnDate(date) {
    let foundIn = this.timeInEvents.find(day => day.date === date)
    let foundOut = this.timeOutEvents.find(day => day.date === date)
    return parseInt(foundOut.hour - foundIn.hour) / 100
}

function wagesEarnedOnDate(date)  {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

function calculatePayroll(employees) {
    return employees.map(employee => allWagesFor(employee))
}

function findEmployeeByFirstName(name){
    console.log(this)
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