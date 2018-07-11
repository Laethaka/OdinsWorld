import React from 'react';
import './RuleBook.css';

const RuleBook = () => { 
     
    return(
		<div className="book_wrapper">
		<a id="next_page_button"></a>
		<a id="prev_page_button"></a>
		<div id="loading" className="loading">Loading pages...</div>
		<div id="mybook" style={{"display":"none"}}>
			<div className="b-load">
				<div className="text-center">
					<h2>Welcome to Odin's World</h2>
					<p><span className="firstcharacter">E</span>very morning Odin sends his ravens, <span className="bold-text">Huginn</span> & <span className="bold-text">Munian</span>, across the world to bring back news of life on Earth. Naturally, after many millennia, they've become competitive...</p>
					
					<div className="table-width page-1">
						<table>
							<tr className="coins-ing-RB text-center">
								<td><img src={require('../../components/Images/coin-1.png')} /></td>
								<td><img src={require('../../components/Images/coin-2.png')} /></td> 
							</tr>
							<tr className="text-center">
								<td><p className="bold-text">Raven Huginn</p><p>Player 1</p></td>
								<td><p className="bold-text">Raven Muninn</p><p>Player 2</p></td>
							</tr>
						</table>
					</div>
				</div>

				<div className="text-center">
					<h2>Game Cards</h2>
					<p>Land Cards have 5 types; mountain, river, plain, forest, and desert. Flight Cards are played
					by players and match Land Cards. Loki Cards are limited and special cards that are played to manipulate
					the world.</p>
					<table>
						<tr>
							<td><p>Land</p></td>
							<td><p>Flight</p></td>
							<td><p>Loki</p></td>
						</tr>
						<tr>
							<td><img src={require('../../components/Images/RB-card-1.png')} /></td>
							<td><img src={require('../../components/Images/RB-card-2.png')} /></td>
							<td><img src={require('../../components/Images/RB-card-3.png')} /></td> 
						</tr>
					</table>
						
				</div>

				<div className="page-3 text-center">
					<h2>Goal</h2>
					<p>Let the racing begin!</p>
					<p>The first Raven to fly across all the Lands Cards completing the loop is the winner.</p>
					<img id="img-loop-2" src={require('../../components/Images/loop-2.png')} />	
					<br/>
					<img id="img-loop-1" src={require('../../components/Images/loop-1.png')} />
				</div>

				<div className="text-center">
					<h2>Flying</h2>
					<p>Clicking on the appropriate <span className="bold-text">Flight Card</span> will move the Raven as many Lands that match in a row. 
					</p>
					<img id="img-loop-1" src={require('../../components/Images/ex-1.png')} />
					<p>If a player clicks on a Flight Card while having two matching Flight Cards their hand, they will move.</p>
					<img id="img-loop-1" src={require('../../components/Images/ex-2.png')} />
				</div>
				<div className="page-4 text-center">
					<h2>Trickery</h2>
					
					<p>Players may also draw <span className="bold-text">Loki Cards</span> during the Draw Phase. Loki Cards may not be played on any land that has a raven on it. When used, Loki Cards are removed from the game.</p>
					{/* <img src={require('../../components/Images/loki.png')} /> */}
					
					<table>
						<tr>
							<td><img className="loki-card-size" src={require('../../components/Images/loki-cards-19.png')} /></td>
							<td><img className="loki-card-size" src={require('../../components/Images/loki-cards-16.png')} /></td>
							<td><img className="loki-card-size" src={require('../../components/Images/loki-cards-17.png')} /></td> 
						</tr>
						<tr className="loki-card-text">
							<td><span>1. Move your raven forward.</span>
							<br/>
							<span>2. Move opponent's raven backwards.</span></td>
							<td><span>Rotate a Land Card 180°</span></td>
							<td><span>Swap any two Land Cards without rotating them</span></td>
						</tr>
					</table>
					
				</div>


				<div className="page-5 text-center">
					<h2>Play Begins!</h2>
					<p>When both players have connected to the game, each player will draw 5 
					cards either Flight or Loki. Once both players have 5 cards in their hands, the game 
					will begin.</p>
					<img src="https://res.cloudinary.com/mosjoandy/image/upload/v1531006858/OdinsRavensDesignGarbage/Thing.png" />
					<p>Turn:</p>
					<ul>
						<li>Play in any order either Flight or Loki Cards to move their raven, 
						or manipulate the world.</li>
						<li>When the player is satisfied, or has no more cards to play, the player 
						can click the "Enter Draw Phase" button and draw 3 new cards from either Flight or Loki Decks.*</li>
					</ul>
					<p>* - A player will automatically discard the left-most card in their hand if drawing <b>OVER</b> 7 cards</p>
				</div>

				<div className="page-6 text-center">
					<h2>Ending The Game</h2>
					<p>Any raven that traverses the entire world and completes the loop will 
					be declared the winner.</p>
				</div>
				<div>
					<h2>Orginal Credits: </h2>
					<ul>
						<li>Game Design by Thornsten Gimmler</li>
						<li>Cover and Card Art by Johan Egerkrans</li>
						<li>Osprey Publishing, part of Bloomsbury Publishing Plc</li>
						<li>PO Box 883, Oxford, OX1 9PL, UK</li>
						<li>2015 Thorsten Gimmler & Osprey Publishing Ltd.</li>
					</ul>
					<h2>Digital Credits: </h2>
					<ul>
						<li>Jesse Lofland</li>
						<li>Maria Ortero</li>
						<li>Nicholas Chan</li>
						<li>Berkeley Coding Bootcamp</li>
						<li>2018</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	);
};

export default RuleBook;