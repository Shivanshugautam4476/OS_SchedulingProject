import { srtf } from '../algorithms/srtf';

test.each([
    [
        [0, 0, 0],
        [1, 2, 3],
        {
            solvedProcessesInfo: [
                { job: 0, at: 0, bt: 1, ft: 1, tat: 1, wat: 0 },
                { job: 1, at: 0, bt: 2, ft: 3, tat: 3, wat: 1 },
                { job: 2, at: 0, bt: 3, ft: 6, tat: 6, wat: 3 },
            ],
            ganttChartInfo: [
                { job: 0, start: 0, stop: 1 },
                { job: 1, start: 1, stop: 3 },
                { job: 2, start: 3, stop: 6 },
            ]
        }
    ],
])('SRTF test %#', (arrivalTime, burstTime, expected) => {
    expect(srtf(arrivalTime, burstTime)).toEqual(expected);
});

