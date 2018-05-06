import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './gameoverBlock.scss';
import resetSvg from '../../assets/svg/reset.svg'


export default class GameOverBlock extends React.Component{
    
    render() {
        const {props :{gameover,reset} } =this;
        return (
            <div className={classnames({'hidden':!gameover})}>
                <div className='overlay'></div>
                <div className={classnames('center','modal')}>
                <div>
                    <div className='gameover'>
                    <div className='text'>test </div>
                    <div className='banner'>
                        <p>游戏结束</p>
                    </div>
                    </div>
                    <div className='buttonWrapper'>
                        <button className='button' onClick={reset}>
                            <img src={resetSvg} alt="reset" />
                        </button>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

GameOverBlock.propTypes = {
    gameover: PropTypes.bool,
    onReset: PropTypes.func
  };