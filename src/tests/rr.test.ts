import { rr } from '../algorithms/rr';

test.each([
    [[0], [4], 2, {
        solvedProcessesInfo: [
            { job: 0, at: 0, bt: 4, ft: 4, tat: 4, wat: 0 },
        ],
        ganttChartInfo: [
            { job: 0, start: 0, stop: 4 },
        ]
    }],
    [[1], [4], 2, {
        solvedProcessesInfo: [
            { job: 0, at: 1, bt: 4, ft: 5, tat: 4, wat: 0 },
        ],
        ganttChartInfo: [
            { job: 0, start: 1, stop: 5 },
        ]
    }],
    [[0, 0, 0, 0], [4, 6, 2, 5], 2, {
        solvedProcessesInfo: [
            { job: 0, at: 0, bt: 4, ft: 6, tat: 6, wat: 2 },
            { job: 1, at: 0, bt: 6, ft: 17, tat: 17, wat: 11 },
            { job: 2, at: 0, bt: 2, ft: 2, tat: 2, wat: 0 },
            { job: 3, at: 0, bt: 5, ft: 11, tat: 11, wat: 6 },
        ],
        ganttChartInfo: [
            { job: 0, start: 2, stop: 6 },
            { job: 1, start: 11, stop: 17 },
            { job: 2, start: 0, stop: 2 },
            { job: 3, start: 6, stop: 11 },
        ]
    }],
    [[0, 1, 2, 3, 4], [5, 3, 8, 6, 2], 2, {
        solvedProcessesInfo: [
            { job: 0, at: 0, bt: 5, ft: 5, tat: 5, wat: 0 },
            { job: 1, at: 1, bt: 3, ft: 10, tat: 9, wat: 6 },
            { job: 2, at: 2, bt: 8, ft: 24, tat: 22, wat: 14 },
            { job: 3, at: 3, bt: 6, ft: 16, tat: 13, wat: 7 },
            { job: 4, at: 4, bt: 2, ft: 7, tat: 3, wat: 1 },
        ],
        ganttChartInfo: [
            { job: 0, start: 0, stop: 5 },
            { job: 1, start: 7, stop: 10 },
            { job: 2, start: 16, stop: 24 },
            { job: 3, start: 10, stop: 16 },
            { job: 4, start: 5, stop: 7 },
        ]
    }],
])('RR test %#', (arrivalTime, burstTime, timeQuantum, expected) => {
    expect(rr(arrivalTime, burstTime, timeQuantum)).toEqual(expected);
});
