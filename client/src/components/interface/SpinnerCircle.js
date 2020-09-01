import React from 'react'



export default class SpinnerCircle extends React.Component {
    render() {
        return (
			<div className="Spinner SpinnerCircle">
				<div className="spinner-dot" />
				<div className="spinner-dot" />
				<div className="spinner-dot" />
			</div>
		);
    }
}
