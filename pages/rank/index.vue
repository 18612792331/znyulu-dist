<template>
	<view class="container">
		<div class="box">
			<scroll-view scroll-y @scrolltolower="scroll" id="height" :style="'height:' + height + 'px ; padding: 10rpx;'">
				<view v-for="(item, index) in data" :key="index" style="min-height: 70rpx; margin-top: 20px; border-bottom:1rpx dashed #cfe6f4">
					{{item.text}}——<u-icon name="thumb-up-fill" color="#2979ff" size="28"></u-icon>{{item.zanCount}}
					<div style="margin-bottom: 10rpx;">
						<u-button plain type="primary" size="mini" @click="copy(item.text)">复制</u-button>
					</div>
					
				</view>
				
			</scroll-view>
		</div>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageUtils: {
					pageNo: 1,
					pageSize: 30
				},
				data: [],
				height: 0,
				
			}
		},
		methods: {
			scroll(e) {
			   uni.showLoading({
			        title: '加载中...'
			   });
			   let that = this;
			   that.pageUtils.pageNo+=1;
			   this.getPage();
			   
			},
			getPage() {
				uni.showLoading({
				     title: '加载中...'
				});
				let that = this;
				let uri = '/rank/' + that.pageUtils.pageNo + '/' + that.pageUtils.pageSize
				that.$u.get(uri, {
				
				}).then(res => {
					console.log(res)
					res.content.forEach(item => {
						that.data.push(item)
						
					})
					
					// 回调成功 就关闭加载框
					                    uni.hideLoading();
					
					                    //在提示一下，加载成功
					                    uni.showToast({
					                        title: '成功',
					                        duration: 1500
					                    });
				
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
		mounted() {
			let that = this;
			
			        // 获取设备宽度
			        uni.getSystemInfo({
			            success: function(res) {
			                that.height = res.windowHeight;
			            }
			        });
			
		},
		created() {
			this.getPage()
			
		}
	}
</script>

<style>

</style>
