<template>
	<div class="wrapper">
		<div class="img">
			<div class="person"></div>
		</div>
		<div class="content">
			<section class="greeting-wapper">
				<span class="date">2017.11.04(토) 12:00PM</span>
				<span class="location">세븐스프링스 목동점</span>
				<span class="greeting">평생을 같이하고 싶은 사람을 만나 한 가정을 이루게 되었습니다. 오셔서 저희의 시작을 지켜봐 주시고 축하해 주시면 감사하겠습니다.</span>
			</section>
		</div>
		<div class="divider"></div>
	</div>
</template>

<script>
	export default {
		name: 'basement',
		mounted: function() {
			this.setImageHeight();
		},
		methods: {
			setImageHeight: function () {
				const img = this.$el.querySelector('.img'),
					height = img.clientWidth * 0.84;
				
				img.style.height = `${height}px`;
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
		display: inline-block;

		font-family: NotoSansBold;
		color: #4b5262;
		font-size: 14px;
		text-align: left;

		margin-right: 6px;
	}

	.location {
		display: inline-block;

		font-family: NotoSansRegular;
		color: #4b5262;
		font-size: 14px;
		text-align: left;
	}

	.greeting {
		display: inline-block;

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