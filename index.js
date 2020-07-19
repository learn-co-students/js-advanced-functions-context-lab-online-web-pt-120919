function createEmployeeRecord(employee){
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees){
    return employees.map(employee => {return createEmployeeRecord(employee)})
}

function createTimeInEvent(date){
    let [day, hour] = date.split(" ")
    let clockIn = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: day
    }

    this.timeInEvents.push(clockIn)
    return this
}

function createTimeOutEvent(date){
    let [day, hour] = date.split(" ")
    let clockOut = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: day
    }
    this.timeOutEvents.push(clockOut)
    return this
}

function hoursWorkedOnDate(day){
    return ((this.timeOutEvents.find(el => el.date == day ).hour - this.timeInEvents.find(el => el.date == day ).hour)/100)
}

function wagesEarnedOnDate(day){
    return hoursWorkedOnDate.call(this, day) * this.payPerHour
}

function calculatePayroll(employees){
    return employees.reduce(function(wages, employee){
        return wages + allWagesFor.call(employee, employee)
    }, 0)
}

function findEmployeeByFirstName(employees, firstName){
    return employees.find(employee => employee.firstName == firstName)
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