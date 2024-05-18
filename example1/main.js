document.getElementById('startWorker').addEventListener('click', () => {
    // Проверяем поддержку Web Workers
    if (window.Worker) {
        const worker = new Worker('worker2.js');

        worker.postMessage(10000000000); // Отправляем число n воркеру

        worker.onmessage = function(event) {
            document.getElementById('result').textContent = 'Sum is: ' + event.data;
        };

        worker.onerror = function(error) {
            console.error('Worker error:', error);
            document.getElementById('result').textContent = 'An error occurred: ' + error.message;
        };
    } else {
        console.log('Your browser doesn\'t support web workers.');
    }
});

document.getElementById('sync').addEventListener('click', () => {
    let sum = 0;
    for (let i = 1; i <= 10000000000; i++) {
        sum += i;
    }
    console.log(sum);
});

document.getElementById('alert').addEventListener('click', () => {
    alert('HELOOOOOO')
});