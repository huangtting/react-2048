import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import styles from './WebApp.scss';
import Board from '../../components/Board';

// Web端的展示组件
export default class WebApp extends React.Component{
    static propTypes={
        matrix:PropTypes.arrayOf(PropTypes.array).isRequired

    }
    render(){
        // matrix作为props传入
        const {matrix}=this.props;
        return (
            <div className='board'>
                <h1 className='title'>2048</h1>
                <Board matrix={matrix}/>
            </div>
            
        );
    }
}