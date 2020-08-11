<template>
	<view class="container">
		<div class="box">
			<div class="searchbox">
				<u-input style="width: 80%;" v-model="keyword" :type="type" border trim/>
				<!-- <u-button @click="search" plain><div class="kg"/><u-icon name="search"></u-icon></u-button> -->
				<div class="kg"/>
				<u-icon @click="search" name="search" size="20px"></u-icon>
			</div>
			<view style="padding: 10rpx;">
				<view v-for="(item, index) in data" :key="index" style="min-height: 70rpx; margin-top: 20px; border-bottom:1rpx dashed #cfe6f4">
					{{item.text}}——<u-icon name="thumb-up-fill" color="#2979ff" size="28"></u-icon>{{item.zanCount}}
					<div style="margin-bottom: 10rpx;">
						<u-button plain type="primary" size="mini" @click="copy(item.text)">复制</u-button>
					</div>
					
				</view>
				
			</view>
		</div>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 'text',
				data: [],
				keyword: ''
				
			}
		},
		methods: {
			search() {
				uni.showLoading({
				     title: '加载中...'
				});
				let that = this;
				let uri = '/search/' + that.keyword
				that.$u.get(uri, {
				
				}).then(res => {
					that.data = res
					// 回调成功 就关闭加载框
					uni.hideLoading();
					console.log(res)
					console.log(res.length)
					
					//在提示一下，加载成功
					if(res==[]) {
						uni.showToast({
						    title: '啥也没有',
						    duration: 1500
						});
					} else {
						uni.showToast({
						    title: '成功',
						    duration: 1500
						});
					}
					
				
				})
				
			},
			copy(data) {
				uni.setClipboardData({
					data: data,
					
					success: () => {
						uni.hideToast();
						this.$refs.uToast.show({
							title: '复制成功，请尽情的当个渣男吧！',
							type: 'success',
						})
					}
				})
			},
			
		},

		created() {
			
			
		}
	}
</script>

<style>
	.searchbox{
		width: 100%;
		display: inline-flex;
		justify-content: space-around;
	}
</style>
