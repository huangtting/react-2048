import React from 'react';
import PropTypes from 'prop-types';
import WebApp from '../WebApp';
import MobileApp from '../MobileApp';
// Web和移动端的展示组件
export default class App extends React.Component{
    static propTypes = {
        matrix: PropTypes.arrayOf(PropTypes.array).isRequired,
        onInit: PropTypes.func.isRequired
    };

    constructor(...args){
        super(...args);

        this.state={
            isMobile:window.innerWidth<=760
        }
    }

    componentWillMount(){
        this.boardInit();
    }

    boardInit(){
        let isEmpty = true;
        for(let row of this.props.matrix)
        {
            for(let cell of row)
            {
                if(cell>0){
                    isEmpty=false;
                    break;
                }
            }
        }
        if (isEmpty) {
            this.props.onInit();
        }
    }

    render(){
        const {isMobile} = this.state;
        return (
            <div>
                {
                    isMobile?(<MobileApp/>):(<WebApp/>)
                }   
            </div>
            
        )
    }
}