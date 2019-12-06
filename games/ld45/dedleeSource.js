//Moved Dedlee source to its own file to fix Cloudflare's HTML minification. Should've been separate from the start really.
document.getElementById('dedleeSource').innerHTML = `""

initscript
	setHealth(100);
	story.theme='intro';
	document.body.classList=[story.theme];

afterEveryThing
	updateHp();

afterEveryPageTurn
	document.body.classList=[story.theme];

o.dummyObject "An object"
	"Get"
		when !story.isInInventory('dummyObject')
		As you try to get it... It is clear that the inventory works!
		{{ story.putInInventory('dummyObject'); }}
#<p>Quite unsurprisingly, there is even an {[dummyObject]}object{[]} lying around.</p>


p.intro
	{{= ''}}

p.intro_1.first
	You find yourself in ((p2))an endless void(()).

	pg.p2
		((p3))Nothingness(()), in every direction.
	pg.p3
		You have ((p4))nothing(()).
	pg.p4
		You are ((p6))nothing(()).
	pg.p6
		You'll always be [[intro2]]nothing[[]].

p.intro2
	...But the more you think about it, the more you wonder if it could be changed.
	<p>If there's any hope of recovering the lack of nothingness you once had.</p>
	<p>[[intro3]]> OPEN[[]]</p>
p.intro3
	You resist. You fight the nothingness. You open...
	<p>[[dream1-1]]> Your eyes[[]]</p>
p.dream1-1
	{{ story.theme='dream1';}}
	Oh! Of course. You just had your eyes closed, silly.
	<p>((p2))> Check your pockets(())</p>
	<p>[[dream1-2]]> Check your surroundings[[]]</p>

	pg.p2
		Still carrying nothing, though.
		<p>((p3))> Yes but at least I have clothes(())</p>
	pg.p3
		...well, yeah. You take solace in the fact your clothing didn't count in the <span class="styTV">nothingness</span>.

p.dream1-2
	It looks like you're in some kind of rocky desert. There's a small hill in front of you, and some sad-looking bushes scattering the place. To be honest, it's not much more interesting than that <span class="styTV">void</span> you just got yourself out of.
	<p>((p1))> How did I get here?(())</p>
	<p>((p2))> What time is it?(())</p>
	<p>[[dream1-3]]> Listen[[]]</p>

	pg.p1
		You have no idea what brought you here, but you get a feeling it's best not to think about it. 
	pg.p2
		How would you know? You've nothing to check. It's early in the night, and the lack of light pollution makes the stars impressively bright.
		<p>((p3))> Determine the time from constellation rotations(())</p>
		<p>((p4))> Shouldn't I be freezing?(())</p>
	pg.p3
		Even if it was possible, you don't have a clue how one would go about this. You remember to be a little more humble from now on.
	pg.p4
		Although it seems like a good cause for worry, you're quite temperate at the moment. You should probably get a move on with whatever you're here to do, if Geography class had any credibility.

p.dream1-3
	You take a few seconds to assess the soundscape. You hear the wind softly whistling against the sand, and the slight rustling of the bushes. 
	<p>You lastly notice some faint rhythmic thuds... footsteps. From behind.</p>
	<p>[[dream1-4]]> Turn around[[]]</p>
	<p>[[dream1-3-1]]> Don't look[[]]</p>

p.dream1-3-1
	The footsteps become increasingly louder... they're definitely approaching you. And they're rather menacing.
	<p>[[dream1-4]]> Turn around[[]]</p>
	<p>[[dream1-3-2]]> Stay still[[]]</p>

p.dream1-3-2
	Whatever these steps belong to, it's almost upon you. And there's very little chance it's friendly.
	<p>[[dream1-4]]> Turn around[[]]</p>
	<p>[[dream1-3-3]]> Continue in this dumb meditative pose[[]]</p>

p.dream1-3-3
	{{ deductHealth(5); }}
	The thing rams into your back, and sends you flying. As you sail very ungracefully through the air, you acknowledge that you kinda deserved that.
	<p>You get up off the ground and [[dream1-4]]face the damn thing[[]].</p>

p.dream1-4
	You're greeted by a <span class="styRed">giant red bipedal monster</span>, with menacing red eyes. Its body is covered in scales and looks almost <span class="styRed">lizard-like</span>. Seems pretty intent on not letting you stay alive.
	<p>Oh and he has a sword.</p>
	<p>In the time you waste trying to make sense of this development, the <span class="styRed">monster</span>'s caught up to you.</p>
	<p>((p1.link-d1-4-1))> Talk(())</p>
	<p>((p2.link-d1-4-2))> Run(())</p>
	<p>((p4))> Scream(())</p>
	<p>[[dream1-5]]> Engage[[]]</p>

	pg.p1
		{{ story.disable('link-d1-4-1');  story.d1_4_screech = true; }}
		You ask the <span class="styRed">monster</span> what it wants. It replies with unnerving screech. Lizard people can't talk, silly.
		<p>((p3))> Do lizards even screech?(())</p>
	pg.p3
		Hell if you know, but this one just did.
	pg.p2
		{{ story.disable('link-d1-4-2'); }}
		You turn towards the hill and run as fast as you can. The <span class="styRed">monster</span> quickly catches up and skids around to block your path. You've gotta admit it looked pretty cool doing that.
	pg.p4
		{{ if(story.d1_4_4===undefined) story.d1_4_4=0; }}
		{{ story.d1_4_4+=1; }}
		{{? story.d1_4_4 == 1 }}
			You quite rightly scream at the difficulty of this situation. The <span class="styRed">monster</span> smirks in knowledge of his clear advantage.
    	{{?}}
		{{? story.d1_4_4 == 2 }}
			You scream again at the <span class="styRed">monster</span>. This doesn't have an effect.
		{{?}}
		{{? story.d1_4_4 == 3 }}
			You scream a third time at the horror of the <span class="styRed">monster</span>. It almost looks sympathetic.
		{{?}}
		{{? story.d1_4_4 == 4 }}
			You continue permeating the air with your screams. Perhaps if someone was nearby, they could hear you. But there's not.
		{{?}}
		{{? story.d1_4_4 > 4 }}
			You scream once more at the <span class="styRed">monster</span>. It's having none of it. 
		{{?}}

p.dream1-5
	Realising the <span class="styRed">monster</span> can easily outrun you, you prepare for its attack.
	<p>With an angry hiss, it lunges forward, its sword pointed in your direction.</p>
	{{? story.d1_4_screech }}
		<p>((p1))> Didn't it screech last time?(())</p>
	{{?}}
	<p>[[dream1-5-1]]> Dodge roll![[]]</p>
	<p>[[dream1-5-2]]> Dodge without rolling![[]]</p>
	<p>((p2.dream1-5-p2))> Use your inner magic to block the attack(())</p>

	pg.p1
		{{ story.d1_5_hiss = true; }}
		Yes, it did, but you remember there's much better things to be thinking about right now.
	pg.p2
		You wave your hands in carefully calculated curves, channelling the Spirits of Hope and Protection...
		<p>((p3.dream1-5-p3))>>(())</p>
	pg.p3
		{{ story.disable('dream1-5-p3'); story.disable('dream1-5-p2'); }}
		{{ deductHealth(10); }}
		...and are hit with the sword.
		<p>You don't have magic powers. Let's not try that again.</p>
		<p>The <span class="styRed">monster</span> begins his next swing.</p>

p.dream1-5-1
	Of course! How could you forget the completely fail-safe technique to evade all conflict? You breeze past both the sword and the <span class="styRed">monster</span>, who's been rightly thrown-off by your <span class="styCool">radical</span> moves.
	<p>[[dream1-6]]>>[[]]</p>

p.dream1-5-2
	{{ deductHealth(2); }}
	You lurch to the left. Thankfully you just miss the sword, but get hit by the <span class="styRed">monsters</span>'s huge shoulder. While this decision wasn't anywhere near as cool as a dodge roll would've been, it did the job.
	<p>[[dream1-6]]>>[[]]</p>

p.dream1-6
	You've got about a second before the <span class="styRed">monster</span> can turn around and attack again.
	<p>[[dream1-6-1]]> Melee Attack[[]]</p>
	<p>[[dream1-6-2]]> Mount[[]]</p>
	<p>[[dream1-6-3]]> Disarm[[]]</p>

p.dream1-6-1
	{{? story.d1_6_melee }}
		{{ deductHealth(7); }}
		Just like the last time you tried this, your physical attacks have no effect. You get another smacking from the <span class="styRed">monster</span> and are again faced with an opportunity for counterattack.
	{{??}}
		{{ deductHealth(6); }}
		You punch the <span class="styRed">monster</span> with all your might.
		<p>Either the <span class="styRed">monster</span>'s very well-protected by its scales, or <i>'all your might'</i> isn't actually that much.</p>
		<p>Regardless, the <span class="styRed">monster</span> swings around and knocks you to the ground. You roll away before it can plant its sword in you; the sword instead gets stuck in the ground and gives you another opportunity to attack.</p>
		{{ story.d1_6_melee = true; }}
	{{?}}

	<p>[[dream1-6]]>>[[]]</p>

p.dream1-6-2
	{{ deductHealth(3); }}
	You jump on the <span class="styRed">monster</span>'s back, its sharp scales causing some small cuts.
	<p>You soon realize this vantage point doesn't offer any advantage, and the <span class="styRed">monster</span> shakes you back off with a displeased growl. Luckily you land on your feet, giving you another opportunity to attack while it's regaining its balance.</p>
	{{? story.d1_5_hiss}}
		<p>((p1))> It's growling now??(())</p>
	{{?}}
	<p>[[dream1-6]]>>[[]]</p>
	pg.p1
		You notice that this <span class="styRed">monster</span> is making very inconsistent noises. And that you're focusing on the completely wrong thing.

p.dream1-6-3
	You lunge at the <span class="styRed">monster</span>'s right hand and tug at the sword. After some intense wrestling, you free the sword from the <span class="styRed">monster</span>'s grip and it lands in front of you both.
	<p>[[dream1-7]]> Dive towards the sword[[]]</p>

o.bluntSword "Blunt Sword"
	"Examine"
		It's a rather blunt broadsword, probably made of iron. Not the greatest weapon, but better than nothing.

p.dream1-7
	{{story.putInInventory('bluntSword');}}
	You pick up the sword! The <span class="styRed">monster</span> looks awfully frustrated by this, but continues its assault by swinging at you with its claws.
	<p>[[dream1-7-1]]> Block with sword[[]]</p>
p.dream1-7-1
	You push the flat edge of the sword into the incoming arm, which gives you a moment's opportunity to counterattack.
	<p>[[dream1-7-2]]> Attack with sword[[]]</p>
p.dream1-7-2
	You swing the sword directly through the <span class="styRed">monster</span>'s body, slicing through its scales. It shrieks in pain and topples backwards.
	<p>You have an opportunity to end the fight.</p>
	<p>[[dream1-7-2-1]]> Kill the monster[[]]</p>
	<p>[[dream1-7-2-2]]> Spare the monster[[]]</p>

p.dream1-7-2-1
	You press the sword down into the <span class="styRed">monster</span>, which after a final screech leaves it lifeless.
	<p>As you stagger away, the <span class="styRed">monster remains</span> transform into a cloud of some <span class="styRed">violent red substance</span>, and dissipates away. You feel like this is important, but ignore it for now.</p>
	<p>[[dream1-8]]> Continue to the hill[[]]</p>

p.dream1-7-2-2
	You decide to leave the <span class="styRed">monster</span> on the ground, hoping it'll get the message and retreat. As you walk away, it gets up and hits you once more. It seems like this thing simply won't give up, and you don't have any choice.
	<p>((p1))> Attack(())</p>
	pg.p1
		You swing the sword once more and cut the <span class="styRed">monster</span>'s chest again.
		<p>[[dream1-7-2-1]]> Defeat the monster[[]]</p>

o.twigs "Twigs"
	"Examine"
		Some twigs you picked up in the desert. Who knows why you think they'll be useful later on.

p.dream1-8
	Now that problem has been dealt with, you decide to try and work out what the hell is going on.
	<p>The hill is the only defining feature for miles, so it seems like a suitable destination. There's a plateau on the top which you can't see, so there could be something up there.</p>
	<p>You remember these kinds of hills are actually called <i>mesas</i>, which you begin naming correctly. You thank Geography class for this useless piece of knowledge.</p>
	<p>((p1))> Kick some bushes(())</p>
	<p>((p2))> Slice some bushes(())</p>
	<p>[[dream1-9]]> Climb the mesa[[]]</p>

	pg.p1
		You walk past some bushes on the way, and kick them for no reason. Nothing happens, as expected, aside from you getting green bits all over your socks.
	pg.p2
		You decide to release some energy by cutting up the bushes with the sword. It's a difficult job, given the sword's literally described as "Blunt", but you eventually rip off a couple twigs.
		{{story.putInInventory('twigs');}}

p.dream1-9
	Climbing's by no means your forte, but you make it up the steep sides of the mesa. You're delighted to find a small wooden hut with a metal tower in the centre of the plateau. 
	<p>[[dream1-10]]> Approach the hut[[]]</p>

p.dream1-10
	You reach the hut and tower, cautiously gripping your sword. Upon closer inspection, the tower appears to be a communications tower - there's a couple of small radio dishes on the side, and a moderately-sized antenna pointing straight upwards. You've no idea what any of these are pointing towards, but you do notice there's a narrow maintenance ladder up to them.
	<p>You suspect the hut contains equipment to operate the tower, but attempting to open the door reveals it's locked. You're relieved there's no more hostiles here, but disappointed that there's no friendly faces either.</p>
	<p>[[dream1-11]]> Look around[[]]</p>

p.dream1-11
	You look around the hut to find another way in, but with no luck. You sit down for a minute, resting against the wooden wall. You decide the comms tower must have some sort of message relay feature, and getting inside that hut is key to sending a message. At least there's not a huge rush, you reassuringly think to yourself.
	<p>That is, until you hear more rumbling.</p>
	<p>[[dream1-12]]>>[[]]</p>
p.dream1-12
	You jolt up and look around the plateau, unable to find any source of the sound. The size of the mesa means you can't see the desert floor beneath you, so you guess the sound is coming from there.
	<p>((p1.d2-12-1))> Climb the tower(())</p>
	<p>((p2.d2-12-2))> Approach the plateau edge(())</p>

	pg.p1
		{{ story.disable('d2-12-1'); story.disable('d2-12-2'); }}
		You run over to the tower and hastily climb the ladder as far as you can go.
		<p>It's difficult to make out from here, but there's definitely something down there...</p>
		<p>((p3.d2-12-3))>>(())</p>
	pg.p2
		{{ story.disable('d2-12-1'); story.disable('d2-12-2'); }}
		You sprint over to the edge of the plateau. The rumbling becomes less muffled as you approach, which isn't a great sign.
		<p>You reach the edge, peer down, and are filled with dread.</p>
		<p>((p4.d2-12-4))>>(())</p>

	pg.p3
		{{ story.disable('d2-12-3'); }}
		<span class="styRed">Monsters</span>. Millions of them. A sea of red, flowing hastily as they stomp on their way. All marching towards the mesa. There's no chance you could hold these off once they reach the plateau.
		<p>You admit that the new situation is <i>pretty bad</i>, and scramble down the ladder.</p>
		<p>[[dream1-13-hut]]>>[[]]</p>
	pg.p4
		{{ story.disable('d2-12-4'); }}
		<span class="styRed">Monsters</span>. Millions of them. A sea of red, flowing hastily as they stomp on their way. All marching towards the mesa. There's no chance you could hold these off once they reach the plateau.
		<p>You admit that the new situation is <i>pretty bad</i>, and sprint back to the hut.</p>
		<p>[[dream1-13-hut]]>>[[]]</p>

p.dream1-13-hut
	{{? story.d1_13_visited}}
		You're back at the hut.
	{{??}}
		You decide your only hope of survival is to get into that hut, and look for ways to get in.
		{{ story.d1_13_visited=true; }}
	{{?}}
	<p>((p1.d1-13-bad1))> Break the door down(())</p>
	<p>((p2.d1-13-bad2))> Smash the windows(())</p>
	<p>((p3.d1-13-bad3))> Attack door with sword(())</p>
	{{? story.isInInventory('twigs')}}
		<p>((p4.d1-13-pick1))> Pick lock with twigs(())</p>
	{{?}}
	{{? story.isInInventory('metalstrips')}}
		<p>((p5.d1-13-pick2))> Pick lock with metal strips(())</p>
	{{?}}
	{{? story.isInInventory('lockpicks')}}
		<p>((p6.d1-13-pick3))> Pick lock (properly)(())</p>
	{{?}}
	<p>[[dream1-13-tower.d1-13-go1]]> Check the tower[[]]</p>

	pg.p1
		{{? story.d1_6_melee}}
			If that <span class="styRed">monster</span> fight wasn't enough evidence, you're not the strongest sort, so understandably the door doesn't budge.
		{{??}}
			You slam against the door, but it doesn't move anywhere.
		{{?}}
	pg.p2
		...but there aren't any windows.
	pg.p3
		It's a <i>Blunt Sword</i>, so naturally the only effect is a small scratch.
	pg.p4
		A twig fits inside the keyhole, but turning it does nothing. If you weren't about to die, you'd think about how it's actually rather reassuring that twigs don't work against locks.
	
	pg.p5
		The metal strips fit in nicely, and you're able to lift the pins, but you can't apply any torque while they're in this shape...
	pg.p6
		You turn the wrench and poke around at the pins...
		<p>Got it! The door swings open.</p>
		<p>[[dream1-14]]> Enter[[]]</p>
		{{story.disable('d1-13-pick1');story.disable('d1-13-pick2');story.disable('d1-13-pick3');story.disable('d1-13-go1');story.disable('d1-13-bad1');story.disable('d1-13-bad2');story.disable('d1-13-bad3');}}

p.dream1-13-tower
	You rush over to the tower. There's a small equipment box just left of the latter.
	{{? story.isInInventory('lockpicks')}}
		{{? !story.isInInventory('wrench')}}
			<p>((p3.d1-13-boxpick))> Pick box lock(())</p>
		{{??}}
			<p>((p4))> Take wrench(())</p>
		{{?}}
	{{?}}
	{{? !story.d1_13_strips}}
		<p>((p1))> Open box(())</p>
	{{?}}
	{{? story.d1_15_entered}}
		<p>[[dream1-15]]> Go back to hut[[]]</p>
	{{??}}
		<p>[[dream1-13-hut]]> Go back to hut[[]]</p>
	{{?}}

	pg.p1
		You can't; that's locked too.
		<p>However, upon inspecting the box you find some thin metal strips on top.</p>
		<p>((p2.d1-13-takestrips))Take metal pieces(())</p>
	pg.p2
		You take the metal pieces, hoping they'll be useful.
		{{story.putInInventory('metalstrips');}}
		{{story.d1_13_strips = true; story.disable('d1-13-takestrips');}}
	pg.p3
		{{story.d1_13_boxopen = true;}}
		You use your makeshift lockpick to break open the box. Strangely, the box is empty aside from a wrench, which seems a bit over-protected.
		<p>((p4))> Take wrench(())</p>
	pg.p4
		You take the wrench.
		{{story.putInInventory('wrench');}}


o.metalstrips "Metal Strips"
	"Examine"
		A couple of tiny steel strips. Looks like they'd be useful for lockpicking...
	"Bend strip"
		You push as hard as you can against one of the strips, and it eventually bends to make a wrench. You keep the other straight for moving pins. You're so glad you got that lockpicking kit for your birthday once.
		{{story.putInInventory('lockpicks');}}
		{{story.removeFromInventory('metalstrips');}}

o.lockpicks "Lockpicks"
	"Examine"
		It's actually just a piece of steel and a <i>bent</i> piece of steel, but it should do the job.

o.wrench "Wrench"
	"Examine"
		A classic engineer's wrench. Useful for unbolting bolts, re-bolting bolts, and the occasional hitting of <span class="styRed">evil things</span>.

p.dream1-14
	{{story.theme="d1-hut1";}}
	You enter the dimly-lit room, as the red masses grow ever closer.
	<p>As expected, the room is cluttered with wires and electricals, but in the centre of one wall is an interface unlike anything you'd seen before. The dials, engravings and material seem to look... <span class="styAlien">alien</span>. It's not that much of a surprise, given there's millions of <span class="styRed">murderous sword-wielding lizard things</span> chasing you down, but it's quite cleat now that this is no comms tower.</p>
	<p>Inspecting the equipment further, it became apparent that power was out. Because of course you needed another hurdle.</p>
	
	{{? story.isInInventory('twigs')}}
		<p>((p1))> Poke alien interface with twig(())</p>
	{{?}}
	<p>((p4))> Examine the alien tech(())</p>
	<p>((p3))> Examine the other equipment(())</p>
	<p>((p2))> Press the power button(())</p>
	<p>[[dream1-15]]> Look for a fuse box[[]]</p>

	pg.p1
		Why. The hell. Would that do anything.
	pg.p2
		Even if you could find a power button on this confounding machine, you decide it wouldn't do anything, given none of the other electrics in the room are functional.
	pg.p3
		Alongside the strange interface, you see some more typical equipment: things with fans, and LEDs, and buttons. There seems to be wires connecting the human machines to the alien one, but this doesn't help you understand it any further.
	pg.p4
		It's slim slab that's as tall as you, and almost fills the wall. The interface has a large, dark screen in the centre, but that's the only component you can recognise. There's a thick tangle of wires coming going into one side of the machine, and out of a hole in the wall, towards the tower.

p.dream1-15
	{{? !story.d1_15_entered}}
		Everything has a fuse box, right?
		<p>Sure enough, you find a small metal box with the classic lightning symbol on the side. Aaand it's bolted shut.</p>
		{{? story.isInInventory('wrench')}}
			<p>Good thing you picked up that wrench!</p>
		{{?}}
		{{story.d1_15_entered = true;}}
	{{??}}
		You're back in the hut.
	{{?}}
	
	<p>((p1))> Hit fuse box with sword(())</p>
	<p>((p2))> Lockpick fuse box(())</p>
	{{? story.isInInventory('wrench')}}
		<p>[[dream1-16]]> Unbolt fuse box cover[[]]</p>
	{{??}}
		<p>[[dream1-13-tower]]> Check the tower[[]]</p>
	{{?}}

	pg.p1
		As with most things, hitting the fuse box with your sword has a non-positive effect. You hope there's no hidden CCTV in here. But the power's out so your violent outbursts will go unnoticed, you counterargue. You'll still know you're a metal-waving idiot, you conclude.
	pg.p2
		You think that'd be a great idea if you could find a keyhole on the fuse box, but you can't. You put the lockpicks back in your pocket disappointedly.

p.dream1-16
	You use the wrench to take off the bolts in each corner, and are presented with a typical line of circuit breakers. To your relief, you notice one's tripped.
	<p><i>My, it's just like fixing the electricity at home</i>, you think to yourself.</p>
	<p>[[dream1-17]]> Reset the circuit breaker[[]]</p>

p.dream1-17
	{{story.theme="d1-hut2";}}
	As you flick the circuit breaker up, the hut instantly livens with activity. You're greeted with light, and the machines begin to operate with a reassuringly normal electric hum.
	<p>You look over to the alien tech, and find the display's illuminated with a cool white. After a few seconds, this changes to a multitude of complex diagrams and labels, probably in some language you can't begin to comprehend.</p>
	<p>[[dream1-18]]> Move closer to the machine[[]]</p>

p.dream1-18
	You move closer, hoping to derive some slight sense from the writings...
	<p>Oh, it's just English.</p>
	<p class="styTV styAlien txtCenter">RELAY ANTENNA MISALIGNED.<br />TRACKING ACUTATORS DAMAGED.<br />MANUAL ALIGNMENT REQUIRED.</p>
	<p>Looks like you're gonna have to sort this out yourself. There's a diagram in one corner of the screen that describes the correct direction for the antenna. You wish you had your phone with you for this, but a mental picture will have do to.</p>
	<p>((p1))> Inspect the rest of the screen(())</p>
	<p>[[dream1-19]]> Tackle the antenna[[]]</p>

	pg.p1
		You look around the rest of the screen. There's not much of interest; mostly a bunch of debugging values. You're unsure how to control this thing anyway, so there's not much point trying to tackle it.
		<p>((p2))>>(())</p>
	pg.p2
		As you turn away, you notice something in the corner of your eye. You turn back to check. In the lower left corner of the screen, there's an image, captioned with a name.
		<p>((p3))>>(())</p>
	pg.p3
		<span class="styDream">It's... you.</span>
		<p>What the hell?! You quickly scan the room to confirm you didn't see any cameras - and definitely no way to identify all this other info it's got listed.</p>
		<p>Then again, this <i>is</i> alien tech, and you <i>are</i> being chased down by <span class="styRed">evil lizard monsters</span>, so you decide it's not the strangest thing to be seeing right now.</p>
		<p>You carry on towards the tower.</p>

p.dream1-19
	{{story.theme="dream1";}}
	You reach the tower, and hastily climb to the antenna at the top. A quick glance at the plateau edge shows the <span class="styRed">monster army</span>'s already reached the base of the mesa, and must be beginning their climb. You can only hope they're worse at climbing than they are running.
	<p>Apparently, the antenna needs to be pointed at the moon. Even you can work out where that is.</p>
	<p>((p2))> Why the moon?(())</p>
	<p>[[dream1-20]]> Turn the antenna carefully[[]]</p>
	<p>((p1))> Hit antenna with sword(())</p>

	pg.p1
		Jesus, stop it! Do you want to be stuck here forever?! Get your act together. You tell yourself.
		<p><i>(The antenna moves a fraction of a degree from the hit... so there's that)</i></p>
	pg.p2
		Because the aliens told you to! Stop questioning them. They're only half-likely to kill you as well.

p.dream1-20
	You use the conveniently-placed handles on either side of the heavy antenna and slowly pull it downwards, aiming it like a cannon. In fact, you notice it's so cannon-like that it has a crosshair scope! This makes the alignment easy enough.
	<p>You get the antenna focused on the moon, currently quite low in the sky. The antenna must be top-heavy, since it droops a little as you let it go. You reckon it seems to be missing the resistance the acutators would normally apply. That's a complete guess of course, since this <i>is</i> alien tech.</p>
	<p>((p1))> Stay here lifting the antenna(())</p>
	{{? story.isInInventory('twigs')}}
		<p>((p2.d1-20-twig))> Use twigs as wedge(())</p>

	{{?}}
	<p>((p3.d1-20-lock))> Use lockpick as wedge(())</p>

	pg.p1
		Sure, but who's gonna operate the machine? You need a better plan.
	pg.p2
		Keeping one hand on the antenna, you try wedging the twigs under the main hinge, and slowly release your pressure on the handle.
		<p>The twigs snap and fall down the tower.</p>
		<p>You liked those twigs :(</p>
		{{story.removeFromInventory('twigs'); story.d1_20_twigsground=true; story.disable('d1-20-twig'); }}
	pg.p3
		Keeping one hand on the antenna, you try wedging the metal pieces under the main hinge, and slowly release your pressure on the handle.
		<p>The metal does the trick, and the antenna stays put. Splendid! You descend the tower.</p>
		<p>[[dream1-21]]> Return to hut[[]]</p>
		<p>((p5.d1-20-dodgeroll))> Dodge roll off tower!(())</p>
		{{story.removeFromInventory('lockpicks');}}
		{{? story.d1_20_twigsground}}
			<p>((p4))> But wait! The twigs!(())</p>
		{{?}}
	pg.p4
		Well aware that a literal army of ravenous monsters are rushing to kill you, you scramble on the floor like an idiot looking for some twigs. At least you find them. They're a little shorter after that pruning, but they should still be useful for... nothing.
		<p>They're twigs, for god's sake.</p>
		{{story.putInInventory('twigs');}}
	pg.p5
		{{deductHealth(25); story.disable('d1-20-dodgeroll');}}
		You majestically let go of the ladder, attempt to roll through the air, and land face-first on the ground.
		<p>There's a time and place for <span class="styCool">amazing acrobatic skills</span>, but descending a ladder isn't one of them.</p>

p.dream1-21
	{{story.theme="d1-hut2";}}
	You re-enter the hut, and notice the screen's displaying new information.
	<p class="styTV txtCenter styAlien">RELAY ANTENNA ALIGNED MANUALLY.<br />OFFSET TRACKING UNNAVAILABLE.<br />TIME UNTIL MISALIGNMENT: 00H01M31S.</p>
	<p>...shit. The moon moves. Whatever you're about to do, you've gotta do it fast.</p>
	<p>((p1))>>(())</p>
	pg.p1
		<p>You hear a familiar screech from outside the hut. You poke your head out of the door.</p>
		<p>((p2))>>(())</p>
	pg.p2
		<p>At the edge of the plateau, you see the <span class="styRed">monsters</span> have made it to the top. They spot you with their telescopic sight, and begin running in your direction.</p>
		<p>shiiiit.</p>
		<p>((p3))>>(())</p>
	pg.p3
		<p>You dive back into the hut and scramble to the alien machine, desperate to active its power. You notice a second, smaller display has appeared under the first, where before there was just smooth casing. It sports a single button, labelled <span class="styTV styAlien">OPEN</span>.</p>
		<p>((p4))>>(())</p>
	pg.p4
		<p>You realise these aliens are also victim to humanity's awful habit to over-engineer user interfaces, wasting an entire touchscreen display where a physical button would have been both cheaper and more enjoyable to press. Although you'd really like to get in touch with the aliens' manager to describe your slightly-less-than-satisfactory experience, the chorus of muffled roaring through the wood encourages you to stick to the task at hand.</p>
		<p>[[dream1-22]]> Press the button[[]]</p>

p.dream1-22
	{{story.theme="d1-hut3";}}
	You press the button.
	<p>((p1))>>(())</p>
	pg.p1
		The casing for the machine begins glowing purple in <span class="styAlien">strange orbital patterns</span>. The wires out of the machine glow the same colour.
		<p>((p2))>>(())</p>
	pg.p2
		You leave the hut, and are astounded by the sight. The antenna's <i>connected</i> to the moon with a <span class="styAlien">solid purple beam</span>, morphing with some strange plasma energy. Probably.
		<p>((p3))>>(())</p>
	pg.p3
		You notice one of the dishes lower on the tower is also glowing, and producing its own, fainter <span class="styAlien">beam</span>. You follow the beam to its end point, on the plateau floor a way from the hut.
		<p>((p4))>>(())</p>
	pg.p4
		It takes a second to make out the object materializing at the point impact, but what you see explains the button's label earlier.
		<p>It's a perfectly flat disc with a strange glowing surface, and seems to be about the height of a door.</p>
		<p>According to <i>Every sci-fi show you've watched</i>, this has to be a <span class="styAlien">portal</span>. You don't know where it goes, but at the moment it's the only way out of this place, and the <span class="styRed">monsters</span> are fast approaching.</p>
		<p>[[dream1-23]]> Run to portal[[]]</p>

p.dream1-23
	{{story.theme="dream1";}}
	You reckon about 30 seconds have passed since you saw the countdown, thanks to all your distractions. <i>No time to lose now</i>, you think to yourself, as you sprint towards the <span class="styAlien">portal</span> and the hordes close in.
	<p>((p1))>>(())</p>
	pg.p1
		As you distance yourself from the hut, you feel an odd disturbance to your left. Like that unexplainable feeling you're being watched. You chuckle grimly, remembering you <i>are</i> being watched by the hundreds of <span class="styRed">ravenous lizard people</span> who've reached the peak by now. <i>No turning back</i>.
		<p>((p2))>>(())</p>
	pg.p2
		The sensation gets stronger. You feel like you really should give it a look.
		<p>[[dream1-23-1]]> Turn your head[[]]</p>
		<p>[[dream1-23-2]]> Don't turn[[]]</p>

p.dream1-23-1
	You turn your head.
	<p>[[dream1-24]]>>[[]]</p>

p.dream1-23-2
	<span class="styDream">You turn your head.</span>
	<p>[[dream1-24]]> what no I didn't[[]]</p>

p.dream1-24
	You're looking towards the tower. You notice the beam heading in your direction towards the <span class="styAlien">portal</span>, but also another beam, from the second dish. Pointed somewhere else on the plateau.
	<p>((p1))>>(())</p>
	pg.p1
		You squint again at the beam's destination, and are met with an even more unnerving discovery.
		<p>You <i>were</i> being watched.</p>
		<p>((p2))>>(())</p>
	pg.p2
		You identify the silhouette is that of a person immediately, but looking closer you realise something's very wrong. You know this person.
		<p class="styDream">It's you.</p>
		<p>((p3))>>(())</p>
	pg.p3
		Or, at least, something that looks like you. You know how these alien things go in sci-fi films. It's a distraction, right?
		<p>The more you look, however, the more uncertain you become. You're <i>(it's)</i> carrying nothing, just as you began. Its clothes are different to the ones you're wearing now - but ones that you do own. It's rightly unnerved, given the <span class="styRed">monsters</span> are almost upon you <i>(it! well, also you)</i>. </p>
		<p>The (alien) clock's ticking.</p>
		<p>[[dream1-25]]> Protect yourself[[]]</p>
		<p>[[dream1-24-1]]> Ignore yourself[[]]</p>

p.dream1-24-1
	You continue running towards the <span class="styAlien">portal</span>, ignoring the risk you're putting yourself in.
	<p>[[dream1-25]]> Look after yourself[[]]</p>
	<p>[[dream1-24-2]]> Invalidate yourself[[]]</p>

p.dream1-24-2
	<i>No, that's not you</i>. You have to keep going. You assume it's being attacked by now. 
	<p>[[dream1-25]]> Save yourself[[]]</p>
	<p>[[dream1-27]]> Give up on yourself[[]]</p>

#<< dodge roll! into portal, and somewhere else.

p.dream1-25
	You sprint over to yourself, and reach them just before the <span class="styRed">monsters</span> do. You're just as surprised to see you as you are. You offer yourself a hopeful smile, and you return it shyly.
	<p>You both look toward the <span class="styAlien">portal</span>, and find your path riddled with the <span class="styRed">monsters</span>. This is gonna slow things down a bit.</p>
	<p>((p1))> Examine you(())</p>
	<p>((p3))> Check you're the real you(())</p>
	<p>((p2))> Give you your wrench(())</p>
	<p>[[dream1-25-2]]> Make for the portal[[]]</p>

	pg.p1
		You take a quick look at yourself. It's you for sure, which you find fairly unnerving. Maybe the aliens are into time travel too? Or it's you from a parallel universe? You can discuss this with yourself once you're through the portal.
	pg.p2
		You think you could do with a bit of self-defence, so offer yourself your wrench. You're keeping the sword though. Gotta establish some authority over yourself somehow.
		{{story.removeFromInventory('wrench'); story.d1_clone_wrench=true;}}

	pg.p3
		You ask yourself to tell you something only the real you would know. You respond by telling you to be stop being a pompous ass and help them. Sounds authentic enough.
	
p.dream1-25-2
	{{deductHealth(17);}}
	You start your epic sprint to the <span class="styAlien">portal</span>, slashing any <span class="styRed">foes</span> who dare get in your way. Of course you're getting stabbed a lot. You're not ninjas or anything.
	<p>You find your path blocked by a row of the <span class="styRed">giant lizards</span>. They each raise their swords in unison, ready to strike.</p>
	<p>[[dream1-25-3-1]]Double Dodge Roll![[]]</p>
	<p>[[dream1-25-3-2]]Run to side[[]]</p>
	<p>[[dream1-25-3-3]]Engage monsters[[]]</p>


p.dream1-25-3-1
	Just as expected, the perfectly-executed double-roll completely stunned the <span class="styRed">enemies</span>, allowing you to effortlessly glide below their blades. You see yourself perform the same roll next to you, allowing you to truly take in your <span class="styCool">sensational</span> evasion skills.
	<p>[[dream1-26]]Continue running.[[]]</p>

p.dream1-25-3-2
	{{deductHealth(7);}}
	You run to one side of the <span class="styRed">lizard squad</span>, while you jolt to the other side. It wasn't quite effective enough though, as you're both struck by the outermost <span class="styRed">enemy</span>'s blades. Perhaps a cooler move would've done you more justice, but no time to dwell on mistakes. 
	<p>[[dream1-26]]Continue running.[[]]</p>

p.dream1-25-3-3
	{{deductHealth(15);}}
	You arrogantly attempt to take on the <span class="styRed">lizard squad</span>, swinging your sword at the centremost one. 
	{{? story.d1_clone_wrench}}
		You also swing the wrench against a second <span class="styRed">enemy</span>, knocking him over with surprising ease. You seem pretty strong for a change.
	{{?}}
	While your attack does clear a path, you seem to forget all the other <span class="styRed">monsters</span>, who take the opportunity to smite you both. Ouch.
	<p>[[dream1-26]]Continue running.[[]]</p>

p.dream1-26
	{{deductHealth(6);}}
	{{story.theme="d1-portal";}}
	Thankfully, the <span class="styRed">monsters</span> seem pretty cautious around the purple energy and have made a small clearing in front of the <span class="styAlien">portal</span>. Your final sprint is objection-free, and you reach the portal with maybe seconds to spare.
	<p>((d1_portal_1))> Examine portal(())</p>
	<p>((d1_portal_2))> Hit portal with sword(())</p>
	{{? story.isInInventory('twigs')}}
		<p>((d1_portal_3))> Throw twigs in portal(())</p>
	{{?}}	
		
	<p>[[dream1-26-1]]> Enter portal[[]]</p>
p.dream1-26-1
	You're so focused on the technological miracle in front of you that you fail to see the rogue <span class="styRed">monster</span> taking his chances with a dive at the both of you, throwing you off to the side.
	<p>You swing at the <span class="styRed">monster</span> while laying on the ground, cutting his arm clean off. That'll buy you a couple of seconds.</p>
	<p>((p1))>>(())</p>
	pg.p1
		As you get up, you see the tower, and its <span class="styAlien">glowing energy beam</span> fuelling the portal.
		<p>((p2))>>(())</p>
	pg.p2
		And then you don't.
		<p>The beam fizzles out before your eyes. You're out of time. But the portal's still open.</p>
		<p>((p3))>>(())</p>
	pg.p3
		The secondary beam begins to fizzle out too, giving you one last opportunity to save yourself.
		<p>You, on the other hand, are still dealing with what's left of that <span class="styRed">monster</span>, and has no idea you're about to be stranded here.</p>
		<p>[[dream1-26-2]]> Jump into portal[[]]</p>
		<p>[[dream1-26-3]]> Push you into portal[[]]</p>

p.dream1-26-2
	{{story.theme="fadeWhite";}}
	You jump through the <span class="styAlien">portal</span>. Looking over your shoulder, you see a look of surprise on yourself as the disc collapses in size until it vanishes.
	<p><i>You can't save everyone</i>, you tell yourself.</p>
	<p>But you could've saved you.</p>
	<p>((p1))>>(())</p>
	pg.p1
		<p>You're not quite sure what on earth happened back there. Or if any of this is real.</p>
		<p>((p2))>>(())</p>
	pg.p2
		<p>But at least you're alive.</p>
		<p>[[prologuefin]]>>[[]]</p>

p.dream1-26-3
	{{ story.d1_pushyou = true;}}
	{{story.theme="dream1";}}
	You grab yourself by the shoulders and shove you into the <span class="styAlien">portal</span>. You watch as you fade through the material, and the disc collapses into nothingness.
	<p>You're greeted with hundreds more <span class="styRed">monsters</span> that were occluded earlier. Now the beam's shut down, the hordes draw in.</p>
	<p>[[dream1-26-4]]> Fight to the death[[]]</p>
	<p>[[dream1-26-5]]> Surrender to your fate[[]]</p>

p.dream1-26-4
	You give the strongest war cry you can muster and run at the incoming <span class="styRed">forces</span>, your sword poised for attack.
	<p>You know there's no hope of making it out alive, but there's no way you'll give up without a fight.</p>
	<p>((p1))>>(())</p>
	pg.p1
		{{setHealth(1);}}
		You take out an impressive number of the <span class="styRed">monsters</span>, but you're terribly outnumbered. As your energy wears out, you collapse to the ground on one knee.
		<p>You still don't understand thing about this godforsaken land. But at least you saved yourself.</p>
		<p>[[dream1-26-7]]> Close your eyes[[]]</p>

p.dream1-26-5
	{{ story.removeFromInventory('bluntSword');}}
	You drop your sword, and take a seat on the ground.
	<p>You look up at the beautiful starry sky, the expanse of desert sands, and the <span class="styRed">army of monsters</span> seconds away from obliterating you.</p>
	<p>There's no way you can make it out of this godforsaken land. But at least you saved yourself.</p>
	{{? story.isInInventory('twigs')}}
		<p>((p1))> You've still got the twigs!(())</p>
	{{?}}
	<p>[[dream1-26-6]]> Close your eyes[[]]</p>

	pg.p1
		That's right! You take them out of your pocket, roll them in the palm of your hand, and smile. You might've started with nothing, but at least you didn't end with nothing. 

p.dream1-26-6
	{{story.theme="fadeBlack";setHealth(0);}}
	You close your eyes, as the <span class="styRed">monsters</span> reach you.
	<p><i>Back to nothingness</i>, you imagine. <i>But at least it was a good run.</i></p>
	<p>[[dream1-28]]>>[[]]</p>

p.dream1-26-7
	{{story.theme="fadeBlack";setHealth(0);}}
	You close your eyes, as your final piece of life fades out.
	<p><i>Back to nothingness</i>, you imagine. <i>But at least it was a good run.</i></p>
	<p>[[dream1-28]]>>[[]]</p>

p.dream1-27
	{{deductHealth(5); story.d1_ignoreyou = true;}}
	{{story.theme="d1-portal";}}
	You reach the <span class="styAlien">portal</span> without your 'clone'. The <span class="styRed">monsters</span> got a few scratches on you as they reached the center of the plateau. Thankfully, they seem pretty cautious around the purple energy and have made a small clearing around the disc.
	<p>No time to waste.</p>
	<p>((d1_portal_1))> Examine portal(())</p>
	<p>((d1_portal_2))> Hit portal with sword(())</p>
	{{? story.isInInventory('twigs')}}
		<p>((d1_portal_3))> Throw twigs in portal(())</p>
	{{?}}	
		
	<p>[[dream1-27-1]]> Enter portal[[]]</p>

pg.d1_portal_1
	Up close, you can properly observe the <span class="styAlien">portal</span>'s fluid surface, which is slowly spiralling towards the circle's center. It seems to be pulling material towards it and into the vortex, as you can see from the dust lifted off the floor. It's clearly inviting you to jump in.

pg.d1_portal_2
	For all the stupid things you've considered hitting with a sword previously, this one doesn't seem like such a bad idea. Though it's not much of a hit; the sword sails freely through the layer. It doesn't look any different having been through the material, which is good to know.

pg.d1_portal_3
	You toss the twigs through the <span class="styAlien">portal</span>. The fluid surface deforms slightly as they pass through, then returns to its flat state. It seems safe enough to enter yourself.
	{{story.removeFromInventory('twigs');}}


p.dream1-27-1
	{{story.theme="fadeWhite";}}
	You jump through the <span class="styAlien">portal</span>.
	<p>Looking behind you, you see the antenna beam fizzle out and the disc collapse out of existence.</p>
	<p>((p1))>>(())</p>
	pg.p1
		<p>You're not quite sure what on earth happened back there. Or if any of this is real.</p>
		<p>((p2))>>(())</p>
	pg.p2
		<p>But at least you're alive.</p>
		<p>[[prologuefin]]>>[[]]</p>

p.dream1-28
	{{story.theme="fadeWhite";}}
	{{ story.removeFromInventory('bluntSword'); story.removeFromInventory('wrench'); story.removeFromInventory('twigs'); story.removeFromInventory('lockpicks'); }}
	{{ if(story.d1_clone_wrench){story.putInInventory('wrench');} }}
	{{setHealth('38');}}
	You are now yourself, travelling through some portal.
	<p>((p1))>>(())</p>
	pg.p1
		<p>You've got no idea what just happened back there, or who that clone of you was, or where you're going.</p>
		<p>((p2))>>(())</p>
	pg.p2
		{{? story.d1_clone_wrench }}
			<p>But at least you've got a wrench.</p>
		{{??}}
			<p>But at least you're alive.</p>
		{{?}}
			<p>[[prologuefin]]>>[[]]</p>

p.prologuefin
	{{story.theme='intro';}}
	PROLOGUE END.
	<p>((p1))>>(())</p>
	pg.p1
		<p class="styAlien">OPERATION STATE SUCCESS.</p>
		<p>((p2))>>(())</p>
	pg.p2
		<p class="styAlien">SUBJECT HEALTH {{=story.health}}% OPTIMALITY.</p>
		<p>((p3))>>(())</p>
	pg.p3
		{{? story.d1_ignoreyou}}
			<p class="styAlien">SUBJECT MORALITY NONE.</p>
		{{??}}
			{{? story.d1_pushyou}}
				<p class="styAlien">SUBJECT MORALITY GOOD.</p>
			{{??}}
				<p class="styAlien">SUBJECT MORALITY QUESTIONABLE.</p>
			{{?}}
		{{?}}
		<p>((p4))>>(())</p>
	pg.p4
		<p class="styAlien">NEXT OPERATION INITIALIZING...</p>
		<p>[[end]]>>[[]]</p>
p.end
	Thanks for playing ;)

p.death
	{{story.theme='fadeBlack';}}
	Your decisions have resulted in your untimely demise.
	<p>Maybe next time you'll do better than this.</p>
	<p>((p1))>>(())</p>
	pg.p1
		{{$('#resetHost').click();}}
`