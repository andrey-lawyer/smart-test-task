<template>
  <teleport to="body">
    <transition name="modal-fade">
      <div class="modal" v-if="props.isShown" @click="hideModal">
        <div @click.stop class="modal__content">
          <button class="button_close" type="button" @click="hideModal">
            <IconClose />
          </button>
          <slot></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts" name="ModalUi">
import { watch, defineProps } from 'vue'
import IconClose from '@/components/icons/IconClose.vue'

interface IPropsModal {
  isShown: boolean
}
const props = withDefaults(defineProps<IPropsModal>(), {
  isShown: false
})
const emit = defineEmits(['update:isShown'])

function hideModal() {
  emit('update:isShown', false)
}

function handleKeyUp(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    hideModal()
  }
}
watch(props, () => {
  if (props.isShown) {
    window.addEventListener('keyup', handleKeyUp)
    document.body.classList.add('modal-open')
  } else {
    window.removeEventListener('keyup', handleKeyUp)
    document.body.classList.remove('modal-open')
  }
})
</script>

<style>
.modal {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);

  backdrop-filter: blur(1px);
  position: fixed;
  display: flex;
  z-index: 999999999;
}

.modal__content {
  margin: auto;
  border-radius: 12px;
  background-color: var(--white-color);
  position: relative;
  max-height: 80vh;
  overflow-y: auto;
  padding: 40px 40px;
}
.button_close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  padding: 0;
  background-color: transparent;
  border: 1px solid black;
  display: flex;
  border-radius: 5px;

  z-index: 999;
  top: 16px;
  right: 16px;
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.8s ease;
}
</style>
