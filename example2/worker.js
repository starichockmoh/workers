self.onmessage = function(event) {
    const { id, command, value } = event.data;
    console.log(`${id} received ${command}`);

    if (command === 'start') {
        let sum = 0;
        for (let i = 1; i <= value; i++) {
            sum += i;
        }
        self.postMessage({ id: id, command: 'result', value: sum });
    }
};