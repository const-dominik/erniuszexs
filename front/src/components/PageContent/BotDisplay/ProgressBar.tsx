import styled from "styled-components";

export interface IProgressBarProps {
    minValue: number;
    maxValue: number;
    currentValue: number;
    type: 'ttl' | 'hp' | 'exp';
}

interface StyledProgressBarValueProps {
    width: string;
    color: string;
}

const getPercentage = (minValue: number, maxValue: number, currentValue: number) => {
    return (currentValue - minValue) / (maxValue - minValue) * 100;
};

const getColor = (type: 'ttl' | 'hp' | 'exp') => {
    switch (type) {
        case 'ttl':
            return '#2285f7';
        case 'hp':
            return 'red';
        case 'exp':
            return 'yellow';
    }
}

const StyledProgressBar = styled.div`
    box-sizing: content-box;
    width: 85%;
    height: 1rem;
    position: relative;
    border-radius: 25px;
    padding: 5px;
    background: #555;
    margin: 0.3rem 0;
    overflow: hidden;
`

const StyledProgressBarValue = styled.span`
    height: 100%;
    font-size: 0.7rem;
    display: block;
    width: ${(props: StyledProgressBarValueProps) => props.width };
    border-radius: 20px;
    background: ${(props: StyledProgressBarValueProps) => props.color };
    position: relative;
`;

const TextElement = styled.div`
    width: 100%;
    height: 100%;
    line-height: 1.6rem;
    font-weight: 600;
    font-size: 0.9rem;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
`

const ProgressBar = (props: IProgressBarProps) => {
    const percentage = getPercentage(props.minValue, props.maxValue, props.currentValue);
    const color = getColor(props.type);
    const width = percentage.toFixed(2) + "%";

    return (
    <StyledProgressBar title={`${props.currentValue}/${props.maxValue}`}>
            <TextElement>{props.type !== "ttl" ? width : props.currentValue}</TextElement>
        <StyledProgressBarValue width={width} color={color} />
    </StyledProgressBar>
  );
}

export default ProgressBar;