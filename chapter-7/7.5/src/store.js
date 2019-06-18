import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// ストアの定義
const store = new Vuex.Store({
  state: {
    // タスクの初期ステート
    tasks: [
      {
        id: 1,
        name: '牛乳を買う',
        labelIds:[1, 2],
        done: false
      },
      {
        id: 2,
        name: 'Vue.jsの本を買う',
        labelIds:[1, 3],
        done: true
      },
    ],
    // ラベルの初期ステート
    labels: [
      {
        id: 1,
        text: '買い物'
      },
      {
        id: 2,
        text: '食料'
      },
      {
        id: 3,
        text: '本'
      },
    ],
    // 次に追加するタスク、ラベルのID
    // 実際のアプリではサーバーで生成したり、UUIDを使ったりするがここでは決め打ち
    nextTaskId: 3,
    nextLabelId: 4,
    // フィルタするラベルのID
    filter: null,
  },
  getters: {
    // フィルタ後のタスクを返す
    filteredTasks (state) {
      // ラベルが選択されていなければそのままの一覧を返す
      if (!state.filter) {
        return state.tasks
      }
      // 選択されているラベルでフィルタリング
      return state.tasks.filter(task => {
        return task.labelIds.indexOf(state.filter) >= 0
      })
    }
  },
  mutations: {
    // タスクを追加する
    addTask (state, { name, labelIds }) {
      state.tasks.push({
        id: state.nextTaskId,
        name,
        labelIds,
        done: false
      })
      // 次に追加されるタスクに付与するIDを更新する
      state.nextTaskId++
    },
    // タスクの完了状態を変更する
    toggleTaskStatus (state, { id }) {
      const filterd = state.tasks.filter(task => {
        return task.id === id
      })
      filterd.forEach(task => {
        task.done = !task.done
      })
    },
    // ラベルを追加する
    addLabel (state, { text }) {
      state.labels.push({
        id: state.nextLabelId,
        text
      })
      // 次に追加されるラベルに付与するIDを更新する
      state.nextLabelId++
    },
    // フィルタリング対象のラベルを変更する
    changeFilter (state, { filter }) {
      state.filter = filter
    },
    // ステートを復元する
    restore (state, { tasks, labels, nextTaskId, nextLabelId }) {
      state.tasks = tasks
      state.labels = labels
      state.nextTaskId = nextTaskId
      state.nextLabelId = nextLabelId
    }
  },
  actions: {
    // ローカルストレージにステートを保存する
    save({ state }) {
      const data = {
        tasks: state.tasks,
        labels: state.labels,
        nextTaskId: state.nextTaskId,
        nextLabelId: state.nextLabelId
      }
      localStorage.setItem('task-app-data', JSON.stringify(data))
    },
    // ローカルストレージからステートを復元する
    restore ({ commit }) {
      const data = localStorage.getItem('task-app-data')
      if (data) {
        commit('restore', JSON.parse(data))
      }
    }
  }
})

// ストアをエクスポート
export default store