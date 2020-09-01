import React from 'react'

export default class Spinner extends React.Component {
    render() {
        return (
			<div className="Spinner SpinnerDots">
				<div className="spinner-dot" />
				<div className="spinner-dot" />
				<div className="spinner-dot" />
			</div>
		);
    }
}
