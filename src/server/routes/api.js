import { Router } from 'express';
import { flatMap, shuffle } from 'lodash';
import passport from 'passport';
import Decks from '../models/decks';

const router = new Router();

router.route('/api/decks')
  .get((req, res) => {
    Decks.find({}).then((decks) => {
      res
        .status(200)
        .type('json')
        .json(decks);
    });
  });

router.route('/api/decks/:deckId')
  .get((req, res) => {
    Decks.find({}).then((decks) => {
      const deck = decks[req.params.deckId - 1];
      res
        .status(200)
        .type('json')
        .json(deck);
    });
  });

router.route('/api/review')
  .get((req, res) => {
    Decks.find({}).then((decks) => {
      const cards = flatMap(decks, deck => deck.cards);

      // unefined _id indicates review deck
      const deck = {
        name: 'Review',
        cards: shuffle(cards),
      };

      res
        .status(200)
        .type('json')
        .json(deck);
    });
  });

router.route('/api/login')
  .post(
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
    })
  );

export default router;
