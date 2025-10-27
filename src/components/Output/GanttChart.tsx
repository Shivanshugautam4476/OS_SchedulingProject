import { useLayoutEffect, useRef, useState } from 'react';
import { GanttChartInfoType } from '../../algorithms';
import styled from 'styled-components';

import { media } from '../GlobalStyle.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 18px;
  ${media['600']`font-size: 16px;`}
  margin: 0 0 0.5rem 0;
  backgroundColor: #424242;
`;

const JobContainer = styled.div`
  display: flex;
`;

const Job = styled.div`
  width: 40px;
  height: 35px;
  border: 1px solid #8da6ff;
  background-backgroundColor: #edf4ff;
  backgroundColor: #424242;
  ${media['600']`
    width: 32px;
    height: 27px;
    font-size: 14px;
  `}

  &:not(:last-child) {
    margin-right: -1px;
  }
`;

const TimeContainer = styled.div`
  display: flex;
`;

const Time = styled.div`
  width: 40px;
  height: 20px;
  ${media['600']`
    width: 32px;
    height: 21px;
    font-size: 14px;
  `}
  border: 1px solid #fff;
  backgroundColor: #444e5c;

  &:not(:last-child) {
    margin-right: -1px;
  }
`;

const MultilineContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

type GanttChartProps = {
    ganttChartInfo: GanttChartInfoType;
};

const GanttChart = ({ ganttChartInfo }: GanttChartProps) => {
    const containerEl = useRef<HTMLDivElement>(null);
    const [windowWidth, setWindowWidth] = useState(null);
    const [containerWidth, setContainerWidth] = useState(null);

    const jobs: number[] = [];
    const lastJobIndex: { [key: number]: number } = {};

    const time: number[] = [];
    const BLANK_CELL = -1
    lastJobIndex[BLANK_CELL] = 9999

    ganttChartInfo.forEach((item, index) => {
        if (index === 0) {
            jobs.push(item.job);
            time.push(item.start, item.stop);
            lastJobIndex[item.job] = (lastJobIndex[item.job] || 0) + 1;
        } else if (time.slice(-1)[0] === item.start) {
            jobs.push(item.job);
            time.push(item.stop);
            lastJobIndex[item.job] = (lastJobIndex[item.job] || 0) + 1;
        } else if (time.slice(-1)[0] !== item.start) {
            jobs.push(BLANK_CELL, item.job);
            time.push(item.start, item.stop);
        }
    });

    useLayoutEffect(() => {
        function updateSize() {
            setWindowWidth(window.innerWidth);
            setContainerWidth(containerEl.current.offsetWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    let itemWidth = 0;
    if (windowWidth <= 600) {
        itemWidth = 32;
    } else {
        itemWidth = 40;
    }

    const timeContainerWidth = time.length * itemWidth - (time.length - 1);

    let maxTimeItemCount = ~~(containerWidth / itemWidth);

    let numberOfLines = 0;
    let acc = 0;
    while (true) {
        if (containerWidth === null) {
            break;
        }
        acc += maxTimeItemCount - 1;
        numberOfLines++;
        if (acc >= time.length) {
            acc -= maxTimeItemCount - 1;
            break;
        }
    }

    // If index of last time item equal to acc
    let lastLineItemCount: number;
    if (time.length - 1 === acc) {
        lastLineItemCount = 0;
        numberOfLines--;
    } else {
        lastLineItemCount = time.length - acc;
    }

    let timeCounter = 0;
    let jobCounter = 0;

    return (
        <Container ref={containerEl}>
            <Title>Gantt Chart</Title>
            {containerWidth !== null && containerWidth <= timeContainerWidth && (
                <>
                    {Array.from({ length: numberOfLines }).map((_, ind) => {
                        if (ind === numberOfLines - 1 && lastLineItemCount !== 0) {
                            return (
                                <MultilineContainer key={`multiline-container-${ind}`}>
                                    <JobContainer>
                                        {Array.from({
                                            length: lastLineItemCount - 1,
                                        }).map((_, i) => {
                                            const index = jobCounter + 1 + i
                                            const job = jobs[index]
                                            const isLastJobIndex = !(--lastJobIndex[job])
                                            return (
                                                <Job
                                                    key={`gc-job-lastline${i}`} className="flex-center"
                                                    style={{ backgroundColor: isLastJobIndex ? "#00ff00" : "" }}
                                                >
                                                    {job == -1 ? "" : `P${job}`}
                                                </Job>
                                            )
                                        })}
                                    </JobContainer>
                                    <TimeContainer>
                                        {Array.from({
                                            length: lastLineItemCount,
                                        }).map((_, i) => (
                                            <Time
                                                key={`gc-time-lastline${i}`}
                                                className="flex-center"
                                            >
                                                {time[timeCounter + i]}
                                            </Time>
                                        ))}
                                    </TimeContainer>
                                </MultilineContainer>
                            );
                        } else if (ind == 0) {
                            timeCounter += maxTimeItemCount - 1;
                            jobCounter += timeCounter - 1;
                            return (
                                <MultilineContainer key={`multiline-container-${ind}`}>
                                    <JobContainer>
                                        {Array.from({ length: jobCounter + 1 }).map((_, i) => {
                                            const job = jobs[i]
                                            const isLastJobIndex = !(--lastJobIndex[job])
                                            return (
                                                <Job
                                                    key={`gc-job-firstline${i}`} className="flex-center"
                                                    style={{ backgroundColor: isLastJobIndex ? "#00ff00" : "" }}
                                                >
                                                    {job == -1 ? "" : `P${job}`}
                                                </Job>
                                            )
                                        })}
                                    </JobContainer>
                                    <TimeContainer>
                                        {Array.from({ length: timeCounter + ind + 1 }).map(
                                            (_, i) => (
                                                <Time
                                                    key={`gc-time-firstline${i}`}
                                                    className="flex-center"
                                                >
                                                    {time[i]}
                                                </Time>
                                            )
                                        )}
                                    </TimeContainer>
                                </MultilineContainer>
                            );
                        } else {
                            let prevCounter = timeCounter;
                            timeCounter += maxTimeItemCount - 1;
                            let prevJobCounter = jobCounter;
                            jobCounter += maxTimeItemCount - 1;
                            return (
                                <MultilineContainer key={`multiline-container-${ind}`}>
                                    <JobContainer>
                                        {Array.from({ length: maxTimeItemCount - 1 }).map(
                                            (_, i) => {
                                                const index = prevJobCounter + i + 1
                                                const job = jobs[index]
                                                const isLastJobIndex = !(--lastJobIndex[job])
                                                return (
                                                    <Job
                                                        key={`gc-job-${i}-${ind}`} className="flex-center"
                                                        style={{ backgroundColor: isLastJobIndex ? "#00ff00" : "" }}
                                                    >
                                                        {job == -1 ? "" : `P${job}`}
                                                    </Job>
                                                )
                                            }
                                        )}
                                    </JobContainer>
                                    <TimeContainer>
                                        {Array.from({ length: maxTimeItemCount }).map((_, i) => (
                                            <Time key={`gc-time-${i}-${ind}`} className="flex-center">
                                                {time[prevCounter + i]}
                                            </Time>
                                        ))}
                                    </TimeContainer>
                                </MultilineContainer>
                            );
                        }
                    })}
                </>
            )
            }
            {
                containerWidth !== null && containerWidth > timeContainerWidth && (
                    <>
                        <JobContainer>
                            {jobs.map((job, index) => {
                                const isLastJobIndex = !(--lastJobIndex[job])
                                return (
                                    <Job key={`gc-job-${index}`} className="flex-center"
                                        style={{ backgroundColor: isLastJobIndex ? "#00ff00" : "" }}
                                    >
                                        {job == -1 ? "" : `P${job}`}
                                    </Job>
                                )
                            })}
                        </JobContainer>
                        <TimeContainer>
                            {time.map((time, index) => (
                                <Time key={`gc-time-${index}`} className="flex-center">
                                    {time}
                                </Time>
                            ))}
                        </TimeContainer>
                    </>
                )
            }
        </Container >
    );
};

export default GanttChart;
