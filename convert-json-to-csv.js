const convertJsonToCsv = (data) => {
    const json = data
    const fields = [
        'firstName', 'lastName', 'email',
        'areYouAttending', 'basedIn', 'businessTitle', 'phoneNumber',
        'functionOrCommercial', 'nationality', 'passportNumber', 'departingCity', 'departingCountry',
        'checkIn', 'checkOut', 'smoking', 'alergies',
        'arrivalCarrierName', 'arrivalFlightNumber', 'arrivalTime', 'departureCarrierName',
        'departureFlightNumber', 'departureTime',
        
    ]
    const replacer = function(key, value) { return value === null ? '' : value } 
    let csv = json.map(function(row){
    return fields.map(function(fieldName){
        return JSON.stringify(row[fieldName], replacer)
    }).join(',')
    })
    csv.unshift(fields.join(','))
    csv = csv.join('\r\n');
    return csv;
}

module.exports = { convertJsonToCsv }