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
				<div>
					<img src={require("../Images/1.png")}/>
					<h1>Game Components</h1>
					<p>This tutorial is about creating a creative gallery with a
						slider for the thumbnails. The idea is to have an expanding
						thumbnails area which opens once an album is chosen.
						The thumbnails will scroll.</p>
				</div>
				<div>
					<img src={require("../Images/2.png")}/>
					<h1>Set up</h1>
					<p>Today we will create an animated portfolio gallery with jQuery.
						The gallery will contain a scroller for.</p>
				</div>
				<div>
					<img src={require('../Images/1.png')}/>
					<h1>Goal</h1>
					<p>Today we will create a simple overlay effect to display annotations in e.g. portfolio
						items of a web designers portfolio.</p>
				</div>
				<div>
					<img src={require('../Images/2.png')}/>
					<h1>Playing Game</h1>
					<p>In this tutorial we will create a bubbly image gallery that
						shows your images in a unique way. The idea is to show the
						thumbnails of albums in.</p>
				</div>
				<div>
					<img src={require("../Images/5.png")}/>
					<h1>Flight</h1>
					<p>Today we will create a collapsing menu that contains vertical
						navigation bars and a slide out content area. When hovering
						over a menu item, an image slides.</p>
				</div>
				<div>
					<img src={require("../Images/6.png")}/>
					<h1>Trickery</h1>
					<p>In today’s tutorial we will be creating a custom animation banner with jQuery.
						The idea is to have different elements in a banner that will
						animate step-wise in a custom way.</p>
				</div>
				<div>
					<img src={require("../Images/6.png")}/>
					<h1>Ending yout turn</h1>
					<p>In today’s tutorial we will be creating a custom animation banner with jQuery.
						The idea is to have different elements in a banner that will
						animate step-wise in a custom way.</p>
				</div>
				<div>
					<img src={require("../Images/6.png")}/>
					<h1>Ending ythe game</h1>
					<p>In today’s tutorial we will be creating a custom animation banner with jQuery.
						The idea is to have different elements in a banner that will
						animate step-wise in a custom way.</p>
				</div>
			</div>
		</div>
	</div>
    );
};

export default RuleBook;