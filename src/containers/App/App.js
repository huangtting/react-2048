import React from 'react';
import PropTypes from 'prop-types';
import WebApp from '../WebApp';
// Web和移动端的展示组件
export default class App extends React.Component{
    static propTypes = {
        matrix: PropTypes.arrayOf(PropTypes.array).isRequired,
       
    };

    constructor(...args){
        super(...args);

        this.state={
            isMobile:window.innerWidth<=760
        }
    }

    render(){
        return (
            <div>
                <WebApp/>
              
                
            </div>
            
        )
    }
}