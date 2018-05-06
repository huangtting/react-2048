import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'underscore';

import WrapperButton from '../../components/WrapperButton';
import Speaker from '../../components/Speaker';
import styles from './controlPanel.scss';
import resetSvg from '../../assets/svg/reset.svg';
import undoSvg from '../../assets/svg/undo.svg';

const keyUp = 38;
const keyRight = 39;
const keyDown = 40;
const keyLeft = 37;
const keyW = 87;
const keyS = 83;
const keyA = 65;
const keyD = 68;
const keyN = 78;

export default class controlPanel extends Component{
    static propTypes = {
        onMoveUp: PropTypes.func.isRequired,
        onMoveDown: PropTypes.func.isRequired,
        onMoveLeft: PropTypes.func.isRequired,
        onMoveRight: PropTypes.func.isRequired,
        onPlaceRandom: PropTypes.func.isRequired,
        onReset: PropTypes.func.isRequired
      };
    
    constructor(...args){
        super(...args);

        this.keyUpHandler = debounce(this.handleKeyUp,1000);
    }

    componentWillMount(){
        // 第三个参数useCapture，true在捕获阶段触发，false在冒泡阶段触发（默认）
        // 在keyup的时候触发
        document.addEventListener('keyup',this.keyUpHandler,false);

        // 阻止方向键滚动页面
        document.addEventListener('keydown', this.keyDownHandler, false);
    }

    componentWillUnmount() {
        // Never forget remove event after component unmounted,
        // 防止内存泄漏
        document.removeEventListener('keyup', this.keyUpHandler, false);
        document.removeEventListener('keydown', this.keyDownHandler, false);
    }

    keyDownHandler = e =>{
        switch (e.keyCode) {
            case keyUp:
            case keyDown:
            case keyLeft:
            case keyRight:
              // case keySpace:
              e.preventDefault();
              break;
            default:
              break;
        }
    }
    // keyUpHandler= e=>{
    //     switch(e.keyCode){
    //         case keyW:
    //         case keyUp:
                
    //     }
    // }

    gerneralMove = func =>{
        func();
        setTimeout(()=>{
            this.props.onPlaceRandom();
        },300);
    }

    handleMoveUp = () => {
        this.generalMove(this.props.onMoveUp);
    };
    
    handleMoveDown = () => {
        this.generalMove(this.props.onMoveDown);
    };
    
    handleMoveLeft = () => {
        this.generalMove(this.props.onMoveLeft);
    };
    
    handleMoveRight = () => {
        this.generalMove(this.props.onMoveRight);
    };

    render
}