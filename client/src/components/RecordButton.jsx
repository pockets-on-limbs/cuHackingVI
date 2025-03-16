// Credit: https://gist.github.com/cassidoo/dd1190c248d60c723de14fe9ee32f450

import { useState, useEffect, useRef } from "react";
import axios from "axios";

function RecordButton({songid}) {
	const [isRecording, setIsRecording] = useState(false);
	const [audioStream, setAudioStream] = useState(null);
	const [mediaRecorder, setMediaRecorder] = useState(null);
	const [audioBlob, setAudioBlob] = useState(null);
	const [recordingTime, setRecordingTime] = useState(0);
	const timerRef = useRef(null);
	const RECORDING_MAX_DURATION = 240; // 4 minutes in seconds

	useEffect(() => {
		if (!audioStream) {
			navigator.mediaDevices
				.getUserMedia({ audio: true })
				.then((stream) => {
					setAudioStream(stream);
					const mediaRecorder = new MediaRecorder(stream);
					setMediaRecorder(mediaRecorder);
					let audio;

					mediaRecorder.ondataavailable = (event) => {
						if (event.data.size > 0) {
							audio = [event.data];
						}
					};

					mediaRecorder.onstop = (event) => {
						const b = new Blob(audio, { type: "audio/wav" });
						setAudioBlob(b);
						console.log("audioBlob", b);
					};
				})
				.catch((error) => {
					console.error("Error accessing microphone:", error);
				});
		}

		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		};
	}, [audioStream]);

	const handleToggleRecording = (event) => {
		event.preventDefault();
		if (isRecording) {
			stopRecording();
		} else {
			startRecording();
		}
	};

	const startRecording = () => {
		mediaRecorder.start();
		setIsRecording(true);
		setRecordingTime(0);
		setAudioBlob(null);
		timerRef.current = setInterval(() => {
			setRecordingTime((prevTime) => {
				if (prevTime >= RECORDING_MAX_DURATION - 1) {
					stopRecording();
					return RECORDING_MAX_DURATION;
				}
				return prevTime + 1;
			});
		}, 1000);
	};

	const stopRecording = () => {
		mediaRecorder.stop();
		setIsRecording(false);
		if (timerRef.current) {
			clearInterval(timerRef.current);
		}
	};

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;

		return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
	};

	const handleUpload = async () => {
		if (audioBlob) {
				const formData = new FormData();
				formData.append("file", audioBlob, "recording.wav");

				try {
						const response = await axios.put(`http://localhost:8080/gemini/${songid}`, formData, {
								headers: {
										"Content-Type": "multipart/form-data",
								},
						});
						console.log("File uploaded successfully:", response.data);
						alert("Thank you! The DJ has received your feedback about the song.");
				} catch (error) {
						console.error("Error uploading file:", error);
				}
		}
};

	return (
		<div>
			<button
				onClick={handleToggleRecording}
				className={`bg-red-400 hover:opacity-80 text-white font-bold py-2 px-4 rounded`}
			>
				{isRecording ? (
					<>
						<span className={`mr-3 ${isRecording && "animate-pulse"}`}>●</span>{" "}
						Stop Recording
					</>
				) : audioBlob ? (
					"Redo recording"
				) : (
					"Start Recording"
				)}
			</button>
			<div>
				{isRecording && (
					<div>
						<p className="description">Recording...</p>
						<p className="description">Time: {formatTime(recordingTime)}</p>
					</div>
				)}
			</div>
			{audioBlob && (
				<>
					<div className="description">Preview recording before submitting:</div>
					<div className="soundbar">
						<audio controls>
							<source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
						</audio>
						<button onClick={handleUpload} className="bg-blue-400 hover:opacity-80 text-white font-bold py-2 px-4 rounded mt-2">
								Upload Recording
						</button>
					</div>
				</>
			)}
		</div>
	);
}

export default RecordButton;