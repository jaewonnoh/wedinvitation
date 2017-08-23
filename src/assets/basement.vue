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
				<span class="date">2017.11.04(토) 12:00PM</span>
				<span class="location">세븐스프링스 목동점</span>
				<span class="greeting">평생을 같이하고 싶은 사람을 만나 한 가정을 이루게 되었습니다. 오셔서 저희의 시작을 지켜봐 주시고 축하해 주시면 감사하겠습니다.</span>
			</div>
			<div class="divider"></div>
			<div class="loc-desc">
				<div class="name">세븐스프링스 목동점</div>
				<div class="address">서울시 양천구 목동동로 293 현대 41타워 41층</div>
				<div class="phone">02-2168-2511</div>
				<div class="map"></div>
				<div class="sub-name">지하철</div>
				<div class="sub-desc">오목교역(목동운동장앞) 2번출구, 도보 10분</div>
				<div class="bus-name">버스</div>
				<div class="bus-desc">간선: 571, 603 | 지선: 6624, 6627, 6637</div>
				<div class="parking-name">지하철</div>
				<div class="parking-desc">2시간 무료</div>
				<div class="parking-desc2">(주차공간 부족시 목동 공영주차장을 이용해 주세요.)</div>
				<div class="publick-parking-area-link" @click="openPopup">목동 공영주차창 지도 보기<div class="arrow"></div></div>
			</div>	
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
			flowers: {
				type: Array,
				default: function() {
					return new Array(19)
				}
			},
			stars: {
				type: Array,
				default: function() {
					return new Array(8)
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
			setMap: function () {
				const container = this.$el.querySelector('.map'),
					options = {
						center: new daum.maps.LatLng(37.5281527, 126.87574569999992),
						level: 4
					},
					map = new daum.maps.Map(container, options);

				new daum.maps.Marker({
					map: map,
					position: new daum.maps.LatLng(37.5281527, 126.87574569999992),
					title: '현대 41타워 41층'
				});
			},
			setMap2: function () {
				const container = this.$el.querySelector('.map2'),
					options = {
						center: new daum.maps.LatLng(37.528899, 126.878523),
						level: 5,
						draggable: false
					},
					map = new daum.maps.Map(container, options);

				new daum.maps.Marker({
					map: map,
					position: new daum.maps.LatLng(37.528899, 126.878523),
					title: '목동 공영 주차장'
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

		z-index: 10;
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

		animation-delay: 4s
	}

	.f2 {
		top: -10px;
		left: -115px;

		z-index: 15;

		animation-delay: 6.5s;
	}

	.f3 {
		top: -10px;
		left: -90px;

		animation-delay: 3.5s;
	}

	.f4 {
		top: -10px;
		left: -65px;

		animation-delay: 2s;
	}

	.f5 {
		top: -10px;
		left: -40px;

		animation-delay: 6s;

		z-index: 15;
	}

	.f6 {
		top: -10px;
		left: -15px;

		animation-delay: 3.5s;
	}

	.f7 {
		top: -10px;
		left: 10px;

		animation-delay: 1s;
	}

	.f8 {
		top: -10px;
		left: 35px;

		animation-delay: 6s;
	}

	.f9 {
		top: -10px;
		left: 60px;

		animation-delay: 0.2s;
	}

	.f10 {
		top: -10px;
		left: 85px;

		animation-delay: 4.5s;
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
		margin-top: 20px;

		padding: 0 16px;

		text-align: center;
	}

	.date {
		font-weight: 700;
		color: #4b5262;
		font-size: 14px;
		text-align: left;
		line-height: 1;

		margin-right: 6px;
	}

	.location {
		font-weight: 400;
		color: #4b5262;
		font-size: 14px;
		text-align: left;
		line-height: 1;
	}

	.greeting {
		width: 261px;

		color: #7d8daa;
		font-size: 14px;
		text-align: left;
		line-height: 1.6;

		margin-top: 21px;
	}

	.divider {
		width: 288px;
		height: 0;

		border-top: 1px dashed #dcdcdc;

		margin: 29.8px auto 0 auto;
	}

	.loc-desc {
		padding: 0 16px;

		margin-top: 30px;
	}

	.name {
		font-weight: 600;
		font-size: 14px;
		color: #4b5262;
		line-height: 1;

		margin-bottom: 12px;
	}

	.address {
		font-size: 14px;
		color: #4b5262;
		line-height: 1;

		margin-bottom: 12px;	
	}

	.phone {
		font-size: 14px;
		color: #4b5262;
		line-height: 1;

		text-decoration: underline;
	}

	.map {
		width: 288px;
		height: 198px;

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