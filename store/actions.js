import base from '../api/base';
// *-------------------------------------------小说阅读接口-------------------------------------------------------------*/
// 获取书籍信息接口
export const GetBookInfo = ({ commit, state, dispatch }, params) => {
	return base
		.GetBookInfo(params)
		.then((res) => {
			if (res !== undefined && res.hasOwnProperty('status') && res.data.status === 200) {
				return { data: res.data.data, status: 200 };
			} else {
				return res !== undefined ? { message: res.message, status: res.status } : { status: 500 };
			}
		})
		.catch((e) => {
			console.log(e);
		});
};
// 获取书籍目录接口 --章节目录详情
export const GetBookDir = ({ commit, state, dispatch }, params) => {
	return base
		.GetBookDir(params)
		.then((res) => {
			if (res !== undefined && res.hasOwnProperty('status') && res.data.status === 200) {
				return { data: res.data.data, status: 200 };
			} else {
				return res !== undefined ? { message: res.message, status: res.status } : { status: 500 };
			}
		})
		.catch((e) => {
			console.log(e);
		});
};
// 获取书籍章节内容接口
export const GetBookDetail = ({ commit, state, dispatch }, params) => {
	return base
		.GetBookDetail(params)
		.then((res) => {
			if (res !== undefined && res.hasOwnProperty('status') && res.data.status === 200) {
				return { data: res.data.data, status: 200 };
			} else {
				return res !== undefined ? { message: res.message, status: res.status } : { status: 500 };
			}
		})
		.catch((e) => {
			console.log(e);
		});
};
// 小说分类书籍列表页接口
export const GetTypeBookList = ({ commit, state, dispatch }, params) => {
	return base
		.GetTypeBookList(params)
		.then((res) => {
			if (res !== undefined && res.hasOwnProperty('status') && res.data.status === 200) {
				return { data: res.data.data, status: 200 };
			} else {
				return res !== undefined ? { message: res.message, status: res.status } : { status: 500 };
			}
		})
		.catch((e) => {
			console.log(e);
		});
};
// 小说分类页接口
export const GetTypeList = ({ commit, state, dispatch }, params) => {
	return base
		.GetTypeList(params)
		.then((res) => {
			if (res !== undefined && res.hasOwnProperty('status') && res.data.status === 200) {
				return { data: res.data.data, status: 200 };
			} else {
				return res !== undefined ? { message: res.message, status: res.status } : { status: 500 };
			}
		})
		.catch((e) => {
			console.log(e);
		});
};
// 小说热门书籍列表接口
export const GetHotList = ({ commit, state, dispatch }, params) => {
	return base
		.GetHotList(params)
		.then((res) => {
			if (res !== undefined && res.hasOwnProperty('status') && res.data.status === 200) {
				return { data: res.data.data, status: 200 };
			} else {
				return res !== undefined ? { message: res.message, status: res.status } : { status: 500 };
			}
		})
		.catch((e) => {
			console.log(e);
		});
};
// 小说站首页数据获取
export const GetMain = ({ commit, state, dispatch }, params) => {
	return base
		.GetMain(params)
		.then((res) => {
			if (res !== undefined && res.hasOwnProperty('status') && res.data.status === 200) {
				return { data: res.data.data, status: 200 };
			} else {
				return res !== undefined ? { message: res.message, status: res.status } : { status: 500 };
			}
		})
		.catch((e) => {
			console.log(e);
		});
};
// *-------------------------------------------小说阅读接口-------------------------------------------------------------*/
// 登录
// export const PostLogin = ({ commit, state }, params) => {
//   return base.PostLogin(params).then((res) => {
//     if (res.code === 1) {
//       commit('PostLogin', { UserInfo: res.userInfo })
//     }
//     return res
//   }).catch(e => {
//   })
// }
