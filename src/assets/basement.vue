<template>
	<div class="wrapper">
		<div class="main">
			<div class="img">
				<div class="person"></div>
				<div class="jw-eyes"></div>
				<div class="closed-jw-eyes"></div>
				<div class="mj-eyes"></div>
				<div class="closed-mj-eyes"></div>
				<div class="stars" v-for="(val, index) in stars"></div>
				<div class="flowers" v-for="(val, index) in flowers">
					<div class="flower"></div>
				</div>
			</div>
			<div class="content">
				<h1 class="title">초대합니다.</h1>
				<span class="greeting">평생을 같이하고 싶은 사람을 만나<br />한 가정을 이루게 되었습니다.<br />오셔서 저희의 앞날을 축복해 주시고<br />격려해 주시길 소망합니다.</span>
				<div class="f-tree">
					<span class="tree">노경수, 서정자의 장남<span class="child">재원</span></span><br />
					<span class="tree">강성문, 김정자의 차녀<span class="child">민주</span></span>
				</div>
			</div>
			<div class="divider"></div>
			<div class="map-wrapper">
				<div class="map-title">오시는 길</div>
				<span class="map-desc">지도를 터치하시면 다음지도로 연결됩니다.</span>
				<div class="link" @click="linkToDaumMap('svs')"></div>
				<div class="map"></div>
				<div class="zoom map1">
					<div class="plus" @click="zoomIn(map)"></div>
					<div class="minus" @click="zoomOut(map)"></div>
				</div>
			</div>
			<div class="wed-loc">
				<div class="date">2017년 11월 4일 토요일 낮 12시</div>
				<div class="loc">세븐스프링스 목동</div> 
			</div>
			<dl class="loc-desc">
				<dt class="name">주소</dt>
				<dd class="desc">서울시 양천구 목동동로 293 현대 41타워 41층</dd>
				<dt class="phone name">전화</dt>
				<dd class="phone-number desc"><a href="tel:0319768300">02. 2168. 2511</a></dd><br />
				<dt class="sub name">지하철</dt>
				<dd class="sub desc">오목교역(목동운동장앞) 2번출구, 도보 10분</dd><br />
				<dt class="bus name">버스</dt>
				<dd class="bus desc">간선: 571, 603 | 지선: 6624, 6627, 6637</dd><br />
				<dt class="parking name">주차장</dt>
				<dd class="parking desc">2시간 무료</dd>
			</dl>	
			<div class="parking-desc2">* 주차공간 부족시 목동 공영주차장을 이용해 주세요.</div>
			<div class="publick-parking-area-link" @click="openPopup">목동 공영주차창 지도 보기<div class="arrow"></div></div>
		</div>
		<div class="popup">
			<div class="pbpa-desc">
				<span class="map-desc">지도를 터치하시면 다음지도로 연결됩니다.</span>
				<div class="link2" @click="linkToDaumMap('pp')"></div>
				<div class="map2"></div>
				<div class="zoom map2-1">
					<div class="plus" @click="zoomIn(map2)"></div>
					<div class="minus" @click="zoomOut(map2)"></div>
				</div>
				<div class="pbpa-name">목동 공영주차장</div>
				<div class="pbpa-address">서울시 양천구 목동 915 (현대백화점 옆)</div>
				<div class="close" @click="hidePopup"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'basement',
		props: {
			loc: {
				type: Object,
				default: function() {
					return {
						name: '목동 41타워 41층 세븐스프링스',
						lat: 37.5281527,
						lng: 126.87574569999992	
					};
				}
			},
			parkingLoc: {
				type: Object,
				default: function() {
					return {
						name: '목동 공영 주차장',
						lat: 37.527481,
						lng: 126.876990
					};
				}
			},
			flowers: {
				type: Array,
				default: function() {
					return new Array(19);
				}
			},
			stars: {
				type: Array,
				default: function() {
					return new Array(8);
				}
			}
		},
		data: function () {
			return {
				map: {
					type: Object
				},
				map2: {
					type: Object
				}
			};
		},
		mounted: function () {
			const that = this;

			this.setElementsClass();
			this.setEyesAnimation();
			this.setMap();
			this.setMap2();
		},
		methods: {
			setElementsClass: function() {
				let i = 0,
					j = 0;

				for (i = 0; i < this.flowers.length; i++) {
					if (Math.random() > 0.66) {
						this.$el.querySelectorAll('.flowers')[i].classList.add('big');	
						this.$el.querySelectorAll('.flowers')[i].style.top = '-15px';
					}
					this.$el.querySelectorAll('.flowers')[i].classList.add(`f${i+1}`);
				}
				for (j = 0; j < this.stars.length; j++) {
					this.$el.querySelectorAll('.stars')[j].classList.add(`s${j+1}`);
				}
			},
			setEyesAnimation: function () {
				const that = this;

				const jw = setInterval(function () {
					that.closeEyes(that.$el.querySelector('.jw-eyes'), 1);
				}, 3000);

				setTimeout(function () {
					const mj = setInterval(function () {
						that.closeEyes(that.$el.querySelector('.mj-eyes'), 2);
					}, 3000);	
				}, 1000);
			},
			closeEyes: function (target, cnt) {
				const that = this;
				target.classList.add('hide');
				target.nextSibling.classList.add('show');
				setTimeout(function () {
					target.classList.remove('hide');
					target.nextSibling.classList.remove('show');
					cnt--;
					if (cnt > 0) {
						setTimeout(function () {
							that.closeEyes(target, cnt);
						}, 100);
					}
				}, 100);
			},
			linkToDaumMap: function (location) {
				let loc;
				if (location === 'svs') {
					loc = this.loc;
				} else {
					loc = this.parkingLoc;
				}
				window.open(`http:\/\/map.daum.net\/link\/map\/${loc.name},${loc.lat},${loc.lng}`, '_blank');
			},
			setMap: function () {
				const container = this.$el.querySelector('.map'),
					options = {
						center: new daum.maps.LatLng(37.526908, 126.875397),
						level: 4
					},
					map = new daum.maps.Map(container, options),
					marker = new daum.maps.Marker({
						map: map,
						position: new daum.maps.LatLng(this.loc.lat, this.loc.lng),
						title: '현대 41타워 41층',
						image: new daum.maps.MarkerImage('/src/img/marker.svg' , new daum.maps.Size(32, 46), new daum.maps.Point(16, 46))
					});
					map.name = 'svs';

				this.map = map;
			},
			setMap2: function () {
				const container = this.$el.querySelector('.map2'),
					options = {
						center: new daum.maps.LatLng(this.parkingLoc.lat, this.parkingLoc.lng),
						level: 5,
						draggable: false
					},
					map = new daum.maps.Map(container, options),
					marker = new daum.maps.Marker({
						map: map,
						position: new daum.maps.LatLng(this.parkingLoc.lat, this.parkingLoc.lng),
						title: '목동 공영 주차장',
						image: new daum.maps.MarkerImage('/src/img/marker.svg' , new daum.maps.Size(32, 46), new daum.maps.Point(16, 46))
					}),
					customOverlay = new daum.maps.CustomOverlay({
						map: map,
						position : new daum.maps.LatLng(this.parkingLoc.lat, this.parkingLoc.lng),
						content : '<div class="marker-info c-m2">목동 공영 주차장</div>',
						yAnchor: 1
					});
					map.name = 'pbpa';
					
				this.map2 = map;
			},
			openPopup: function () {
				this.$el.querySelector('.main').classList.add('hide');
				this.$el.querySelector('.popup').classList.add('show');
			},
			hidePopup: function () {
				this.$el.querySelector('.popup').classList.remove('show');
				this.$el.querySelector('.main').classList.remove('hide');
			},
			zoomIn: function (map) {
				if (map.name === 'svs') {
					map.setLevel(map.getLevel() - 1, {
						anchor:new daum.maps.LatLng(this.loc.lat, this.loc.lng)
					});	
				} else {
					map.setLevel(map.getLevel() - 1);
				}
			},
			zoomOut: function (map) {
				if (map.name === 'svs') {
					map.setLevel(map.getLevel() + 1, {
						anchor:new daum.maps.LatLng(this.loc.lat, this.loc.lng)
					});	
				} else {
					map.setLevel(map.getLevel() + 1);
				}
			}
		},

	};
</script>

<style scope>
	.wrapper {
		position: relative;

		width: 100%;

		margin: 0 auto;

		overflow: hidden;

		max-width: 320px;
	}

	span {
		display: inline-block;
	}

	.main.hide {
		display: none;
	}

	.img {
		position: relative;

		width: 100%;
		height: 290px;

		background-image: url('/src/img/invitation_img_bg.svg');

		overflow: hidden;
	}

	.person {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		background-image: url('/src/img/invitation_img.svg');

		z-index: 10;
	}

	.jw-eyes {
		position:absolute;
		top: 159.4px;
		left: 111px;

		width: 32px;
		height: 16px;

		background-image: url('/src/img/jw_eyes1.svg');

		z-index: 11;
	}

	.jw-eyes.hide {
		display: none;
	}

	.closed-jw-eyes {
		position:absolute;
		top: 159.4px;
		left: 111px;

		width: 32px;
		height: 16px;

		background-image: url('/src/img/jw_eyes2.svg');	
		background-repeat: no-repeat;

		z-index: 9;
	}

	.closed-jw-eyes.show {
		z-index: 11;
	}

	.mj-eyes {
		position:absolute;
		top: 198px;
		right: 76.1px;

		width: 30px;
		height: 15px;

		position:absolute;
		background-image: url('/src/img/mj_eyes1.svg');

		z-index: 11;
	}

	.mj-eyes.hide {
		display: none;
	}

	.closed-mj-eyes {
		position:absolute;
		top: 198px;
		right: 76.1px;

		width: 30px;
		height: 15px;

		background-image: url('/src/img/mj_eyes2.svg');

		z-index: 9;
	}

	.closed-mj-eyes.show {
		z-index: 11;
	}

	.stars {
		position: absolute;

		background-image: url('/src/img/star.svg');
		background-size: 100%;

		animation-name: blink;
		animation-timing-function: ease-in-out;
		animation-iteration-count: infinite;
		animation-duration: 0.8s;
		animation-direction: alternate;

		z-index: 5;
	}

	.s1 {
		top: 14px;
		left: 25px;

		width: 9px;
		height: 9px;	
	}

	.s2 {
		top: 24px;
		left: 103px;

		width: 5px;
		height: 5px;	

		animation-delay: 0.2s;
	}

	.s3 {
		top: 7px;
		right: 72px;

		width: 7px;
		height: 7px;	

		animation-delay: 0.8s;
	}

	.s4 {
		top: 133px;
		left: 16px;

		width: 5px;
		height: 5px;	

		animation-delay: 0.5s;
	}

	.s5 {
		top: 44px;
		right: 15px;

		width: 9px;
		height: 9px;	

		animation-delay: 0.2s;
	}

	.s6 {
		top: 99px;
		left: 56px;

		width: 7px;
		height: 7px;	

		animation-delay: 0.7s;
	}

	.s7 {
		top: 87px;
		right: 115px;

		width: 5px;
		height: 5px;	

		animation-delay: 0.3s;
	}

	.s8 {
		top: 114px;
		right: 32px;

		width: 5px;
		height: 5px;	

		animation-delay: 0.1s;
	}

	.flowers {
		position: absolute;

		width: 10px;
		height: 10px;

		animation-name: rain;
		animation-timing-function: ease-in;
		animation-iteration-count: infinite;
		animation-duration: 8s;

		z-index: 5;
	}

	.flower {
		width: 100%;
		height: 100%;

		background-image: url('/src/img/flower.svg');
		background-size: 100%;

		animation-name: rotation;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
		animation-duration: 3s;
	}

	.big {
		width: 15px;
		height: 15px;
	}

	.f1 {
		top: -10px;
		left: -140px;

		animation-delay: -4s
	}

	.f2 {
		top: -10px;
		left: -115px;

		z-index: 15;

		animation-delay: -6.5s;
	}

	.f3 {
		top: -10px;
		left: -90px;

		animation-delay: -3.5s;
	}

	.f4 {
		top: -10px;
		left: -65px;

		animation-delay: -2s;
	}

	.f5 {
		top: -10px;
		left: -40px;

		animation-delay: -6s;

		z-index: 15;
	}

	.f6 {
		top: -10px;
		left: -15px;

		animation-delay: -3.5s;
	}

	.f7 {
		top: -10px;
		left: 10px;

		animation-delay: -1s;
	}

	.f8 {
		top: -10px;
		left: 35px;

		animation-delay: -6s;
	}

	.f9 {
		top: -10px;
		left: 60px;

		animation-delay: -0.2s;
	}

	.f10 {
		top: -10px;
		left: 85px;

		animation-delay: -4.5s;
	}

	.f11 {
		top: -10px;
		left: 110px;

		animation-delay: 7.5s;
	}

	.f12 {
		top: -10px;
		left: 135px;

		animation-delay: 2.5s;
	}

	.f13 {
		top: -10px;
		left: 160px;

		animation-delay: 6.5s;
	}

	.f14 {
		top: -10px;
		left: 185px;

		animation-delay: -5s;
	}

	.f15 {
		top: -10px;
		left: 210px;

		animation-delay: -1.5s;
	}

	.f16 {
		top: -10px;
		left: 235px;

		animation-delay: -7s;
	}

	.f17 {
		top: -10px;
		left: 260px;
	}

	.f18 {
		top: -10px;
		left: 285px;

		animation-delay: 5.5s;
	}

	.f19 {
		top: -10px;
		left: 310px;

		animation-delay: 0.1s;
	}

	.content {
		margin-top: 31px;

		padding: 0 16px;

		text-align: center;
	}

	.title {
		font-weight: 500;
		color: #464646;
		font-size: 18px;
		line-height: 1.47;
	}

	.greeting {
		width: 261px;
		height: 105px;

		color: #999;
		font-size: 14px;
		line-height: 1.89;

		margin-top: 20px;
	}

	.f-tree {
		margin: 30px auto 0 auto;
	}

	.tree {
		font-size: 14px;
		line-height: 1.6;
		color: #464646;
	}

	.child {
		margin-left: 10px;

		font-size: 14px;
		color: #84b6de;
	}

	.divider {
		width: 31px;
		height: 16px;

		background-image: url('/src/img/flower_line.svg');

		margin: 33px auto 0 auto;
	}

	.map-wrapper {
		position: relative;

		margin-top: 33px;

		text-align: center;
	}

	.map-title {
		font-size: 18px;
		line-height: 1.24;
		color: #464646;
	}

	.map-desc {
		font-size: 12px;
		line-height: 1.5;
		color: #a0a0a0;

		margin-top: 14px;
	}

	.link {
		position: absolute;
		bottom: 0;
		left: 0;

		width: 320px;
		height: 290px;

		z-index: 10;
	}

	.marker-info {
		position: relative;
		bottom: 49px;
		width: 110px;
		height: 39px;

		font-size: 12px;
		text-align: center;
		color: #464646;
		line-height: 2.3;

		background-image: url('/src/img/marker_popup.svg');
	}

	.zoom {
		position: absolute;
		bottom: 8px;
		right: 8px;

		width: 35px;
		height: 69px;

		border-radius: 2px;

		background-color: #fff;

		box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.45);

		z-index: 11;
	}

	.zoom:after {
		position: absolute;
		top: 50%;
		left: 0;

		content: '';

		transform: translateY(-50%);

		height: 0;
		width: 35px;

		border-top: 1px solid #dbdde0;
	}

	.plus {
		position: relative;

		width: 35px;
		height: 34px;
	}

	.plus:before {
		position: absolute;
		top: 50%;
		left: 50%;

		content: '';

		transform: translate(-50%, -50%);

		height: 0;
		width: 12px;

		border-top: 2px solid #787878;
	}

	.plus:after {
		position: absolute;
		top: 50%;
		left: 50%;

		content: '';

		transform: translate(-50%, -50%);

		height: 12px;
		width: 0;

		border-right: 2px solid #787878;
	}

	.minus {
		position: relative;

		width: 35px;
		height: 33px;
	}

	.minus:before {
		position: absolute;
		top: 50%;
		left: 50%;

		content: '';

		transform: translate(-50%);

		height: 0;
		width: 12px;

		border-top: 2px solid #787878;
	}

	.map {
		width: 320px;
		height: 290px;

		margin-top: 10px;

		z-index: 1;
	}

	.wed-loc {
		width: 100%;
		height: 81px;

		padding-top: 25px;

		background-color: #acd3ec;

		text-align: center;
	}

	.date {
		font-size: 18px;
		line-height: 1.47;
		color: #fff;
	}

	.loc {
		font-weight: 300;
		font-size: 18px;
		line-height: 1.44;
		color: #fff;
	}

	dt, dd {
		display: inline-block;

		margin: 0;
		padding: 0;

		font-weight: 500;
	}

	.loc-desc {
		padding: 0 20px;

		margin-top: 30px;
	}

	.name {
		font-size: 12px;
		color: #a0a0a0;
		line-height: 1.5;

		width: 34px;
	}

	.desc {
		font-size: 12px;
		color: #464646;
		line-height: 1.5;

		margin-left: 12px;
		margin-bottom: 14px;
	}

	.phone-number a {
		font-size: 12px;
		color: #464646;
		line-height: 1.5;
	}

	.parking-desc2 {
		font-size: 12px;
		color: #464646;
		line-height: 1;

		margin: 7px 0 0 20px;
	}

	.publick-parking-area-link {
		font-size: 12px;
		color: #84b6de;
		line-height: 1.5;

		height: 18px;

		margin: 9px 0 31px 27px;

		cursor: pointer;
	}

	.arrow {
		display: inline-block;
		vertical-align: -1px;

		width: 6px;
		height: 10px;

		margin-left: 5px;

		background-image: url('/src/img/icon_arrow.svg');
	}

	@keyframes blink {
		from {
			transform: scale(1);
		}

		to {
			transform: scale(0.3);
		}
	}

	@keyframes rain {
		from {
			transform: translate(0px, 0px);
		}

		to {
			transform: translate(100px, 320px);
		}
	}

	@keyframes rotation {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	.popup {
		position: fixed;
		top: 30%;
		left: 50%;

		transform: translateX(-50%);

		width: 100%;

		margin: 0 auto;

		overflow: hidden;

		max-width: 320px;

		opacity: 0;

		z-index: -1;
	}

	.popup.show {
		top: 0;
		opacity: 1;
		z-index: 10;
	}

	.pbpa-desc {
		margin-top: 34px;

		text-align: center;
	}

	.link2 {
		position: absolute;
		top: 75px;
		left: 0;

		width: 320px;
		height: 290px;

		z-index: 10;
	}

	.map2 {
		width: 320px;
		height: 290px;

		margin-top: 9px;
	}

	.map2-1 {
		bottom: 135px;
	}

	.pbpa-name {
		text-align: left;
		font-size: 17px;
		color: #464646;
		line-height: 1.55;

		margin-top: 21px;
		margin-left: 20px;
	}

	.pbpa-address {
		text-align: left;
		font-size: 12px;
		color: #464646;
		line-height: 1.5;

		margin-left: 20px;
		margin-bottom: 62px;
	}

	.close {
		position: absolute;
		top:16px;
		right: 16px;

		width: 16px;
		height: 16px;

		cursor: pointer;

		background-image: url('/src/img/icon_close.svg');
	}

</style>