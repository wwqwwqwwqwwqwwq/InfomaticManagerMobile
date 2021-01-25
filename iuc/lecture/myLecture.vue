<template>
	<view>
		<cu-custom bgColor="bg-informatic-brown" isBack>
			<block slot="backText">返回</block>
			<block slot="content">我的活动</block>
		</cu-custom>
		<view class="cu-bar bg-white solids-bottom">
			<view class="action">
				<text class="cuIcon-title text-blue text-xxl"></text>
				<text class="text-xxl text-bold">我报名的活动</text>
			</view>
			<view class="action" @click="foldUp('displaySignUp')">
				<text class="text-df">{{displaySignUp?'收起':'展开'}}</text>
				<text class="padding-lr-xs" :class="displaySignUp?'cuIcon-fold':'cuIcon-unfold'"></text>
			</view>
		</view>
		<transition-group class="cu-list cu-card" name="list">
			<view class="cu-item" v-for="lecture in SignUpEvents" :key="lecture.ID" @click="toDetail(lecture.ID)">
				<view class="cu-avatar round lg" :style="`background-image:url(${app.webInfo.avatar});`"></view>
				<view class="content">
					<view class="text-black">{{lecture.Name}}</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							{{lecture.BeginOn}} - {{lecture.EndOn}}<br />地点：{{lecture.Address}}
						</view> </view>
				</view>
				<view class="action">
					<view class="cu-tag round bg-grey sm">{{lecture.state}}</view>
				</view>
			</view>
		</transition-group>
		<template v-if="SignUpEvents.length===0 && displaySignUp">
			<view class="padding-tb text-center text-lg">
				<text class="text-bold text-gray">暂无数据</text>
			</view>
		</template>
		
		<view class="cu-bar bg-white solids-bottom">
			<view class="action">
				<text class="cuIcon-title text-blue text-xxl"></text>
				<text class="text-xxl text-bold">已签到的活动</text>
			</view>
			<view class="action" @click="foldUp('displaySignIn')">
				<text class="text-df">{{displaySignIn?'收起':'展开'}}</text>
				<text class="padding-lr-xs" :class="displaySignIn?'cuIcon-fold':'cuIcon-unfold'"></text>
			</view>
		</view>
		<transition-group class="cu-list cu-card" name="list">
			<view class="cu-item" v-for="lecture in SignInEvents" :key="lecture.ID" @click="toDetail(lecture.ID)">
				<view class="cu-avatar round lg" :style="`background-image:url(${app.webInfo.avatar});`"></view>
				<view class="content">
					<view class="text-black">{{lecture.Name}}</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							{{lecture.BeginOn}} - {{lecture.EndOn}}<br />地点：{{lecture.Address}}
						</view> </view>
				</view>
				<view class="action">
					<view class="cu-tag round bg-grey sm">{{lecture.state}}</view>
				</view>
			</view>
		</transition-group>
		<template v-if="SignInEvents.length===0 && displaySignUp">
			<view class="padding-tb text-center text-lg">
				<text class="text-bold text-gray">暂无数据</text>
			</view>
		</template>
	</view>
</template>

<script>
	let app = require("@/config");
	export default {
		onShow() {
			uni.post("/api/activity/MySignUp", {}, msg => {
				if(msg.success) {
					this.SignUpEvents = msg.data;
					// console.log(msg.data);
					for (var i = 0; i < this.SignUpEvents.length; i++) {
						this.calcState(this.SignUpEvents[i]);
					}
				} else {
					uni.showToast({
						title: msg.msg,
						icon: "none"
					})
				}
			});
			uni.post("/api/activity/MySignIn", {}, msg => {
				if(msg.success) {
					this.SignUpEvents = msg.data;
					// console.log(msg.data);
					for (var i = 0; i < this.SignUpEvents.length; i++) {
						this.calcState(this.SignUpEvents[i]);
					}
				} else {
					uni.showToast({
						title: msg.msg,
						icon: "none"
					})
				}
			});
		},
		onLoad() {},
		methods: {
			foldUp(e) {
				this[e] = !this[e];
			},
			calcState(data) {
				var time = new Date();
				if (time < new Date(data.SignUpBegin)) {
					data.state = "未开始";
				} else if (time > new Date(data.BeginOn) && time < new Date(data.EndOn)) {
					data.state = "进行中";
					// this.showSignInState = true;
				} else if (time > new Date(data.EndOn)) {
					data.state = "已结束";
					// this.showSignInState = true;
				} else if (time < new Date(data.SignUpEnd)) {
					data.state = "报名中";
				} else if (time > new Date(data.SignUpEnd) && time < new Date(data.BeginOn)) {
					data.state = "准备中";
				}
			},
			toDetail(id){
				uni.navigateTo({
					url: `./detail?id=${id}`
				});
			}
		},
		data() {
			return {
				displaySignUp: true,
				displaySignIn: true,
				SignUpEvents: [],
				SignInEvents: []
			}
		}
	}
</script>

<style>
	.cu-list>.cu-item {
		padding-top: 16rpx;
		padding-bottom: 6rpx;
		transition: all 1s;
	}

	.list-move {
		transition: all 1s;
	}

	.list-enter {
		opacity: 0;
		transform: translateY(-30px);
	}

	.list-leave-to {
		opacity: 0;
		transform: translateY(-30px);
	}
</style>
