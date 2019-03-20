<template>
  <div v-on-clickaway="close">
    <div slot @click="isShow = true">
      <div class="licence-box">
        <div class="licence-item">
          {{ value[0] }}
        </div>
        <div class="licence-item">
          {{ value[1] }}
        </div>
        <div class="licence-item licence-item-dot">·</div>
        <div class="licence-item">
          {{ value[2] }}
        </div>
        <div class="licence-item">
          {{ value[3] }}
        </div>
        <div class="licence-item">
          {{ value[4] }}
        </div>
        <div class="licence-item">
          {{ value[5] }}
        </div>
        <div class="licence-item">
          {{ value[6] }}
        </div>
        <div class="licence-item licence-item-green">
          {{ value[7] }}
        </div>
      </div>
    </div>
    <div v-show="isShow" class="key-modal" @click.self="close"></div>
    <transition name="fade">
      <div>
        <div v-show="isShow">
          <!--汉字键盘-->
          <div class="key-box" v-if="keyType">
            <div class="item" v-for="(item, i) in keyList" :key="i">
              <div
                class="key"
                v-for="(val, key) in item"
                :key="key"
                :class="{
                  'key-del-btn': val == 'del',
                  'key-ok-btn': val == 'ok'
                }"
              >
                <div class="val-box">
                  <div
                    class="val val-del-btn"
                    v-if="val == 'del'"
                    @touchstart="del"
                    @touchend="touchEnd"
                  >
                    <img src="./back.svg" alt="撤销" />
                  </div>
                  <div
                    class="val val-ok-btn"
                    v-else-if="val == 'ok'"
                    @click="close"
                  >
                    确定
                  </div>
                  <div
                    class="val val-switch-btn"
                    v-else-if="val == 'A/'"
                    :class="noSwitch ? 'disabled' : ''"
                    @touchstart="change"
                  >
                    <span style="font-size:10px;position:relative;top:-8px">
                      A
                    </span>
                    /
                  </div>
                  <div
                    class="val"
                    v-else
                    @touchstart="inputStart(val, $event)"
                    @touchend="touchEnd"
                  >
                    {{ val }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 字母键盘 -->
          <div class="key-box key-box2" v-if="!keyType">
            <div class="item" v-show="!fiveInput">
              <div style="flex:3" />
              <div style="flex:7;display:flex">
                <div
                  class="key"
                  v-for="(val, key) in keyList3"
                  @touchstart.prevent="inputStart(val, $event)"
                  @touchend="touchEnd"
                  :key="key"
                >
                  <div class="val-box">
                    <div class="val">
                      {{ val }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="item" v-for="(item, i) in keyList2" :key="i">
              <div
                class="key"
                v-for="(val, key) in item"
                :key="key"
                :class="{
                  'key-del-btn': val == 'del',
                  'key-ok-btn': val == 'ok'
                }"
              >
                <div class="val-box">
                  <div
                    class="val val-del-btn"
                    v-if="val == 'del'"
                    @touchstart="del"
                    @touchend="touchEnd"
                  >
                    <img src="./back.svg" alt="撤销" />
                  </div>
                  <div
                    class="val val-ok-btn"
                    v-else-if="val == 'ok'"
                    @click="close"
                  >
                    确定
                  </div>
                  <div
                    class="val val-switch-btn"
                    v-else-if="val == '省/'"
                    :class="noSwitch ? 'disabled' : ''"
                    @touchstart="change"
                  >
                    <span style="font-size:10px;position:relative;top:-8px">
                      省
                    </span>
                    /
                  </div>
                  <div
                    class="val"
                    v-else
                    @touchstart="inputStart(val, $event)"
                    @touchend="touchEnd"
                  >
                    {{ val }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mixin as clickaway } from "./mixin.js";
export default {
  name: "licence-keyboard",
  mixins: [clickaway],
  props: {
    value: [Array, String],
    licenceLength: {
      // 车牌位数
      type: Number,
      default: 8
    },
    isMask: Boolean
  },
  data() {
    return {
      isShow: false,
      keyType: true,
      fiveInput: false,
      noSwitch: false,
      keyList: [
        ["京", "津", "冀", "晋", "蒙", "辽", "吉", "黑", "沪", "苏"],
        ["浙", "赣", "皖", "闽", "鲁", "豫", "鄂", "湘", "粤", "桂"],
        ["琼", "渝", "川", "贵", "云", "藏", "陕", "甘", "del"],
        ["青", "宁", "新", "港", "澳", "台", "A/", "ok"]
      ],
      keyList2: [
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"],
        ["L", "M", "N", "P", "Q", "R", "S", "T", "del"],
        ["U", "V", "W", "X", "Y", "Z", "省/", "ok"]
      ],
      keyList3: ["警", "学", "领", "港", "澳", "使", "挂"]
    };
  },
  watch: {
    value: {
      handler(val) {
        if (val.length === 0) {
          this.keyType = true;
        } else {
          this.keyType = false;
          if (val.length === 6) {
            this.fiveInput = false;
          } else {
            this.fiveInput = true;
          }
        }
        if (val.length > 0 && val.length < 6) {
          this.noSwitch = true;
        } else {
          this.noSwitch = false;
        }
        this.$emit("input", val);
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    close() {
      this.isShow = false;
    },
    touchEnd(e) {
      let ele = e.currentTarget;
      ele.style.backgroundColor = "#fff";
      ele.style.color = "#333";
    },
    inputStart(val, e) {
      if (!val) return;
      if (this.value.length < this.licenceLength) {
        this.value.push(val);
      }
      // 设置高亮
      let ele = e.currentTarget;
      ele.style.backgroundColor = "#1690ff";
      ele.style.color = "#fff";
    },
    change() {
      if (this.noSwitch) {
        return;
      }
      this.keyType = !this.keyType;
    },
    del(e) {
      this.value.pop();
      // 设置高亮
      let ele = e.currentTarget;
      ele.style.backgroundColor = "#1690ff";
      ele.style.color = "#fff";
    }
  }
};
</script>
<style lang="less" scoped>
.key-del-btn {
  flex: 2 !important;
}
.key-ok-btn {
  flex: 3 !important;
}
.item {
  background: #d4dadd;
  padding-right: 5px;
}
.key {
  border-radius: 2px;
  background: #d4dadd;
  box-sizing: border-box;
  .val-box {
    padding: 3px;
    background: #d4dadd;
    .val {
      height: 42px;
      line-height: 42px;
      background: #fff;
      border-radius: 4px;
      color: #333;
      font-size: 18px;
      font-weight: 500;
      box-shadow: 0 1px 2px -1px rgba(0, 0, 0, 0.8);
      &.val-del-btn {
        background: #f0f0f0;
        img {
          margin-top: 8px;
          width: 30px;
        }
      }
      &.val-ok-btn {
        background: #1690ff;
        color: #fff;
      }
      &.val-switch-btn {
        &.disabled {
          background: #ddd;
        }
      }
    }
  }
}

.key-modal {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  top: 0;
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.2);
  color: #363636;
  z-index: 9999;
}
/* 键盘盒子 */
.key-box {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10000;
  width: 100%;
  font-size: 32px;
  color: #000;
  padding: 1px;
  background: #d4dadd;
  box-sizing: border-box;
  padding-top: 6px;
  &.key-box2 {
    .key {
      cursor: pointer;
      width: (100% / 7);
      flex: 1;
      height: 100%;
      display: inline-block;
    }
  }
  .password-del-btn {
    width: (100% / 7) * 2;
    float: right;
    height: 100px;
    line-height: 100px;
    text-align: center;
    background: #f8f8f8;
    border-radius: 2px;
    border: 2px solid #dddddd;
    .iconfont {
      font-size: 52px !important;
      vertical-align: 2px;
    }
  }
  .switch-btn {
    width: (100% / 7) * 1.5;
    float: left;
    height: 100px;
    line-height: 100px;
    text-align: center;
    background: #f8f8f8;
    border-radius: 2px;
    border: 2px solid #dddddd;
  }
  .ok-btn {
    width: (100% / 7) * 3;
    float: right;
    height: 100px;
    line-height: 100px;
    text-align: center;
    background: #38f;
    color: #fff;
    border-radius: 2px;
    border: 2px solid #dddddd;
  }
  .item {
    width: 100%;
    text-align: center;
    display: flex;
  }
  .key {
    cursor: pointer;
    flex: 1;
    height: 100%;
    display: inline-block;
  }
}
.licence-box {
  display: flex;
  border: 2px solid #fff;
  // background: #1690ff;
  padding: 10px;
  border-radius: 10px;
  margin: 0 auto;
  .licence-item {
    flex: 1;
    width: 40px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: #333;
    border: 1px solid #1690ff;
    margin: 5px;
    font-size: 20px;
    &.licence-item-dot {
      width: 10px;
      flex: none;
      border: none;
      margin: 0;
    }
    &.licence-item-green {
      border-color: #089e4b;
    }
  }
}
</style>
