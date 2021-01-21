<template>
	<view>
		<cu-custom bgColor="bg-informatic-brown" isBack>
			<block slot="backText">返回</block>
			<block slot="content">{{lecture.Name}}</block>
		</cu-custom>
		<view class="bg-white padding">
			<view>
				<text class="text-xl text-bold">讲座：{{lecture.Name}}</text>
			</view>
			<view class="margin-top flex justify-between align-center">
				<text>{{lecture.BeginOn}} - {{lecture.EndOn}}</text>
				<text class="cu-tag bg-blue round">{{state}}</text>
			</view>
		</view>
		<view class="cu-list menu sm-border" style="margin-top: 2rpx;">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-location line-brown"></text>
					<text class="">某处</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-people line-mauve"></text>
					<text class="">{{lecture.Hoster}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-edit line-orange"></text>
					<text class="">其他属性</text>
				</view>
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="text-lg">讲座介绍</text>
				</view>
			</view>
			<view class="bg-white padding-lr padding-tb-xs" style="text-indent: 1em;">
				123
			</view>
		</view>
		<view class="cu-list menu sm-border">
			<view class="cu-item">
				<view class="content">
					<text class="text-lg">子讲座列表</text>
				</view>
			</view>
			<template v-for="subLecture in subLectures">
				<view class="cu-item" :key="subLecture.ID">
					<view class="content">
						<text class="cuIcon-btn text-green"></text>
						<text>{{subLecture.Name}}</text>
					</view>
					<view class="action">
						<button class="cu-btn line-blue" @click="getSubLectureDetail(subLecture.ID)">
							详情
						</button>
						<button class="cu-btn bg-blue lg margin-left margin-right" @click="toSignUp(subLecture.ID)">签到测试</button>
					</view>
				</view>
				<view class="padding solid-top solid-bottom bg-white" v-show="showDetail === subLecture.ID">
					<text class="cuIcon-info"></text>
					<text>状态：{{subLecture.Status}}</text>
					<br />
					<text class="cuIcon-people"></text>
					<text>汇报人：{{subLecture.Hoster}}</text>
					<br />
					<text class="cuIcon-location"></text>
					<text>地点：{{subLecture.Address}}</text>
					<br />
					<text class="cuIcon-time"></text>
					<text>活动开始时间：{{subLecture.BeginOn}}</text>
					<br />
					<text class="cuIcon-timefill"></text>
					<text>活动结束时间：{{subLecture.EndOn}}</text>
					<br />
					<text class="cuIcon-timefill" v-if="showSignInState"></text>
					<text v-if="showSignInState">签到情况：{{signInState}}</text>
				</view>
			</template>
		</view>
		<!-- <view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="text-lg">签到测试</text>
				</view>
			</view>
			<button class="cu-btn bg-blue lg margin-left margin-right" @click="toSignUp">点击签到</button>
		</view> -->
		<view class="cu-bar foot bg-white">
			<view class="flex-sub text-center" v-if="false">
				<text class="text-lg">已报名</text>
				<br />
				<text>32人</text>
			</view>
			<view class="flex-treble flex justify-end padding-lr">
				<button class="bg-cyan cu-btn round lg">
					<text class="padding-lr-xl" @click="checkSignUpState">{{isSignedUp ? "取消报名" : "我要报名"}}</text>
				</button>
			</view>
		</view>
		<view style="height: 50px;"></view>
	</view>
</template>

<script>
	let app = require("@/config");
	export default {
		data() {
			return {
				showDetail: "",
				lecture: {},
				subLectures: [],
				isSignedUp: false,
				thisId: "",
				state: "未知",
				showSignInState: false,
				signInState: "未知"
			}
		},
		onLoad(e) {
			this.getSubLectures(e.id);
			this.thisId = e.id;
			// console.log(app);
		},
		methods: {
			show(id) {
				if (this.showDetail) this.showDetail = "";
				else this.showDetail = id;
			},
			getSubLectures(id) {
				uni.post("/api/activity/GetUserActivityCategory", {
					id
				}, msg => {
					if (msg.success) {
						this.lecture = msg.data;
						this.subLectures = msg.activities;
						this.isSignedUp = msg.isSignUp;
						this.calcState();
						// console.log(msg.data);
					} else {
						uni.showToast({
							title: msg.msg,
							icon: "none"
						})
					}
				});
			},
			getSubLectureDetail(id) {
				if (this.showDetail) {
					this.show(id);
				} else {
					uni.post("/api/activity/GetUserActivity", {
						id
					}, msg => {
						if (msg.success) {
							for (var i = 0; i < this.subLectures.length; i++) {
								if (this.subLectures[i].ID == id) {
									this.subLectures[i] = msg.data;
									var time = new Date();
									if (msg.data.isSignIn) {
										this.signInState = "已签到";
									} else {
										this.signInState = "未签到";
									}
									this.show(id);
									break;
								}
							}
						} else {
							uni.showToast({
								title: msg.msg,
								icon: "none"
							})
						}
					});
				}
			},
			calcState() {
				var time = new Date();
				if (time < new Date(this.lecture.SignUpBegin)) {
					this.state = "未开始";
				} else if (time > new Date(this.lecture.BeginOn) && time < new Date(this.lecture.EndOn)) {
					this.state = "进行中";
					this.showSignInState = true;
				} else if (time < new Date(this.lecture.SignUpEnd)) {
					this.state = "报名中";
				} else if (time > new Date(this.lecture.SignUpEnd) && time < new Date(this.lecture.BeginOn)) {
					this.state = "准备中";
				} else {
					this.state = "已结束";
					this.showSignInState = true;
				}
			},
			toDetail(id) {
				uni.navigateTo({
					url: `./detail?id=${id}`
				});
			},
			toSignUp(id) {
				if (app.userInfo.isLogined == false) {
					alert("请先登录");
					uni.navigateTo({
						url: `../profile/profile`
					});
				} else if (app.userInfo.email == '' || app.userInfo.mobile == '') {
					alert("请填写您的手机号以及邮箱");
					uni.navigateTo({
						url: `../userInfo/userInfo`
					});
				} else {
					// console.log('开始跳转');
					uni.navigateTo({
						url: `../signIn/signIn?id=${id}`
					});
				}
			},
			checkSignInState(id) {
				// console.log('签到' + id);
				var time = new Date();
				if (time < new Date(this.lecture.BeginOn)) {
					uni.showToast({
						title: "签到未开始",
						icon: "none"
					});
				} else if (time > new Date(this.lecture.EndOn)) {
					uni.showToast({
						title: "签到已结束",
						icon: "none"
					});
				} else {
					// console.log('准备跳转');
					this.toSignUp(id);
				}
			},
			checkSignUpState() {
				var time = new Date();
				if (time < new Date(this.lecture.SignUpBegin)) {
					uni.showToast({
						title: "报名未开始",
						icon: "none"
					})
				} else if (time >= new Date(this.lecture.SignUpEnd)) {
					uni.showToast({
						title: "报名已结束",
						icon: "none"
					})
				} else {
					var sta;
					if (!this.isSignedUp) {
						sta = 0;
					} else {
						sta = 999;
					}
					console.log('state:' + sta);
					uni.post("/api/activity/SignUp", {
						state: sta,
						id: this.thisId
					}, msg => {
						if (msg.success) {
							this.getSubLectures(this.thisId);
							if (!this.isSignedUp) {
								uni.showToast({
									title: "报名成功",
									icon: "none"
								});
								this.isSignedUp = true;
							} else {
								uni.showToast({
									title: "取消报名成功",
									icon: "none"
								});
								this.isSignedUp = false;
							}
						} else {
							uni.showToast({
								title: msg.msg,
								icon: "none"
							})
						}
					});
				}
			},
		}
	}
</script>

<style>
</style>
