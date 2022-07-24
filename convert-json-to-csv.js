const convertJsonToCsv = (data) => {
    const json = data
    const fields = Object.keys(json[0])
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