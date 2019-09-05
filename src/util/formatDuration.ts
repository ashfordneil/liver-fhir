// Helper function that returns the division and modulo
const divMod = (a: number, b: number): [number, number] => {
    return [Math.floor(a / b), a % b];
}

const padNum = (num: number): string => {
    const str = "00" + num;
    return str.substr(str.length - 2);
}

const formatDuration = (durationInSeconds: number) => {
    const [totalMinutes, seconds] = divMod(durationInSeconds, 60);
    const [hours, minutes] = divMod(totalMinutes, 60);

    return [hours, minutes, seconds].map(padNum).join(":");
}

export default formatDuration;