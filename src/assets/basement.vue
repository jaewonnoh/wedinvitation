<template>
	<div class="wrapper">
		<div class="main">
			<div class="img">
				<div class="date-img"></div>
				<div class="person"></div>
				<div class="closed-eyes-jw"></div>
				<div class="closed-eyes-mj"></div>
				<div class="stars" v-for="(val, index) in stars"></div>
				<div class="flowers" v-for="(val, index) in flowers">
					<div class="flower"></div>
				</div>
			</div>
			<div class="content">
				<h1 class="title">초대합니다</h1>
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
					<div class="control-wrapper">
						<div class="plus" @click="zoomIn(map)"></div>
						<div class="minus" @click="zoomOut(map)"></div> 
					</div>
				</div>
			</div>
			<div class="wed-loc">
				<div class="date">2017년 11월 4일 토요일 낮 12시</div>
				<div class="loc">세븐스프링스 목동</div> 
			</div>
			<dl class="loc-desc">
				<dt class="name">주소</dt>
				<dd class="desc">서울시 양천구 목동동로 293 현대 41타워 41층</dd><br />
				<dt class="phone name">전화</dt>
				<dd class="phone-number desc"><a href="tel:0221682511">02. 2168. 2511</a></dd><br />
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
					<div class="control-wrapper">
						<div class="plus" @click="zoomIn(map2)"></div>
						<div class="minus" @click="zoomOut(map2)"></div> 
					</div>
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
						this.$el.querySelectorAll('.flowers')[i].style.top = '-25px';
					}
					if (Math.random() > 0.66) {
						this.$el.querySelectorAll('.flowers')[i].classList.add('opacity-flower');
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
					that.closeEyes('jw', 1);
				}, 3000);

				setTimeout(function () {
					const mj = setInterval(function () {
						that.closeEyes('mj', 2);
					}, 3000);
				}, 1000);
			},
			closeEyes: function (mode, cnt) {
				const that = this;
				this.$el.querySelector('.person').classList.add('hide');
				if (mode !== 'mj') {
					this.$el.querySelector('.closed-eyes-mj').classList.add('hide');
					this.$el.querySelector('.closed-eyes-jw').classList.remove('hide');
				} else {
					this.$el.querySelector('.closed-eyes-mj').classList.remove('hide');
					this.$el.querySelector('.closed-eyes-jw').classList.add('hide');
				}
				setTimeout(function () {
					that.$el.querySelector('.person').classList.remove('hide');
					if (mode !== 'mj') {
						that.$el.querySelector('.closed-eyes-mj').classList.remove('hide');
						that.$el.querySelector('.closed-eyes-jw').classList.add('hide');
					} else {
						that.$el.querySelector('.closed-eyes-mj').classList.add('hide');
						that.$el.querySelector('.closed-eyes-jw').classList.remove('hide');
					}	
					cnt--;
					if (cnt > 0) {
						setTimeout(function () {
							that.closeEyes(mode, cnt);
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
						image: new daum.maps.MarkerImage('/src/img/marker.svg' , new daum.maps.Size(24, 35), new daum.maps.Point(12, 35))
					}),
					customOverlay = new daum.maps.CustomOverlay({
						map: map,
						position : new daum.maps.LatLng(this.loc.lat, this.loc.lng),
						content : '<div class="marker-info">세븐스프링스 목동</div>',
						yAnchor: 1
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
						image: new daum.maps.MarkerImage('/src/img/marker.svg' , new daum.maps.Size(24, 35), new daum.maps.Point(12, 35))
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
		height: 275px;

		background-image: url('/src/img/invitation_img_bg.svg');

		overflow: hidden;
	}

	.date-img {
		position: absolute;
		top: 0;
		left: 50%;

		transform: translateX(-50%);

		width: 320px;
		height: 137px;

		background-image: url('/src/img/invitation_img_date.svg');

		z-index: 10;
	}

	.person {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		background-image: url('/src/img/invitation_img.svg');

		background-size: 100% 100%;

		z-index: 10;
	}

	.person.hide {
		display: none;
	}

	.closed-eyes-jw {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		background-image: url('/src/img/invitation_img_jw_blink.svg');

		background-size: 100% 100%;

		z-index: 9;
	}

	.closed-eyes-jw.hide {
		display: none;
	}

	.closed-eyes-mj {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		background-image: url('/src/img/invitation_img_mj_blink.svg');

		background-size: 100% 100%;

		z-index: 8;
	}

	.closed-eyes-mj.hide {
		display: none;
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

		width: 15px;
		height: 15px;

		animation-name: rain;
		animation-timing-function: ease-in;
		animation-iteration-count: infinite;
		animation-duration: 10s;

		z-index: 5;

		top: -15px;
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

	.opacity-flower {
		opacity: 0.5;
	}

	.big {
		top: -20px;

		width: 20px;
		height: 20px;
	}

	.f1 {
		left: -140px;

		animation-delay: -4s
	}

	.f2 {
		left: -115px;

		z-index: 15;

		animation-delay: -6.5s;
	}

	.f3 {
		left: -90px;

		animation-delay: -3.5s;
	}

	.f4 {
		left: -65px;

		animation-delay: -2s;
	}

	.f5 {
		left: -40px;

		animation-delay: -6s;

		z-index: 15;
	}

	.f6 {
		left: -15px;

		animation-delay: -3.5s;
	}

	.f7 {
		left: 10px;

		animation-delay: -1s;
	}

	.f8 {
		left: 35px;

		animation-delay: -6s;
	}

	.f9 {
		left: 60px;

		animation-delay: -9s;
	}

	.f10 {
		left: 85px;

		animation-delay: -4.5s;
	}

	.f11 {
		left: 110px;

		animation-delay: 7.5s;
	}

	.f12 {
		left: 135px;

		animation-delay: 2.5s;
	}

	.f13 {
		left: 160px;

		animation-delay: 6.5s;
	}

	.f14 {
		left: 185px;

		animation-delay: -5s;
	}

	.f15 {
		left: 210px;

		animation-delay: -1.5s;
	}

	.f16 {
		left: 235px;

		animation-delay: -7s;
	}

	.f17 {
		left: 260px;
	}

	.f18 {
		left: 285px;

		animation-delay: 5.5s;
	}

	.f19 {
		left: 310px;

		animation-delay: 3.3s;
	}

	.content {
		margin-top: 31px;

		padding: 0 16px;

		text-align: center;
	}

	.title {
		font-weight: 500;
		color: #464646;
		font-size: 19px;
		line-height: 1.47;

		margin: 0;
	}

	.greeting {
		width: 261px;
		height: 105px;

		color: #999;
		font-size: 15px;
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
		font-size: 19px;
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
		bottom: 32px;
		width: 110px;
		height: 39px;

		font-size: 12px;
		text-align: center;
		color: #464646;
		line-height: 2.5;

		background-image: url('/src/img/marker_popup.svg');
		background-repeat: no-repeat;
		background-position: center center;
	}

	.zoom {
		position: absolute;
		bottom: 0px;
		right: 0px;

		width: 51px;
		height: 85px;

		z-index: 11;
	}

	.zoom:after {
		position: absolute;
		top: 50%;
		left: 50%;

		content: '';

		transform: translate(-50%, -50%);

		height: 0;
		width: 35px;

		border-top: 1px solid #dbdde0;
	}

	.control-wrapper {
		position: relative;
		top: 8px;
		left: 50%;

		transform: translateX(-50%);

		width: 35px;
		height: 69px;

		border-radius: 2px;

		box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.45);

		background-color: #fff;
	}

	.plus {
		position: relative;

		width: 35px;
		height: 34px;

		padding: 8px 8px 0 8px;

		top: -8px;
		left: -8px;
	}

	.plus:before {
		position: absolute;
		top: 57%;
		left: 50%;

		content: '';

		transform: translate(-50%, -50%);

		height: 0;
		width: 12px;

		border-top: 2px solid #787878;
	}

	.plus:after {
		position: absolute;
		top: 57%;
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

		padding: 0 8px 8px 8px;
		
		bottom: 8px;
		left: -8px;
	}

	.minus:before {
		position: absolute;
		top: 43%;
		left: 50%;

		content: '';

		transform: translate(-50%);

		height: 0;
		width: 12px;

		border-top: 2px solid #787878;
	}

	.map {
		width: 100%;
		height: 290px;

		margin-top: 10px;

		z-index: 1;
	}

	.wed-loc {
		width: 100%;
		height: 81px;

		padding-top: 25px;

		background-color: #ADD5EF;

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

		margin-top: 4px;
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

		padding: 9px 0 31px 27px;

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
			transform: translate(100px, 310px);
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
		width: 100%;
		height: 290px;

		margin-top: 9px;
	}

	.map2-1 {
		bottom: 127px;
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
		top: 6px;
		right: 6px;

		width: 16px;
		height: 16px;

		cursor: pointer;

		background-image: url('/src/img/icon_close.svg');
		background-repeat: no-repeat;
		background-position: center center;
		padding: 10px;
	}

</style>