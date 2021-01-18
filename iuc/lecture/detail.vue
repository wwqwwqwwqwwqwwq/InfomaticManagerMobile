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
				<view class="padding" v-show="showDetail === subLecture.ID">
					<text>状态：{{subLecture.Status}}</text>
					<br/>
					<text>汇报人：{{subLecture.Hoster}}</text>
				</view>
			</template>
		</view>
		<view class="cu-bar foot bg-white">
			<view class="flex-sub text-center">
				<text class="text-lg">已报名</text>
				<br />
				<text>32人</text>
			</view>
			<view class="flex-treble flex justify-end padding-lr">
				<button class="bg-cyan cu-btn round lg">
					<text class="padding-lr-xl">我要报名</text>
				</button>
			</view>
		</view>
		<view style="height: 50px;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showDetail: "",
				lecture: {},
				subLectures: []
			}
		},
		onLoad(e) {
			this.getSubLectures(e.id);
		},
		methods: {
			show(id) {
				if(this.showDetail) this.showDetail = "";
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
			}
		}
	}
</script>

<style>
</style>
