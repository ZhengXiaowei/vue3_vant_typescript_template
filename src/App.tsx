import { defineComponent } from "vue";
import { RouterLink, RouterView } from "vue-router";

const App = defineComponent({
  setup() {
    return () => (
      <>
        <div class="nav">
          <RouterLink to="/">首页</RouterLink>
          <RouterLink to="/about">关于我</RouterLink>
        </div>
        <RouterView />
      </>
    );
  },
});

export default App;
