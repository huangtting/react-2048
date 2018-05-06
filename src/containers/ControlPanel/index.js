import React, { Component } from 'react';
import PropTypes from 'prop-types';

import WrapperButton from '../../components/WrapperButton';
import Speaker from '../../components/Speaker';
import styles from './controlPanel.scss';
import resetSvg from '../../assets/svg/reset.svg';
import undoSvg from '../../assets/svg/undo.svg';

const keyUp = 38;
const keyRight = 39;
const keyDown = 40;
const keyLeft = 37;
const keyW = 87;
const keyS = 83;
const keyA = 65;
const keyD = 68;
const keyN = 78;

export default class ConstrolPanel extends Component{
    static propTypes = {
        onMoveUp: PropTypes.func.isRequired,
        onMoveDown: PropTypes.func.isRequired,
        onMoveLeft: PropTypes.func.isRequired,
        onMoveRight: PropTypes.func.isRequired,
        onPlaceRandom: PropTypes.func.isRequired,
        onReset: PropTypes.func.isRequired,
        onUndo: PropTypes.func.isRequired,
    
      };
}