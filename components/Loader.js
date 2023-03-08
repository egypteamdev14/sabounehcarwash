import React from "react";
import { Spinner } from "react-bootstrap";

export const Loader = () => {
	return (
		<>
			<div className="flex items-center justify-items-center w-[50vw] h-[100vh]">
				{/* <Spinner animation="grow" /> */}
				<div dir="auto" className="custom-loader-animation">
					<span>S</span>
					<span>A</span>
					<span>B</span>
					<span>O</span>
					<span>U</span>
					<span>N</span>
					<span>e</span>
					<span>H</span>
					<span>C</span>
					<span>A</span>
					<span>R</span>
					<span>.</span>
					<span>.</span>
					<span>.</span>
					<span>.</span>

				</div>
			</div>
		</>
	);
};