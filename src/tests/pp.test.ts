import { pp } from '../algorithms/pp';

test.each([
    [
        [0, 1, 2, 3], // Arrival times
        [5, 4, 2, 1], // Burst times
        [2, 1, 3, 4], // Priorities
        {
            solvedProcessesInfo: [
                { job: 3, at: 3, bt: 1, priority: 4, ft: 4, tat: 1, wat: 0 },
                { job: 1, at: 1, bt: 4, priority: 1, ft: 8, tat: 7, wat: 3 },
                { job: 2, at: 2, bt: 2, priority: 3, ft: 10, tat: 8, wat: 6 },
                { job: 0, at: 0, bt: 5, priority: 2, ft: 15, tat: 15, wat: 10 }
            ],
            ganttChartInfo: [
                { job: 3, start: 3, stop: 4 },
                { job: 1, start: 4, stop: 8 },
                { job: 2, start: 8, stop: 10 },
                { job: 0, start: 10, stop: 15 }
            ]
        }
    ]
])('PP test %#', (arrivalTime, burstTime, priorities, expected) => {
    expect(pp(arrivalTime, burstTime, priorities)).toEqual(expected);
});
