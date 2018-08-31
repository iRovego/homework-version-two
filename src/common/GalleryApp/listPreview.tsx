import * as React from 'react';
import { Button, Glyph } from 'elemental';
import Preview from './preview';

import styles from './style.less';

export interface IProps {
    sourceList,
    setActiveImage,
    numberItems
}
export interface IState {
    lastImage: number,
    sourceList: object,
    setActiveImage: Function,
    numberItems: number,
    itemsActive: object
}

class ListPreview extends React.Component<IProps, IState> {
    constructor(props: IState) {
		super(props);
		this.state = {
            lastImage: this.props.numberItems,
            sourceList: this.props.sourceList,
            setActiveImage: this.props.setActiveImage,
            numberItems: this.props.numberItems,
            itemsActive: this.createListPreview(
                this.props.sourceList, 
                this.props.numberItems, 
                this.props.numberItems
            )
		};

        this.next = this.next.bind(this);
        this.back = this.back.bind(this);
    }

    //прокрутка ленты вправо
    private next = () => {
		this.setState((prevState) => {
            return {
                lastImage: prevState.lastImage + 1,
                itemsActive: this.createListPreview(
                    this.props.sourceList, 
                    prevState.lastImage + 1, 
                    this.props.numberItems
                )
            }
        })
    }
    
    //прокрутка ленты влево
    private back = () => {
		this.setState((prevState) => {
            return {
                lastImage: prevState.lastImage - 1,
                itemsActive: this.createListPreview(
                    this.props.sourceList, 
                    prevState.lastImage - 1, 
                    this.props.numberItems
                )
            }
        })
    }
    
    //функция для создания списока миниатюр, которые будем отображать
    private createListPreview = (sourceList, lastImage, numberItems) => {
        let listPreview = new Array,
            length = sourceList.length;

        //вывод полученного списка если миниатюр меньше, чем можно сразу отобразить на экране
        if (length <= numberItems) {     
            sourceList.forEach((source, index) => (
                listPreview.push(
                    <Preview 
                        image={source} 
                        key={index} 
                        number={index} 
                        setActiveImage={this.props.setActiveImage}
                    />
                ) 
            ))

            return listPreview;
        }

        //устанавливаем lastImage значение, которое было при первом запуске
        //(используется для бесконечной прокрутки ленты превью вправо)
        if (lastImage - length == numberItems) {
            lastImage = numberItems;
            this.setState({lastImage: numberItems})
        }

        //устанавливаем lastImage значение
        //(используется для бесконечной прокрутки ленты превью влево)
        if (lastImage == -1) {
            lastImage = length-1;
            this.setState({lastImage: length-1})
        }

        //формируем список при прокрутке вправо (изображения отображаются по порядку)
        if (lastImage <= length && lastImage >= numberItems) {
            for (let i = lastImage - numberItems; i < lastImage; i++) {
                listPreview.push(
                    <Preview 
                        image={sourceList[i]} 
                        key={i} 
                        number={i} 
                        setActiveImage={this.props.setActiveImage}
                    />
                )            
            }
        }
        
        //формируем список при прокрутке вправо (изображения из начала и конца списка)
        if ((lastImage > length) && (lastImage - length) <= numberItems) {
            for (let i = lastImage - numberItems; i < length; i++) {
                listPreview.push(
                    <Preview 
                        image={sourceList[i]} 
                        key={i} 
                        number={i} 
                        setActiveImage={this.props.setActiveImage}
                    />
                )            
            }
            for (let i = 0; i < lastImage - length; i++) {
                listPreview.push(
                    <Preview 
                        image={sourceList[i]} 
                        key={i} 
                        number={i} 
                        setActiveImage={this.props.setActiveImage}
                    />
                )            
            }
        }

        //формируем список при прокрутке влево
        if ((lastImage < numberItems) && (lastImage + numberItems) >= 0 && lastImage >= 0) {
            for (let i = length - 1; i > length - 1 + (lastImage - numberItems); i--) {
                listPreview.push(
                    <Preview 
                        image={sourceList[i]} 
                        key={i} 
                        number={i} 
                        setActiveImage={this.props.setActiveImage}
                    />
                )          
            }
            listPreview.reverse();
            for (let i = 0; i < numberItems - (numberItems - lastImage); i++) {
                listPreview.push(
                    <Preview 
                        image={sourceList[i]} 
                        key={i} 
                        number={i} 
                        setActiveImage={this.props.setActiveImage}
                    />
                )            
            }
        
        }

        return listPreview;
    }
    
	public render() {

        let itemsActive = this.state.itemsActive;        

		return (
			<div className={styles.navigation}>
                <div className={styles.left}>
                    <Button onClick={() => {this.back()}} ><Glyph icon="triangle-left" /></Button>
                </div>
                <div className={styles.reel}>
                    <div className={styles.reel_inner}>                        
                        {itemsActive}
                    </div>
                </div>
                <div className={styles.right}>
                    <Button onClick={() => {this.next()}} ><Glyph icon="triangle-right" /></Button>
                </div>
            </div>
		);
	}
}

export default ListPreview;