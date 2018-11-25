import Vuex from 'vuex';
import mutations from './mutations';
import * as actions from './actions';
// import * as getters from './getters'
// // import modules from './modules'
// Vue.use(Vuex)

// let UserInfo = window.localStorage.getItem('UserInfo')
// if (UserInfo !== null) {
//   UserInfo = JSON.parse(UserInfo)
// } else {
//   UserInfo = {}
// }
// 应用初始状态
const state = {
	scrollTop: 0,
	comm: {
		isLoading: false,
		direction: 'forward',
		indexConf: {
			isFooter: false,
			isBack: false,
			title: '小说站' // 标题
		},
		Authority: {}
	},
	responseData: {
		// 存储服务端接口返回的数据
		// UserInfo: UserInfo,
		serverTime: '',
		TaskList: {
			list: [],
			pageid: 1
		},
		CommentList: {
			list: [],
			pageid: 1
		},
		QueryDataList: {
			list: [],
			pageid: 1
		},
		QueryImgDataList: {
			list: [],
			pageid: 1
		},
		QuestionnairesData: {
			list: [],
			pageid: 1
		},
		QueryViewDataList: {
			list: [],
			pageid: 1
		},
		TopicList: {
			list: [],
			pageid: 1
		},
		InteractTopicList: {
			list: [],
			pageid: 1
		},
		RealtimeTopicList: {
			list: [],
			pageid: 1
		},
		InformationDataOne: {
			list: [],
			pageid: 1
		},
		InformationDataTwo: {
			list: [],
			pageid: 1
		},
		InformationDataThree: {
			list: [],
			pageid: 1
		},
		PersonDataList: {
			list: [],
			pageid: 1
		}
	}
};

const createStore = () => {
	return new Vuex.Store({
		state,
		mutations,
		actions
	});
};

export default createStore;
