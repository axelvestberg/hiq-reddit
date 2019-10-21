import React from 'react'

const Spinner = () => {

	return (
		<div className="ui">
			<div className="ui active transition visible inverted dimmer">
				<div className="content">
					<div className="ui massive text loader">Loading</div>
				</div>
			</div>
		</div>
	);
}

export default Spinner;