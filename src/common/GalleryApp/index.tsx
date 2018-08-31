import * as React from 'react';
import ListPreview from './listPreview';

import styles from './style.less';

const SOURCE_LIST = [
	'https://placeimg.com/640/480/arch/1',
	'https://placeimg.com/640/480/arch/2',
	'https://placeimg.com/640/480/arch/3',
	'https://placeimg.com/640/480/arch/4',
	'https://placeimg.com/640/480/arch/5',
	'https://placeimg.com/640/480/arch/6',
	'https://placeimg.com/640/480/arch/7',
];

export interface IProps {  }
export interface IState { 
	activeImage: number,
	sourceList: object,
}

class Gallery extends React.Component<IProps, IState> {
	constructor(props: IState) {
		super(props);
		this.state = {
			activeImage: 0,
			sourceList: SOURCE_LIST
		};

		this.setActiveImage = this.setActiveImage.bind(this);
	}

	private setActiveImage = (number) => {
		this.setState({activeImage: number})
	}

	public render() {
		return (
			<div className={styles.wrapper}>
				<h1>Gallery App</h1>
				<div>
					<img
						width="640"
						height="480"
						src={this.state.sourceList[this.state.activeImage]}
					/>
				</div>
				<ListPreview 
					sourceList={this.state.sourceList} 
					setActiveImage={this.setActiveImage} 
					numberItems={4}
				/>
			</div>
		);
	}
}

export default Gallery;