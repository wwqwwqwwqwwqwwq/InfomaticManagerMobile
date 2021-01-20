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
				<text class="cu-tag bg-blue round">进行中</text>
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
						<button class="cu-btn line-blue" @click="show(subLecture.ID)">
							详情
						</button>
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
				</view>
			</template>
		</view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="text-lg">签到测试</text>
				</view>
			</view>
			<button class="cu-btn bg-blue block lg margin-left margin-right" @click="toSignUp">点击签到</button>
		</view>
		<view class="cu-bar foot bg-white">
			<view class="flex-sub text-center">
				<text class="text-lg">已报名</text>
				<br />
				<text>32人</text>
			</view>
			<view class="flex-treble flex justify-end padding-lr">
				<button class="bg-cyan cu-btn round lg">
					<text class="padding-lr-xl">{{isSignedUp ? "取消报名" : "我要报名"}}</text>
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
				thisId: ""
			}
		},
		onLoad(e) {
			this.getSubLectures(e.id);
			this.thisId = e.id;
		},
		methods: {
			show(id) {
				if (this.showDetail) this.showDetail = "";
				else this.showDetail = id;
			},
			getSubLectures(id) {
				uni.post("/api/activity/GetActivityCategory", {
					id
				}, msg => {
					if (msg.success) {
						this.lecture = msg.data;
						this.subLectures = msg.activities;
					} else {
						uni.showToast({
							title: msg.msg,
							icon: "none"
						})
					}
				});
			},
			toDetail(id) {
				uni.navigateTo({
					url: `./detail?id=${id}`
				});
			},
			toSignUp() {
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
					uni.navigateTo({
						url: `../signUp/signUp?id=${this.thisId}`
					});
				}
			}
		}
	}
</script>

<style>
</style>
