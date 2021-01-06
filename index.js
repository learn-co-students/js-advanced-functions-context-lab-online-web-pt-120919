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

const createEmployeeRecord = function(arr) { 
    return { 
        firstName: arr[0], 
        familyName: arr[1], 
        title: arr[2], 
        payPerHour: arr[3], 
        timeInEvents: [], 
        timeOutEvents: []
    }
} 

const createEmployeeRecords = function(employeeData) { 
    return employeeData.map(function(data) { 
        return createEmployeeRecord(data)
    })
}

const createTimeInEvent = function(dateTime) { 
    let [date, hour] = dateTime.split(' ')
    
    this.timeInEvents.push({ 
        type: "TimeIn", 
        hour: parseInt(hour, 10), 
        date,
    }) 
    return this
} 

const createTimeOutEvent = function(dateTime) { 
    let [date, hour] = dateTime.split(' ') 

    this.timeOutEvents.push({ 
        type: "TimeOut", 
        hour: parseInt(hour, 10), 
        date,
    }) 
    return this
} 

const hoursWorkedOnDate = function(neededDate) { 
    let inDate = this.timeInEvents.find(function(e) { 
        return e.date === neededDate
    }) 

    let outDate = this.timeOutEvents.find(function(e){ 
        return e.date === neededDate
    }) 

    return (outDate.hour - inDate.hour) / 100
}

const wagesEarnedOnDate = function(neededDate){ 
    let hours = hoursWorkedOnDate.call(this, neededDate) 
    let wage = hours * this.payPerHour 
    return parseFloat(wage.toString())
}

const findEmployeeByFirstName = function(arr, firstName){ 
    return arr.find(function(employee){ 
        return employee.firstName === firstName
    })
} 

const calculatePayroll = function(arr){ 
    return arr.reduce(function(memo, i){ 
        return memo + allWagesFor.call(i)
    }, 0)
}