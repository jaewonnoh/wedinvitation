<template>
	<div class="wrapper">
		<div class="main">
			<div class="img">
				<div class="person"></div>
				<div class="stars s1"></div>
				<div class="stars s2"></div>
				<div class="stars s3"></div>
				<div class="stars s4"></div>
				<div class="stars s5"></div>
				<div class="stars s6"></div>
				<div class="stars s7"></div>
				<div class="stars s8"></div>
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
		mounted: function() {
			this.setImageHeight();
			this.setMap();
			this.setMap2();
		},
		methods: {
			setImageHeight: function () {
				const img = this.$el.querySelector('.img'),
					height = img.clientWidth * 0.84;
				
				img.style.height = `${height}px`;
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
					position: new daum.maps.LatLng(37.5281527, 126.87574569999992)
				});
			},
			setMap2: function () {
				const container = this.$el.querySelector('.map2'),
					options = {
						center: new daum.maps.LatLng(37.528899, 126.878523),
						level: 5
					},
					map = new daum.maps.Map(container, options);

				new daum.maps.Marker({
					map: map,
					position: new daum.maps.LatLng(37.528899, 126.878523)
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
		}
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
		width: 100%;

		background-image: url('/src/img/invitation_img_bg.svg');
	}

	.person {
		width: 100%;
		height: 100%;

		background-image: url('/src/img/invitation_img.svg');
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
		top: 22px;
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
		top: 23px;
		right: 34px;

		width: 7px;
		height: 7px;	

		animation-delay: 0.8s;
	}

	.s4 {
		top: 60px;
		left: 16px;

		width: 5px;
		height: 5px;	

		animation-delay: 0.5s;
	}

	.s5 {
		top: 44px;
		right: 10px;

		width: 9px;
		height: 9px;	

		animation-delay: 0.2s;
	}

	.s6 {
		top: 84px;
		left: 51px;

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
		top: 85px;
		right: 32px;

		width: 5px;
		height: 5px;	

		animation-delay: 0.1s;
	}

	.content {
		margin-top: 28px;

		padding: 0 16px;

		text-align: center;
	}

	.date {
		font-family: NotoSansBold;
		color: #4b5262;
		font-size: 14px;
		text-align: left;

		margin-right: 6px;
	}

	.location {
		font-family: NotoSansRegular;
		color: #4b5262;
		font-size: 14px;
		text-align: left;
	}

	.greeting {
		width: 261px;

		font-family: NotoSansLight;
		color: #7d8daa;
		font-size: 14px;
		text-align: left;
		line-height: 1.6;

		margin-top: 21px;
	}

	.divider {
		width: 288px;
		height: 0;

		border-top: 2px dotted #dcdcdc;

		margin: 29.8px auto 0 auto;
	}

	.loc-desc {
		padding: 0 16px;

		margin-top: 30px;
	}

	.name {
		font-size: 14px;
		color: #4b5262;
		font-family: NotoSansMedium;

		margin-bottom: 12px;
	}

	.address {
		font-size: 14px;
		color: #4b5262;
		font-family: NotoSansLight;

		margin-bottom: 12px;	
	}

	.phone {
		font-size: 14px;
		color: #4b5262;
		font-family: NotoSansLight;

		text-decoration: underline;
	}

	.map {
		width: 288px;
		height: 198px;

		margin-top: 30px;
	}

	.sub-name {
		font-size: 14px;
		color: #4b5262;
		font-family: NotoSansMedium;

		margin-top: 30px;
		margin-bottom: 10px;
	}

	.sub-desc {
		font-size: 14px;
		color: #4b5262;
		font-family: NotoSansLight;
	}

	.bus-name {
		font-size: 14px;
		color: #4b5262;
		font-family: NotoSansMedium;

		margin-top: 20px;
		margin-bottom: 10px;
	}

	.bus-desc {
		font-size: 14px;
		color: #4b5262;
		font-family: NotoSansLight;
	}

	.parking-name {
		font-size: 14px;
		color: #4b5262;
		font-family: NotoSansMedium;

		margin-top: 20px;
		margin-bottom: 10px;
	}

	.parking-desc {
		font-size: 14px;
		color: #4b5262;
		font-family: NotoSansLight;

		margin-bottom: 8px;
	}

	.parking-desc2 {
		font-size: 12px;
		color: #4b5262;
		font-family: NotoSansLight;
	}

	.publick-parking-area-link {
		font-size: 14px;
		color: #ff8f98;
		font-family: NotoSansLight;
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
			transform: scale(0.5);
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

		margin-top: 62px;
	}

	.map2 {
		width: 288px;
		height: 198px;
	}

	.pbpa-name {
		font-size: 14px;
		color: #4b5262;
		font-family: NotoSansMedium;

		margin-top: 20px;
		margin-bottom: 10px;
	}

	.pbpa-address {
		font-size: 14px;
		color: #4b5262;
		font-family: NotoSansLight;

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