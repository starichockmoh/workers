let worker1, worker2;

//Предположим, у нас есть два воркера, которые должны выполнить задачи последовательно,
// и основной скрипт должен координировать их работу.

document.getElementById('startWorker').addEventListener('click', () => {
    if (window.Worker) {
        worker1 = new Worker('worker1.js');
        worker2 = new Worker('worker2.js');

        // Начинаем работу первого воркера
        worker1.postMessage('start');

        worker1.onmessage = function(event) {
            console.log('Worker 1 finished:', event.data);
            // После завершения первого воркера запускаем второй воркер
            worker2.postMessage('start');
        };

        worker1.onerror = function(error) {
            console.error('Worker 1 error:', error);
        };

        worker2.onmessage = function(event) {
            console.log('Worker 2 finished:', event.data);
            document.getElementById('result').textContent = 'Both workers finished';
        };

        worker2.onerror = function(error) {
            console.error('Worker 2 error:', error);
        };
    } else {
        console.log('Your browser doesn\'t support web workers.');
    }
});

// Для более сложных сценариев синхронизации можно использовать дополнительные механизмы:
// Использование Promise: Вы можете создать обертки вокруг воркеров, используя Promise для более удобного
// управления асинхронным выполнением.

// function runWorker(worker, message) {
//     return new Promise((resolve, reject) => {
//         worker.onmessage = function(event) {
//             resolve(event.data);
//         };
//         worker.onerror = function(error) {
//             reject(error);
//         };
//         worker.postMessage(message);
//     });
// }
//
// document.getElementById('startWorker').addEventListener('click', async () => {
//     if (window.Worker) {
//         const worker1 = new Worker('worker1.js');
//         const worker2 = new Worker('worker2.js');
//
//         try {
//             const result1 = await runWorker(worker1, 'start');
//             console.log('Worker 1 finished:', result1);
//
//             const result2 = await runWorker(worker2, 'start');
//             console.log('Worker 2 finished:', result2);
//
//             document.getElementById('result').textContent = 'Both workers finished';
//         } catch (error) {
//             console.error('Worker error:', error);
//         }
//     } else {
//         console.log('Your browser doesn\'t support web workers.');
//     }
// });



// Этот подход позволяет запустить несколько асинхронных задач параллельно и дождаться,
// пока все они завершатся, прежде чем продолжить выполнение. Вот пример, демонстрирующий этот подход:

// function runWorker(worker, message) {
//     return new Promise((resolve, reject) => {
//         worker.onmessage = function(event) {
//             resolve(event.data);
//         };
//         worker.onerror = function(error) {
//             reject(error);
//         };
//         worker.postMessage(message);
//     });
// }
//
// document.getElementById('startWorker').addEventListener('click', async () => {
//     if (window.Worker) {
//         const worker1 = new Worker('worker1.js');
//         const worker2 = new Worker('worker2.js');
//         const worker3 = new Worker('worker3.js');
//
//         try {
//             // Запускаем все воркеры параллельно и ждём завершения всех
//             const results = await Promise.all([
//                 runWorker(worker1, 'start'),
//                 runWorker(worker2, 'start'),
//                 runWorker(worker3, 'start')
//             ]);
//
//             // Обрабатываем результаты всех воркеров
//             console.log('Worker 1 finished:', results[0]);
//             console.log('Worker 2 finished:', results[1]);
//             console.log('Worker 3 finished:', results[2]);
//
//             document.getElementById('result').textContent = 'All workers finished';
//         } catch (error) {
//             console.error('Worker error:', error);
//         }
//     } else {
//         console.log('Your browser doesn\'t support web workers.');
//     }
// });