import {connect} from 'react-redux';
import WebApp from './WebApp'
import {
    moveUp,
    moveDown,
    moveLeft,
    moveRight,
    placeRandom,
    reset
  } from '../../reducers/board';

// 从state中得到matrix
const mapStateToProps = state =>({
    matrix: state.board.matrix,
    gameover:state.board.gameOver,
    bestScore: state.board.bestScore,
    score: state.board.score
})

const mapDispatchToProps = {
    onPlaceRandom: placeRandom,
    onMoveUp: moveUp,
    onMoveDown: moveDown,
    onMoveLeft: moveLeft,
    onMoveRight: moveRight,
    onReset: reset
}


// 返回WebApp的一个包装组件，mapStateToProps会订阅 Store
// 每当state更新的时候（不是组件的state）
// 就会自动执行mapStateToProps，将执行的结果props传入传递给被包裹的 WebApp 组件
export default connect(mapStateToProps,mapDispatchToProps)(WebApp);