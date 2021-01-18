<template>
	<view>
		<cu-custom bgColor="bg-informatic-brown" isBack>
			<block slot="backText">返回</block>
			<block slot="content">{{lecture.Name}}</block>
		</cu-custom>
		<view class="cu-list menu">
			<template v-for="subLecture in subLectures">
				<view class="cu-item" :key="subLecture.ID">
					<view class="content">
						<text class="cuIcon-btn text-green"></text>
						<text class="text-grey">{{subLecture.Name}}</text>
					</view>
					<view class="action">
						<button class="cu-btn bg-green margin-right-xs">报名</button>
						<button class="cu-btn bg-blue" @click="show(subLecture.ID)">
							详情
							<text class="cuIcon-unfold margin-left-xs"></text>
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
