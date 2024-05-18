//Web Workers в JavaScript позволяют выполнять фоновую обработку данных без блокировки основного потока пользовательского
// интерфейса. Это особенно полезно для выполнения трудоёмких или длительных задач, таких как вычисления,
// обработка данных и т.п. Основная концепция работы с Web Workers заключается в использовании отдельного потока для
// выполнения задач параллельно с основным потоком. Web Worker в JavaScript имеет свой собственный event loop.
// Это означает, что воркеры выполняют свои задачи в отдельном потоке, независимо от
// основного потока пользовательского интерфейса.

self.onmessage = function(event) {
    const n = event.data;
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    self.postMessage(sum); // Отправляем результат обратно в основной скрипт
};