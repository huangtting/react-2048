import React from 'react'
import PropTypes from 'prop-types'
import Cell from '../Cell'
import { isObjEqual } from '../../utils/helpers';

export default class Row extends React.Component{
    static propTypes={
        row:PropTypes.arrayOf(PropTypes.number).isRequired
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
          !isObjEqual(nextProps, this.props) || !isObjEqual(nextState, this.state)
        );
    }

    render(){
        const {props:{row}} =this;

        return (
            <tr>
                {row.map((num,index)=><Cell value={num} key={index}/>)}
            </tr>
        )

    }
}
