# blackjack
An interactive blackjack game made for Lyft's apprenticeship application

#How to download
1. Clone the repo onto your local machine
2. Within the repo's directory, type "npm install" into your console and hit enter
3. Go to localhost:3000
4. You will be taken to a pink screen with the word "BlackJack" on it

#Objective
The objective of the game is to get 21 or get as close to 21 without going over. If your score totals 21 or is higher than the computer's,
you win!

#How to play
1. Enter your name to start the application 
2. From the welcome screen, click "Start Game"
3. You will be presented with 2 cards. If you have an Ace, a pop-up window will allow you to select whether you want the Ace to
equal 1 or 11. You can change this at a later time with every new card you receive. 
4. If you want additional cards, click "Hit", or if you don't want to press your luck, click stay
5. The computer will then take additional cards and determine whether you win, lost, or tie! 

#Additional Functionality
1. There is an additional endpoint, /test, that will return the sum of keys, x and y. 

example:
  {x: 5, y: 10} will return {sum: 15}
