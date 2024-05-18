self.onmessage = function(event) {
    if (event.data === 'start') {
        // Выполнение задачи второго воркера
        let result = 'Task 1 completed';
        // Возвращаем результат основному скрипту
        self.postMessage(result);
    }
};