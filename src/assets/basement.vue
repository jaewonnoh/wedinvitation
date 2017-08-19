<template>
	<div class="wrapper">
		<div class="img">
			<div class="person"></div>
		</div>
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

		background-color: rgba(222, 222, 222, 0.5);

		margin: 0 auto;

		overflow: hidden;

		max-width: 540px;
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

	.ani {
		position: absolute;
		top: -1%;
		left: -3%;

		transform: translate(-50%, -50%);

		width: 1%;
		height: 0.5%;

		animation: aa 10s linear infinite normal;
	}

	.fl {
		width: 100%;
		height: 100%;

		background: red;

		animation: blink 0.5s linear infinite alternate;
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