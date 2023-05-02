import { categoryAll } from '@/api/operator/demand';

const global = {
    state: {
        category: JSON.parse(localStorage.getItem('category')) || []
    },
    mutations: {
        SET_CATEGORY: (state, data) => {
            state.category = data
        }
    },
    actions: {
        getCategory({ commit }) {
            categoryAll().then((res) => {
                commit('SET_TOKEN', res);
                localStorage.setItem('category', JSON.stringify(res))
            });
        }
    },
}

export default global;