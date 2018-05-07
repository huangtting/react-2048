// Actions
const INIT = 'INIT';
const PLACE_RANDOM = 'PLACE_RANDOM';
const MOVE_UP = 'MOVE_UP';
const MOVE_DOWN = 'MOVE_DOWN';
const MOVE_LEFT = 'MOVE_LEFT';
const MOVE_RIGHT = 'MOVE_RIGHT';
const RESET = 'RESET';

const initState={
    matrix:[[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    gameOver:false,
    score: 0,
    bestScore: 0,
    gameOver: false,
   
}

class Matrix{
    constructor({matrix,gameOver,score,bestScore}){
        // this.matrix = matrix;
        this.matrix=JSON.parse(JSON.stringify(matrix));
        this.gameOver=gameOver;
        this.score=score;
        this.bestScore=bestScore;
        
    }
    getEmptyCoordinates = ()=>{
        const {matrix} = this;
        const coordinates = [];

        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
              const val = matrix[row][col];
              if (val === 0) {
                coordinates.push([row, col]);
              }
            }
          }
        return coordinates;
    }
// Math.random返回 [0,1)的随机数,getRandom返回arr数组中的一个随机数
    getRandom= (arr) => {
        let index=Math.round(Math.random()*(arr.length-1));
        return arr[index];
    }
    isBoardMoved = (preMatrix,newMatrix) =>{
        return JSON.stringify(preMatrix)!==JSON.stringify(newMatrix);
    }

    addRandomNum = ()=>{
        const {matrix} =this;
        const newMatrix = JSON.parse(JSON.stringify(matrix));

        if(this.gameOver) return { matrix };

        const emptyCoordinates=this.getEmptyCoordinates();
        if(emptyCoordinates.length===0) {
            if(this.checkGameOver(newMatrix)){
                this.gameOver=true;
                return {gameOver:true}
            }
            return {matrix}
        }

        let cor= this.getRandom(emptyCoordinates);
       
        newMatrix[cor[0]][cor[1]] = this.getRandom([2,4]);
       
        if (this.checkGameOver(newMatrix)) {
            this.gameOver = true;
            return { gameOver: true, matrix: newMatrix };
        }

        this.matrix =newMatrix;
        // 不能直接修改state，而是返回一个新的对象
        return {matrix : newMatrix}
    }

    rotateRight = ()=>{
        const {matrix} = this;
        let newMatrix=[];
        const len=matrix.length;
        for(let col=0;col<len;col++)
        {
            const newRow=[];
            for(let row=len-1;row>=0;row--)
            {
                newRow.push(matrix[row][col]);
            }
            newMatrix.push(newRow);
        }
        
        this.matrix= newMatrix;
        return newMatrix;
    }

    rotateLeft = ()=>{
        const {matrix} = this;
        let newMatrix = [];
        const len=matrix.length;

        for(let col=len-1;col>=0;col--){
            const newRow=[];
            for(let row=0;row<len;row++)
            {
                newRow.push(matrix[row][col]);
            }
            newMatrix.push(newRow);
        }
        this.matrix=newMatrix;
        return newMatrix;
    }

    shiftRight = () => {
        const { matrix } = this;
        let newMatrix = [];
        const len = matrix.length;
    
        // Shift all numbers to the right
        for (let row = 0; row < len; row++) {
          const newRow = [];
          for (let col = 0; col < len; col++) {
            let current = matrix[row][col];
            if (current === 0) newRow.unshift(current);
            else newRow.push(current);
          }
          newMatrix.push(newRow);
        }
        this.matrix = newMatrix;
        return newMatrix;
      };
    
      shiftLeft = () => {
        const { matrix } = this;
        const newMatrix = [];
        const len = matrix.length;
        for (let r = 0; r < len; r++) {
          let newRow = [];
          for (let c = matrix[r].length - 1; c >= 0; c--) {
            const current = matrix[r][c];
            if (current === 0) newRow.push(current);
            else newRow.unshift(current);
          }
          newMatrix.push(newRow);
        }
        this.matrix = newMatrix;
        return newMatrix;
      };

    combineNumToLeft = () => {
        const { matrix } = this;
        const len = matrix.length;
    
        for (let row = 0; row < len; row++) {
          for (let col = 0; col < len-1 ; col++) {
            if (matrix[row][col] > 0 && matrix[row][col] === matrix[row][col + 1]) {
              matrix[row][col] *= 2;
              matrix[row][col + 1] = 0;
              this.score += matrix[row][col];
            } 
          }
        }

        this.matrix = matrix;
        this.shiftLeft();
        return matrix;
      };

    combineNumToRight = () => {
        const { matrix } = this;
        const len = matrix.length;
        // Combine numbers and shift to right
        for (let row = 0; row < len; row++) {
          for (let col = len - 1; col >= 1; col--) {
            if (matrix[row][col] > 0 && matrix[row][col] === matrix[row][col - 1]) {
              matrix[row][col] *= 2;
              matrix[row][col - 1] = 0;
              this.score += matrix[row][col];
            } 
          }
        }

        this.matrix = matrix;
        this.shiftRight();
        return matrix;
      };




    checkGameOver=matrix=>{
        const copy=JSON.parse(JSON.stringify(matrix));
        const check = func =>{
            this.matrix=copy;     
            let isMoved=this.isBoardMoved(copy,func().matrix);
            this.matrix=copy;
            return isMoved;
        }
        const moves=[
            check(this.moveUp),
            check(this.moveDown),
            check(this.moveLeft),
            check(this.moveRight),
        ]
        return !moves.includes(true);
    }

    move= func =>{
        const prevMatrix = JSON.parse(JSON.stringify(this.matrix));
        func();
        // console.log(prevMatrix,this.matrix);
        const { matrix, score, bestScore } = this;
        
        const rsp = {
          matrix,
          score,
          bestScore: score > bestScore ? score : bestScore,
         
        };
        // console.log(rsp);
        return rsp;
    }

    moveUp=()=>{
        return this.move(()=>{
            this.rotateRight();
            this.shiftRight();
            this.combineNumToRight();
            this.rotateLeft();
        })
    }

    moveDown = ()=>{
        return this.move(()=>{
            this.rotateRight();
            this.shiftLeft();
            this.combineNumToLeft();
            this.rotateLeft();
        })
    }

    moveLeft = ()=>{
        return this.move(()=>{
            this.shiftLeft();
            this.combineNumToLeft();
        })
    }

    moveRight = ()=>{
        return this.move(()=>{
            this.shiftRight();
            this.combineNumToRight();
        })
    }
}

export default function (state=initState,action){
    let mat= new Matrix(state);
    switch (action.type) {
        case INIT: {
          if (action.board) {
            return { ...state, ...action.board };
          }
          mat.addRandomNum();
          const result = mat.addRandomNum();
    //  覆盖掉原来的matrix
          return { ...state, ...result };
        }
        case PLACE_RANDOM: {
          const result = mat.addRandomNum();
          return { ...state, ...result };
        }
        case MOVE_UP: {
          const result = mat.moveUp();
          return { ...state, ...result };
        }
        case MOVE_DOWN: {
          const result = mat.moveDown();
        //   console.log(result);
          return { ...state, ...result };
        }
        case MOVE_LEFT: {
          const result = mat.moveLeft();
          return { ...state, ...result };
        }
        case MOVE_RIGHT: {
          const result = mat.moveRight();
          return { ...state, ...result };
        }
        case RESET:{
            const copy = JSON.parse(JSON.stringify(initState));
            mat = new Matrix(copy);
            mat.addRandomNum();
            const result = mat.addRandomNum();
            return { ...copy, ...result,bestScore: state.bestScore };
        }
        default: {
          return state;
        }
    }
}
// Action creators
export const initMatrix = board =>({
    type:INIT,
    board
})

const actionCreator = type =>()=>({
    type
});

export const placeRandom = actionCreator(PLACE_RANDOM);
export const moveUp = actionCreator(MOVE_UP);
export const moveDown = actionCreator(MOVE_DOWN);
export const moveLeft = actionCreator(MOVE_LEFT);
export const moveRight = actionCreator(MOVE_RIGHT);
export const reset = actionCreator(RESET);