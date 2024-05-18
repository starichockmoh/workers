// Создание SharedArrayBuffer размером 1024 байт (256 элементов Int32)
// Мы создаём SharedArrayBuffer размером 1024 байта, что позволяет разместить 256 элементов типа Int32.
const sharedBuffer = new SharedArrayBuffer(1024);
// На основе SharedArrayBuffer создаётся Int32Array, который будет разделяться между воркерами.
// Каждому воркеру отправляем сообщение с указанием SharedArrayBuffer и диапазона индексов, которые он должен обработать.
const sharedArray = new Int32Array(sharedBuffer);

// Создание воркеров
// Мы создаём массив воркеров и запускаем каждого из них.
// Каждому воркеру отправляем сообщение с указанием SharedArrayBuffer и
// диапазона индексов, которые он должен обработать.

const workers = [];
const numWorkers = 4;
for (let i = 0; i < numWorkers; i++) {
    const worker = new Worker('worker');
    worker.postMessage({ buffer: sharedBuffer, start: i * (sharedArray.length / numWorkers), end: (i + 1) * (sharedArray.length / numWorkers) });
    workers.push(worker);
}

// Функция для ожидания завершения всех воркеров
function waitForWorkers(workers) {
    return Promise.all(workers.map(worker => new Promise((resolve) => {
        worker.onmessage = () => resolve();
    })));
}

waitForWorkers(workers).then(() => {
    console.log('All workers finished');
    console.log('Shared array:', sharedArray);
    document.getElementById('result').textContent = 'Shared array: ' + sharedArray.toString();
});
