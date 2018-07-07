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
					<h2>Slider Gallery</h2>
					<p>This tutorial is about creating a creative gallery with a
						slider for the thumbnails. The idea is to have an expanding
						thumbnails area which opens once an album is chosen.
						The thumbnails will scroll to the end and move back to
						the first image. The user can scroll through the thumbnails
						by using the slider controls. When a thumbnail is clicked,
						it moves to the center and the full image preview opens.</p>
					<a href="http://tympanus.net/codrops/2010/10/07/slider-gallery/" target="_blank" className="article">Article</a>
					<a href="http://tympanus.net/Tutorials/SliderGallery/" target="_blank" className="demo">Demo</a>
				</div>
				<div>
					<img src={require("../Images/2.png")}/>
					<h2>Animated Portfolio Gallery</h2>
					<p>Today we will create an animated portfolio gallery with jQuery.
						The gallery will contain a scroller for thumbnails and a
						content area where we will display details about the portfolio
						item. The image can be enlarged by clicking on it, making
						it appear as an overlay.</p>
					<a href="http://tympanus.net/codrops/2010/11/14/animated-portfolio-gallery/" target="_blank" className="article">Article</a>
					<a href="http://tympanus.net/Tutorials/AnimatedPortfolioGallery/" target="_blank" className="demo">Demo</a>
				</div>
				<div>
					<img src={require("../Images/3.png")}/>
					<h2>Annotation Overlay Effect</h2>
					<p>Today we will create a simple overlay effect to display annotations in e.g. portfolio
						items of a web designers portfolio. We got the idea from the wonderful
						portfolio of www.rareview.com where Flash is used to create the
						effect. We will use jQuery.</p>
					<a href="http://tympanus.net/codrops/2010/10/12/annotation-overlay-effect/" target="_blank" className="article">Article</a>
					<a href="http://tympanus.net/Tutorials/AnnotationOverlayEffect/" target="_blank" className="demo">Demo</a>
				</div>
				<div>
					<img src={require("../Images/4.png")}/>
					<h2>Bubbleriffic Image Gallery</h2>
					<p>In this tutorial we will create a bubbly image gallery that
						shows your images in a unique way. The idea is to show the
						thumbnails of albums in a rounded fashion allowing the
						user to scroll them automatically by moving the mouse.
						Clicking on a thumbnail will zoom in a big circle and
						the full image which will be automatically resized to
						fit into the screen.</p>
					<a href="http://tympanus.net/codrops/2010/12/10/bubbleriffic-image-gallery/" target="_blank" className="article">Article</a>
					<a href="http://tympanus.net/Tutorials/BubblerifficImageGallery/" target="_blank" className="demo">Demo</a>
				</div>
				<div>
					<img src={require("../Images/5.png")}/>
					<h2>Collapsing Site Navigation</h2>
					<p>Today we will create a collapsing menu that contains vertical
						navigation bars and a slide out content area. When hovering
						over a menu item, an image slides down from the top and a
						submenu slides up from the bottom. Clicking on one of the
						submenu items will make the whole menu collapse like a card
						deck and the respective content area will slide out.</p>
					<a href="http://tympanus.net/codrops/2010/09/06/collapsing-site-navigation/" target="_blank" className="article">Article</a>
					<a href="http://tympanus.net/Tutorials/CollapsingSiteNavigation/" target="_blank" className="demo">Demo</a>
				</div>
				<div>
					<img src={require("../Images/6.png")}/>
					<h2>Custom Animation Banner</h2>
					<p>In today’s tutorial we will be creating a custom animation banner with jQuery.
						The idea is to have different elements in a banner that will
						animate step-wise in a custom way.</p>
					<p>We will be using the jQuery Easing Plugin and the jQuery 2D
						Transform Plugin to create some nifty animations.</p>
					<a href="http://tympanus.net/codrops/2010/10/18/custom-animation-banner/" target="_blank" className="article">Article</a>
					<a href="http://tympanus.net/Tutorials/CustomAnimationBanner/" target="_blank" className="demo">Demo</a>
				</div>
			</div>	
		</div>
		<div className="d-flex justify-content-center">
			<button className="btn button btn-lobby" href="#" target="_blank">Lobby</button>  
		</div>
	</div>

    );
};

export default RuleBook;