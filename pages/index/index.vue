<template>
	<view class="container">
		<div class="box">
			<p>
				<u-icon name="man-add-fill" color="#2979ff" size="28"></u-icon>渣男：说话的艺术
			</p>

			<div class="inner_box">
				<p>{{data.text}}</p>
			</div>
			<div class="copy_container">
				<u-button plain type="primary" size="mini" @click="copy">复制</u-button>
				<div style="width: 50rpx;"></div>
				<u-button type="primary" size="mini" @click="again" :ripple="true" ripple-bg-color="#2e2e99">再来一条</u-button>
			</div>
			<div class="copy_container">
				<u-button size="mini" :disabled="disabled" @click="zan(data.id)" plain><u-icon name="thumb-up-fill"></u-icon><div class="kg"/>{{data.zanCount}}</u-button>
				<div style="width: 90rpx;"></div>
				<u-button size="mini" :disabled="disabled" @click="cai(data.id)" plain><u-icon name="thumb-down-fill"></u-icon><div class="kg"/>{{data.caiCount}}</u-button>
			</div>
			<div class="copy_container">
				<u-button size="mini" @click="rank" plain><u-icon name="order"></u-icon><div class="kg"/>投票榜</u-button>
				<div style="width: 250rpx;"></div>
				<u-button size="mini" plain><u-icon name="search"></u-icon><div class="kg"/>关键字搜索</u-button>
			</div>
			



		</div>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: {},
				disabled: false

			}
		},
		methods: {
			again() {
				this.$u.get('/SweetNothings', {

				}).then(res => {
					this.data = res
					this.disabled = false;
				})
			},
			copy() {
				uni.setClipboardData({
					data: this.data.text,
					
					success: () => {
						uni.hideToast();
						this.$refs.uToast.show({
							title: '复制成功，请尽情的当个渣男吧！',
							type: 'success',
						})
					}
				})
			},
			zan(id) {
				this.data.zanCount += 1;
				this.disabled = true;
				let url = '/zan/' + id
				this.$u.post(url, {
					
				}).then(res => {
					console.log(res)
				})
			},
			cai(id) {
				this.data.caiCount += 1;
				this.disabled = true;
				let url = '/cai/' + id
				this.$u.post(url, {
					
				}).then(res => {
					console.log(res)
				})
			},
			rank() {
				uni.navigateTo({
				    url: '/pages/rank/index'
				});
			}

		},
		created() {
			this.again();
		}
	}
</script>

<style>

	.inner_box {
		padding: 10px;
		margin-top: 20px;
		width: 600rpx;
		height: 300rpx;
		border: 1px solid #e4e7ed;
	}
	.copy_container {
		margin-top: 15rpx;
		display: flex;
		justify-content: space-between;
		
		
	}
</style>
