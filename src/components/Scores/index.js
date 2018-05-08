import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import styles from './scores.scss';

export default function Scores({ score, bestScore }) {
 
  return (
    <div className='index'>
      <p className='score'>
        Score
        <em className='text'>{score}</em>
      </p>
      <p className='score best'>
        Best
        <em className='text'>{bestScore}</em>
      </p>
    </div>
  );
}

Scores.propTypes = {
  score: PropTypes.number.isRequired,
  bestScore: PropTypes.number.isRequired
};
