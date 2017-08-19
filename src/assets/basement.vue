<template>
	<div class="wrapper">
		<div class="img">
			<div class="person"></div>
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
			<div class="publick-parking-area-link">목동 공영주차창 지도 보기<div class="arrow"></div></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'basement',
		mounted: function() {
			this.setImageHeight();
			this.setMap();
		},
		methods: {
			setImageHeight: function () {
				const img = this.$el.querySelector('.img'),
					height = img.clientWidth * 0.84;
				
				img.style.height = `${height}px`;
			},
			setMap: function() {
				const container = this.$el.querySelector('.map'),
					options = {
						center: new daum.maps.LatLng(37.5281527, 126.87574569999992),
						level: 3
					},
					map = new daum.maps.Map(container, options);

				new daum.maps.Marker({
					map: map,
					position: new daum.maps.LatLng(37.5281527, 126.87574569999992)
				});
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

	.img {
		width: 100%;

		background-image: url('/src/img/invitation_img_bg.svg');
	}

	.person {
		width: 100%;
		height: 100%;

		background-image: url('/src/img/invitation_img.svg');
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

		background-color: #eee;

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
	}

	.arrow {
		display: inline-block;

		width: 7px;
		height: 12px;

		margin-left: 5px;

		background-image: url('/src/img/icon_arrow.svg');
	}

	@keyframes aa {
		from {
			transform: translate(100%, 100%);
		}

		to {
			transform: translate(1500px, 500px);
		}
	}

	@keyframes blink {
		from {
			transform: scale(0);
		}

		to {
			transform: scale(1);
		}
	}
</style>