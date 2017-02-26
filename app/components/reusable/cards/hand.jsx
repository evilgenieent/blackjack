import React, { PropTypes } from 'react';

import { sumCards } from '../../../utils/cards';

import Button from '../forms/button';
import Card from './card';

const Hand = ({
  cards,
  handlePlayerAction,
  isDealer,
  playerActionsEnabled,
}) => {
  const cardTotal = sumCards(cards);

  return (
    <div className="hand-container">
      {cards.length === 0 && isDealer &&
        <p className="hand-waiting">
          Waiting for hand to be dealt.<br />Set your bet and click deal...
        </p>
      }

      <div className="hand-cards">
        {cards.map((card, i) => (
          <div
            key={i}
            className="hand-card"
            style={{
              left: 20 * i,
            }}
          >
            <Card
              card={card}
              cardCovered={isDealer && playerActionsEnabled && i === 1}
            />
          </div>
        ))}
      </div>
      {cards.length > 0 && (!isDealer || !playerActionsEnabled) &&
        <div className="card-total">
          {cardTotal.low !== cardTotal.high
            ? `${cardTotal.low}/${cardTotal.high}`
            : cardTotal.low
          }
        </div>
      }

      {cards.length > 0 && !isDealer && playerActionsEnabled &&
        <div className="player-actions">
          <Button
            text="Hit"
            handleClick={() => handlePlayerAction('hit')}
            inverse={true}
          />
          <Button
            text="Stand"
            handleClick={() => handlePlayerAction('stand')}
            inverse={true}
          />
        </div>
      }
    </div>
  );
};

Hand.propTypes = {
  cards: PropTypes.array.isRequired,
  handlePlayerAction: PropTypes.func,
  isDealer: PropTypes.bool,
  playerActionsEnabled: PropTypes.bool,
};

Hand.defaultProps = {
  isDealer: false,
};

export default Hand;