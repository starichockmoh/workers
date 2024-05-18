let workerId = 0;

document.getElementById('startWorker').addEventListener('click', () => {
    if (window.Worker) {
        workerId++;
        const worker = new Worker('worker2.js');
        const id = workerId;

        worker.postMessage({ id: id, command: 'start', value: 10000000000 });

        worker.onmessage = function(event) {
            if (event.data.command === 'result') {
                document.getElementById('result').textContent = `Worker ${event.data.id} Sum is: ${event.data.value}`;
            }
        };

        worker.onerror = function(error) {
            console.error(`Worker ${id} error:`, error);
            document.getElementById('result').textContent = `Worker ${id} An error occurred: ${error.message}`;
        };
    } else {
        console.log('Your browser doesn\'t support web workers.');
    }
});