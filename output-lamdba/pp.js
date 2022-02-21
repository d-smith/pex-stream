console.log('Loading function');

exports.handler = async (event, context) => {
    
    /*console.log(JSON.stringify(event));
    console.log("record zero data");
    
    let data = event.records[0].data;
    let buff = new Buffer(data, 'base64');
    let text = buff.toString('ascii');
    console.log(text);
    */
    
    let success = 0;
    let failure = 0;
    const output = event.records.map((record) => {
        /* Data is base64 encoded, so decode here */
        const recordData = Buffer.from(record.data, 'base64');
        console.log(recordData.toString('utf-8'));
        try {
            /*
             * Note: Write logic here to deliver the record data to the
             * destination of your choice
             */
            success++;
            return {
                recordId: record.recordId,
                result: 'Ok',
            };
        } catch (err) {
            failure++;
            return {
                recordId: record.recordId,
                result: 'DeliveryFailed',
            };
        }
    });
    console.log(`Successful delivered records ${success}, Failed delivered records ${failure}.`);
    return { records: output };
};