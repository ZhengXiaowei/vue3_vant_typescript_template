import { defineComponent } from "vue";

const HelloWorld = defineComponent({
  props: {
    message: String,
  },
  emits: ["update:message"],
  setup(props, { slots, emit }) {
    const onReverse = () => {
      let text = props
        .message!.split("")
        .reverse()
        .join("");
      emit("update:message", text);
    };

    const buttonTextSlots = () => {
      return slots.text ? slots.text() : "reverse";
    };

    return () => (
      <van-button type="primary" onClick={onReverse}>
        {buttonTextSlots()}
      </van-button>
    );
  },
});

export default HelloWorld;
