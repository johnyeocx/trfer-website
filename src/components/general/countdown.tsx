import React, { useEffect, useState } from "react";

type CountdownProps = {
	targetDate: Date;
	onFinished: () => void;
};
function Countdown({ targetDate, onFinished }: CountdownProps) {
	const [remainingTime, setRemainingTime] = useState<number>(
		targetDate.getTime() - new Date().getTime()
	);

	useEffect(() => {
		const intervalId = setInterval(() => {
			const newTime = targetDate.getTime() - new Date().getTime();

			setRemainingTime(newTime);
			if (+formatTime(newTime) === 0) {
				clearInterval(intervalId);
				onFinished();
			}
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, [targetDate]);

	const formatTime = (time: number): string => {
		const hours = Math.floor(time / (1000 * 60 * 60));
		const minutes = Math.floor((time / (1000 * 60)) % 60);
		const seconds = Math.floor((time / 1000) % 60);

		return `${seconds.toString().padStart(1, "0")}`;
	};

	return <>{formatTime(remainingTime)}s</>;
}

export default Countdown;
