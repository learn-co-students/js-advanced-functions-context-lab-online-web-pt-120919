/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
function createEmployeeRecord(arr){
    let obj = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return obj
}

function createEmployeeRecords(arrays){
    let newArr = [];
    // arrays.forEach(function(arr) {
    //     newArr.push(createEmployeeRecord(arr))
    // });

    for (let arr of arrays) {
        newArr.push(createEmployeeRecord(arr))
    }
    return newArr;
}


function createTimeInEvent(date){
    let dateArr = date.split(" ")
    
    let timeInEventsObj = {
        type: "TimeIn",
        hour: Number(dateArr[1]),
        date: dateArr[0]
    }

    this.timeInEvents.push(timeInEventsObj);
    return this;
}

function createTimeOutEvent(date){
    let dateArr = date.split(" ")
    
    let timeOutEventsObj = {
        type: "TimeOut",
        hour: Number(dateArr[1]),
        date: dateArr[0]
    }

    this.timeOutEvents.push(timeOutEventsObj);
    return this
}

function hoursWorkedOnDate(date){
    let timeOut;
    for (let event of this.timeOutEvents){
        if (event.date == date)
            timeOut = event.hour;
    }  
   
    let timeIn;
    for (let event of this.timeInEvents){
        if (event.date == date)
            timeIn = event.hour;
    } 
 
    return ((timeOut - timeIn) / 100)
}

function wagesEarnedOnDate(date){
    let employeeHrs = hoursWorkedOnDate.bind(this);
    let wage = this.payPerHour
    return employeeHrs(date) * wage 
}


let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName){
    let found = srcArray.find(function(record) {
        if(record.firstName == firstName)
            return true;
    });

    return found
}

function calculatePayroll(employees){
    // return employees.reduce((accumulator, employee) => {
    //     return allWagesFor(employee) + accumulator
    // }, 0)

    return employees.reduce((accumulator, employee) => {
        let employeeWages = allWagesFor.bind(employee)
        return employeeWages() + accumulator
    }, 0)
}