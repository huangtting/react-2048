import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'underscore';
import Board from '../../components/Board';
import WrapperButton from '../../components/WrapperButton';
import GameoverBlock from '../../components/GameoverBlock';
import Scores from '../../components/Scores';
import styles from './WebApp.scss';
import resetSvg from '../../assets/svg/reset.svg';

const keyUp = 38;
const keyRight = 39;
const keyDown = 40;
const keyLeft = 37;
const keyW = 87;
const keyS = 83;
const keyA = 65;
const keyD = 68;
const keyN = 78;

// Web端的展示组件
export default class WebApp extends React.Component{
    static propTypes={
        matrix:PropTypes.arrayOf(PropTypes.array).isRequired,
        onMoveUp: PropTypes.func.isRequired,
        onMoveDown: PropTypes.func.isRequired,
        onMoveLeft: PropTypes.func.isRequired,
        onMoveRight: PropTypes.func.isRequired,
        onPlaceRandom: PropTypes.func.isRequired,
        score: PropTypes.number,
        bestScore: PropTypes.number,
        gameover: PropTypes.bool,
        onReset :PropTypes.func.isRequired
    }

    static defaultProps ={
        score: 0,
        bestScore: 0,
        gameOver: false,
        onReset() {}
    }
    constructor(...args){
        super(...args);
        this.keyUpHandler=this.handleKeyUp;
        // this.keyUpHandler = debounce(this.handleKeyUp,1000);
        // console.log(this.keyUpHandler);
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
    handleKeyUp = e => {
        switch (e.keyCode) {
          case keyW:
          case keyUp:
            this.handleMoveUp();
            break;
          case keyS:
          case keyDown:
            this.handleMoveDown();
            break;
          case keyA:
          case keyLeft:
            this.handleMoveLeft();
            break;
          case keyD:
          case keyRight:
            this.handleMoveRight();
            break;
          case keyN:
            this.props.onReset();
            break;
          default:
            break;
        }
    };

    generalMove = func =>{
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

    render(){
        const {matrix,gameover,onReset,bestScore,score}=this.props;

        return (
            <div className='app'>
                <div className='box'>
                    <div className='board'>
                        <h1 className='title'>2048</h1>
                        <Board matrix={matrix}/>
                    </div>
                    <div className='panel'>
                        <div>
                            <Scores bestScore={bestScore} score={score} />
                            <WrapperButton onClick={onReset} >
                                <img src={resetSvg} alt="reset" />
                            </WrapperButton>
                        </div>
                       
                    </div>
                </div>
                <GameoverBlock gameover={gameover} reset={onReset}/>
            </div>
           
            
        );
    }
}