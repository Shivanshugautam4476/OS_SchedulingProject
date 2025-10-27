import { fcfs } from '../algorithms/fcfs';

test.each([
    [[0], [4], {
        solvedProcessesInfo: [
            { job: 0, at: 0, bt: 4, ft: 4, tat: 4, wat: 0 },
        ],
        ganttChartInfo: [
            { job: 0, start: 0, stop: 4 },
        ]
    }],
    [[1], [4], {
        solvedProcessesInfo: [
            { job: 0, at: 1, bt: 4, ft: 5, tat: 4, wat: 0 },
        ],
        ganttChartInfo: [
            { job: 0, start: 1, stop: 5 },
        ]
    }],
    [[0, 0, 0, 0], [4, 6, 2, 5], {
        solvedProcessesInfo: [
            { job: 0, at: 0, bt: 4, ft: 4, tat: 4, wat: 0 },
            { job: 1, at: 0, bt: 6, ft: 10, tat: 10, wat: 4 },
            { job: 2, at: 0, bt: 2, ft: 12, tat: 12, wat: 10 },
            { job: 3, at: 0, bt: 5, ft: 17, tat: 17, wat: 12 }
        ],
        ganttChartInfo: [
            { job: 0, start: 0, stop: 4 },
            { job: 1, start: 4, stop: 10 },
            { job: 2, start: 10, stop: 12 },
            { job: 3, start: 12, stop: 17 }
        ]
    }],
    [[0, 1, 2, 3, 4], [5, 3, 8, 6, 2], {
        solvedProcessesInfo: [
            { job: 0, at: 0, bt: 5, ft: 5, tat: 5, wat: 0 },
            { job: 1, at: 1, bt: 3, ft: 8, tat: 7, wat: 4 },
            { job: 2, at: 2, bt: 8, ft: 16, tat: 14, wat: 6 },
            { job: 3, at: 3, bt: 6, ft: 22, tat: 19, wat: 13 },
            { job: 4, at: 4, bt: 2, ft: 24, tat: 20, wat: 18 },
        ],
        ganttChartInfo: [
            { job: 0, start: 0, stop: 5 },
            { job: 1, start: 5, stop: 8 },
            { job: 2, start: 8, stop: 16 },
            { job: 3, start: 16, stop: 22 },
            { job: 4, start: 22, stop: 24 },
        ]
    }],
])('FCFS test %#', (arrivalTime, burstTime, expected) => {
    expect(fcfs(arrivalTime, burstTime)).toEqual(expected);
});

