<template>
	<view>
		<cu-custom bgColor="bg-informatic-brown" isBack>
			<block slot="backText">返回</block>
			<block slot="content">我的团队</block>
			<block slot="right">
				<view class="text-xxl flex align-center" @click="setModal()">
					<text class="cuIcon-add"></text>
					<text class="text-lg margin-right">新增</text>
				</view>
			</block>
		</cu-custom>
		<view class="cu-list menu">
			<view class="cu-item" @click="toDetail">
				<view class="content padding-tb-sm">
					<view>
						<text class="cuIcon-group_fill text-blue margin-right-xs"></text> 团队名称
					</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-infofill margin-right-xs"></text> 团队详细信息
					</view>
				</view>
				<view class="action">
					<button class="cu-btn bg-red">删除</button>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="showModal ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">创建新团队</view>
					<view class="action" @tap="setModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<input placeholder="请输入团队名称" v-model="teamName" />
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="setModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="addTeam">新建</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = require("@/config");
	export default {
		data() {
			return {
				showModal: false,
				teamName: "",
				teams: []
			}
		},
		onLoad() {
			this.getTeams();
		},
		methods: {
			toDetail() {
				uni.navigateTo({
					url: "./detail"
				})
			},
			setModal() {
				this.showModal = !this.showModal;
			},
			addTeam() {
				uni.post("/api/team/SaveTeam", {
					Name: this.teamName,
					LeaderId: app.currentUserGuid
				}, msg => {
					if(msg.success) {
						console.log(msg)
					} else {
						console.log(msg)
					}
				}) 
			},
			getTeams() {
				uni.post("/api/team/GetTeams", {}, msg => {
					if(msg.success) {
						console.log(msg)
					} else {
						console.log(msg)
					}
				}) 
			}
		}
	}
</script>

<style>
	input {
		border-bottom: #DDD solid 2upx;
	}
</style>
