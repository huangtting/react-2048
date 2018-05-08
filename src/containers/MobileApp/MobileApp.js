import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'underscore';
import Board from '../../components/Board';
import WrapperButton from '../../components/WrapperButton';
import GameoverBlock from '../../components/GameoverBlock';
import Scores from '../../components/Scores';
// eslint-disable-next-line
import styles from './MobileApp.scss';
import resetSvg from '../../assets/svg/reset.svg';
import swipeDetect from '../../utils/mobileEvent';

// 移动端端的展示组件
export default class MobileApp extends React.Component{
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

    componentDidMount(){
        swipeDetect(this.gameBoard,this.directionCallback);
    }

    directionCallback= dir=>{
        switch (dir) {
            case 'up':
              this.handleMoveUp();
              break;
            case 'down':
              this.handleMoveDown();
              break;
            case 'left':
              this.handleMoveLeft();
              break;
            case 'right':
              this.handleMoveRight();
              break;
            default:
              break;
        }
    }

    render(){
        const {matrix,gameover,onReset,bestScore,score}=this.props;
        return (
            <div className='mobile-app'>
                <div className='head'>
                    <h1 className='title'>2048</h1>
                    <Scores bestScore={bestScore} score={score} />
                </div>
                <WrapperButton onClick={onReset} class='btn'>
                    <img src={resetSvg} alt="reset" />
                </WrapperButton>
                <div className='board' ref={div => this.gameBoard = div }>
                        
                    <Board matrix={matrix}/>
                </div>
                <GameoverBlock gameover={gameover} reset={onReset}/>
                
           </div>
            
        );
    }
}