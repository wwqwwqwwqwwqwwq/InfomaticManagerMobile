<template>
	<view id="lab-detail">
		<cu-custom bgColor="bg-informatic-brown" isBack>
			<block slot="backText">返回</block>
			<block slot="content">讲座列表</block>
		</cu-custom>
		<view class="cu-list menu-avatar">
			<view class="cu-item">
				<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
				<view class="content">
					<view class="text-black">Vue.js系列讲座</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。
						</view> </view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">22:20</view>
					<view class="cu-tag round bg-grey sm">5</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				lectures: []
			}
		},
		methods: {
			getLectures() {
				uni.post("/api/activity/SaveActivityCategory", {}, msg => {
					if(msg.success) {
						this.lectures = msg.data;
					} else {
						uni.showToast({
							title: msg.msg,
							icon: "none"
						})
					}
				});
			}
		}
	}
</script>

<style>
</style>
