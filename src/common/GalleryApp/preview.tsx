import * as React from 'react';

import styles from './style.less';

export interface IProps {
    image,
    number,
    setActiveImage
}
export interface IState {  }

class Preview extends React.Component<IProps, IState> {
	public render() {
        let {image, number, setActiveImage} = this.props;
        
		return (
			<img
                src={image}
                width="120"
                height="90"
                className={styles.preview}
                onClick={() => {setActiveImage(number)}}
            />
		);
	}
}

export default Preview;