<template>
	<view id="lab-detail">
		<cu-custom bgColor="bg-informatic-brown" isBack>
			<block slot="backText">返回</block>
			<block slot="content">讲座列表</block>
		</cu-custom>
		<view class="cu-list menu-avatar">
			<view class="cu-item" v-for="lecture in lectures" :key="lecture.ID" @click="toDetail(lecture.ID)">
				<view class="cu-avatar round lg" :style="`background-image:url(${app.webInfo.avatar});`"></view>
				<view class="content">
					<view class="text-black">{{lecture.Name}}</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							{{lecture.BeginOn}} - {{lecture.EndOn}}
						</view> </view>
				</view>
				<view class="action">
					<!-- <view class="text-grey text-xs">写啥呢</view> -->
					<view class="cu-tag round bg-grey sm">未开始</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = require("@/config");
	export default{
		data() {
			return {
				lectures: [],
				app
			}
		},
		onLoad() {
			this.getLectures();
		},
		methods: {
			getLectures() {
				uni.post("/api/activity/GetAcitvities", {}, msg => {
					if(msg.success) {
						this.lectures = msg.data;
					} else {
						uni.showToast({
							title: msg.msg,
							icon: "none"
						})
					}
				});
			},
			toDetail(id){
				uni.navigateTo({
					url: `./detail?id=${id}`
				});
			}
		}
	}
</script>

<style>
</style>
