import React from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames'

// eslint-disable-next-line
import styles from './cell.scss'
import {isObjEqual} from '../../utils/helpers'

export default class Cell extends React.Component{
    static propTypes ={
        value:PropTypes.number.isRequired
    };

    shouldComponentUpdate(nextProps,nextState){
        return (
            !isObjEqual(nextProps, this.props) || !isObjEqual(nextState, this.state)
        )
    }

    render(){
        // value是一个数字
        const {props:{value}} =this;
       
        const color = `color-${value}`;
       
// 传入动态class,{[color]:!!value}
        return (
            <td>
                
                <div
                    className={classnames('cell',{[color]:!!value})}
                >
                    <div className='number'>{value|| null}</div>
                </div>
            </td>
        )
    }
}