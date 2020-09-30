import { defineComponent, Transition, useTransitionState } from "vue";
import { RouterLink, RouterView, useLink } from "vue-router";

const App = defineComponent({
  setup() {
    // 自定义router-link element
    const customLink = (url: string) => {
      const { navigate } = useLink({ to: url });
      return navigate;
    };

    // router-view transition
    const rSlots = {
      default: ({ Component }: any) => (
        <Transition name="fade" mode="out-in">
          {Component}
        </Transition>
      ),
    };

    return () => (
      <>
        <div class="nav">
          <RouterLink to="/">首页</RouterLink>
          <RouterLink to="/about">关于我</RouterLink>
        </div>
        <RouterView v-slots={rSlots} />
      </>
    );
  },
});

export default App;
