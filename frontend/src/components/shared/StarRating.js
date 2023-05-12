// frontend\src\components\shared\StarRating.js
import React from 'react';
import StarRatingComponent from 'react-rating-stars-component';
import './StarRating.css';

class StarRating extends React.Component {
  constructor() {
    super();

    this.state = {
      rating: 1
    };
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  render() {
    const { rating } = this.state;

    return (
      <div className="star-rating">
        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
          emptyStarColor="#D3D3D3"
          renderStarIcon={() => <span className="star-icon">&#9733;</span>}
        />
        <span className="star-label">{rating} stars</span>
      </div>
    );
  }
}

export default StarRating;
