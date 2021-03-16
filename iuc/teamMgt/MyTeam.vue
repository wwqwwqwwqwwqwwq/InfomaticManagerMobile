<template>
	<view>
		<cu-custom bgColor="bg-informatic-brown" isBack>
			<block slot="backText">返回</block>
			<block slot="content">我的团队</block>
			<block slot="right">
				<view class="text-xxl flex align-center">
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
	</view>
</template>

<script>
	export default {
		methods: {
			toDetail() {
				uni.navigateTo({
					url: "./detail"
				})
			}
		}
	}
</script>

<style>
</style>
