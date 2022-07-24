const convertJsonToCsv = (data) => {
    const json = data
    const fields = [
        'areYou', 'basedIn', 'businessTitle', 'phoneNumber',
        'arrivalCarrierName', 'arrivalFlightNumber', 'arrivalTime', 'departureCarrierName',
        'departureFlightNumber', 'departureTime', 'checkIn', 'checkOut', 'smoking',
        'function', 'nationality', 'passportNumber', 'departingCity', 'departingCountry',
        'firstName', 'lastName', 'email'
    ]
    const replacer = function(key, value) { return value === null ? '' : value } 
    let csv = json.map(function(row){
    return fields.map(function(fieldName){
        console.log(fieldName, row[fieldName])
        return JSON.stringify(row[fieldName], replacer)
    }).join(',')
    })
    csv.unshift(fields.join(','))
    csv = csv.join('\r\n');
    return csv;
}

module.exports = { convertJsonToCsv }