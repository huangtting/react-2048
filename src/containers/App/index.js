import {connect} from 'react-redux';
import { initMatrix } from '../../reducers/board';
import App from './App';

const mapStateToProps = state =>{
    return {
        matrix: state.board.matrix
    }
}

const mapDispatchToProps = {
    onInit: initMatrix
};
  

export default connect(mapStateToProps,mapDispatchToProps)(App);