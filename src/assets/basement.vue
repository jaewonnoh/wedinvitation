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
					<span class="tree">노경수, 서정자의 장남 <span class="child">재원</span></span><br />
					<span class="tree">강성문, 김정자의 차녀 <span class="child">민주</span></span>
				</div>
			</div>
			<div class="divider"></div>
			<div class="map-wrapper">
				<div class="map-title">오시는 길</div>
				<span class="map-desc">지도를 터치하시면 다음지도로 연결됩니다.</span>
				<div class="link" @click="linkToDaumMap('sv')"></div>
				<div class="map"></div>
			</div>
			<div class="wed-loc">
				<div class="date">2017년 11월 4일 토요일 낮 12시</div>
				<div class="loc">세븐스프링스 목동</div> 
			</div>
			<dl class="loc-desc">
				<dt class="parking-name">주소</dt>
				<dd class="parking-desc">서울시 양천구 목동동로 293 현대 41타워 41층</dd>
				<dt class="parking-name">전화</dt>
				<dd class="parking-desc"><a href="tel+0319768300">02.2168.2511</a></dd>
				<dt class="sub-name">지하철</dt>
				<dd class="sub-desc">오목교역(목동운동장앞) 2번출구, 도보 10분</dd>
				<dt class="bus-name">버스</dt>
				<dd class="bus-desc">간선: 571, 603 | 지선: 6624, 6627, 6637</dd>
				<dt class="parking-name">지하철</dt>
				<dd class="parking-desc">2시간 무료</dd>
			</dl>	
			<div class="parking-desc2">(주차공간 부족시 목동 공영주차장을 이용해 주세요.)</div>
			<div class="publick-parking-area-link" @click="openPopup">목동 공영주차창 지도 보기<div class="arrow"></div></div>
		</div>
		<div class="popup">
			<div class="pbpa-desc">
				<div class="map2"></div>
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
						lat: 37.528899,
						lng: 126.878523
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
				if (location === 'sv') {
					loc = this.loc;
				} else {
					loc = this.parkingLoc;
				}
				console.log(this.loc);
				window.open(`http:\/\/map.daum.net\/link\/map\/${loc.name},${loc.lat},${loc.lng}`, '_blank');
			},
			setMap: function () {
				const container = this.$el.querySelector('.map'),
					options = {
						center: new daum.maps.LatLng(this.loc.lat, this.loc.lng),
						level: 4
					},
					map = new daum.maps.Map(container, options);

				new daum.maps.Marker({
					map: map,
					position: new daum.maps.LatLng(this.loc.lat, this.loc.lng),
					title: '현대 41타워 41층',
					image: new daum.maps.MarkerImage('/src/img/marker.svg' , new daum.maps.Size(32, 46), new daum.maps.Point(16, 46))
				});
			},
			setMap2: function () {
				const container = this.$el.querySelector('.map2'),
					options = {
						center: new daum.maps.LatLng(this.parkingLoc.lat, this.parkingLoc.lng),
						level: 5,
						draggable: false
					},
					map = new daum.maps.Map(container, options);

				new daum.maps.Marker({
					map: map,
					position: new daum.maps.LatLng(this.parkingLoc.lat, this.parkingLoc.lng),
					title: '목동 공영 주차장',
					image: new daum.maps.MarkerImage('/src/img/marker.svg' , new daum.maps.Size(32, 46), new daum.maps.Point(16, 46))
				});
			},
			openPopup: function () {
				this.$el.querySelector('.main').classList.add('hide');
				this.$el.querySelector('.popup').classList.add('show');
			},
			hidePopup: function () {
				this.$el.querySelector('.popup').classList.remove('show');
				this.$el.querySelector('.main').classList.remove('hide');
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
		height: 268px;

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

		/*z-index: 10;*/
	}

	.jw-eyes {
		position:absolute;
		top: 130px;
		left: 112px;

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
		top: 130px;
		left: 112px;

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
		top: 169px;
		right: 78px;

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
		top: 169px;
		right: 78px;

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

		animation-delay: 5s;
	}

	.f15 {
		top: -10px;
		left: 210px;

		animation-delay: 1.5s;
	}

	.f16 {
		top: -10px;
		left: 235px;

		animation-delay: 7s;
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

		color: #84b6de;
	}

	.divider {
		width: 16px;
		height: 0;

		border-top: 1px solid #505050;

		margin: 40px auto 0 auto;
	}

	.map-wrapper {
		position: relative;

		margin-top: 40px;

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
		font-weight: 300;
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

	.loc-desc {
		padding: 0 16px;

		margin-top: 30px;
	}

	.sub-name {
		font-weight: 600;
		font-size: 14px;
		color: #4b5262;
		line-height: 1;

		margin-top: 30px;
		margin-bottom: 10px;
	}

	.sub-desc {
		font-size: 14px;
		color: #4b5262;
		line-height: 1;
	}

	.bus-name {
		font-weight: 600;
		font-size: 14px;
		color: #4b5262;
		line-height: 1;

		margin-top: 20px;
		margin-bottom: 10px;
	}

	.bus-desc {
		font-size: 14px;
		color: #4b5262;
		line-height: 1;
	}

	.parking-name {
		font-weight: 600;
		font-size: 14px;
		color: #4b5262;
		line-height: 1;

		margin-top: 20px;
		margin-bottom: 10px;
	}

	.parking-desc {
		font-size: 14px;
		color: #4b5262;
		line-height: 1;

		margin-bottom: 8px;
	}

	.parking-desc2 {
		font-size: 12px;
		color: #4b5262;
		line-height: 1;
	}

	.publick-parking-area-link {
		font-size: 14px;
		color: #ff8f98;
		line-height: 1;
		line-height: 14px;

		margin-top: 20px;
		margin-bottom: 50px;

		cursor: pointer;
	}

	.arrow {
		display: inline-block;

		width: 7px;
		height: 12px;

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
			transform: translate(100px, 280px);
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
		padding: 0 16px;

		margin-top: 48px;
	}

	.map2 {
		width: 288px;
		height: 198px;
	}

	.pbpa-name {
		font-weight: 600;
		font-size: 14px;
		color: #4b5262;
		line-height: 1;

		margin-top: 20px;
		margin-bottom: 10px;
	}

	.pbpa-address {
		font-size: 14px;
		color: #4b5262;
		line-height: 1;

		margin-bottom: 40px;
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