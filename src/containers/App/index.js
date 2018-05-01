import {connect} from 'react-redux';
import App from './App';

const mapStateToProps = state =>{
    console.log(state.board.matrix);
    return {
        matrix: state.board.matrix
    }
    
}

export default connect(mapStateToProps)(App);