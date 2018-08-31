import React from 'react';
import './RuleBook.css';

const RuleBook = () => {

	return (
		<div className="book_wrapper">
			<a id="next_page_button"> </a>
			<a id="prev_page_button"> </a>
			<div id="loading" className="loading">Loading pages...</div>
			<div id="mybook" style={{ "display": "none" }}>
				<div className="b-load">
				{/* Page One */}
					<div className="text-center">
						<h2>Welcome to Odin's World</h2>
						<p><span className="firstcharacter">E</span>very morning Odin sends his ravens, <span className="bold-text">Huginn</span> & <span className="bold-text">Munian</span>, across the world to bring back news of life on Earth. Naturally, after many millennia, they've become competitive...</p>

						<div className="table-width page-1">
							<table>
								<tbody>
									<tr className="coins-ing-RB text-center">
										<td><img alt="coin-image1" src={require('../../components/Images/coin-1.png')} /></td>
										<td><img alt="coin-image2" src={require('../../components/Images/coin-2.png')} /></td>
									</tr>
									<tr className="text-center">
										<td><p className="bold-text">Raven Huginn</p><p>White Raven</p></td>
										<td><p className="bold-text">Raven Muninn</p><p>Dark Raven</p></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

				{/* Page Two */}
					<div className="text-center">
						<h2>Game Cards</h2>
						<p>Land Cards have 5 types: Mountain, River, Plain, Forest & Desert. Flight Cards are played
						by players and match Land Cards. Loki Cards are limited and special cards that are played to manipulate
					the world.</p>
						<table>
							<tbody>
								<tr>
									<td><p>Land</p></td>
									<td><p>Flight</p></td>
									<td><p>Loki</p></td>
								</tr>
								<tr>
									<td><img alt="card-rulebook1" src={require('../../components/Images/RB-card-1.png')} /></td>
									<td><img alt="card-rulebook2" src={require('../../components/Images/RB-card-2.png')} /></td>
									<td><img alt="card-rulebook3" src={require('../../components/Images/RB-card-3.png')} /></td>
								</tr>
							</tbody>
						</table>

					</div>

				{/* Page Three */}
					<div className="page-3 text-center">
						<h2>Goal</h2>
						<p>Let the racing begin!</p>
						<p>The first Raven to fly across all the Lands Cards completing the loop is the winner.</p>
						<img alt="loop2" id="img-loop-2" src={require('../../components/Images/loop-2.png')} />
						<br />
						<img alt="loop1" id="img-loop-1" src={require('../../components/Images/loop-1.png')} />
					</div>

				{/* Page Four */}
					<div className="text-center">
						<h2>Flying</h2>
						<p>Clicking on the appropriate <span className="bold-text">Flight Card</span> will move the Raven as many Lands that match in a row.
					</p>
						<img alt="rb-loop1" id="img-loop-1" src={require('../../components/Images/ex-1.png')} />
						<p>If a player clicks on a Flight Card while having two matching Flight Cards in their hand, they will move.</p>
						<img alt="rb-loop2" id="img-loop-1" src={require('../../components/Images/ex-2.png')} />
					</div>
					<div className="page-4 text-center">
				
				{/* Page Five */}
						<h2>Trickery</h2>

						<p>Players may draw <span className="bold-text">Loki Cards</span> during Draw Phase. Loki Cards cannot be used on a land with a raven on it. When used, they are removed from the game.</p>
						{/* <img alt="face" src={require('../../components/Images/loki.png')} /> */}

						<table>
							<tbody>
								<tr>
									<td><img alt="trickcard1" className="loki-card-size" src={require('../../components/Images/loki-cards-19.png')} /></td>
									<td><img alt="trickcard2" className="loki-card-size" src={require('../../components/Images/loki-cards-17.png')} /></td>
									<td><img alt="trickcard3" className="loki-card-size" src={require('../../components/Images/loki-cards-16.png')} /></td>
								</tr>
								<tr className="loki-card-text">
									<td><span>1. Move your raven forward.</span>
										<br />
										<span>2. Move opponent's raven backwards.</span></td>
									<td><span>Rotate a Land Card 180°</span></td>
									<td><span>Swap any two Land Cards without rotating them</span></td>
								</tr>
							</tbody>
						</table>

					</div>

				{/* Page Six */}
					<div className="page-5 text-center">
						<h2>Play Begins!</h2>
						<p>When both players have connected to the game, each player will draw 5
					cards either Flight or Loki.</p>
						<img alt="drawcards" className="loki-card-size" src={require('../../components/Images/5-cards.png')} />
						<p>Once both players have 5 cards in their hands, the game
					will begin.</p>
					</div>

				{/* Page Seven */}
					<div className="page-6 text-center">
						<h2>Play Phase</h2>

						<p>Play either Flight or Loki Cards in any order to move your raven, or manipulate the world</p>
						<img alt="yourturn"  className="page6 mb-2" src={require('../../components/Images/enter-draw-phase.png')} />
						
						<p>When the player is satisfied, or has no more cards to play, the player
					can click the "Enter Draw Phase" button</p>
					</div>

				{/* Page Eight */}
					<div className="page-7 text-center">
						<h2>Draw Phase</h2>
						<p>Once in the "Draw Phase", the player may draw 3 new cards from either their Flight or Loki Decks.</p>
						<p>A player will automatically discard the left-most card in their hand if drawing <b>OVER</b> 7 cards</p>
						<img alt="newphase" className="page7" src={require('../../components/Images/actual-draw-phase.png')} />

					</div>

				{/* Page Nine */}
					<div className="page-7 text-center">
						<h2>Ending The Game</h2>
						<p>Any raven that traverses the entire world and completes the loop will
					be declared the winner.</p>
						<img alt="completetrack" className="win-phase" src={require('../../components/Images/loop-3.png')} />
					</div>

				{/* Page Ten */}
					<div>
						<h2>Orginal Credits:</h2>
						<ul className="margin-left">
							<li><p>Game Design by Thornsten Gimmler</p></li>
							<li><p>Cover and Card Art by Johan Egerkrans</p></li>
							<li><p>Osprey Publishing, part of Bloomsbury Publishing Plc</p></li>
							<li><p>PO Box 883, Oxford, OX1 9PL, UK</p></li>
							<li><p>2015 Thorsten Gimmler & Osprey Publishing Ltd.</p></li>
						</ul>
					</div>

				{/* Page Eleven */}
					<div>
						<h2>Digital Credits: </h2>
						<ul className="margin-left">
							<li><p>Jesse Lofland</p></li>
							<li><p>Maria Ortero</p></li>
							<li><p>Nicholas Chan</p></li>
							<p><b>Special Thanks: </b></p>
							<li><p>Jerauld Manansala</p></li>
							<li><p>Mel Hsieh</p></li>
							<li><p>Berkeley Coding Bootcamp</p></li>
							<li><p>2018</p></li>
						</ul>
					</div>

				{/* Page Twelve */}
					<div>
					{/* Add in something nice and a go to lobby button */}
					</div>

				</div>
			</div>
		</div>
	);
};

export default RuleBook;